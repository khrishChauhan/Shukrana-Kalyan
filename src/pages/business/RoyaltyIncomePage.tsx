import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { mockIncomeDashboard } from '../../data/mockBusinessData';
import { Award } from 'lucide-react';

export default function RoyaltyIncomePage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Royalty Income"
        description="Earnings generated from achieving leadership ranks."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard' }, { label: 'Royalty Income' }]}
      />

      <Card className="text-center p-10">
        <div className="w-16 h-16 bg-[#232F46]/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Award className="w-8 h-8 text-[#232F46]" />
        </div>
        <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Royalty Income</p>
        <p className="text-4xl font-black text-[#ED8C32]">₹{mockIncomeDashboard.royaltyIncome.toLocaleString()}</p>
        
        <div className="mt-8 pt-8 border-t border-gray-100 text-left">
          <h3 className="font-bold text-[#232F46] mb-2">How it works</h3>
          <p className="text-sm text-gray-600">
            Royalty Income is a dividend paid to members who achieve specific leadership Ranks (e.g., Silver, Gold). It rewards you for overall organizational growth and sustained network performance.
          </p>
        </div>
      </Card>
    </motion.div>
  );
}
