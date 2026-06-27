import React from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { mockIncomeDashboard } from '../../data/mockBusinessData';
import { Wallet, Search, Filter } from 'lucide-react';

export default function IncomeLedgerPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Income Ledger"
        description="Detailed transaction history of all credits and debits."
        breadcrumbs={[{ label: 'Business' }, { label: 'Income Dashboard' }, { label: 'Ledger' }]}
      />

      <Card>
        <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-[#ED8C32] text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm font-bold text-[#232F46] transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date & ID</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Amount</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {mockIncomeDashboard.ledger.map((txn) => (
                <tr key={txn.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4">
                    <p className="font-bold text-[#232F46]">{txn.date}</p>
                    <p className="text-xs font-mono text-gray-500">{txn.id}</p>
                  </td>
                  <td className="p-4 font-medium text-[#232F46]">{txn.category}</td>
                  <td className="p-4">
                    <span className={`inline-flex px-2 py-1 text-[10px] font-bold uppercase rounded-full ${
                      txn.type === 'Credit' ? 'bg-[#ED8C32]/10 text-[#ED8C32]' : 'bg-[#232F46]/10 text-[#232F46]'
                    }`}>
                      {txn.type}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <span className={`font-bold ${txn.type === 'Credit' ? 'text-[#ED8C32]' : 'text-[#232F46]'}`}>
                      {txn.type === 'Credit' ? '+' : '-'}₹{txn.amount.toLocaleString()}
                    </span>
                  </td>
                  <td className="p-4 text-right font-bold text-[#232F46]">
                    ₹{txn.balance.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </motion.div>
  );
}
