import React, { useState } from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Heart, Building2, GraduationCap, Stethoscope } from 'lucide-react';

export default function MakeDonationPage() {
  const [amount, setAmount] = useState('1000');
  
  const causes = [
    { id: 'general', title: 'General Welfare Fund', icon: <Building2 className="w-6 h-6" />, desc: 'Supports all foundation activities.' },
    { id: 'education', title: 'Education Support', icon: <GraduationCap className="w-6 h-6" />, desc: 'Helps underprivileged students.' },
    { id: 'medical', title: 'Healthcare Initiative', icon: <Stethoscope className="w-6 h-6" />, desc: 'Provides medical aid to members.' },
  ];

  const presets = ['500', '1000', '2500', '5000'];

  return (
    <div className="max-w-4xl mx-auto">
      <PageHeader
        title="Make a Donation"
        description="Support our causes. All donations are eligible for 80G Tax Exemption."
        breadcrumbs={[{ label: 'Donations & Welfare' }, { label: 'Make Donation' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-lg font-bold text-[#232F46]">1. Select Cause</h3>
          {causes.map(cause => (
            <Card key={cause.id} className="cursor-pointer hover:border-[#ED8C32] transition-colors p-4">
              <div className="flex gap-4">
                <div className="p-3 bg-gray-50 rounded-xl text-gray-500 shrink-0">
                  {cause.icon}
                </div>
                <div>
                  <h4 className="font-bold text-[#232F46]">{cause.title}</h4>
                  <p className="text-sm text-gray-500 mt-1">{cause.desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="space-y-6">
          <h3 className="text-lg font-bold text-[#232F46]">2. Select Amount</h3>
          <Card className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
              {presets.map(p => (
                <button
                  key={p}
                  onClick={() => setAmount(p)}
                  className={`py-3 rounded-lg border font-bold text-sm transition-colors ${
                    amount === p 
                      ? 'bg-[#ED8C32] text-white border-[#ED8C32]' 
                      : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  ₹{p}
                </button>
              ))}
            </div>

            <div className="mb-6">
              <Input 
                label="Custom Amount (₹)" 
                type="number" 
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                leftIcon={<span className="font-bold text-gray-500">₹</span>}
              />
            </div>

            <Button fullWidth size="lg" leftIcon={<Heart className="w-5 h-5" />}>
              Donate ₹{amount}
            </Button>
            
            <p className="text-xs text-center text-gray-400 mt-4">
              Secured by Razorpay. You will be redirected to the payment gateway.
            </p>
          </Card>
        </div>
      </div>
    </div>
  );
}
