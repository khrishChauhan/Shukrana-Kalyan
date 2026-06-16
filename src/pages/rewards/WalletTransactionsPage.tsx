import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { ArrowDownLeft, ArrowUpRight, Wallet } from 'lucide-react';

export default function WalletTransactionsPage() {
  const transactions = [
    { id: 'TX-901', type: 'credit', amount: '₹150', desc: 'Referral Reward (SK0002)', date: 'Oct 11, 2023' },
    { id: 'TX-902', type: 'debit', amount: '₹50', desc: 'Card Upgrade Fee', date: 'Oct 12, 2023' },
    { id: 'TX-903', type: 'credit', amount: '₹150', desc: 'Referral Reward (SK0004)', date: 'Oct 13, 2023' },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Wallet & Transactions"
        description="View your referral rewards and wallet balance."
        breadcrumbs={[{ label: 'Rewards & Benefits' }, { label: 'Wallet & Transactions' }]}
      />

      <Card className="mb-8 bg-gray-50 border-gray-200">
        <div className="flex items-center gap-4">
          <div className="p-4 bg-[#ED8C32] text-white rounded-xl">
            <Wallet className="w-8 h-8" />
          </div>
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-1">Available Balance</p>
            <h2 className="text-4xl font-extrabold text-[#232F46]">₹250.00</h2>
          </div>
        </div>
      </Card>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactions.map(t => (
            <TableRow key={t.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${t.type === 'credit' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {t.type === 'credit' ? <ArrowDownLeft className="w-4 h-4" /> : <ArrowUpRight className="w-4 h-4" />}
                  </div>
                  <span className="font-mono text-xs text-gray-500">{t.id}</span>
                </div>
              </TableCell>
              <TableCell className="font-medium text-[#232F46]">{t.desc}</TableCell>
              <TableCell className="text-gray-500">{t.date}</TableCell>
              <TableCell className={`text-right font-bold ${t.type === 'credit' ? 'text-green-600' : 'text-[#232F46]'}`}>
                {t.type === 'credit' ? '+' : '-'}{t.amount}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
