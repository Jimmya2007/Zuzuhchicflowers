# Supabase PostgreSQL Setup Guide

## 🎯 What Changed

Migrated from Deno KV Store to **PostgreSQL** for better performance, scalability, and data management.

## 📊 Database Tables Created

### 1. **customers**
- Stores customer information
- Links to orders and reservations

### 2. **products**
- All your products (bouquets, packages, peluches)
- Includes: name, price, description, image, category, stock

### 3. **orders**
- Customer orders with line items
- Tracks: customer info, total amount, status, notes

### 4. **order_items**
- Individual items in each order
- Links products to orders

### 5. **reservations**
- Customer reservations for specific dates/times
- Includes: customer info, product, date, time, status, message

## 🚀 Deployment Steps

### Step 1: Apply Database Migration

Run this command in your terminal from the project root:

```bash
cd "c:\Users\jimje\OneDrive\Desktop\zuzuh chic\flowers\flowers\Zuzuh Chic Flowers Website"
supabase db push
```

This will create all tables in your Supabase project.

### Step 2: Verify Tables Created

1. Go to https://supabase.com/dashboard/project/sbovtiakuigihbkjgnmo
2. Click **Table Editor** in left sidebar
3. You should see: `customers`, `products`, `orders`, `order_items`, `reservations`

### Step 3: Deploy Edge Function

Deploy the updated server function:

```bash
supabase functions deploy server
```

### Step 4: Test the API

Try accessing:
- https://sbovtiakuigihbkjgnmo.supabase.co/functions/v1/make-server-554e7d35/health

Should return: `{"status":"ok"}`

## 🔐 Security Features

### Row Level Security (RLS) Enabled

All tables have RLS policies:
- ✅ **Public** can create orders and reservations
- ✅ **Public** can view active products
- ✅ **Authenticated admins** can manage everything

### Protected Endpoints

Require admin authentication:
- GET/PUT/DELETE products
- GET/PUT/DELETE reservations
- GET/PUT orders
- GET stats

### Public Endpoints

Anyone can access:
- POST orders (create order)
- POST reservations (create reservation)
- GET products (view products)

## 📈 What Your Dashboard Now Tracks

### Real-Time Stats:
1. **Total Sales**: Count of all orders
2. **Total Orders**: Same as sales
3. **Revenue**: Sum of all order amounts
4. **New Customers**: Count of unique reservations
5. **Total Reservations**: All reservations
6. **Pending Reservations**: Awaiting confirmation
7. **Completed Sales**: Orders with status 'completed'
8. **Total Products**: Active products in catalog

### Data Tables:
- **Reservations**: All customer reservations with status
- **Orders**: Complete order history
- **Products**: Full product catalog

## 🧪 Testing

### Test Creating a Reservation (Public API):

```bash
curl -X POST https://sbovtiakuigihbkjgnmo.supabase.co/functions/v1/make-server-554e7d35/reservations \
  -H "Content-Type: application/json" \
  -d '{
    "customerName": "Test Customer",
    "email": "test@example.com",
    "phone": "+509 1234-5678",
    "product": "Bouquet Premium",
    "date": "2026-02-14",
    "time": "10:00",
    "message": "Test reservation"
  }'
```

### Test Admin Login:

1. Go to http://localhost:5174
2. Click the **Admin** button
3. Sign up with: `jeremiechristopher11@gmail.com` / `ZuzuhAdmin2026!`
4. You should see the Valentine Dashboard with real data!

## 📝 Next Steps

1. **Create admin account** through the UI
2. **Add products** via admin panel
3. **Test reservations** from customer side
4. **Monitor stats** in dashboard

## 🔧 Troubleshooting

### If tables don't exist:
```bash
supabase db reset
supabase db push
```

### If function not working:
```bash
supabase functions deploy server --no-verify-jwt
```

### Check logs:
```bash
supabase functions logs server
```

## 📞 Support

All endpoints are now connected to PostgreSQL and ready for production use!
