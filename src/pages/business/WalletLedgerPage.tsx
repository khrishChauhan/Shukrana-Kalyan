import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { mockWalletData } from '../../data/mockBusinessData';
import { Download, FileText, Search, Filter } from 'lucide-react';

export default function WalletLedgerPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('All');

  const filteredLedger = mockWalletData.ledger.filter((txn) => {
    const matchesSearch = txn.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          txn.ref.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          txn.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'All' || txn.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <PageHeader
          title="Wallet Ledger"
          description="Detailed financial statement and transaction history."
          breadcrumbs={[{ label: 'Business' }, { label: 'Wallet Center' }, { label: 'Ledger' }]}
        />
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" /> Export PDF
          </Button>
        </div>
      </div>

      <Card className="p-0 overflow-hidden">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search TXN ID, Ref..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ED8C32]"
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-gray-500" />
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full sm:w-auto py-2 px-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-[#ED8C32]"
            >
              <option value="All">All Types</option>
              <option value="Binary Income">Binary Income</option>
              <option value="Sponsor Income">Sponsor Income</option>
              <option value="Withdrawal">Withdrawal</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-200">
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">TXN ID</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Reference</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Income Type</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Credit</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Debit</th>
                <th className="p-4 text-xs font-bold text-[#232F46] uppercase tracking-wider text-right">Balance</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Remarks</th>
                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredLedger.map((txn, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-[#232F46] whitespace-nowrap">{txn.date}</td>
                  <td className="p-4 text-sm font-mono text-gray-600">{txn.id}</td>
                  <td className="p-4 text-sm font-mono text-gray-500">{txn.ref}</td>
                  <td className="p-4 text-sm font-medium text-gray-700">{txn.type}</td>
                  <td className="p-4 text-sm text-right font-bold text-green-600">{txn.credit > 0 ? `+₹${txn.credit.toLocaleString()}` : '-'}</td>
                  <td className="p-4 text-sm text-right font-bold text-red-600">{txn.debit > 0 ? `-₹${txn.debit.toLocaleString()}` : '-'}</td>
                  <td className="p-4 text-sm text-right font-black text-[#232F46] bg-gray-50/50">₹{txn.balance.toLocaleString()}</td>
                  <td className="p-4 text-sm text-gray-500">{txn.remarks}</td>
                  <td className="p-4 text-center">
                    <StatusBadge status={txn.status} />
                  </td>
                </tr>
              ))}
              {filteredLedger.length === 0 && (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-gray-500">
                    No transactions found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="p-4 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500 bg-gray-50">
          <span>Showing {filteredLedger.length} transactions</span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
