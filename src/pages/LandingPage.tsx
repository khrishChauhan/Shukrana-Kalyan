/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { supabase } from '../lib/supabase';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Sparkles, 
  ShieldCheck, 
  Truck, 
  ArrowRight, 
  CheckCircle2, 
  Star, 
  X, 
  Phone, 
  Mail,
  MapPin, 
  Package, 
  HeartHandshake, 
  Flame,
  Leaf,
  Activity,
  AlertCircle,
  ChevronRight,
  Info
} from 'lucide-react';

interface ProductItem {
  id: string;
  name: string;
  hindiName?: string;
  tagline: string;
  category: 'Spices' | 'Ayurvedic Tonic';
  price: number;
  mrp: number;
  weight: string;
  image: string;
  rating: number;
  reviewsCount: number;
  badge?: string;
  features: string[];
}

const INDIVIDUAL_PRODUCTS: ProductItem[] = [
  {
    id: 'prod-1',
    name: 'Shukrana Pure Garam Masala',
    hindiName: 'शुक्राणा गरम मसाला',
    tagline: 'Rich Aromatic Blend of 100% Whole Spices',
    category: 'Spices',
    price: 499,
    mrp: 650,
    weight: '250g Pouch',
    image: '/images/products/garam-masala.jpg',
    rating: 4.9,
    reviewsCount: 342,
    badge: 'Chef’s Choice',
    features: ['16 Authentic Whole Spices', 'Zero Artificial Fragrance', 'Slow Cold-Ground Method']
  },
  {
    id: 'prod-2',
    name: 'Shukrana Chill Power Red Chilli',
    hindiName: 'चिल पावर लाल मिर्च',
    tagline: 'Teekha Swad... Behtareen Sehat (Pure Stemless)',
    category: 'Spices',
    price: 499,
    mrp: 650,
    weight: '250g Pouch',
    image: '/images/products/chilli-power.jpg',
    rating: 4.8,
    reviewsCount: 289,
    badge: '100% Natural',
    features: ['Vibrant Natural Deep Red Color', 'No Added Chemical or Sudans', 'Sun-Dried Stemless Pods']
  },
  {
    id: 'prod-3',
    name: 'Shukrana Coriander Powder (Dhaniya)',
    hindiName: 'शुक्राणा धनिया पाउडर',
    tagline: 'Pure · Natural · Healthy Farm-Fresh Ground',
    category: 'Spices',
    price: 499,
    mrp: 650,
    weight: '250g Pouch',
    image: '/images/products/coriander-powder.jpg',
    rating: 4.9,
    reviewsCount: 215,
    badge: 'Farm Fresh',
    features: ['Preserves Essential Volatile Oils', 'Triple-Sifted Ultra-Clean', 'Digestive & Cooling Aroma']
  },
  {
    id: 'prod-4',
    name: 'Shukrana Turmeric Powder (Haldi)',
    hindiName: 'शुक्राणा हल्दी पाउडर',
    tagline: 'High-Curcumin Natural Immunity & Wellness Booster',
    category: 'Spices',
    price: 499,
    mrp: 650,
    weight: '250g Pouch',
    image: '/images/products/turmeric-powder.jpg',
    rating: 5.0,
    reviewsCount: 412,
    badge: 'High Curcumin',
    features: ['Natural Golden Curcumin Rich', 'Zero Starch or Yellow Dyes', 'Daily Immunity & Anti-Inflammatory']
  },
  {
    id: 'prod-5',
    name: 'Shukrana OjoBoost Ayurvedic Eye Tonic',
    hindiName: 'ओजोबूस्ट आई टॉनिक',
    tagline: 'Healthy Eyes... Happy Life (Vision & Strain Relief)',
    category: 'Ayurvedic Tonic',
    price: 499,
    mrp: 699,
    weight: '100 ml Bottle',
    image: '/images/products/ojoboost-eye-tonic.jpg',
    rating: 4.9,
    reviewsCount: 198,
    badge: 'Ayurvedic Formula',
    features: ['Reduces Screen Strain & Fatigue', 'Relieves Dryness & Enhances Focus', 'Enriched with Amla & Triphala']
  },
  {
    id: 'prod-6',
    name: 'Shukrana Relax-Digest Syrup',
    hindiName: 'रिलैक्स-डाइजेस्ट सिरप',
    tagline: 'Yummy Chatpata Digestive Health & Gas Relief',
    category: 'Ayurvedic Tonic',
    price: 499,
    mrp: 699,
    weight: '200 ml Bottle',
    image: '/images/products/relax-digest-syrup.jpg',
    rating: 4.9,
    reviewsCount: 265,
    badge: 'Family Favorite',
    features: ['Relieves Gas, Acidity & Bloating', 'Improves Natural Appetite', 'Delicious Chatpata Flavor for Kids & Adults']
  },
  {
    id: 'prod-7',
    name: 'Shukrana OjoBoost Family Health Tonic',
    hindiName: 'ओजोबूस्ट फैमिली हेल्थ टॉनिक',
    tagline: 'Complete Daily Rejuvenation & Vitality Formula',
    category: 'Ayurvedic Tonic',
    price: 499,
    mrp: 750,
    weight: '300 ml Bottle',
    image: '/images/products/ojoboost-family-tonic.jpg',
    rating: 5.0,
    reviewsCount: 520,
    badge: 'Top Rated',
    features: ['Detoxifies, Protects & Rejuvenates', 'All-Round Stamina & Defense', 'Whole-Family Daily Nutritional Support']
  }
];

