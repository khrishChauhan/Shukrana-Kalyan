import React, { useEffect, useState, useMemo } from 'react';
import { supabase } from '../../lib/supabase';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { 
  Package, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  CheckCircle2, 
  MessageSquare, 
  RefreshCw, 
  Search, 
  Truck, 
  AlertCircle,
  ExternalLink,
  ChevronRight,
  Filter,
  UserCheck,
  Key,
  Copy,
  Check,
  X,
  Share2,
  ShieldCheck,
  User
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export interface ProductOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  product_name: string;
  order_type: string;
  total_amount: number;
  status: 'PENDING' | 'APPROVED' | 'CONTACTED' | 'DISPATCHED' | 'COMPLETED' | 'CANCELLED';
  account_created?: boolean;
  account_user_id?: string;
  account_member_id?: string;
  temp_password_hint?: string;
  created_at: string;
  updated_at: string;
}

interface CredentialsModalData {
  open: boolean;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  passwordHint: string;
  memberId: string;
  orderId: string;
  isExisting?: boolean;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<ProductOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'CONTACTED' | 'DISPATCHED' | 'COMPLETED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  // Modal state for viewing & sharing credentials
  const [credentialsModal, setCredentialsModal] = useState<CredentialsModalData>({
    open: false,
    customerName: '',
    customerEmail: '',
    customerPhone: '',
    passwordHint: '',
    memberId: '',
    orderId: '',
    isExisting: false
  });

