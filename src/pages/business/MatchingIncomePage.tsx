import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { TrendingUp } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function MatchingIncomePage() {
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalPairs, setTotalPairs] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatchingIncome = async () => {
      try {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        const { data } = await supabase
          .from('matching_transactions')
          .select('income_generated')
          .eq('member_uuid', user.id);
        if (data) {
          setTotalPairs(data.length);
          setTotalIncome(data.reduce((sum, tx) => sum + Number(tx.income_generated), 0));
        }
      } catch (err) {
        console.error('Error fetching matching income', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMatchingIncome();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Binary Income"
        description="Earnings generated from matching Left and Right Business Volume (BV)."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard' }, { label: 'Binary Income' }]}
      />

      <Card className="text-center p-10">
        <div className="w-16 h-16 bg-[#232F46]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <TrendingUp className="w-8 h-8 text-[#232F46]" />
        </div>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Binary Income</p>
        {loading ? (
          <p className="text-4xl font-black text-gray-300 animate-pulse">Loading...</p>
        ) : (
          <>
            <p className="text-4xl font-black text-[#ED8C32]">₹{totalIncome.toLocaleString()}</p>
            <p className="text-sm text-gray-500 mt-2">{totalPairs} successful pair{totalPairs !== 1 ? 's' : ''}</p>
          </>
        )}

        <div className="mt-8 pt-8 border-t border-gray-100 text-left">
          <h3 className="font-bold text-[#232F46] mb-2">How it works</h3>
          <p className="text-sm text-gray-600 mb-6">
            Binary Income is generated when Business Volume (BV) is paired between your Left and Right legs in the Placement Tree. The system automatically evaluates available Left BV and Right BV and applies a 2:1 or 1:2 ratio for the first pair, then 1:1 for all subsequent pairs. Unmatched BV is saved as Carry Forward.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
