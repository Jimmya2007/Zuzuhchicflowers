import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client (for database operations)
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable logger
app.use('*', logger(console.log));

// Enable CORS for all routes and methods
app.use(
  "/*",
  cors({
    origin: "*",
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
  }),
);

// Health check endpoint
app.get("/make-server-554e7d35/health", (c) => {
  return c.json({ status: "ok" });
});

// ===== AUTH ROUTES =====

// Sign up route (admin registration)
app.post("/make-server-554e7d35/signup", async (c) => {
  try {
    const { email, password, name } = await c.req.json();

    if (!email || !password) {
      return c.json({ error: "Email et mot de passe requis" }, 400);
    }

    const { data, error } = await supabase.auth.admin.createUser({
      email,
      password,
      user_metadata: { name },
      // Automatically confirm the user's email since an email server hasn't been configured.
      email_confirm: true
    });

    if (error) {
      console.log(`Erreur lors de l'inscription de l'utilisateur: ${error.message}`);
      return c.json({ error: error.message }, 400);
    }

    return c.json({ success: true, user: data.user });
  } catch (error) {
    console.log(`Erreur serveur lors de l'inscription: ${error}`);
    return c.json({ error: "Erreur serveur lors de l'inscription" }, 500);
  }
});

// ===== PRODUCT ROUTES =====

// Get all products
app.get("/make-server-554e7d35/products", async (c) => {
  try {
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ products: products || [] });
  } catch (error) {
    console.log(`Erreur lors de la récupération des produits: ${error}`);
    return c.json({ error: "Erreur lors de la récupération des produits" }, 500);
  }
});

// Get products by category
app.get("/make-server-554e7d35/products/category/:category", async (c) => {
  try {
    const category = c.req.param('category');
    
    const { data: products, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', category)
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ products: products || [] });
  } catch (error) {
    console.log(`Erreur lors de la récupération des produits: ${error}`);
    return c.json({ error: "Erreur lors de la récupération des produits" }, 500);
  }
});

// Create a new product (protected route)
app.post("/make-server-554e7d35/products", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      console.log(`Erreur d'autorisation lors de la création de produit: ${authError?.message}`);
      return c.json({ error: 'Non autorisé' }, 401);
    }

    const product = await c.req.json();
    
    const { data: newProduct, error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        description: product.description,
        price: product.price,
        image_url: product.image,
        category: product.category,
        stock: product.stock || 0,
        is_active: true
      }])
      .select()
      .single();

    if (error) throw error;
    
    return c.json({ success: true, product: newProduct });
  } catch (error) {
    console.log(`Erreur lors de la création du produit: ${error}`);
    return c.json({ error: "Erreur lors de la création du produit" }, 500);
  }
});

// Update a product (protected route)
app.put("/make-server-554e7d35/products/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      console.log(`Erreur d'autorisation lors de la mise à jour de produit: ${authError?.message}`);
      return c.json({ error: 'Non autorisé' }, 401);
    }

    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const { data: updatedProduct, error } = await supabase
      .from('products')
      .update({
        name: updates.name,
        description: updates.description,
        price: updates.price,
        image_url: updates.image,
        category: updates.category,
        stock: updates.stock,
        is_active: updates.is_active
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    return c.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.log(`Erreur lors de la mise à jour du produit: ${error}`);
    return c.json({ error: "Erreur lors de la mise à jour du produit" }, 500);
  }
});

// Delete a product (protected route)
app.delete("/make-server-554e7d35/products/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      console.log(`Erreur d'autorisation lors de la suppression de produit: ${authError?.message}`);
      return c.json({ error: 'Non autorisé' }, 401);
    }

    const id = c.req.param('id');
    
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    return c.json({ success: true, message: "Produit supprimé" });
  } catch (error) {
    console.log(`Erreur lors de la suppression du produit: ${error}`);
    return c.json({ error: "Erreur lors de la suppression du produit" }, 500);
  }
});

// ===== RESERVATION ROUTES =====

// Get all reservations (protected route)
app.get("/make-server-554e7d35/reservations", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Non autorisé' }, 401);
    }

    const { data: reservations, error } = await supabase
      .from('reservations')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ reservations: reservations || [] });
  } catch (error) {
    console.log(`Erreur lors de la récupération des réservations: ${error}`);
    return c.json({ error: "Erreur lors de la récupération des réservations" }, 500);
  }
});

// Create a new reservation (public route)
app.post("/make-server-554e7d35/reservations", async (c) => {
  try {
    const reservation = await c.req.json();
    
    const { data: newReservation, error } = await supabase
      .from('reservations')
      .insert([{
        customer_name: reservation.customerName,
        email: reservation.email,
        phone: reservation.phone,
        product: reservation.product,
        reservation_date: reservation.date,
        reservation_time: reservation.time,
        message: reservation.message || '',
        status: 'pending'
      }])
      .select()
      .single();

    if (error) throw error;
    
    return c.json({ success: true, reservation: newReservation });
  } catch (error) {
    console.log(`Erreur lors de la création de la réservation: ${error}`);
    return c.json({ error: "Erreur lors de la création de la réservation" }, 500);
  }
});

// Update reservation status (protected route)
app.put("/make-server-554e7d35/reservations/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Non autorisé' }, 401);
    }

    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const { data: updatedReservation, error } = await supabase
      .from('reservations')
      .update({ status: updates.status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    return c.json({ success: true, reservation: updatedReservation });
  } catch (error) {
    console.log(`Erreur lors de la mise à jour de la réservation: ${error}`);
    return c.json({ error: "Erreur lors de la mise à jour de la réservation" }, 500);
  }
});

