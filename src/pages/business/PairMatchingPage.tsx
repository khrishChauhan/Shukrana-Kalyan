import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { mockBvDashboard } from '../../data/mockBusinessData';
import { Network, CheckCircle, Clock } from 'lucide-react';

export default function PairMatchingPage() {
  const binaryHistory = [
    { date: '2023-10-25', leftBefore: 8, rightBefore: 5, pairType: '2:1', leftUsed: 2, rightUsed: 1, income: 200, carryLeft: 6, carryRight: 4 },
    { date: '2023-10-25', leftBefore: 6, rightBefore: 4, pairType: '2:1', leftUsed: 2, rightUsed: 1, income: 200, carryLeft: 4, carryRight: 3 },
    { date: '2023-10-25', leftBefore: 4, rightBefore: 3, pairType: '2:1', leftUsed: 2, rightUsed: 1, income: 200, carryLeft: 2, carryRight: 2 },
    { date: '2023-10-25', leftBefore: 2, rightBefore: 2, pairType: '2:1', leftUsed: 2, rightUsed: 1, income: 200, carryLeft: 0, carryRight: 1 },
  ];

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
          <p className="text-4xl font-black text-[#ED8C32]">₹{mockBvDashboard.matchedBv * 200}</p>
        </Card>

        <Card className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center flex flex-col justify-center items-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Daily Matches</p>
          <p className="text-3xl font-black text-[#232F46]">4 <span className="text-sm font-bold text-gray-400">/ 10 Limit</span></p>
          <p className="text-[10px] text-gray-400 mt-2">Remaining Matches Today: 6</p>
        </Card>

        <Card className="p-4 bg-gray-50 border border-gray-100 rounded-xl text-center flex flex-col justify-center items-center">
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Carry Forward BV</p>
          <div className="flex gap-4 items-center">
            <div className="text-center">
              <p className="text-xl font-bold text-[#ED8C32]">0</p>
              <p className="text-[10px] text-gray-400 font-bold uppercase">Left</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-[#ED8C32]">1</p>
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
                  <td className="p-3 text-xs font-medium text-[#232F46]">{h.date}</td>
                  <td className="p-3 text-xs text-right text-gray-500">{h.leftBefore}</td>
                  <td className="p-3 text-xs text-right text-gray-500">{h.rightBefore}</td>
                  <td className="p-3 text-xs text-center font-bold text-[#232F46] bg-gray-50/50">{h.pairType}</td>
                  <td className="p-3 text-xs text-center font-bold text-gray-700 bg-gray-50/50">-{h.leftUsed}</td>
                  <td className="p-3 text-xs text-center font-bold text-gray-700 bg-gray-50/50">-{h.rightUsed}</td>
                  <td className="p-3 text-xs text-right font-bold text-[#ED8C32] bg-gray-50/50">₹{h.income}</td>
                  <td className="p-3 text-xs text-right font-bold text-[#232F46]">{h.carryLeft}</td>
                  <td className="p-3 text-xs text-right font-bold text-[#232F46]">{h.carryRight}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
