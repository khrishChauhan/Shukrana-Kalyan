import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { StatusBadge } from '../../components/ui/StatusBadge';

export default function DonationHistoryPage() {
  const history = [
    { id: 'TXN-001', date: 'Oct 15, 2023', cause: 'Activation Fee', amount: '₹500', status: 'Active', receipt: true },
    { id: 'TXN-002', date: 'Nov 01, 2023', cause: 'Education Support', amount: '₹1,500', status: 'Active', receipt: true },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Donation History"
        description="View your past contributions."
        breadcrumbs={[{ label: 'Donations & Welfare' }, { label: 'Donation History' }]}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Transaction ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Cause / Purpose</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {history.map(row => (
            <TableRow key={row.id}>
              <TableCell className="font-mono text-xs">{row.id}</TableCell>
              <TableCell>{row.date}</TableCell>
              <TableCell className="font-medium text-[#232F46]">{row.cause}</TableCell>
              <TableCell className="font-bold">{row.amount}</TableCell>
              <TableCell><StatusBadge status={row.status as any} /></TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
