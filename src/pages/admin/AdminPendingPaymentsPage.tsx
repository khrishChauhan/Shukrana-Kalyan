import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export default function AdminPendingPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPendingPayments();
  }, []);

  const fetchPendingPayments = async () => {
    try {
      const { data, error } = await supabase
        .from('payments')
        .select(`
          *,
          members (
            member_id,
            status,
            member_profile (
              full_name,
              phone_number
            )
          )
        `)
        .eq('status', 'PENDING');

      if (error) throw error;
      setPayments(data || []);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (paymentId: string, memberId: string) => {
    if (!window.confirm("Are you sure you want to approve this payment?")) return;
    try {
      const { error: pError } = await supabase.from('payments').update({ status: 'VERIFIED' }).eq('id', paymentId);
      if (pError) throw pError;
      
      const { error: mError } = await supabase.from('members').update({ status: 'ACTIVE' }).eq('id', memberId);
      if (mError) throw mError;
      
      alert('Payment approved and member activated!');
      fetchPendingPayments();
    } catch (error: any) {
      alert(error.message);
    }
  };

  const handleReject = async (paymentId: string) => {
    if (!window.confirm("Are you sure you want to reject this payment?")) return;
    try {
      const { error } = await supabase.from('payments').update({ status: 'REJECTED' }).eq('id', paymentId);
      if (error) throw error;
      alert('Payment rejected.');
      fetchPendingPayments();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-[#232F46]">Pending Payments</h1>
          <p className="text-sm text-slate-500">Review and verify submitted payment proofs.</p>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-slate-50 text-slate-500 uppercase text-xs font-semibold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Member Details</th>
                <th className="px-6 py-4">UTR Number</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Screenshot</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {loading ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center">Loading...</td></tr>
              ) : payments.length === 0 ? (
                <tr><td colSpan={5} className="px-6 py-4 text-center">No pending payments found.</td></tr>
              ) : (
                payments.map(payment => (
                  <tr key={payment.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-[#232F46]">{payment.members?.member_profile?.[0]?.full_name || payment.members?.member_profile?.full_name || 'Unknown'}</div>
                      <div className="text-xs text-slate-500">{payment.members?.member_id} • {payment.members?.member_profile?.[0]?.phone_number || payment.members?.member_profile?.phone_number}</div>
                    </td>
                    <td className="px-6 py-4 font-mono">{payment.utr_number}</td>
                    <td className="px-6 py-4 font-semibold">₹{payment.amount}</td>
                    <td className="px-6 py-4">
                      <a href={payment.screenshot_url} target="_blank" rel="noreferrer" className="text-blue-600 hover:underline">
                        View Proof
                      </a>
                    </td>
                    <td className="px-6 py-4 space-x-2">
                      <Button variant="primary" size="sm" onClick={() => handleApprove(payment.id, payment.member_id)}>Approve</Button>
                      <Button variant="outline" size="sm" onClick={() => handleReject(payment.id)}>Reject</Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
