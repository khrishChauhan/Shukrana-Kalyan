import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { ShieldCheck, Calendar, CreditCard, Activity } from 'lucide-react';

export default function MembershipStatus() {
  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Membership Status"
        description="View your current membership standing and activation details."
        breadcrumbs={[
          { label: 'My Account' },
          { label: 'Membership Status' }
        ]}
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Main Status Card */}
        <div className="md:col-span-2">
          <Card className="h-full bg-gradient-to-br from-[#232F46] to-[#1A2333] text-white border-0">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-mono text-white/60 uppercase tracking-widest mb-1">Current Status</p>
                <div className="flex items-center gap-3">
                  <h2 className="text-3xl font-bold">Active Member</h2>
                  <StatusBadge status="Active" className="bg-green-500/20 text-green-400 border-green-500/30" />
                </div>
              </div>
              <div className="p-3 bg-white/10 rounded-xl">
                <ShieldCheck className="w-8 h-8 text-[#ED8C32]" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
              <div>
                <p className="text-xs text-white/60 mb-1">Member ID</p>
                <p className="font-mono font-bold">SK000123</p>
              </div>
              <div>
                <p className="text-xs text-white/60 mb-1">Join Date</p>
                <p className="font-medium">October 15, 2023</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Quick Actions / Info */}
        <div className="space-y-6">
          <Card className="flex items-center gap-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-lg shrink-0">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#232F46]">Lifetime Validity</p>
              <p className="text-xs text-gray-500">No renewal required</p>
            </div>
          </Card>

          <Card className="flex items-center gap-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-lg shrink-0">
              <CreditCard className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-bold text-[#232F46]">ID Card Ready</p>
              <a href="/account/membership-card" className="text-xs text-[#ED8C32] font-semibold hover:underline">Download now</a>
            </div>
          </Card>
        </div>
      </div>

      <Card>
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-[#232F46]">Status History</h3>
        </div>
        <div className="p-0">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase text-gray-500">
              <tr>
                <th className="px-6 py-4 font-bold">Date</th>
                <th className="px-6 py-4 font-bold">Event</th>
                <th className="px-6 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-6 py-4 text-gray-600">Oct 16, 2023</td>
                <td className="px-6 py-4 font-medium text-[#232F46]">Payment Verified</td>
                <td className="px-6 py-4"><StatusBadge status="Active" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-600">Oct 15, 2023</td>
                <td className="px-6 py-4 font-medium text-[#232F46]">Payment Submitted</td>
                <td className="px-6 py-4"><StatusBadge status="Pending Verification" /></td>
              </tr>
              <tr>
                <td className="px-6 py-4 text-gray-600">Oct 15, 2023</td>
                <td className="px-6 py-4 font-medium text-[#232F46]">Account Registered</td>
                <td className="px-6 py-4"><StatusBadge status="Pending Approval" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
