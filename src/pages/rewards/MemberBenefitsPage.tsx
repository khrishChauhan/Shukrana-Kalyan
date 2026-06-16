import React from 'react';
import { PageHeader } from '../../components/ui/PageHeader';
import { Card } from '../../components/ui/Card';
import { Gift, Heart, Shield, Landmark } from 'lucide-react';

export default function MemberBenefitsPage() {
  const benefits = [
    {
      id: 1,
      title: 'Healthcare Subsidies',
      desc: 'Up to 50% off on partner hospitals and 15% off on pharmacy purchases using your Discount Card.',
      icon: <Heart className="w-8 h-8 text-red-500" />,
      color: 'bg-red-50',
    },
    {
      id: 2,
      title: 'Education Grants',
      desc: 'Eligible for yearly scholarships and tuition assistance for children of active members.',
      icon: <Landmark className="w-8 h-8 text-blue-500" />,
      color: 'bg-blue-50',
    },
    {
      id: 3,
      title: 'Emergency Relief',
      desc: 'Priority access to the Jeevandaan Samriddhi emergency fund in case of accidents or natural disasters.',
      icon: <Shield className="w-8 h-8 text-green-500" />,
      color: 'bg-green-50',
    },
    {
      id: 4,
      title: 'Referral Rewards',
      desc: 'Earn credits in your wallet for every successful verified member you bring into the foundation.',
      icon: <Gift className="w-8 h-8 text-[#ED8C32]" />,
      color: 'bg-orange-50',
    }
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <PageHeader
        title="Member Benefits"
        description="Discover the advantages and support available to you as an active member."
        breadcrumbs={[{ label: 'Rewards & Benefits' }, { label: 'Member Benefits' }]}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {benefits.map(b => (
          <Card key={b.id} className="flex gap-6 items-start">
            <div className={`p-4 rounded-2xl shrink-0 ${b.color}`}>
              {b.icon}
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#232F46] mb-2">{b.title}</h3>
              <p className="text-sm text-gray-600 leading-relaxed">{b.desc}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
