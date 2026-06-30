import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { mockBvDashboard } from '../../data/mockBusinessData';
import { Network, CheckCircle, Clock } from 'lucide-react';

import { supabase } from '../../lib/supabase';

export default function PairMatchingPage() {
  const [binaryHistory, setBinaryHistory] = React.useState<any[]>([]);
  const [businessData, setBusinessData] = React.useState<any>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchMatchingData = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        // Fetch Business Data
        const { data: bData } = await supabase
          .from('member_business')
          .select('carry_forward_left, carry_forward_right, matched_bv')
          .eq('id', user.id)
          .single();
        if (bData) setBusinessData(bData);

        // Fetch Matching History
        const { data: history } = await supabase
          .from('matching_transactions')
          .select('*')
          .eq('member_uuid', user.id)
          .order('created_at', { ascending: false });
        
        if (history) setBinaryHistory(history);
      } catch (err) {
        console.error("Error fetching matching data", err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchMatchingData();
  }, []);

  // Compute Total Income from history
  const totalIncome = binaryHistory.reduce((sum, tx) => sum + Number(tx.income_generated), 0);
  const matchesToday = binaryHistory.filter(tx => new Date(tx.created_at).toDateString() === new Date().toDateString()).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Binary Matching"
        description="Monitor your Binary Income, successful matches, and Carry Forward balances."
        breadcrumbs={[{ label: 'Business' }, { label: 'Binary Matching' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-4 bg-[#232F46] text-white flex flex-col justify-center items-center text-center">
          <p className="text-xs font-bold text-white/70 uppercase tracking-wider mb-2">Total Binary Income</p>
          <p className="text-4xl font-black text-[#ED8C32]">₹{totalIncome}</p>
        </Card>

        <Card className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center flex flex-col justify-center items-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Daily Matches</p>
          <p className="text-3xl font-black text-[#232F46]">{matchesToday} <span className="text-sm font-bold text-gray-400">/ 10 Limit</span></p>
          <p className="text-[10px] text-gray-400 mt-2">Remaining Matches Today: {Math.max(0, 10 - matchesToday)}</p>
        </Card>

        <Card className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center flex flex-col justify-center items-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Carry Forward BV</p>
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <p className="text-xl font-bold text-[#ED8C32]">{businessData?.carry_forward_left || 0}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Left</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#ED8C32]">{businessData?.carry_forward_right || 0}</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Right</p>
            </div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6 border-b border-gray-100 pb-4">
          <div className="p-2 bg-[#232F46]/10 rounded-lg">
            <Network className="w-5 h-5 text-[#232F46]" />
          </div>
          <h3 className="font-bold text-[#232F46] text-lg">Matching Engine Rules</h3>
        </div>
        
        <p className="text-sm text-gray-600 mb-6">
          The system automatically evaluates available Left BV and Right BV to generate matches. Every successful match pays ₹200.
        </p>

        <ul className="space-y-4 mb-6">
          <li className="flex gap-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <CheckCircle className="w-5 h-5 text-[#ED8C32] shrink-0" />
            <div>
              <span className="font-bold text-[#232F46] block mb-1">When Left BV exceeds Right BV:</span>
              The engine uses a <strong className="text-[#ED8C32]">2:1</strong> ratio (2 Left BV + 1 Right BV).
            </div>
          </li>
          <li className="flex gap-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <CheckCircle className="w-5 h-5 text-[#ED8C32] shrink-0" />
            <div>
              <span className="font-bold text-[#232F46] block mb-1">When Right BV exceeds Left BV:</span>
              The engine uses a <strong className="text-[#ED8C32]">1:2</strong> ratio (1 Left BV + 2 Right BV).
            </div>
          </li>
          <li className="flex gap-3 text-sm text-gray-700 bg-gray-50 p-4 rounded-lg border border-gray-100">
            <CheckCircle className="w-5 h-5 text-[#ED8C32] shrink-0" />
            <div>
              <span className="font-bold text-[#232F46] block mb-1">When both sides are Equal:</span>
              The engine defaults to a <strong className="text-[#ED8C32]">2:1</strong> ratio.
            </div>
          </li>
        </ul>
        
        <div className="flex items-start gap-3 bg-blue-50/50 p-4 rounded-lg border border-blue-100 text-sm text-gray-700">
          <Clock className="w-5 h-5 text-[#232F46] shrink-0" />
          <p>
            <strong className="text-[#232F46]">Carry Forward:</strong> Any remaining BV after matching becomes Carry Forward. Carry Forward never expires and is consumed only when future BV arrives. Daily Maximum Binary Income is capped at ₹2000 (10 matches).
          </p>
        </div>
      </Card>

      <Card>
        <h3 className="font-bold text-[#232F46] mb-6">Binary History</h3>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Left Before</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Right Before</th>
                <th className="p-3 text-[10px] font-bold text-[#232F46] uppercase tracking-wider text-center bg-gray-100 rounded-tl-lg">Pair Type</th>
                <th className="p-3 text-[10px] font-bold text-[#232F46] uppercase tracking-wider text-center bg-gray-100">Left Used</th>
                <th className="p-3 text-[10px] font-bold text-[#232F46] uppercase tracking-wider text-center bg-gray-100">Right Used</th>
                <th className="p-3 text-[10px] font-bold text-[#ED8C32] uppercase tracking-wider text-right bg-gray-100 rounded-tr-lg">Income</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Carry Left</th>
                <th className="p-3 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Carry Right</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {binaryHistory.map((h, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-3 text-xs font-medium text-[#232F46]">
                    {new Date(h.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3 text-xs text-right text-gray-500">--</td>
                  <td className="p-3 text-xs text-right text-gray-500">--</td>
                  <td className="p-3 text-xs text-center font-bold text-[#232F46] bg-gray-50/50">{h.ratio_used}</td>
                  <td className="p-3 text-xs text-center font-bold text-gray-700 bg-gray-50/50">-{h.left_bv_consumed}</td>
                  <td className="p-3 text-xs text-center font-bold text-gray-700 bg-gray-50/50">-{h.right_bv_consumed}</td>
                  <td className="p-3 text-xs text-right font-bold text-[#ED8C32] bg-gray-50/50">₹{h.income_generated}</td>
                  <td className="p-3 text-xs text-right font-bold text-[#232F46]">--</td>
                  <td className="p-3 text-xs text-right font-bold text-[#232F46]">--</td>
                </tr>
              ))}
              {binaryHistory.length === 0 && !loading && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-sm text-gray-500">
                    No matching transactions found yet.
                  </td>
                </tr>
              )}
              {loading && (
                <tr>
                  <td colSpan={9} className="p-6 text-center text-sm text-gray-500">
                    Loading...
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
