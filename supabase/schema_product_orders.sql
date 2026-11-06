-- ========================================================
-- Schema: product_orders & Auto-Account Generation on Approval
-- Description: Stores customer orders for the Mega Bundle,
-- and provisions member account (User ID = Email, Password = Phone last 4 digits)
-- ========================================================

-- Enable pgcrypto for password hashing if not already available
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 1. Create or update product_orders table
CREATE TABLE IF NOT EXISTS product_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  customer_phone TEXT NOT NULL,
  shipping_address TEXT NOT NULL,
  product_name TEXT NOT NULL DEFAULT 'Complete 7-in-1 Mega Bundle',
  order_type TEXT NOT NULL DEFAULT 'BUNDLE',
  total_amount NUMERIC(10, 2) NOT NULL DEFAULT 2100.00,
  status TEXT NOT NULL DEFAULT 'PENDING',
  account_created BOOLEAN DEFAULT false,
  account_user_id UUID,
  account_member_id TEXT,
  temp_password_hint TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Ensure all columns exist if table was already created
ALTER TABLE product_orders ADD COLUMN IF NOT EXISTS account_created BOOLEAN DEFAULT false;
ALTER TABLE product_orders ADD COLUMN IF NOT EXISTS account_user_id UUID;
ALTER TABLE product_orders ADD COLUMN IF NOT EXISTS account_member_id TEXT;
ALTER TABLE product_orders ADD COLUMN IF NOT EXISTS temp_password_hint TEXT;

-- Drop and re-add status constraint to include 'APPROVED'
DO $$
BEGIN
  ALTER TABLE product_orders DROP CONSTRAINT IF EXISTS product_orders_status_check;
  ALTER TABLE product_orders ADD CONSTRAINT product_orders_status_check 
    CHECK (status IN ('PENDING', 'APPROVED', 'CONTACTED', 'DISPATCHED', 'COMPLETED', 'CANCELLED'));
EXCEPTION
  WHEN OTHERS THEN NULL;
END $$;

-- 2. Enable Row Level Security (RLS)
ALTER TABLE product_orders ENABLE ROW LEVEL SECURITY;

-- Allow public / guest users to submit orders from the storefront
DROP POLICY IF EXISTS "Allow public order placement" ON product_orders;
CREATE POLICY "Allow public order placement" 
ON product_orders FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow reading and updating orders for administrator operations
DROP POLICY IF EXISTS "Allow admin to view and update orders" ON product_orders;
CREATE POLICY "Allow admin to view and update orders" 
ON product_orders FOR ALL 
TO anon, authenticated 
USING (true);


