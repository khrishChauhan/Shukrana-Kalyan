import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { supabase } from '../../lib/supabase';
import { Banknote, Download, ArrowUpRight, Clock, AlertCircle, CheckCircle } from 'lucide-react';

export default function PayoutHistoryPage() {
  const [payouts, setPayouts] = useState<any[]>([]);
  const [summary, setSummary] = useState({ paid: 0, pending: 0, lastNet: 0, lastDate: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPayouts = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase
          .from('withdrawal_requests')
          .select('id, requested_amount, tds_deduction, admin_deduction, donation_deduction, net_payable, status, utr_number, created_at, processed_at')
          .eq('member_uuid', user.id)
          .order('created_at', { ascending: false });
        if (data) {
          setPayouts(data);
          const paid = data.filter(p => p.status === 'PAID');
          const pending = data.filter(p => p.status === 'PENDING');
          const last = paid[0];
          setSummary({
            paid: paid.reduce((sum, p) => sum + Number(p.net_payable), 0),
            pending: pending.reduce((sum, p) => sum + Number(p.net_payable), 0),
            lastNet: last ? Number(last.net_payable) : 0,
            lastDate: last?.processed_at ? new Date(last.processed_at).toLocaleDateString() : '—',
          });
        }
      } catch (err) {
        console.error('Error fetching payout history', err);
      } finally {
        setLoading(false);
      }
    };
    fetchPayouts();
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto pb-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader title="Payout History" description="View all disbursed payments and their processing status." breadcrumbs={[{ label: 'Business' }, { label: 'Payout History' }]} />
        <button className="inline-flex items-center justify-center font-bold rounded-lg transition-colors border border-gray-200 hover:bg-gray-50 text-[#232F46] px-4 py-2 text-sm gap-2">
          <Download className="w-4 h-4" /> Export Report
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-green-50 border border-green-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-green-600 uppercase tracking-wider mb-1 flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Total Paid</p>
          {loading ? <p className="text-2xl font-black text-gray-300 animate-pulse">₹---</p> : <p className="text-2xl font-black text-[#232F46]">₹{summary.paid.toLocaleString()}</p>}
        </Card>
        <Card className="p-4 bg-orange-50 border border-orange-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-[#ED8C32] uppercase tracking-wider mb-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Pending</p>
          {loading ? <p className="text-2xl font-black text-gray-300 animate-pulse">₹---</p> : <p className="text-2xl font-black text-[#232F46]">₹{summary.pending.toLocaleString()}</p>}
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock className="w-3 h-3" /> Total Requests</p>
          <p className="text-2xl font-black text-[#232F46]">{payouts.length}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1"><ArrowUpRight className="w-3 h-3" /> Last Payout</p>
          {loading ? <p className="text-2xl font-black text-gray-300 animate-pulse">₹---</p>
            : <><p className="text-2xl font-black text-[#232F46]">₹{summary.lastNet.toLocaleString()}</p><p className="text-[10px] text-gray-500 mt-1">{summary.lastDate}</p></>}
        </Card>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center gap-2">
          <Banknote className="w-5 h-5 text-gray-400" />
          <h3 className="font-bold text-[#232F46]">Payout Statements</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[900px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Gross</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Donation</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">TDS</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Admin</th>
                <th className="p-3 text-[10px] font-bold text-[#232F46] uppercase tracking-wider text-right">Net</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">UTR</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Payment Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading && <tr><td colSpan={9} className="p-6 text-center text-gray-400">Loading...</td></tr>}
              {!loading && payouts.length === 0 && <tr><td colSpan={9} className="p-6 text-center text-gray-400">No withdrawal requests yet.</td></tr>}
              {payouts.map(payout => (
                <tr key={payout.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-3 text-xs font-bold text-[#232F46]">{new Date(payout.created_at).toLocaleDateString()}</td>
                  <td className="p-3 text-xs text-right font-bold text-gray-600">₹{Number(payout.requested_amount).toLocaleString()}</td>
                  <td className="p-3 text-xs text-right text-blue-500">-₹{Number(payout.donation_deduction).toLocaleString()}</td>
                  <td className="p-3 text-xs text-right text-red-500">-₹{Number(payout.tds_deduction).toLocaleString()}</td>
                  <td className="p-3 text-xs text-right text-red-500">-₹{Number(payout.admin_deduction).toLocaleString()}</td>
                  <td className="p-3 text-xs text-right font-black text-[#232F46] bg-gray-50">₹{Number(payout.net_payable).toLocaleString()}</td>
                  <td className="p-3">
                    {payout.utr_number
                      ? <span className="font-mono text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded">{payout.utr_number}</span>
                      : <span className="text-xs text-gray-400 italic">N/A</span>}
                  </td>
                  <td className="p-3 text-center"><StatusBadge status={payout.status} /></td>
                  <td className="p-3 text-xs text-gray-500">{payout.processed_at ? new Date(payout.processed_at).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
