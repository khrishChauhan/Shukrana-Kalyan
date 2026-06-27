import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { mockBvDashboard } from '../../data/mockBusinessData';
import { BarChart, ArrowLeftRight } from 'lucide-react';

export default function BvDashboardPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="BV Dashboard"
        description="Monitor your Business Volume accumulation on the left and right legs."
        breadcrumbs={[{ label: 'Business' }, { label: 'BV Dashboard' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6 bg-gray-50 border border-gray-100 flex flex-col justify-center items-center text-center">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Left BV</p>
          <p className="text-5xl font-black text-[#232F46]">{mockBvDashboard.totalLeftBv.toLocaleString()}</p>
          <p className="text-sm font-medium text-gray-500 mt-4">Today: +{mockBvDashboard.todayLeftBv.toLocaleString()}</p>
        </Card>

        <Card className="p-6 bg-gray-50 border border-gray-100 flex flex-col justify-center items-center text-center">
          <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-2">Total Right BV</p>
          <p className="text-5xl font-black text-[#ED8C32]">{mockBvDashboard.totalRightBv.toLocaleString()}</p>
          <p className="text-sm font-medium text-gray-500 mt-4">Today: +{mockBvDashboard.todayRightBv.toLocaleString()}</p>
        </Card>
      </div>

      <Card>
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-[#232F46]/10 rounded-lg">
            <BarChart className="w-5 h-5 text-[#232F46]" />
          </div>
          <h3 className="font-bold text-[#232F46] text-lg">BV Matching History</h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Left BV</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Right BV</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Matched</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Carry Forward</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockBvDashboard.history.map((record, i) => (
                <tr key={i} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-medium text-[#232F46]">{record.date}</td>
                  <td className="p-4 text-right font-bold text-[#232F46]">{record.left.toLocaleString()}</td>
                  <td className="p-4 text-right font-bold text-[#ED8C32]">{record.right.toLocaleString()}</td>
                  <td className="p-4 text-right font-bold text-[#232F46] flex items-center justify-end gap-1">
                    <ArrowLeftRight className="w-3 h-3 text-gray-400" />
                    {record.matched.toLocaleString()}
                  </td>
                  <td className="p-4 text-right font-medium text-gray-500">{record.carriedForward}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