-- 3. Stored Procedure: admin_approve_product_order
-- Provisions member credentials:
-- Login ID = customer_email (e.g. user's Gmail)
-- Password = last 4 digits of phone number
CREATE OR REPLACE FUNCTION admin_approve_product_order(p_order_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, auth, extensions, pg_temp
AS $$
DECLARE
  v_order RECORD;
  v_user_id UUID;
  v_member_id TEXT;
  v_clean_phone TEXT;
  v_last4 TEXT;
  v_clean_email TEXT;
  v_existing_user_id UUID;
BEGIN
  -- 1. Fetch order
  SELECT * INTO v_order FROM product_orders WHERE id = p_order_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Order not found with ID %', p_order_id;
  END IF;

  v_clean_email := LOWER(TRIM(v_order.customer_email));
  v_clean_phone := REGEXP_REPLACE(v_order.customer_phone, '[^0-9]', '', 'g');
  
  -- Extract last 4 digits of phone, or fallback to 1234
  IF LENGTH(v_clean_phone) >= 4 THEN
    v_last4 := RIGHT(v_clean_phone, 4);
  ELSE
    v_last4 := '1234';
  END IF;

  -- 2. Check if auth user already exists for this email
  SELECT id INTO v_existing_user_id FROM auth.users WHERE LOWER(email) = v_clean_email LIMIT 1;

  IF v_existing_user_id IS NOT NULL THEN
    v_user_id := v_existing_user_id;

    -- Update password to match the last 4 digits
    UPDATE auth.users 
    SET encrypted_password = crypt(v_last4, gen_salt('bf')),
        updated_at = now()
    WHERE id = v_user_id;

    -- Ensure member record exists and is ACTIVE
    INSERT INTO members (id, status)
    VALUES (v_user_id, 'ACTIVE')
    ON CONFLICT (id) DO UPDATE SET status = 'ACTIVE', updated_at = now();

    SELECT member_id INTO v_member_id FROM members WHERE id = v_user_id;

  ELSE
    -- 3. Create new user in auth.users
    v_user_id := gen_random_uuid();

    INSERT INTO auth.users (
      instance_id,
      id,
      aud,
      role,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      created_at,
      updated_at,
      confirmation_token,
      recovery_token
    ) VALUES (
      '00000000-0000-00-00-00-00-000000000000',
      v_user_id,
      'authenticated',
      'authenticated',
      v_clean_email,
      crypt(v_last4, gen_salt('bf')),
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      jsonb_build_object('full_name', v_order.customer_name, 'phone', v_order.customer_phone),
      now(),
      now(),
      '',
      ''
    );

    -- Insert into auth.identities
    INSERT INTO auth.identities (
      id,
      user_id,
      identity_data,
      provider,
      provider_id,
      last_sign_in_at,
      created_at,
      updated_at
    ) VALUES (
      v_user_id,
      v_user_id,
      jsonb_build_object('sub', v_user_id::text, 'email', v_clean_email),
      'email',
      v_user_id::text,
      now(),
      now(),
      now()
    ) ON CONFLICT DO NOTHING;

    -- Insert Member (Status = ACTIVE; Trigger generates member_id)
    INSERT INTO members (id, status)
    VALUES (v_user_id, 'ACTIVE');

    SELECT member_id INTO v_member_id FROM members WHERE id = v_user_id;

  END IF;

  -- 4. Upsert Member Profile
  INSERT INTO member_profile (
    id, 
    full_name, 
    phone_number, 
    email, 
    address
  ) VALUES (
    v_user_id,
    v_order.customer_name,
    v_order.customer_phone,
    v_clean_email,
    v_order.shipping_address
  )
  ON CONFLICT (id) DO UPDATE SET
    full_name = EXCLUDED.full_name,
    phone_number = EXCLUDED.phone_number,
    email = EXCLUDED.email,
    address = EXCLUDED.address,
    updated_at = now();

  -- 5. Member Business Record
  INSERT INTO member_business (id) VALUES (v_user_id) ON CONFLICT (id) DO NOTHING;

  -- 6. Member KYC Record
  INSERT INTO member_kyc (id) VALUES (v_user_id) ON CONFLICT (id) DO NOTHING;

  -- 7. Payment Record (₹2,100 Approved)
  INSERT INTO payments (
    member_id, 
    amount, 
    utr_number, 
    screenshot_url, 
    status
  ) VALUES (
    v_user_id,
    v_order.total_amount,
    'BUNDLE-ORDER-' || SUBSTRING(p_order_id::text, 1, 8),
    'storefront-mega-bundle',
    'APPROVED'
  ) ON CONFLICT DO NOTHING;

  -- 8. Update product_orders
  UPDATE product_orders SET
    status = 'APPROVED',
    account_created = true,
    account_user_id = v_user_id,
    account_member_id = v_member_id,
    temp_password_hint = v_last4,
    updated_at = now()
  WHERE id = p_order_id;

  -- Return Result
  RETURN jsonb_build_object(
    'success', true,
    'order_id', p_order_id,
    'member_id', v_member_id,
    'email', v_clean_email,
    'password', v_last4,
    'customer_name', v_order.customer_name,
    'phone', v_order.customer_phone
  );
END;
$$;
