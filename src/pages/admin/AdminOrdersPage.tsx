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
  Filter
} from 'lucide-react';
import { motion } from 'motion/react';

export interface ProductOrder {
  id: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  shipping_address: string;
  product_name: string;
  order_type: string;
  total_amount: number;
  status: 'PENDING' | 'CONTACTED' | 'DISPATCHED' | 'COMPLETED' | 'CANCELLED';
  created_at: string;
  updated_at: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<ProductOrder[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'PENDING' | 'CONTACTED' | 'DISPATCHED' | 'COMPLETED'>('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('product_orders')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        // Table may not exist yet if SQL hasn't been executed
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

  // Top stats summary
  const stats = useMemo(() => {
    return {
      total: orders.length,
      pending: orders.filter(o => o.status === 'PENDING').length,
      contacted: orders.filter(o => o.status === 'CONTACTED').length,
      dispatched: orders.filter(o => o.status === 'DISPATCHED').length,
      completed: orders.filter(o => o.status === 'COMPLETED').length,
    };
  }, [orders]);

  // Filtered orders
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesFilter = activeFilter === 'ALL' || order.status === activeFilter;
      const cleanSearch = searchTerm.toLowerCase().trim();
      const matchesSearch = cleanSearch === '' ||
        order.customer_name?.toLowerCase().includes(cleanSearch) ||
        order.customer_phone?.includes(cleanSearch) ||
        order.customer_email?.toLowerCase().includes(cleanSearch) ||
        order.id?.toLowerCase().includes(cleanSearch);

      return matchesFilter && matchesSearch;
    });
  }, [orders, activeFilter, searchTerm]);

  const getStatusBadge = (status: ProductOrder['status']) => {
    switch (status) {
      case 'PENDING':
        return 'bg-amber-100 text-amber-800 border-amber-200';
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
          description="Manage customer purchases for the Complete 7-in-1 Mega Bundle."
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center justify-between bg-white border-l-4 border-l-[#232F46]">
          <div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Orders</p>
            <p className="text-2xl font-black text-[#232F46] mt-1">{stats.total}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-600">
            <Package className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between bg-white border-l-4 border-l-amber-500">
          <div>
            <p className="text-xs font-bold text-amber-600 uppercase tracking-wider">Pending Action</p>
            <p className="text-2xl font-black text-amber-700 mt-1">{stats.pending}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
            <Clock className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between bg-white border-l-4 border-l-blue-500">
          <div>
            <p className="text-xs font-bold text-blue-600 uppercase tracking-wider">Contacted</p>
            <p className="text-2xl font-black text-blue-700 mt-1">{stats.contacted}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
            <MessageSquare className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-5 flex items-center justify-between bg-white border-l-4 border-l-emerald-500">
          <div>
            <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Completed</p>
            <p className="text-2xl font-black text-emerald-700 mt-1">{stats.completed}</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* 2. Controls: Filter Tabs + Search */}
      <Card noPadding className="p-4 bg-white border border-gray-200">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            {(['ALL', 'PENDING', 'CONTACTED', 'DISPATCHED', 'COMPLETED'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveFilter(tab)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeFilter === tab
                    ? 'bg-[#232F46] text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {tab === 'ALL' ? 'All Orders' : tab}
                {tab === 'PENDING' && stats.pending > 0 && (
                  <span className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500 text-white font-extrabold">
                    {stats.pending}
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
              placeholder="Search by name, phone, email..."
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
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50/80 border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4">Order ID &amp; Time</th>
                  <th className="py-3.5 px-4">Customer Details</th>
                  <th className="py-3.5 px-4">Shipping Address</th>
                  <th className="py-3.5 px-4">Product &amp; Amount</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-xs">
                {filteredOrders.map((order) => {
                  const isPending = order.status === 'PENDING';
                  const isContacted = order.status === 'CONTACTED';
                  const isDispatched = order.status === 'DISPATCHED';
                  const isCompleted = order.status === 'COMPLETED';

                  return (
                    <tr key={order.id} className="hover:bg-gray-50/70 transition-colors">
                      {/* Order ID & Time */}
                      <td className="py-4 px-4 align-top">
                        <span className="font-mono font-bold text-[#232F46] block text-xs">
                          {order.id.slice(0, 8)}...
                        </span>
                        <span className="text-[11px] text-gray-400 block mt-1">
                          {new Date(order.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                        </span>
                      </td>

                      {/* Customer Info */}
                      <td className="py-4 px-4 align-top space-y-1">
                        <p className="font-bold text-[#232F46] text-sm">{order.customer_name}</p>
                        <div className="flex items-center gap-1.5 text-gray-600">
                          <Phone className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="font-mono">{order.customer_phone}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-gray-500">
                          <Mail className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                          <span className="truncate max-w-[180px]">{order.customer_email}</span>
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
                      <td className="py-4 px-4 align-top">
                        <p className="font-semibold text-[#232F46]">{order.product_name}</p>
                        <p className="font-black text-[#ED8C32] text-sm mt-0.5">
                          ₹{Number(order.total_amount).toLocaleString('en-IN')}
                        </p>
                        <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold bg-gray-100 text-gray-600">
                          {order.order_type}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="py-4 px-4 align-top">
                        <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold border ${getStatusBadge(order.status)}`}>
                          {order.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 align-top text-right space-y-2">
                        {/* Quick Contact buttons */}
                        <div className="flex items-center justify-end gap-1.5">
                          <a
                            href={`tel:${order.customer_phone}`}
                            className="p-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors"
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
                            className="p-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg transition-colors"
                            title="Chat on WhatsApp"
                          >
                            <MessageSquare className="w-3.5 h-3.5" />
                          </a>
                        </div>

                        {/* Status Transition Actions */}
                        <div className="flex flex-col gap-1 items-end">
                          {isPending && (
                            <button
                              onClick={() => handleUpdateStatus(order.id, 'CONTACTED')}
                              disabled={actionLoadingId === order.id}
                              className="px-2.5 py-1 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-bold text-[11px] transition-colors cursor-pointer"
                            >
                              Mark Contacted →
                            </button>
                          )}

                          {(isPending || isContacted) && (
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
    </div>
  );
}