// Delete a reservation (protected route)
app.delete("/make-server-554e7d35/reservations/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Non autorisé' }, 401);
    }

    const id = c.req.param('id');
    
    const { error } = await supabase
      .from('reservations')
      .delete()
      .eq('id', id);

    if (error) throw error;
    
    return c.json({ success: true, message: "Réservation supprimée" });
  } catch (error) {
    console.log(`Erreur lors de la suppression de la réservation: ${error}`);
    return c.json({ error: "Erreur lors de la suppression de la réservation" }, 500);
  }
});

// ===== ORDER ROUTES =====

// Get all orders (protected route)
app.get("/make-server-554e7d35/orders", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Non autorisé' }, 401);
    }

    const { data: orders, error } = await supabase
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;

    return c.json({ orders: orders || [] });
  } catch (error) {
    console.log(`Erreur lors de la récupération des commandes: ${error}`);
    return c.json({ error: "Erreur lors de la récupération des commandes" }, 500);
  }
});

// Create a new order (public route)
app.post("/make-server-554e7d35/orders", async (c) => {
  try {
    const order = await c.req.json();
    
    const { data: newOrder, error } = await supabase
      .from('orders')
      .insert([{
        customer_name: order.customer?.name || order.customerName,
        customer_email: order.customer?.email || order.customerEmail,
        customer_phone: order.customer?.phone || order.customerPhone,
        total_amount: order.amount,
        status: order.status || 'pending',
        notes: order.notes || ''
      }])
      .select()
      .single();

    if (error) throw error;
    
    return c.json({ success: true, order: newOrder });
  } catch (error) {
    console.log(`Erreur lors de la création de la commande: ${error}`);
    return c.json({ error: "Erreur lors de la création de la commande" }, 500);
  }
});

// Update order status (protected route)
app.put("/make-server-554e7d35/orders/:id", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Non autorisé' }, 401);
    }

    const id = c.req.param('id');
    const updates = await c.req.json();
    
    const { data: updatedOrder, error } = await supabase
      .from('orders')
      .update({ status: updates.status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    
    return c.json({ success: true, order: updatedOrder });
  } catch (error) {
    console.log(`Erreur lors de la mise à jour de la commande: ${error}`);
    return c.json({ error: "Erreur lors de la mise à jour de la commande" }, 500);
  }
});

// ===== STATS ROUTES =====

// Track visitor (public route)
app.post("/make-server-554e7d35/track-visit", async (c) => {
  try {
    const visitData = await c.req.json();
    
    const { error } = await supabase
      .from('visitors')
      .insert([{
        ip_address: visitData.ip || null,
        user_agent: visitData.userAgent || null,
        page_url: visitData.pageUrl || null,
        referrer: visitData.referrer || null
      }]);

    if (error) throw error;
    
    return c.json({ success: true });
  } catch (error) {
    console.log(`Erreur lors de l'enregistrement de la visite: ${error}`);
    return c.json({ error: "Erreur lors de l'enregistrement de la visite" }, 500);
  }
});

// Get dashboard stats (protected route)
app.get("/make-server-554e7d35/stats", async (c) => {
  try {
    const accessToken = c.req.header('Authorization')?.split(' ')[1];
    
    // Verify user is authenticated
    const { data: { user }, error: authError } = await supabase.auth.getUser(accessToken);
    if (!user?.id || authError) {
      return c.json({ error: 'Non autorisé' }, 401);
    }

    // Get orders from database
    const { data: orders, error: ordersError } = await supabase
      .from('orders')
      .select('total_amount, status');

    if (ordersError) throw ordersError;

    // Get reservations from database
    const { data: reservations, error: reservationsError } = await supabase
      .from('reservations')
      .select('status');

    if (reservationsError) throw reservationsError;

    // Get products count
    const { count: productsCount, error: productsError } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('is_active', true);

    if (productsError) throw productsError;

    // Get total visitors count
    const { count: visitorsCount, error: visitorsError } = await supabase
      .from('visitors')
      .select('*', { count: 'exact', head: true });

    if (visitorsError) throw visitorsError;

    // Get unique visitors (by IP) for today
    const today = new Date().toISOString().split('T')[0];
    const { data: todayVisitors, error: todayVisitorsError } = await supabase
      .from('visitors')
      .select('ip_address')
      .gte('visit_date', today);

    if (todayVisitorsError) throw todayVisitorsError;

    const uniqueTodayVisitors = new Set(todayVisitors?.map(v => v.ip_address)).size;
    
    const stats = {
      totalSales: orders?.length || 0,
      totalOrders: orders?.length || 0,
      revenue: orders?.reduce((sum, order) => sum + (parseFloat(order.total_amount) || 0), 0) || 0,
      newCustomers: reservations?.length || 0,
      totalReservations: reservations?.length || 0,
      pendingReservations: reservations?.filter(r => r.status === 'pending').length || 0,
      completedSales: orders?.filter(o => o.status === 'completed').length || 0,
      totalProducts: productsCount || 0,
      totalVisitors: visitorsCount || 0,
      todayVisitors: uniqueTodayVisitors || 0,
    };
    
    return c.json({ stats });
  } catch (error) {
    console.log(`Erreur lors de la récupération des statistiques: ${error}`);
    return c.json({ error: "Erreur lors de la récupération des statistiques" }, 500);
  }
});

Deno.serve(app.fetch);