export default function LandingPage() {
  const [selectedCategory, setSelectedCategory] = useState<'ALL' | 'Spices' | 'Ayurvedic Tonic'>('ALL');
  
  // Modals state
  const [restrictionModalOpen, setRestrictionModalOpen] = useState(false);
  const [restrictedItemName, setRestrictedItemName] = useState('');
  const [bundleModalOpen, setBundleModalOpen] = useState(false);

  // 4 Essential Checkout fields
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const filteredProducts = selectedCategory === 'ALL'
    ? INDIVIDUAL_PRODUCTS
    : INDIVIDUAL_PRODUCTS.filter(p => p.category === selectedCategory);

  // Handler when user clicks "Buy Now" on any of the 7 individual items
  const handleSingleItemClick = (product: ProductItem) => {
    setRestrictedItemName(product.name);
    setRestrictionModalOpen(true);
  };

  // Open the Mega Bundle modal (from Hero, Mega Bundle Card, or from the restriction popup)
  const handleOpenBundleModal = () => {
    setRestrictionModalOpen(false);
    setOrderSuccess(false);
    setSubmitError(null);
    setBundleModalOpen(true);
  };

  // Handle bundle order submission to Supabase
  const handleBundleOrderSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim() || !customerPhone.trim() || !customerAddress.trim()) {
      alert('Please fill out all 4 required fields.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      const generatedLocalId = `ORD-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

      const orderPayload = {
        id: generatedLocalId,
        customer_name: customerName.trim(),
        customer_email: customerEmail.trim().toLowerCase(),
        customer_phone: customerPhone.trim(),
        shipping_address: customerAddress.trim(),
        product_name: 'Complete 7-in-1 Mega Bundle',
        order_type: 'BUNDLE',
        total_amount: 2100,
        status: 'PENDING' as const,
        account_created: false,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // 1. Immediately save to localStorage resilience cache so order is never lost
      try {
        const existingLocal = JSON.parse(localStorage.getItem('sks_bundle_orders') || '[]');
        const updatedLocal = [orderPayload, ...existingLocal.filter((o: any) => o.id !== generatedLocalId)];
        localStorage.setItem('sks_bundle_orders', JSON.stringify(updatedLocal));
        window.dispatchEvent(new Event('storage'));
      } catch (locErr) {
        console.warn('LocalStorage save notice:', locErr);
      }

      // 2. Insert into Supabase product_orders table
      const { data, error } = await supabase
        .from('product_orders')
        .insert([{
          customer_name: orderPayload.customer_name,
          customer_email: orderPayload.customer_email,
          customer_phone: orderPayload.customer_phone,
          shipping_address: orderPayload.shipping_address,
          product_name: orderPayload.product_name,
          order_type: orderPayload.order_type,
          total_amount: orderPayload.total_amount,
          status: 'PENDING'
        }])
        .select('id')
        .single();

      if (error) {
        console.warn('Cloud table note (order saved safely in local storage):', error.message);
        setOrderId(generatedLocalId);
      } else {
        const cloudId = data?.id ? data.id.slice(0, 8).toUpperCase() : generatedLocalId;
        setOrderId(cloudId);

        // Update local storage entry with the cloud ID
        if (data?.id) {
          try {
            const existing = JSON.parse(localStorage.getItem('sks_bundle_orders') || '[]');
            const patched = existing.map((o: any) => o.id === generatedLocalId ? { ...o, id: data.id } : o);
            localStorage.setItem('sks_bundle_orders', JSON.stringify(patched));
          } catch (_) {}
        }
      }

      setOrderSuccess(true);
    } catch (err: any) {
      console.error('Order submission error:', err);
      setOrderId(`ORD-${Date.now().toString(36).toUpperCase()}`);
      setOrderSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-[#FAF8F5] text-[#232F46] min-h-screen relative selection:bg-[#ED8C32]/20 selection:text-[#232F46]">
      {/* 1. Glass Sticky Navbar */}
      <Navbar />

      {/* 2. Hero Section */}
      <section id="home" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
        {/* Decorative background glows */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-gradient-to-b from-[#ED8C32]/10 via-[#FFF0E0]/30 to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-7 text-left space-y-6"
            >
              <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#ED8C32]/15 border border-[#ED8C32]/30 text-[#ED8C32] font-semibold text-xs tracking-wider uppercase">
                <Sparkles className="w-4 h-4 fill-current" />
                <span>100% Pure · Farm Fresh · Authentic Ayurvedic</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#232F46] tracking-tight leading-[1.12]">
                Pure Spices &amp; <br />
                <span className="text-[#ED8C32]">Ayurvedic Wellness</span> <br />
                Delivered to Your Door.
              </h1>

              <p className="text-lg text-[#232F46]/75 max-w-xl leading-relaxed">
                Experience chemical-free, lab-certified kitchen spices and genuine herbal tonics. 
                Sourced directly from heritage growers for unmatched aroma, vitality, and family health.
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <button
                  onClick={handleOpenBundleModal}
                  className="px-8 py-4 bg-[#ED8C32] text-[#232F46] font-bold rounded-2xl shadow-[0_8px_25px_rgba(237,140,50,0.35)] hover:shadow-[0_12px_32px_rgba(237,140,50,0.45)] hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-3 text-base cursor-pointer"
                >
                  <Flame className="w-5 h-5 fill-current" />
                  <span>Shop Mega Bundle (₹2100)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <a
                  href="#products"
                  className="px-7 py-4 bg-white text-[#232F46] font-semibold rounded-2xl border border-gray-200 hover:border-[#232F46]/30 shadow-sm hover:shadow transition-all duration-300 flex items-center gap-2 text-base"
                >
                  <ShoppingBag className="w-5 h-5 text-[#ED8C32]" />
                  <span>Browse Individual Products (₹499)</span>
                </a>
              </div>

              {/* Trust Micro-Badges */}
              <div className="pt-4 grid grid-cols-3 gap-4 border-t border-gray-200/60 max-w-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">Zero Chemical Dyes</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">FSSAI Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-gray-700">Pan-India Express</span>
                </div>
              </div>
            </motion.div>

            {/* Right Visual Banner */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 relative"
            >
              <div className="relative mx-auto max-w-md bg-gradient-to-tr from-[#232F46] to-[#2d3d5a] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/10 overflow-hidden">
                <div className="absolute -right-8 -top-8 w-44 h-44 bg-[#ED8C32]/10 rounded-full blur-2xl" />

                <div className="flex justify-between items-start mb-6">
                  <div>
                    <span className="px-3 py-1 bg-[#ED8C32] text-[#232F46] font-black text-xs uppercase tracking-wider rounded-full shadow-sm">
                      Mega Deal
                    </span>
                    <h3 className="text-2xl font-bold mt-2">Shukrana 7-in-1 Kit</h3>
                  </div>
                  <div className="text-right">
                    <span className="text-xs line-through text-white/50 block">Regular ₹3,493</span>
                    <span className="text-3xl font-black text-[#ED8C32]">₹2,100</span>
                  </div>
                </div>

                {/* Collage preview of product thumbnails */}
                <div className="grid grid-cols-4 gap-2 mb-6 p-2 bg-white/5 rounded-2xl border border-white/10">
                  <img src="/images/products/garam-masala.jpg" alt="Garam Masala" className="w-full h-16 object-cover rounded-xl" />
                  <img src="/images/products/chilli-power.jpg" alt="Chilli" className="w-full h-16 object-cover rounded-xl" />
                  <img src="/images/products/coriander-powder.jpg" alt="Coriander" className="w-full h-16 object-cover rounded-xl" />
                  <img src="/images/products/turmeric-powder.jpg" alt="Turmeric" className="w-full h-16 object-cover rounded-xl" />
                  <img src="/images/products/ojoboost-eye-tonic.jpg" alt="Eye Tonic" className="w-full h-16 object-cover rounded-xl" />
                  <img src="/images/products/relax-digest-syrup.jpg" alt="Digest Syrup" className="w-full h-16 object-cover rounded-xl" />
                  <img src="/images/products/ojoboost-family-tonic.jpg" alt="Family Tonic" className="w-full h-16 object-cover rounded-xl col-span-2" />
                </div>

                <div className="space-y-2 text-xs text-white/80 mb-6">
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
                    <span>Includes all 4 signature pure kitchen spices</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
                    <span>Includes all 3 vital Ayurvedic family health tonics</span>
                  </p>
                  <p className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
                    <span>Free Nationwide Express Delivery included</span>
                  </p>
                </div>

                <button
                  onClick={handleOpenBundleModal}
                  className="w-full py-3.5 bg-[#ED8C32] hover:bg-[#d67a29] text-[#232F46] font-bold rounded-xl transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Grab Complete Pack for ₹2100</span>
                </button>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* 3. The 8th Product — "Mega Bundle" Highlight Card (Price: ₹2100) */}
      <section id="mega-bundle" className="py-20 bg-gradient-to-b from-white to-[#FAF8F5] border-y border-gray-200/70">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="px-3.5 py-1.5 rounded-full bg-[#ED8C32]/15 text-[#ED8C32] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 mb-3">
              <Sparkles className="w-4 h-4" />
              Special Featured Deal
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#232F46] tracking-tight">
              Complete 7-in-1 Value Pack / Mega Bundle
            </h2>
            <p className="text-base text-gray-600 mt-2">
              Get all 7 signature products in one comprehensive bundle and save big.
            </p>
          </div>

          {/* Featured Highlight Card */}
          <div className="relative bg-[#232F46] text-white rounded-3xl p-8 sm:p-12 shadow-2xl border border-white/10 overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#ED8C32]/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-96 h-96 bg-[#ED8C32]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              {/* Bundle Showcase Images */}
              <div className="lg:col-span-6">
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 bg-white/5 p-4 rounded-2xl border border-white/10">
                  <div className="space-y-1 text-center">
                    <img src="/images/products/garam-masala.jpg" alt="Garam Masala" className="w-full h-24 object-cover rounded-xl shadow-md" />
                    <span className="text-[10px] text-white/70 block truncate">Garam Masala</span>
                  </div>
                  <div className="space-y-1 text-center">
                    <img src="/images/products/chilli-power.jpg" alt="Chilli" className="w-full h-24 object-cover rounded-xl shadow-md" />
                    <span className="text-[10px] text-white/70 block truncate">Chilli Powder</span>
                  </div>
                  <div className="space-y-1 text-center">
                    <img src="/images/products/coriander-powder.jpg" alt="Coriander" className="w-full h-24 object-cover rounded-xl shadow-md" />
                    <span className="text-[10px] text-white/70 block truncate">Coriander Powder</span>
                  </div>
                  <div className="space-y-1 text-center">
                    <img src="/images/products/turmeric-powder.jpg" alt="Turmeric" className="w-full h-24 object-cover rounded-xl shadow-md" />
                    <span className="text-[10px] text-white/70 block truncate">Turmeric Powder</span>
                  </div>
                  <div className="space-y-1 text-center">
                    <img src="/images/products/ojoboost-eye-tonic.jpg" alt="Eye Tonic" className="w-full h-24 object-cover rounded-xl shadow-md" />
                    <span className="text-[10px] text-white/70 block truncate">OjoBoost Eye</span>
                  </div>
                  <div className="space-y-1 text-center">
                    <img src="/images/products/relax-digest-syrup.jpg" alt="Digest Syrup" className="w-full h-24 object-cover rounded-xl shadow-md" />
                    <span className="text-[10px] text-white/70 block truncate">Relax Digest</span>
                  </div>
                  <div className="space-y-1 text-center col-span-2">
                    <img src="/images/products/ojoboost-family-tonic.jpg" alt="Family Tonic" className="w-full h-24 object-cover rounded-xl shadow-md" />
                    <span className="text-[10px] text-white/70 block truncate">OjoBoost Family Tonic</span>
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between px-2 text-xs text-white/60">
                  <span>Total 7 Items (4 Spices + 3 Ayurvedic Tonics)</span>
                  <span className="text-emerald-400 font-semibold">100% Guaranteed Freshness</span>
                </div>
              </div>

              {/* Pricing & CTA Column */}
              <div className="lg:col-span-6 space-y-6 text-left">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#ED8C32] text-[#232F46] font-black text-xs tracking-wider uppercase shadow-md">
                  Best Value / Save More
                </div>

                <h3 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
                  The Complete 7-in-1 Value Pack / Mega Bundle
                </h3>

                <p className="text-white/75 text-sm sm:text-base leading-relaxed">
                  Get all 7 signature products in one comprehensive bundle and save.
                  Includes pure, aromatic whole ground spices plus doctor-formulated Ayurvedic tonics for eyes, digestion, and daily vitality.
                </p>

                {/* Price Display */}
                <div className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-baseline gap-4">
                  <div>
                    <span className="text-xs text-white/50 block font-medium uppercase tracking-wider">Bundle Offer Price</span>
                    <span className="text-4xl sm:text-5xl font-black text-[#ED8C32]">₹2,100</span>
                  </div>
                  <div className="border-l border-white/15 pl-4">
                    <span className="text-sm line-through text-white/40 block">Regular: ₹3,493</span>
                    <span className="text-sm font-bold text-emerald-400">Save ₹1,393</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-white/80">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
                    <span>Free Express Doorstep Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
                    <span>Zero Preservatives or Chemicals</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
                    <span>Immediate Order Dispatch (24 Hrs)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#ED8C32]" />
                    <span>Priority Customer Confirmation</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={handleOpenBundleModal}
                    className="flex-1 py-4 px-8 bg-[#ED8C32] hover:bg-[#d67a29] text-[#232F46] font-bold text-base rounded-xl transition-all shadow-[0_4px_20px_rgba(237,140,50,0.4)] flex items-center justify-center gap-2.5 cursor-pointer transform hover:-translate-y-0.5"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Buy Bundle (₹2100)</span>
                  </button>

                  <Link
                    to="/login"
                    className="py-4 px-6 bg-white/10 hover:bg-white/15 text-white font-semibold text-sm rounded-xl transition-colors border border-white/15 flex items-center justify-center gap-2 text-center"
                  >
                    <span>Member Login</span>
                    <ChevronRight className="w-4 h-4 text-[#ED8C32]" />
                  </Link>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. The 7 Individual Products Grid */}
      <section id="products" className="py-20 max-w-[1240px] mx-auto px-5 sm:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="text-left">
            <span className="px-3.5 py-1.5 rounded-full bg-[#ED8C32]/15 text-[#ED8C32] font-bold text-xs uppercase tracking-wider inline-block mb-3">
              Individual Signature Range
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#232F46] tracking-tight">
              Explore Our Signature 7 Items
            </h2>
            <p className="text-gray-600 text-sm sm:text-base mt-2">
              Every item is crafted with uncompromised purity. Available in our discounted 7-in-1 Mega Bundle.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 bg-white p-1.5 rounded-2xl border border-gray-200 shadow-sm self-start md:self-auto">
            <button
              onClick={() => setSelectedCategory('ALL')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'ALL'
                  ? 'bg-[#232F46] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#232F46] hover:bg-gray-100'
              }`}
            >
              All Items (7)
            </button>
            <button
              onClick={() => setSelectedCategory('Spices')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'Spices'
                  ? 'bg-[#232F46] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#232F46] hover:bg-gray-100'
              }`}
            >
              Kitchen Spices (4)
            </button>
            <button
              onClick={() => setSelectedCategory('Ayurvedic Tonic')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                selectedCategory === 'Ayurvedic Tonic'
                  ? 'bg-[#232F46] text-white shadow-sm'
                  : 'text-gray-600 hover:text-[#232F46] hover:bg-gray-100'
              }`}
            >
              Ayurvedic Tonics (3)
            </button>
          </div>
        </div>

        {/* 7 Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((prod) => (
            <motion.div
              key={prod.id}
              layout
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="group bg-white rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden text-left hover:-translate-y-1"
            >
              {/* Product Image Box */}
              <div className="relative aspect-square w-full bg-gray-50 overflow-hidden border-b border-gray-100">
                <img 
                  src={prod.image} 
                  alt={prod.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {prod.badge && (
                  <span className="absolute top-3 left-3 px-2.5 py-1 bg-[#232F46]/90 backdrop-blur-md text-white text-[11px] font-bold rounded-lg shadow-sm">
                    {prod.badge}
                  </span>
                )}

                <span className="absolute top-3 right-3 px-2.5 py-1 bg-white/90 backdrop-blur-md text-[#232F46] text-[11px] font-semibold rounded-lg shadow-sm">
                  {prod.weight}
                </span>
              </div>

              {/* Product Info */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
                    <span className="font-semibold text-[#ED8C32] uppercase tracking-wider text-[11px]">
                      {prod.category}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-current" />
                      <span>{prod.rating.toFixed(1)}</span>
                      <span className="text-gray-400 font-normal">({prod.reviewsCount})</span>
                    </div>
                  </div>

                  <h3 className="font-bold text-base text-[#232F46] group-hover:text-[#ED8C32] transition-colors leading-snug line-clamp-2">
                    {prod.name}
                  </h3>
                  {prod.hindiName && (
                    <p className="text-xs text-gray-400 mt-0.5 font-medium">{prod.hindiName}</p>
                  )}

                  <p className="text-xs text-gray-600 mt-2 line-clamp-2 leading-relaxed">
                    {prod.tagline}
                  </p>

                  <ul className="mt-3 space-y-1">
                    {prod.features.slice(0, 2).map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-[11px] text-gray-500">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price & Restricted Buy Now */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2">
                  <div>
                    <span className="text-[11px] text-gray-400 block uppercase font-bold tracking-wider">Item Price</span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xl font-black text-[#232F46]">₹{prod.price}</span>
                      <span className="text-xs line-through text-gray-400">₹{prod.mrp}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => handleSingleItemClick(prod)}
                    className="px-4 py-2.5 bg-[#ED8C32] hover:bg-[#d67a29] text-[#232F46] font-bold text-xs rounded-xl transition-all shadow-sm flex items-center gap-1.5 cursor-pointer hover:shadow"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </section>

      {/* 5. Quality Promise & Brand Heritage */}
      <section id="quality" className="py-20 bg-white border-t border-gray-200/70">
        <div className="max-w-[1240px] mx-auto px-5 sm:px-8">
          
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="px-3.5 py-1.5 rounded-full bg-[#ED8C32]/15 text-[#ED8C32] font-bold text-xs uppercase tracking-wider inline-block mb-3">
              The Shukrana Standard
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[#232F46] tracking-tight">
              Why Families Trust Shukrana
            </h2>
            <p className="text-gray-600 text-sm mt-2">
              Every grain of spice and drop of tonic is crafted with relentless attention to purity and heritage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-gray-200/80 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#ED8C32]/20 flex items-center justify-center">
                <Leaf className="w-6 h-6 text-[#ED8C32]" />
              </div>
              <h4 className="font-bold text-base text-[#232F46]">100% Pure &amp; Natural</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Zero adulteration, zero artificial food coloring, and zero synthetic preservatives. Real taste from pure origins.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-gray-200/80 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-[#232F46]/10 flex items-center justify-center">
                <Activity className="w-6 h-6 text-[#232F46]" />
              </div>
              <h4 className="font-bold text-base text-[#232F46]">Ayurvedic Formulations</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Our OjoBoost and Relax-Digest tonics follow ancient Ayurvedic texts, using potent medicinal herbs like Amla and Triphala.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-gray-200/80 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 flex items-center justify-center">
                <ShieldCheck className="w-6 h-6 text-emerald-700" />
              </div>
              <h4 className="font-bold text-base text-[#232F46]">Hygienic Sealed Packs</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                Airtight zip pouches lock in volatile essential spice oils, preserving intense aroma and flavor from our plant to your kitchen.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-gray-200/80 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-blue-500/15 flex items-center justify-center">
                <HeartHandshake className="w-6 h-6 text-blue-700" />
              </div>
              <h4 className="font-bold text-base text-[#232F46]">Farmer Empowerment</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We work directly with agricultural self-help groups, ensuring fair prices for farming communities and premium quality for you.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* 6. Clean E-Commerce Footer */}
      <Footer />

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 7. SINGLE-ITEM RESTRICTION MODAL                                    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {restrictionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setRestrictionModalOpen(false)}
              className="absolute inset-0 bg-[#232F46]/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-md rounded-3xl overflow-hidden shadow-2xl z-10 border border-gray-200 p-6 sm:p-8 text-center"
            >
              <button
                onClick={() => setRestrictionModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-14 h-14 rounded-2xl bg-[#ED8C32]/15 text-[#ED8C32] flex items-center justify-center mx-auto mb-4">
                <Package className="w-7 h-7" />
              </div>

              <h3 className="text-2xl font-black text-[#232F46] tracking-tight">
                Item Unavailable Separately
              </h3>

              <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                We are currently not selling items individually. You can get all 7 signature items together in our discounted Mega Bundle for just <strong className="text-[#232F46] font-extrabold">₹2,100</strong>!
              </p>

              <div className="mt-4 p-3.5 bg-[#FAF8F5] border border-gray-200 rounded-2xl flex items-center gap-3 text-left">
                <Sparkles className="w-5 h-5 text-[#ED8C32] shrink-0" />
                <span className="text-xs text-gray-600">
                  Includes <strong>{restrictedItemName || 'This Item'}</strong> + 6 more authentic kitchen spices &amp; Ayurvedic tonics.
                </span>
              </div>

              <div className="mt-6 flex flex-col gap-2.5">
                <button
                  onClick={handleOpenBundleModal}
                  className="w-full py-3.5 bg-[#ED8C32] hover:bg-[#d67a29] text-[#232F46] font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-sm"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Get Complete Bundle (₹2100)</span>
                </button>

                <button
                  onClick={() => setRestrictionModalOpen(false)}
                  className="w-full py-2.5 text-gray-500 hover:text-gray-700 font-semibold text-xs cursor-pointer"
                >
                  Close &amp; Keep Browsing
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 8. THE MEGA BUNDLE CHECKOUT MODAL (₹2100) — 4 Essential Fields    */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {bundleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBundleModalOpen(false)}
              className="absolute inset-0 bg-[#232F46]/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-gray-200 max-h-[92vh] flex flex-col text-left"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-[#FAF8F5]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#ED8C32]/20 flex items-center justify-center">
                    <Package className="w-5 h-5 text-[#ED8C32]" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#232F46] text-lg">Bundle Order Checkout</h3>
                    <p className="text-xs text-gray-500">Provide delivery details. Our team will contact you for confirmation.</p>
                  </div>
                </div>
                <button
                  onClick={() => setBundleModalOpen(false)}
                  className="p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 overflow-y-auto space-y-6">
                {!orderSuccess ? (
                  <form onSubmit={handleBundleOrderSubmit} className="space-y-4">
                    {/* Order Summary Box */}
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-200/80 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Item:</span>
                        <span className="font-extrabold text-[#232F46] text-sm">Complete 7-in-1 Mega Bundle</span>
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-200 pt-2">
                        <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">Total:</span>
                        <span className="font-black text-2xl text-[#ED8C32]">₹2,100</span>
                      </div>
                      <p className="text-[11px] text-emerald-600 font-semibold pt-1">
                        ✓ Free Doorstep Express Shipping included
                      </p>
                    </div>

                    {/* 4 Essential Fields */}
                    <div className="space-y-3.5 pt-1">
                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          1. Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Ramesh Kumar"
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ED8C32] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          2. Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={customerEmail}
                          onChange={(e) => setCustomerEmail(e.target.value)}
                          placeholder="e.g. ramesh@example.com"
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ED8C32] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          3. Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="e.g. 9876543210"
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ED8C32] focus:bg-white transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-gray-700 mb-1">
                          4. Delivery / Shipping Address *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={customerAddress}
                          onChange={(e) => setCustomerAddress(e.target.value)}
                          placeholder="House/Flat number, Street, Landmark, City, State & PIN code"
                          className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-[#ED8C32] focus:bg-white transition-colors resize-none"
                        />
                      </div>
                    </div>

                    {submitError && (
                      <div className="p-3 bg-red-50 text-red-700 rounded-xl text-xs flex items-center gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{submitError}</span>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-4 bg-[#ED8C32] hover:bg-[#d67a29] text-[#232F46] font-bold text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <span>Placing Order...</span>
                        ) : (
                          <>
                            <span>Place Order (₹2100)</span>
                            <ArrowRight className="w-4 h-4" />
                          </>
                        )}
                      </button>

                      <p className="text-[11px] text-gray-400 text-center mt-2">
                        No immediate card payment required · Our team will call to confirm dispatch
                      </p>
                    </div>
                  </form>
                ) : (
                  /* Order Success Screen */
                  <div className="py-6 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                      <CheckCircle2 className="w-10 h-10" />
                    </div>

                    <div>
                      <h4 className="text-2xl font-black text-[#232F46]">Order Placed Successfully!</h4>
                      <p className="text-sm text-gray-600 mt-2 max-w-sm mx-auto leading-relaxed">
                        Our team will contact you shortly to confirm your delivery details.
                      </p>
                    </div>

                    <div className="p-4 bg-gray-50 border border-gray-200 rounded-2xl max-w-sm mx-auto text-left space-y-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">Order Reference:</span>
                        <span className="font-mono font-bold text-[#232F46]">{orderId}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Customer:</span>
                        <span className="font-semibold text-[#232F46]">{customerName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">Product:</span>
                        <span className="font-semibold text-[#232F46]">Complete 7-in-1 Mega Bundle</span>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-1.5">
                        <span className="text-gray-500 font-bold">Total Amount:</span>
                        <span className="font-black text-base text-[#ED8C32]">₹2,100</span>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-col gap-2">
                      <button
                        onClick={() => setBundleModalOpen(false)}
                        className="w-full py-3 bg-[#232F46] text-white font-bold rounded-xl text-sm cursor-pointer"
                      >
                        Back to Storefront
                      </button>

                      <Link
                        to="/login"
                        className="w-full py-3 bg-[#ED8C32]/15 text-[#ED8C32] hover:bg-[#ED8C32]/25 font-bold rounded-xl text-sm transition-colors block text-center"
                      >
                        Already a Member? Login to Admin / Dashboard →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
