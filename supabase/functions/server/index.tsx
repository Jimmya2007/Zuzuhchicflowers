import { Hono } from "npm:hono";
import { cors } from "npm:hono/cors";
import { logger } from "npm:hono/logger";
import * as kv from "./kv_store.tsx";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client
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
    const products = await kv.getByPrefix("product_");
    return c.json({ products });
  } catch (error) {
    console.log(`Erreur lors de la récupération des produits: ${error}`);
    return c.json({ error: "Erreur lors de la récupération des produits" }, 500);
  }
});

// Get products by page
app.get("/make-server-554e7d35/products/:page", async (c) => {
  try {
    const page = c.req.param('page');
    const allProducts = await kv.getByPrefix("product_");
    const pageProducts = allProducts.filter((p: any) => p.page === page);
    return c.json({ products: pageProducts });
  } catch (error) {
    console.log(`Erreur lors de la récupération des produits de la page: ${error}`);
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
    
    // Generate unique ID
    const id = `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const productData = {
      id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      image: product.image,
      features: product.features || [],
      page: product.page,
      createdAt: new Date().toISOString(),
    };

    await kv.set(id, productData);
    
    return c.json({ success: true, product: productData });
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
    
    // Get existing product
    const existingProduct = await kv.get(id);
    if (!existingProduct) {
      return c.json({ error: "Produit non trouvé" }, 404);
    }

    const updatedProduct = {
      ...existingProduct,
      ...updates,
      id, // Preserve the ID
      updatedAt: new Date().toISOString(),
    };

    await kv.set(id, updatedProduct);
    
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
    
    // Check if product exists
    const existingProduct = await kv.get(id);
    if (!existingProduct) {
      return c.json({ error: "Produit non trouvé" }, 404);
    }

    await kv.del(id);
    
    return c.json({ success: true, message: "Produit supprimé" });
  } catch (error) {
    console.log(`Erreur lors de la suppression du produit: ${error}`);
    return c.json({ error: "Erreur lors de la suppression du produit" }, 500);
  }
});

Deno.serve(app.fetch);