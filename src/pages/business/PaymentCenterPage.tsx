import React, { useState } from 'react';
import { motion } from 'motion/react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { StatusBadge } from '../../components/ui/StatusBadge';
import { CreditCard, Upload, CheckCircle, ShieldCheck, AlertCircle } from 'lucide-react';

export default function PaymentCenterPage() {
  const [utr, setUtr] = useState('');
  
  const paymentState = {
    membershipAmount: 500,
    paymentStatus: 'Pending',
    currentUtr: '',
    verificationStatus: 'Awaiting Proof',
    timeline: [
      { step: 'Submit Payment Details', date: 'Pending', status: 'Pending' },
      { step: 'Admin Verification', date: '-', status: 'Pending' },
      { step: 'Account Activation', date: '-', status: 'Pending' },
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-6xl mx-auto pb-10 space-y-6"
    >
      <PageHeader
        title="Payment Center"
        description="Verify your membership payment by uploading your transaction proof."
        breadcrumbs={[{ label: 'Account' }, { label: 'Payment Center' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Membership Amount</p>
          <p className="text-2xl font-black text-[#232F46]">₹{paymentState.membershipAmount.toLocaleString()}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Payment Status</p>
          <div className="mt-1"><StatusBadge status={paymentState.paymentStatus as any} /></div>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Current UTR</p>
          <p className="text-lg font-mono text-gray-700">{paymentState.currentUtr || 'N/A'}</p>
        </Card>
        <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-1">Verification</p>
          <p className="text-sm font-bold text-[#ED8C32]">{paymentState.verificationStatus}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h3 className="font-bold text-[#232F46] flex items-center gap-2">
              <Upload className="w-5 h-5 text-gray-400" /> Upload Verification
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Transaction UTR / Ref Number</label>
                <input 
                  type="text"
                  value={utr}
                  onChange={(e) => setUtr(e.target.value)}
                  placeholder="e.g. UPI Ref No. or Bank UTR"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]"
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Payment Method</label>
                <select className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]">
                  <option>UPI</option>
                  <option>NEFT / IMPS</option>
                  <option>Cash Deposit</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date of Payment</label>
                <input 
                  type="date"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#ED8C32]"
                />
              </div>
            </div>

            <div className="flex flex-col">
              <label className="block text-sm font-bold text-gray-700 mb-2">Upload Screenshot</label>
              <div className="flex-1 border-2 border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center p-6 text-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm font-bold text-[#232F46]">Click to upload proof</p>
                <p className="text-xs text-gray-500 mt-1">JPEG, PNG or PDF (Max 5MB)</p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <Button className="bg-[#232F46] hover:bg-[#1a2333] text-white px-8" onClick={() => alert('Payment submission pending API integration.')}>
              Submit for Verification
            </Button>
          </div>
        </Card>

        <Card className="bg-[#232F46] text-white">
          <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-6">
            <ShieldCheck className="w-5 h-5 text-[#ED8C32]" />
            <h3 className="font-bold text-white">Verification Timeline</h3>
          </div>

          <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-white/20 before:via-white/20 before:to-transparent">
            {paymentState.timeline.map((step, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#232F46] shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow ${
                  step.status === 'Completed' ? 'bg-green-500 text-white' : 
                  step.status === 'Active' ? 'bg-[#ED8C32] text-white' : 'bg-gray-600 text-gray-400'
                }`}>
                  {step.status === 'Completed' ? <CheckCircle className="w-4 h-4" /> : <span className="text-xs font-bold">{i + 1}</span>}
                </div>
                
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-white/10 bg-white/5">
                  <div className="flex flex-col">
                    <h4 className={`font-bold text-sm ${step.status === 'Pending' ? 'text-gray-400' : 'text-white'}`}>{step.step}</h4>
                    <p className="text-xs text-white/50 mt-1">{step.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#ED8C32] shrink-0 mt-0.5" />
            <p className="text-xs text-white/70">
              Account activation usually takes 24-48 working hours after payment verification. Providing correct UTR ensures faster processing.
            </p>
          </div>
        </Card>
      </div>
    </motion.div>
  );
}
