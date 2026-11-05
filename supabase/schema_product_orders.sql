-- ========================================================
-- Schema: product_orders
-- Description: Stores customer orders for the Mega Bundle
-- ========================================================

CREATE TABLE IF NOT EXISTS product_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  product_name TEXT NOT NULL DEFAULT 'Complete 7-in-1 Mega Bundle',
  order_type TEXT NOT NULL DEFAULT 'BUNDLE',
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 21.00,
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'CONTACTED', 'DISPATCHED', 'COMPLETED', 'CANCELLED')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE product_orders ENABLE ROW LEVEL SECURITY;

-- Allow public / guest users to submit orders
DROP POLICY IF EXISTS "Allow public order placement" ON product_orders;
CREATE POLICY "Allow public order placement" 
ON product_orders FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow reading and updating orders
DROP POLICY IF EXISTS "Allow admin to view and update orders" ON product_orders;
CREATE POLICY "Allow admin to view and update orders" 
ON product_orders FOR ALL 
TO anon, authenticated 
USING (true);