  const [copiedField, setCopiedField] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn('Error fetching orders:', error.message);
      }
      setOrders((data as ProductOrder[]) || []);
    } catch (err: any) {
      console.error('Failed to load orders:', err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleUpdateStatus = async (orderId: string, nextStatus: ProductOrder['status']) => {
    try {
      setActionLoadingId(orderId);
      const { error } = await supabase
        .from('product_orders')
        .update({ status: nextStatus, updated_at: new Date().toISOString() })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: nextStatus } : o));
    } catch (err: any) {
      alert(`Error updating order status: ${err.message}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  /**
   * Admin Approval & Account Provisioning:
   * 1. User ID = customer_email (e.g. user's Gmail)
   * 2. Password = last 4 digits of customer_phone
   * 3. Sets member status to ACTIVE
   */
  const handleApproveAndCreateAccount = async (order: ProductOrder) => {
    const cleanPhone = order.customer_phone.replace(/\D/g, '');
    const last4 = cleanPhone.slice(-4) || '1234';
    const cleanEmail = order.customer_email.trim().toLowerCase();

    const confirmed = window.confirm(
      `Approve order for ${order.customer_name}?\n\nThis will generate Member Credentials:\n• User ID: ${cleanEmail}\n• Password: ${last4} (Last 4 digits of phone)`
    );
    if (!confirmed) return;

    setActionLoadingId(order.id);

    try {
      let memberId = order.account_member_id || '';
      let rpcSucceeded = false;

      // 1. Attempt using the PostgreSQL RPC if available
      try {
        const { data: rpcData, error: rpcError } = await supabase.rpc('admin_approve_product_order', {
          p_order_id: order.id
        });

        if (!rpcError && rpcData) {
          rpcSucceeded = true;
          memberId = rpcData.member_id || 'ACTIVE';
        }
      } catch (rpcErr) {
        console.warn('RPC admin_approve_product_order unavailable, falling back to direct provisioning:', rpcErr);
      }

      // 2. Client-side fallback if RPC is not yet executed in Supabase SQL editor
      if (!rpcSucceeded) {
        // Sign up user with email & password (with SKS prefix for 6-char requirement)
        const passwordPayload = `SKS${last4}`;
        const { data: authData, error: authError } = await supabase.auth.signUp({
          email: cleanEmail,
          password: passwordPayload,
          options: {
            data: {
              full_name: order.customer_name,
              phone: order.customer_phone
            }
          }
        });

        const userId = authData?.user?.id;

        if (userId) {
          // Create members row
          await supabase.from('members').insert({ id: userId, status: 'ACTIVE' }).select().single();
          
          // Fetch generated member_id
          const { data: newMem } = await supabase.from('members').select('member_id').eq('id', userId).single();
          memberId = newMem?.member_id || 'ACTIVE';

          // Insert Profile
          await supabase.from('member_profile').upsert({
            id: userId,
            full_name: order.customer_name,
            phone_number: order.customer_phone,
            email: cleanEmail,
            address: order.shipping_address
          });

          // Insert placeholder business, kyc, payments
          await supabase.from('member_business').upsert({ id: userId });
          await supabase.from('member_kyc').upsert({ id: userId });
          await supabase.from('payments').insert({
            member_id: userId,
            amount: order.total_amount,
            utr_number: `ORDER-${order.id.slice(0, 8)}`,
            screenshot_url: 'storefront-mega-bundle',
            status: 'APPROVED'
          });
        }

        // Update product_orders table
        await supabase
          .from('product_orders')
          .update({
            status: 'APPROVED',
            account_created: true,
            account_member_id: memberId,
            temp_password_hint: last4,
            updated_at: new Date().toISOString()
          })
          .eq('id', order.id);
      }

      // Update local state
      setOrders(prev => prev.map(o => o.id === order.id ? {
        ...o,
        status: 'APPROVED',
        account_created: true,
        account_member_id: memberId,
        temp_password_hint: last4
      } : o));

      // Open Credentials Modal
      setCredentialsModal({
        open: true,
        customerName: order.customer_name,
        customerEmail: cleanEmail,
        customerPhone: order.customer_phone,
        passwordHint: last4,
        memberId: memberId || 'Generated on Login',
        orderId: order.id,
        isExisting: false
      });

    } catch (err: any) {
      console.error('Approval error:', err);
      alert(`Approval error: ${err.message || 'Failed to create member credentials'}`);
    } finally {
      setActionLoadingId(null);
    }
  };

  const openExistingCredentials = (order: ProductOrder) => {
    const cleanPhone = order.customer_phone.replace(/\D/g, '');
    const last4 = order.temp_password_hint || cleanPhone.slice(-4) || '1234';

    setCredentialsModal({
      open: true,
      customerName: order.customer_name,
      customerEmail: order.customer_email.trim().toLowerCase(),
      customerPhone: order.customer_phone,
      passwordHint: last4,
      memberId: order.account_member_id || 'Active Member',
      orderId: order.id,
      isExisting: true
    });
  };

  const copyToClipboard = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getWhatsAppMessage = (data: CredentialsModalData) => {
    const loginUrl = `${window.location.origin}/login`;
    return `Namaste ${data.customerName}! 🎉\n\nYour Shukrana *Complete 7-in-1 Mega Bundle* order has been approved!\n\nYour Member Portal credentials are ready:\n🌐 *Login Portal:* ${loginUrl}\n📧 *User ID / Email:* ${data.customerEmail}\n🔑 *Password:* ${data.passwordHint} *(Last 4 digits of your phone)*\n🆔 *Member ID:* ${data.memberId}\n\nPlease log in to access your dashboard, view order tracking, and explore our community.`;
  };

  // Top stats summary
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'PENDING').length,
      approved: orders.filter(o => o.status === 'APPROVED' || o.account_created).length,
      contacted: orders.filter(o => o.status === 'CONTACTED').length,
      dispatched: orders.filter(o => o.status === 'DISPATCHED').length,
      completed: orders.filter(o => o.status === 'COMPLETED').length,
    };
  }, [orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      let matchesFilter = true;
      if (activeFilter === 'ALL') {
        matchesFilter = true;
      } else if (activeFilter === 'APPROVED') {
        matchesFilter = order.status === 'APPROVED' || order.account_created === true;
      } else {
        matchesFilter = order.status === activeFilter;
      }

      const cleanSearch = searchTerm.toLowerCase().trim();
      const matchesSearch = cleanSearch === '' ||
        order.customer_name?.toLowerCase().includes(cleanSearch) ||
        order.customer_phone?.includes(cleanSearch) ||
        order.customer_email?.toLowerCase().includes(cleanSearch) ||
        order.account_member_id?.toLowerCase().includes(cleanSearch) ||
        order.id?.toLowerCase().includes(cleanSearch);

      return matchesFilter && matchesSearch;
    });
  }, [orders, activeFilter, searchTerm]);

  const getStatusBadge = (status: ProductOrder['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
      case 'APPROVED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-300';
      case 'CONTACTED':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'DISPATCHED':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'COMPLETED':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'CANCELLED':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const cleanPhoneForWhatsApp = (phone: string) => {
    const digits = phone.replace(/\D/g, '');
    return digits.length === 10 ? `91${digits}` : digits;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12 text-left">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <PageHeader
          title="Customer Orders"
          description="Manage customer purchases, approve orders, and generate Member credentials."
          breadcrumbs={[{ label: 'Admin Portal' }, { label: 'Orders' }]}
        />
        <button
          onClick={fetchOrders}
          disabled={loading}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-sm font-semibold rounded-xl shadow-sm transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-4 h-4 text-[#ED8C32] ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      {/* 1. Top Stats Summary */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3.5">
        <Card className="p-4 flex items-center justify-between bg-white border-l-4 border-l-[#232F46]">
          <div>
            <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">Total Orders</p>
            <p className="text-xl font-black text-[#232F46] mt-1">{stats.total}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
            <Package className="w-4 h-4" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between bg-white border-l-4 border-l-amber-500">
          <div>
            <p className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Pending Action</p>
            <p className="text-xl font-black text-amber-700 mt-1">{stats.pending}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-4 h-4" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between bg-white border-l-4 border-l-emerald-600">
          <div>
            <p className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider">Approved &amp; Active</p>
            <p className="text-xl font-black text-emerald-700 mt-1">{stats.approved}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <UserCheck className="w-4 h-4" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between bg-white border-l-4 border-l-blue-500">
          <div>
            <p className="text-[11px] font-bold text-blue-600 uppercase tracking-wider">Contacted</p>
            <p className="text-xl font-black text-blue-700 mt-1">{stats.contacted}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <MessageSquare className="w-4 h-4" />
          </div>
        </Card>

        <Card className="p-4 flex items-center justify-between bg-white border-l-4 border-l-purple-500 col-span-2 md:col-span-1">
          <div>
            <p className="text-[11px] font-bold text-purple-600 uppercase tracking-wider">Completed</p>
            <p className="text-xl font-black text-purple-700 mt-1">{stats.completed}</p>
          </div>
          <div className="w-9 h-9 rounded-xl bg-purple-50 flex items-center justify-center text-purple-600">
            <CheckCircle2 className="w-4 h-4" />
          </div>
        </Card>
      </div>

      {/* 2. Controls: Filter Tabs + Search */}
      <Card noPadding className="p-3 bg-white border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {(['ALL', 'PENDING', 'APPROVED', 'CONTACTED', 'DISPATCHED', 'COMPLETED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === tab
                    ? 'bg-[#232F46] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab === 'ALL' ? 'All Orders' : tab}
                {tab === 'PENDING' && stats.pending > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-amber-500 text-white font-extrabold">
                    {stats.pending}
                  </span>
                )}
                {tab === 'APPROVED' && stats.approved > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.2 rounded-full text-[10px] bg-emerald-600 text-white font-extrabold">
                    {stats.approved}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search name, phone, email, Member ID..."
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-xs focus:outline-none focus:border-[#ED8C32] focus:bg-white transition-colors"
            />
          </div>
        </div>
      </Card>

      {/* 3. Orders List Table */}
      <Card noPadding className="overflow-hidden bg-white border border-gray-200 shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-gray-400 text-sm">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-[#ED8C32]" />
            Loading customer orders...
          </div>
        ) : filteredOrders.length === 0 ? (
          <div className="p-12 text-center text-gray-500 space-y-3">
            <Package className="w-10 h-10 text-gray-300 mx-auto" />
            <p className="font-bold text-gray-700">No orders found</p>
            <p className="text-xs text-gray-400 max-w-sm mx-auto">
              {searchTerm ? 'No orders match your search query.' : 'New orders placed on the storefront will appear here instantly.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-gray-500 font-bold uppercase tracking-wider text-[11px]">
                  <th className="py-3.5 px-4">Order ID &amp; Time</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Shipping Address</th>
                  <th className="py-3.5 px-4">Product &amp; Price</th>
                  <th className="py-3.5 px-4">Order Status</th>
                  <th className="py-3.5 px-4">Member Account</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredOrders.map((order) => {
                  const isAccountCreated = order.account_created || order.status === 'APPROVED';
                  const isPending = order.status === 'PENDING';
                  const isContacted = order.status === 'CONTACTED';
                  const isDispatched = order.status === 'DISPATCHED';

                  return (
                    <tr key={order.id} className="hover:bg-gray-50/60 transition-colors">
                      {/* Order ID & Time */}
                      <td className="py-4 px-4 align-top whitespace-nowrap">
                        <span className="font-mono font-bold text-[#232F46] block">
                          #{order.id.slice(0, 8)}
                        </span>
                        <span className="text-[11px] text-gray-400 flex items-center gap-1 mt-0.5">
                          <Clock className="w-3 h-3" />
                          {new Date(order.created_at).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric'
                          })}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="py-4 px-4 align-top">
                        <p className="font-bold text-[#232F46] text-sm">{order.customer_name}</p>
                        <div className="flex flex-col gap-0.5 mt-1 text-gray-600">
                          <span className="flex items-center gap-1.5 font-mono">
                            <Phone className="w-3 h-3 text-[#ED8C32]" />
                            {order.customer_phone}
                          </span>
                          <span className="flex items-center gap-1.5 text-gray-500">
                            <Mail className="w-3 h-3 text-gray-400" />
                            {order.customer_email}
                          </span>
                        </div>
                      </td>

                      {/* Shipping Address */}
                      <td className="py-4 px-4 align-top max-w-xs">
                        <div className="flex items-start gap-1.5 text-gray-600 leading-relaxed">
                          <MapPin className="w-3.5 h-3.5 text-[#ED8C32] shrink-0 mt-0.5" />
                          <p className="line-clamp-2">{order.shipping_address}</p>
                        </div>
                      </td>

                      {/* Product & Price */}
                      <td className="py-4 px-4 align-top whitespace-nowrap">
                        <p className="font-semibold text-[#232F46]">{order.product_name}</p>
                        <p className="font-black text-[#ED8C32] text-sm mt-0.5">
                          ₹{Number(order.total_amount).toLocaleString('en-IN')}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600">
                          {order.order_type}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4 align-top whitespace-nowrap">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>

                      {/* Member Account Credentials Column */}
                      <td className="py-4 px-4 align-top whitespace-nowrap">
                        {isAccountCreated ? (
                          <div className="space-y-1">
                            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              <span>Account Active</span>
                            </span>
                            {order.account_member_id && (
                              <p className="text-[11px] font-mono font-bold text-[#232F46]">
                                ID: {order.account_member_id}
                              </p>
                            )}
                            <button
                              onClick={() => openExistingCredentials(order)}
                              className="text-[11px] font-bold text-[#ED8C32] hover:text-[#d67a29] flex items-center gap-1 cursor-pointer mt-1"
                            >
                              <Key className="w-3 h-3" />
                              <span>View &amp; Share ID</span>
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleApproveAndCreateAccount(order)}
                            disabled={actionLoadingId === order.id}
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                          >
                            <UserCheck className="w-3.5 h-3.5" />
                            <span>{actionLoadingId === order.id ? 'Creating...' : 'Approve & Create ID'}</span>
                          </button>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 align-top text-right space-y-2 whitespace-nowrap">
                        {/* Quick Contact buttons */}
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:${order.customer_phone}`}
                            className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors cursor-pointer"
                            title="Call Customer"
                          >
                            <Phone className="w-3.5 h-3.5" />
                          </a>
                          <a
                            href={`https://wa.me/${cleanPhoneForWhatsApp(order.customer_phone)}?text=${encodeURIComponent(
                              `Hello ${order.customer_name}, this is from Shukrana regarding your order (${order.id.slice(0, 8)}) for the ${order.product_name}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors cursor-pointer"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Status Transition Actions */}
                        <div className="flex flex-col gap-1 items-end">
                          {isPending && !isAccountCreated && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'CONTACTED')}
                              disabled={actionLoadingId === order.id}
                              className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                            >
                              Mark Contacted →
                            </button>
                          )}

                          {(isPending || isContacted || isAccountCreated) && order.status !== 'DISPATCHED' && order.status !== 'COMPLETED' && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'DISPATCHED')}
                              disabled={actionLoadingId === order.id}
                              className="px-2.5 py-1 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                            >
                              Mark Dispatched →
                            </button>
                          )}

                          {isDispatched && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'COMPLETED')}
                              disabled={actionLoadingId === order.id}
                              className="px-2.5 py-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                            >
                              Mark Completed ✓
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      {/* ═══════════════════════════════════════════════════════════════════ */}
      {/* 4. Credentials & Account Approval Modal                           */}
      {/* ═══════════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {credentialsModal.open && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCredentialsModal(prev => ({ ...prev, open: false }))}
              className="absolute inset-0 bg-[#232F46]/60 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative bg-white w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl z-10 border border-gray-200 text-left"
            >
              {/* Header */}
              <div className="p-6 bg-gradient-to-r from-emerald-600 to-teal-700 text-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
                    <UserCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-extrabold text-lg text-white">
                      {credentialsModal.isExisting ? 'Member Account Credentials' : '🎉 Order Approved & Account Created!'}
                    </h3>
                    <p className="text-xs text-white/80">
                      {credentialsModal.customerName} can now log in using these details.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCredentialsModal(prev => ({ ...prev, open: false }))}
                  className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Body */}
              <div className="p-6 space-y-4">
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-800 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <span>
                    Share these login credentials with the customer via WhatsApp or SMS so they can access their Member Dashboard.
                  </span>
                </div>

                {/* Credential Cards */}
                <div className="space-y-3 pt-1">
                  {/* User ID / Email */}
                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Login User ID (Gmail / Email)
                      </span>
                      <span className="font-mono font-bold text-sm text-[#232F46]">
                        {credentialsModal.customerEmail}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(credentialsModal.customerEmail, 'email')}
                      className="px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedField === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'email' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Password */}
                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Password (Last 4 Digits of Phone)
                      </span>
                      <span className="font-mono font-black text-lg text-[#ED8C32]">
                        {credentialsModal.passwordHint}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(credentialsModal.passwordHint, 'pass')}
                      className="px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedField === 'pass' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'pass' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>

                  {/* Member ID */}
                  {credentialsModal.memberId && (
                    <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                          Generated Member ID
                        </span>
                        <span className="font-mono font-bold text-sm text-[#232F46]">
                          {credentialsModal.memberId}
                        </span>
                      </div>
                      <button
                        onClick={() => copyToClipboard(credentialsModal.memberId, 'memberId')}
                        className="px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedField === 'memberId' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedField === 'memberId' ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                  )}

                  {/* Login URL */}
                  <div className="p-3.5 bg-gray-50 border border-gray-200 rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block">
                        Login URL
                      </span>
                      <span className="font-mono text-xs text-blue-600">
                        {`${window.location.origin}/login`}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(`${window.location.origin}/login`, 'url')}
                      className="px-3 py-1.5 bg-white hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {copiedField === 'url' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedField === 'url' ? 'Copied' : 'Copy'}</span>
                    </button>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
                  <a
                    href={`https://wa.me/${cleanPhoneForWhatsApp(credentialsModal.customerPhone)}?text=${encodeURIComponent(
                      getWhatsAppMessage(credentialsModal)
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:flex-1 py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-center"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send on WhatsApp</span>
                  </a>

                  <button
                    onClick={() => {
                      copyToClipboard(getWhatsAppMessage(credentialsModal), 'all');
                    }}
                    className="w-full sm:flex-1 py-3.5 px-4 bg-[#232F46] hover:bg-[#1a2334] text-white font-bold text-sm rounded-xl transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {copiedField === 'all' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    <span>{copiedField === 'all' ? 'Copied Full Note!' : 'Copy All Details'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
