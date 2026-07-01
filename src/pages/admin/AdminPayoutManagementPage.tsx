import React, { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';
import { Search, Check, X, RefreshCw, FileText } from 'lucide-react';
import { Input } from '../../components/ui/Input';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../../components/ui/Table';
import { Skeleton } from '../../components/ui/Skeleton';
import { EmptyState } from '../../components/ui/EmptyState';
import { PageHeader } from '../../components/ui/PageHeader';
import { supabase } from '../../lib/supabase';

interface PayoutRequest {
  id: string;
  member_uuid: string;
  member_id: string;
  member_name: string;
  requested_amount: number;
  tds_deduction: number;
  admin_charge: number;
  net_payable: number;
  status: string;
  created_at: string;
}

export default function AdminPayoutManagementPage() {
  const [requests, setRequests] = useState<PayoutRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchPayouts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('withdrawal_requests')
        .select(`
          id, member_uuid, requested_amount, tds_deduction, admin_charge, net_payable, status, created_at,
          members ( member_id ),
          member_profile ( full_name )
        `)
        .eq('status', 'PENDING')
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const formatted = (data || []).map((req: any) => ({
        ...req,
        member_id: req.members?.member_id,
        member_name: req.member_profile?.full_name
      }));
      setRequests(formatted);
    } catch (e: any) {
      console.error('Failed to fetch payouts:', e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayouts();
  }, [fetchPayouts]);

  const handleProcess = async (id: string) => {
    const utr = window.prompt("Enter UTR/Transaction Reference Number for this payout:");
    if (!utr) return;

    setProcessingId(id);
    try {
      const { error } = await supabase.rpc('admin_process_withdrawal', {
        p_withdrawal_id: id,
        p_status: 'PROCESSED',
        p_utr_number: utr,
        p_admin_note: 'Processed manually via Admin UI'
      });
      if (error) throw error;
      alert('Payout processed successfully.');
      fetchPayouts();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    const reason = window.prompt("Enter rejection reason (Funds will be refunded to member):");
    if (!reason) return;

    setProcessingId(id);
    try {
      const { error } = await supabase.rpc('admin_process_withdrawal', {
        p_withdrawal_id: id,
        p_status: 'REJECTED',
        p_utr_number: null,
        p_admin_note: reason
      });
      if (error) throw error;
      alert('Payout rejected and funds refunded.');
      fetchPayouts();
    } catch (e: any) {
      alert(`Error: ${e.message}`);
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className="space-y-6 max-w-7xl mx-auto pb-10"
    >
      <PageHeader
        title="Payout Management"
        description="Review and process pending withdrawal requests."
        breadcrumbs={[{ label: 'Operations' }, { label: 'Payouts' }]}
        action={
          <Button leftIcon={<RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />} variant="outline" onClick={fetchPayouts}>
            Refresh
          </Button>
        }
      />

      <Card noPadding className="overflow-hidden">
        <div className="bg-white">
          {loading ? (
            <div className="p-5 space-y-4">
              {[1, 2, 3].map(i => <Skeleton key={i} className="w-full h-12 rounded-lg" />)}
            </div>
          ) : requests.length === 0 ? (
            <EmptyState title="No pending payouts" description="All withdrawal requests have been processed." />
          ) : (
            <div className="overflow-x-auto">
              <Table className="border-none shadow-none rounded-none w-full whitespace-nowrap">
                <TableHeader className="bg-white">
                  <TableRow>
                    <TableHead>Date Requested</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Requested Amount</TableHead>
                    <TableHead>Deductions (TDS/Admin)</TableHead>
                    <TableHead>Net Payable</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {requests.map(req => (
                    <TableRow key={req.id} className="hover:bg-gray-50/50 transition-colors">
                      <TableCell className="text-gray-500 text-xs">
                        {new Date(req.created_at).toLocaleString()}
                      </TableCell>
                      <TableCell>
                        <div className="font-bold text-[#232F46] text-sm">{req.member_name}</div>
                        <div className="font-mono text-xs text-[#ED8C32]">{req.member_id}</div>
                      </TableCell>
                      <TableCell className="font-mono text-gray-500">
                        ₹{req.requested_amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="font-mono text-gray-500 text-xs">
                        -₹{req.tds_deduction.toFixed(2)} (TDS)<br/>
                        -₹{req.admin_charge.toFixed(2)} (Admin)
                      </TableCell>
                      <TableCell>
                        <div className="font-bold font-mono text-green-600 text-lg">
                          ₹{req.net_payable.toFixed(2)}
                        </div>
                      </TableCell>
                      <TableCell className="space-x-2">
                        <Button 
                          size="sm" 
                          variant="primary" 
                          leftIcon={<Check className="w-4 h-4" />}
                          onClick={() => handleProcess(req.id)}
                          disabled={processingId === req.id}
                        >
                          Process
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          leftIcon={<X className="w-4 h-4" />}
                          onClick={() => handleReject(req.id)}
                          disabled={processingId === req.id}
                        >
                          Reject
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Card>
    </motion.div>
  );
}
