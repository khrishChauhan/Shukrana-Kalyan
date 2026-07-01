import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { TrendingUp, Activity, Layers, CornerDownRight } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface MemberBusiness {
  total_left_bv: number;
  total_right_bv: number;
  carry_forward_left: number;
  carry_forward_right: number;
}

interface MatchingTransaction {
  id: string;
  created_at: string;
  matched_bv: number;
  income_generated: number;
  status: string;
}

export default function MatchingIncomePage() {
  const [business, setBusiness] = useState<MemberBusiness | null>(null);
  const [transactions, setTransactions] = useState<MatchingTransaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch Business Volume stats
        const { data: bizData } = await supabase
          .from('member_business')
          .select('total_left_bv, total_right_bv, carry_forward_left, carry_forward_right')
          .eq('member_uuid', user.id)
          .single();
        
        if (bizData) setBusiness(bizData);

        // Fetch Matching Ledger
        const { data: txData } = await supabase
          .from('unified_ledger')
          .select('id, amount, source_ref_id, remarks, created_at')
          .eq('member_uuid', user.id)
          .eq('entry_type', 'MATCHING_INCOME')
          .order('created_at', { ascending: false });

        if (txData) {
          setTransactions(txData.map(tx => ({
            id: tx.id,
            created_at: tx.created_at,
            matched_bv: parseInt(tx.remarks?.split(' ')[0] || '0', 10) || 0, // Fallback parsing
            income_generated: Number(tx.amount),
            status: 'PAID', // Unified ledger means it's processed
            remarks: tx.remarks
          })));
        }

      } catch (err) {
        console.error('Error fetching matching income data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Pair Matching & BV"
        description="Monitor your Business Volume and Binary Matching income."
        breadcrumbs={[{ label: 'Business' }, { label: 'Pair Matching' }]}
      />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Activity size={18} /></div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Left BV</p>
          </div>
          <p className="text-2xl font-black text-[#232F46]">{loading ? '...' : (business?.total_left_bv || 0).toLocaleString()}</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-orange-50 text-[#ED8C32] rounded-lg"><Activity size={18} /></div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Total Right BV</p>
          </div>
          <p className="text-2xl font-black text-[#232F46]">{loading ? '...' : (business?.total_right_bv || 0).toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><CornerDownRight size={18} /></div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Carry Forward L</p>
          </div>
          <p className="text-2xl font-black text-[#232F46]">{loading ? '...' : (business?.carry_forward_left || 0).toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><CornerDownRight size={18} /></div>
            <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">Carry Forward R</p>
          </div>
          <p className="text-2xl font-black text-[#232F46]">{loading ? '...' : (business?.carry_forward_right || 0).toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
           <Card className="text-center p-8 h-full flex flex-col justify-center">
            <div className="w-16 h-16 bg-[#232F46]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-8 h-8 text-[#232F46]" />
            </div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Binary Income</p>
            {loading ? (
              <p className="text-4xl font-black text-gray-300 animate-pulse">Loading...</p>
            ) : (
              <>
                <p className="text-4xl font-black text-[#ED8C32]">
                  ₹{transactions.reduce((sum, tx) => sum + Number(tx.income_generated), 0).toLocaleString()}
                </p>
                <p className="text-sm text-gray-500 mt-2">{transactions.length} successful pair{transactions.length !== 1 ? 's' : ''}</p>
              </>
            )}
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card noPadding>
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <Layers className="w-5 h-5 text-[#232F46]" />
              <h3 className="font-bold text-[#232F46]">Matching Ledger</h3>
            </div>
            <div className="overflow-x-auto max-h-[400px]">
              <table className="w-full text-left border-collapse">
                <thead className="sticky top-0 bg-gray-50 z-10">
                  <tr className="border-b border-gray-200 text-xs font-bold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Matched BV</th>
                    <th className="px-6 py-4 text-right">Income</th>
                    <th className="px-6 py-4">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">Loading ledger...</td>
                    </tr>
                  ) : transactions.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">No matching transactions yet.</td>
                    </tr>
                  ) : (
                    transactions.map((tx) => (
                      <tr key={tx.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 text-sm font-semibold text-gray-700">
                          {new Date(tx.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-sm font-mono text-[#ED8C32] font-bold">
                          {tx.matched_bv} BV
                        </td>
                        <td className="px-6 py-4 text-sm font-mono text-[#232F46] font-bold text-right">
                          ₹{Number(tx.income_generated).toLocaleString()}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-2 py-1 text-[10px] font-bold rounded-full border 
                            ${tx.status === 'PAID' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 
                              'bg-amber-50 text-amber-700 border-amber-200'}`}
                          >
                            {tx.status}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
