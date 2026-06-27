import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { mockIncomeDashboard } from '../../data/mockBusinessData';
import { TrendingUp } from 'lucide-react';

export default function MatchingIncomePage() {
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
        <p className="text-4xl font-black text-[#ED8C32]">₹{mockIncomeDashboard.matchingIncome.toLocaleString()}</p>
        
        <div className="mt-8 pt-8 border-t border-gray-100 text-left">
          <h3 className="font-bold text-[#232F46] mb-2">How it works</h3>
          <p className="text-sm text-gray-600 mb-6">
          Binary Income is generated when Business Volume (BV) is paired between your Left and Right legs in the Placement Tree. The system automatically evaluates available Left BV and Right BV and applies a 2:1 or 1:2 ratio. Every successful match pays ₹200. Unmatched BV is saved as Carry Forward.
        </p>
        </div>
      </Card>
    </motion.div>
  );
}
