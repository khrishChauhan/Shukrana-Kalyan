import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { supabase } from '../../lib/supabase';
import { Banknote, Clock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function WithdrawalCenterPage() {
  const [amount, setAmount] = useState<number | ''>('');
  const [walletBalance, setWalletBalance] = useState(0);
  const [bankDetails, setBankDetails] = useState<any>(null);
  const [history, setHistory] = useState<any[]>([]);
  const [counts, setCounts] = useState({ pending: 0, completed: 0, rejected: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const MIN_WITHDRAWAL = 500;
  const TDS_PCT = 5;
  const ADMIN_PCT = 5;
  const DONATION_PCT = 10;

  const numAmount = Number(amount) || 0;
  const tds = parseFloat((numAmount * TDS_PCT / 100).toFixed(2));
  const adminCharges = parseFloat((numAmount * ADMIN_PCT / 100).toFixed(2));
  const donation = parseFloat((numAmount * DONATION_PCT / 100).toFixed(2));
  const netPayable = parseFloat((numAmount - tds - adminCharges - donation).toFixed(2));

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const [{ data: wallet }, { data: kyc }, { data: requests }] = await Promise.all([
          supabase.from('wallets').select('available_balance').eq('id', user.id).single(),
          supabase.from('member_kyc').select('full_name, bank_name, bank_account_number, bank_ifsc').eq('id', user.id).single(),
          supabase.from('withdrawal_requests').select('id, requested_amount, tds_deduction, admin_deduction, donation_deduction, net_payable, status, utr_number, created_at, processed_at').eq('member_uuid', user.id).order('created_at', { ascending: false }),
        ]);

        if (wallet) setWalletBalance(Number(wallet.available_balance));
        if (kyc) setBankDetails(kyc);
        if (requests) {
          setHistory(requests);
          setCounts({
            pending: requests.filter(r => r.status === 'PENDING').length,
            completed: requests.filter(r => r.status === 'PAID').length,
            rejected: requests.filter(r => r.status === 'REJECTED').length,
          });
        }
      } catch (err) {
        console.error('Error fetching withdrawal data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = async () => {
    if (!amount || numAmount < MIN_WITHDRAWAL) { toast.error(`Minimum withdrawal is ₹${MIN_WITHDRAWAL}`); return; }
    if (numAmount > walletBalance) { toast.error('Amount exceeds available balance.'); return; }
    try {
      setSubmitting(true);
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;
      const { error } = await supabase.rpc('create_payout_request', { p_member_uuid: user.id, p_amount: numAmount });
      if (error) throw error;
      toast.success('Withdrawal request submitted successfully!');
      setAmount('');
      // Refresh
      const [{ data: wallet }, { data: requests }] = await Promise.all([
        supabase.from('wallets').select('available_balance').eq('id', user.id).single(),
        supabase.from('withdrawal_requests').select('id, requested_amount, tds_deduction, admin_deduction, donation_deduction, net_payable, status, utr_number, created_at, processed_at').eq('member_uuid', user.id).order('created_at', { ascending: false }),
      ]);
      if (wallet) setWalletBalance(Number(wallet.available_balance));
      if (requests) {
        setHistory(requests);
        setCounts({ pending: requests.filter(r => r.status === 'PENDING').length, completed: requests.filter(r => r.status === 'PAID').length, rejected: requests.filter(r => r.status === 'REJECTED').length });
      }
    } catch (err: any) {
      toast.error(err.message || 'Failed to submit withdrawal request.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="max-w-6xl mx-auto pb-10 space-y-6">
      <PageHeader title="Withdrawal Center" description="Request payout withdrawals directly to your registered bank account." breadcrumbs={[{ label: 'Business' }, { label: 'Wallet Center' }, { label: 'Withdrawals' }]} />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Available Balance</p>
          {loading ? <p className="text-2xl font-black text-[#ED8C32]/50 animate-pulse">₹---</p>
            : <p className="text-2xl font-black text-[#ED8C32]">₹{walletBalance.toLocaleString()}</p>}
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Pending Requests</p>
          <p className="text-xl font-bold text-[#ED8C32]">{counts.pending}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Completed</p>
          <p className="text-xl font-bold text-green-600">{counts.completed}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Rejected</p>
          <p className="text-xl font-bold text-red-600">{counts.rejected}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-1 space-y-6">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-4">
            <Banknote className="w-5 h-5 text-[#232F46]" />
            <h3 className="font-bold text-[#232F46]">New Withdrawal</h3>
          </div>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Requested Amount (₹)</label>
              <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder={`Min ₹${MIN_WITHDRAWAL}`} className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]" />
              {amount && numAmount < MIN_WITHDRAWAL && <p className="text-xs text-red-500 mt-1">Minimum withdrawal is ₹{MIN_WITHDRAWAL}</p>}
              {amount && numAmount > walletBalance && <p className="text-xs text-red-500 mt-1 flex items-center gap-1"><AlertCircle className="w-3 h-3" /> Amount exceeds available balance.</p>}
            </div>

            <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
              <h4 className="text-xs font-bold text-gray-500 uppercase mb-3">Bank Details</h4>
              {bankDetails ? (
                <>
                  <p className="text-sm font-bold text-[#232F46]">{bankDetails.full_name || 'Account Holder'}</p>
                  <p className="text-sm text-gray-600">{bankDetails.bank_name || '—'} - {bankDetails.bank_account_number || '—'}</p>
                  <p className="text-xs text-gray-500 mt-1">IFSC: {bankDetails.bank_ifsc || '—'}</p>
                </>
              ) : <p className="text-sm text-gray-400">No bank details found. Please update your KYC.</p>}
            </div>

            <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-100 space-y-2">
              <h4 className="text-xs font-bold text-[#ED8C32] uppercase mb-2">Preview</h4>
              <div className="flex justify-between text-sm"><span className="text-gray-600">Requested Amount</span><span className="font-bold text-[#232F46]">₹{numAmount || 0}</span></div>
              <div className="flex justify-between text-sm"><span className="text-red-500">TDS ({TDS_PCT}%)</span><span className="font-bold text-red-500">-₹{tds}</span></div>
              <div className="flex justify-between text-sm"><span className="text-red-500">Admin Charges ({ADMIN_PCT}%)</span><span className="font-bold text-red-500">-₹{adminCharges}</span></div>
              <div className="flex justify-between text-sm"><span className="text-blue-500">Donation ({DONATION_PCT}%)</span><span className="font-bold text-blue-500">-₹{donation}</span></div>
              <div className="pt-2 mt-2 border-t border-orange-200 flex justify-between">
                <span className="font-bold text-[#232F46]">Net Payable</span>
                <span className="font-black text-green-600 text-lg">₹{netPayable > 0 ? netPayable : 0}</span>
              </div>
            </div>

            <Button className="w-full bg-[#ED8C32] hover:bg-[#D97A24] text-white" onClick={handleSubmit} disabled={submitting || !amount || numAmount < MIN_WITHDRAWAL || numAmount > walletBalance}>
              {submitting ? 'Submitting…' : 'Submit Request'}
            </Button>
          </div>
        </Card>

        <Card className="lg:col-span-2 overflow-hidden flex flex-col p-0">
          <div className="p-5 border-b border-gray-100 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gray-400" />
            <h3 className="font-bold text-[#232F46]">Withdrawal History</h3>
          </div>
          <div className="overflow-x-auto flex-1">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-100">
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Requested</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">TDS</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Admin</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Donation</th>
                  <th className="p-3 text-[10px] font-bold text-[#232F46] uppercase tracking-wider text-right">Net</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">UTR</th>
                  <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Processed</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {loading && <tr><td colSpan={9} className="p-6 text-center text-gray-400">Loading...</td></tr>}
                {!loading && history.length === 0 && <tr><td colSpan={9} className="p-6 text-center text-gray-400">No withdrawal requests yet.</td></tr>}
                {history.map(record => (
                  <tr key={record.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="p-3 text-xs font-medium text-[#232F46]">{new Date(record.created_at).toLocaleDateString()}</td>
                    <td className="p-3 text-xs text-right font-bold text-[#232F46]">₹{Number(record.requested_amount).toLocaleString()}</td>
                    <td className="p-3 text-xs text-right text-red-500">-₹{Number(record.tds_deduction).toLocaleString()}</td>
                    <td className="p-3 text-xs text-right text-red-500">-₹{Number(record.admin_deduction).toLocaleString()}</td>
                    <td className="p-3 text-xs text-right text-blue-500">-₹{Number(record.donation_deduction).toLocaleString()}</td>
                    <td className="p-3 text-xs text-right font-bold text-green-600 bg-green-50/30">₹{Number(record.net_payable).toLocaleString()}</td>
                    <td className="p-3 text-center"><StatusBadge status={record.status} /></td>
                    <td className="p-3 text-xs font-mono text-gray-500">{record.utr_number || '—'}</td>
                    <td className="p-3 text-xs text-gray-500">{record.processed_at ? new Date(record.processed_at).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
