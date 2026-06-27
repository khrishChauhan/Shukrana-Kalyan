import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { mockIncomeDashboard } from '../../data/mockBusinessData';
import { IndianRupee, ArrowRight, Wallet, Award, Users, TrendingUp } from 'lucide-react';

export default function IncomeDashboardPage() {
  const navigate = useNavigate();

  const incomeStreams = [
    { title: 'Binary Income', amount: mockIncomeDashboard.matchingIncome, icon: TrendingUp, path: '/business/matching-income' },
    { title: 'Sponsor Income', amount: mockIncomeDashboard.sponsorIncome, icon: Users, path: '/business/sponsor-income' },
    { title: 'Level Income', amount: mockIncomeDashboard.levelIncome, icon: ArrowRight, path: '/business/level-income' },
    { title: 'Royalty Income', amount: mockIncomeDashboard.royaltyIncome, icon: Award, path: '/business/royalty-income' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Income Dashboard"
        description="Track all your earnings, deductions, and wallet balances."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#232F46] text-white p-6 md:col-span-3 lg:col-span-1 flex flex-col justify-center">
          <p className="text-sm text-white/70 font-bold uppercase tracking-wider mb-2">Total Accumulated Income</p>
          <p className="text-4xl font-black text-[#ED8C32] mb-4">₹{mockIncomeDashboard.totalIncome.toLocaleString()}</p>
          <div className="flex gap-4 mt-auto">
            <button 
              onClick={() => navigate('/business/income-ledger')}
              className="flex-1 bg-white text-[#232F46] py-2 px-4 rounded-lg font-bold text-sm hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
            >
              <Wallet className="w-4 h-4" /> View Ledger
            </button>
            <button 
              onClick={() => navigate('/business/income-breakdown')}
              className="flex-1 border border-white/20 text-white py-2 px-4 rounded-lg font-bold text-sm hover:bg-white/10 transition-colors"
            >
              Breakdown
            </button>
          </div>
        </Card>

        <div className="md:col-span-3 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {incomeStreams.map((stream, idx) => (
            <Card 
              key={idx} 
              className="p-4 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group border border-gray-100 flex items-center justify-between"
              onClick={() => navigate(stream.path)}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-white border border-gray-100 rounded-lg group-hover:border-[#ED8C32] transition-colors">
                  <stream.icon className="w-6 h-6 text-[#232F46]" />
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-500">{stream.title}</p>
                  <p className="text-xl font-bold text-[#232F46]">₹{stream.amount.toLocaleString()}</p>
                </div>
              </div>
              <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[#ED8C32] transition-colors" />
            </Card>
          ))}
        </div>
      </div>

      <Card>
        <h3 className="text-lg font-bold text-[#232F46] mb-4">Recent Transactions</h3>
        <div className="space-y-2">
          {mockIncomeDashboard.ledger.map((txn) => (
            <div key={txn.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg bg-gray-50">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-full ${txn.type === 'Credit' ? 'bg-[#ED8C32]/10 text-[#ED8C32]' : 'bg-[#232F46]/10 text-[#232F46]'}`}>
                  <IndianRupee className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-bold text-[#232F46]">{txn.category}</p>
                  <p className="text-xs text-gray-500 font-mono">{txn.id} • {txn.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-bold ${txn.type === 'Credit' ? 'text-[#ED8C32]' : 'text-[#232F46]'}`}>
                  {txn.type === 'Credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                </p>
                <p className="text-xs text-gray-500 font-mono">Bal: ₹{txn.balance.toLocaleString()}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}
