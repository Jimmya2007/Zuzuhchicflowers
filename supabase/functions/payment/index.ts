import { Hono } from "npm:hono@4";
import { cors } from "npm:hono/cors";
import { createClient } from "npm:@supabase/supabase-js@2";

const app = new Hono();

// Initialize Supabase client with service role key
const supabase = createClient(
  Deno.env.get('SUPABASE_URL') ?? '',
  Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
);

// Enable CORS
app.use("/*", cors({
  origin: "*",
  allowHeaders: ["Content-Type", "Authorization"],
  allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));

// ==================== CREATE PAYMENT ====================
app.post("/payment/create", async (c) => {
  try {
    const body = await c.req.json();
    const { 
      amount, 
      currency = 'HTG', 
      items, 
      customerName, 
      customerPhone,
      customerEmail,
      customerAddress,
      deliveryNotes 
    } = body;

    // Validate input
    if (!amount || !items || !customerName || !customerPhone || !customerEmail || !customerAddress) {
      return c.json({ error: "Missing required fields (name, phone, email, address)" }, 400);
    }

    console.log('📦 Creating order:', { amount, currency, customerName, customerPhone, customerEmail, customerAddress });

    // Create order in database with all customer information
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        customer_name: customerName,
        customer_phone: customerPhone,
        customer_email: customerEmail || null,
        customer_address: customerAddress || null,
        delivery_notes: deliveryNotes || null,
        total_amount: amount,
        currency: currency,
        status: 'pending',
        payment_method: 'moncash',
        items: items,
      }])
      .select()
      .single();

    if (orderError) {
      console.error('❌ Database error:', orderError.message, orderError.details, orderError.hint);
      return c.json({ 
        success: false, 
        error: `Database error: ${orderError.message}`,
        details: orderError.details 
      }, 500);
    }

    console.log('✅ Order saved to database:', order.id);
    
    // Try to create payment record (optional - don't fail if it doesn't work)
    try {
      await supabase
        .from('payments')
        .insert([{
          order_id: order.id,
          provider: 'moncash',
          status: 'pending',
          raw_response: { message: 'Payment initiated' },
        }]);
    } catch (e) {
      console.log('⚠️ Payment record skipped (table may not exist)');
    }

    return c.json({
      success: true,
      orderId: order.id,
      paymentId: order.id, // Use order ID as payment ID for simplicity
      payment_url: `https://moncashbutton.digicelgroup.com/Moncash-middleware/Payment/Redirect?token=mock`,
      message: 'Order created successfully'
    });

  } catch (error) {
    console.error('❌ Error in create payment:', error);
    return c.json({ error: "Internal server error", details: String(error) }, 500);
  }
});

// ==================== PAYMENT CALLBACK (MOCK) ====================
app.post("/payment/callback", async (c) => {
  try {
    const body = await c.req.json();
    const { orderId, transactionId, status = 'success' } = body;

    console.log('🔔 Payment callback received:', { orderId, transactionId, status });

    if (!orderId) {
      return c.json({ error: "Missing orderId" }, 400);
    }

    // Determine order status based on payment status
    const orderStatus = status === 'success' ? 'paid' : 'failed';
    const paymentStatus = status === 'success' ? 'success' : 'failed';

    // Try to update database, but don't fail if tables don't exist
    try {
      // 1. Update order status
      await supabase
        .from('orders')
        .update({ 
          status: orderStatus,
          updated_at: new Date().toISOString()
        })
        .eq('id', orderId);

      console.log('✅ Order updated:', orderId, orderStatus);

      // 2. Update payment record
      if (transactionId) {
        await supabase
          .from('payments')
          .update({ 
            status: paymentStatus,
            provider_transaction_id: transactionId,
            raw_response: { 
              status: status,
              timestamp: new Date().toISOString(),
              message: status === 'success' ? 'Payment completed successfully' : 'Payment failed'
            },
            updated_at: new Date().toISOString()
          })
          .eq('id', transactionId);

        console.log('✅ Payment updated:', transactionId, paymentStatus);
      }
    } catch (dbError) {
      console.log('⚠️ Database update skipped (mock mode)');
    }

    // Always return success for testing
    return c.json({
      success: true,
      orderId: orderId,
      status: orderStatus,
      message: status === 'success' ? 'Payment confirmed' : 'Payment failed'
    });

  } catch (error) {
    console.error('❌ Error in payment callback:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== GET ORDER ====================
app.get("/payment/order/:orderId", async (c) => {
  try {
    const orderId = c.req.param('orderId');

    console.log('🔍 Fetching order:', orderId);

    const { data: order, error } = await supabase
      .from('orders')
      .select(`
        *,
        payments (*)
      `)
      .eq('id', orderId)
      .single();

    if (error || !order) {
      console.error('❌ Order not found:', orderId);
      return c.json({ error: "Order not found" }, 404);
    }

    console.log('✅ Order found:', order);

    return c.json({
      success: true,
      order: order
    });

  } catch (error) {
    console.error('❌ Error fetching order:', error);
    return c.json({ error: "Internal server error" }, 500);
  }
});

// ==================== HEALTH CHECK ====================
app.get("/payment/health", (c) => {
  return c.json({ 
    status: "ok", 
    service: "moncash-mock-payment",
    timestamp: new Date().toISOString()
  });
});

Deno.serve(app.fetch);
