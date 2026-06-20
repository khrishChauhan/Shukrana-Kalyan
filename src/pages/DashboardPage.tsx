import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Users, UserCheck, Heart, ArrowUpRight, Award,
  ChevronRight, Activity, ShieldCheck, Clock,
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { BenefitCard } from '../components/Dashboard/BenefitCard';
import { BenefitJourney } from '../components/Dashboard/BenefitJourney';
import { BenefitDetailModal } from '../components/Dashboard/BenefitDetailModal';
import { benefitsData, CATEGORIES, getMemberDays, Benefit } from '../data/benefitsData';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const currentDays = getMemberDays();

  useEffect(() => {
    const sessionStr = localStorage.getItem('shukrana_session');
    if (!sessionStr) {
      navigate('/login');
      return;
    }
    setAdminUser(JSON.parse(sessionStr));
  }, [navigate]);

  if (!adminUser) return null;

  const benefitsByCategory = (category: string) =>
    benefitsData.filter((b) => b.category === category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 max-w-6xl mx-auto"
    >

      {/* ─── 1. WELCOME BANNER ─────────────────────────────────────────── */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#232F46]">नमस्ते, Demo User! 🙏</h1>
          <p className="text-sm text-gray-500 mt-1">
            आपके Shukrana Kalyan Sangh सदस्य पोर्टल में आपका स्वागत है।
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => navigate('/welfare/make-donation')}
            leftIcon={<Heart className="w-4 h-4" />}
          >
            Donate Now
          </Button>
        </div>
      </div>

      {/* ─── 2. MEMBERSHIP STATUS KPI CARDS ────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          className="flex flex-col hover:border-[#ED8C32] transition-colors cursor-pointer"
          onClick={() => navigate('/account/membership-status')}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <StatusBadge status="Active" />
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-1">Membership Status</p>
          <h3 className="text-xl font-bold text-[#232F46]">Verified</h3>
        </Card>

        <Card
          className="flex flex-col hover:border-[#ED8C32] transition-colors cursor-pointer"
          onClick={() => navigate('/account/profile-settings')}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-1">Profile Completion</p>
          <h3 className="text-xl font-bold text-[#232F46]">85%</h3>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-500 h-full w-[85%] rounded-full" />
          </div>
        </Card>

        <Card
          className="flex flex-col hover:border-[#ED8C32] transition-colors cursor-pointer"
          onClick={() => navigate('/network/overview')}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-[#ED8C32] rounded-xl">
              <Users className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-1">Network Members</p>
          <div className="flex items-end gap-2">
            <h3 className="text-2xl font-bold text-[#232F46]">45</h3>
            <span className="text-xs font-medium text-green-600 mb-1">+3 this week</span>
          </div>
        </Card>

        <Card
          className="flex flex-col hover:border-[#ED8C32] transition-colors cursor-pointer"
          onClick={() => navigate('/account/membership-status')}
        >
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-[#ED8C32] rounded-xl">
              <Award className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-1">सदस्य दिन</p>
          <div className="flex items-end gap-2">
            <h3 className="text-2xl font-bold text-[#232F46]">{currentDays}</h3>
            <span className="text-xs font-medium text-gray-400 mb-1">दिन</span>
          </div>
        </Card>
      </div>

      {/* ─── 3. BENEFIT JOURNEY ─────────────────────────────────────────── */}
      <BenefitJourney currentDays={currentDays} />

      {/* ─── 4. आपके 10 सदस्य लाभ ─────────────────────────────────────── */}
      <div>
        <h2 className="text-xl font-bold text-[#232F46] mb-1">आपके 10 सदस्य लाभ</h2>
        <p className="text-sm text-gray-500 mb-6">
          किसी भी योजना पर क्लिक करें और पूरी जानकारी देखें।
        </p>

        {CATEGORIES.map((category) => {
          const cards = benefitsByCategory(category);
          if (cards.length === 0) return null;
          return (
            <div key={category} className="mb-8">
              {/* Category heading — rendered directly, no BenefitCategoryGroup component */}
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-5 rounded-full bg-[#ED8C32]" />
                <h3 className="text-base font-bold text-[#232F46]">{category}</h3>
                <span className="text-xs text-gray-400 font-medium">
                  ({cards.length} योजनाएं)
                </span>
              </div>

              {/* Responsive grid — 1 col → 2 cols → 5 cols */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-4 items-stretch">
                {cards.map((benefit) => (
                  <BenefitCard
                    key={benefit.id}
                    benefit={benefit}
                    currentDays={currentDays}
                    onClick={setSelectedBenefit}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── 5. RECENT ACTIVITY TIMELINE ───────────────────────────────── */}
      <Card className="p-0 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <h3 className="font-bold text-[#232F46] flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-400" />
            Recent Activity
          </h3>
          <Link
            to="/notifications"
            className="text-xs font-bold text-[#ED8C32] hover:text-[#ED8C32]/80 flex items-center"
          >
            View All <ChevronRight className="w-3 h-3 ml-1" />
          </Link>
        </div>
        <div className="divide-y divide-gray-100">
          {[
            {
              title: 'Payment Approved',
              time: '2 hours ago',
              icon: <Heart className="w-4 h-4 text-green-500" />,
            },
            {
              title: 'New Member Joined Network',
              time: '1 day ago',
              icon: <Users className="w-4 h-4 text-blue-500" />,
            },
            {
              title: 'Welcome Letter Generated',
              time: '2 days ago',
              icon: <Award className="w-4 h-4 text-[#ED8C32]" />,
            },
          ].map((activity, i) => (
            <div key={i} className="p-4 hover:bg-gray-50 transition-colors flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                {activity.icon}
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-[#232F46]">{activity.title}</h4>
                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5">
                  <Clock className="w-3 h-3" /> {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ─── 6. MEMBER NETWORK OVERVIEW ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="font-bold text-[#232F46] mb-4 text-sm uppercase tracking-wide">
            Member Network Overview
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              { label: 'Direct Members', value: '12', color: 'text-[#ED8C32]' },
              { label: 'Team Size', value: '45', color: 'text-blue-600' },
              { label: 'Active This Month', value: '8', color: 'text-green-600' },
            ].map((stat, i) => (
              <div key={i} className="p-4 bg-gray-50 border border-gray-200 rounded-xl">
                <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              onClick={() => navigate('/network/overview')}
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
            >
              View Full Network
            </Button>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="bg-[#232F46] text-white border-none">
            <Award className="w-8 h-8 text-[#ED8C32] mb-4" />
            <h3 className="font-bold text-lg mb-2">Quick Links</h3>
            <div className="space-y-2 mt-4">
              <Link
                to="/account/kyc-verification"
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 text-sm font-medium text-gray-300 transition-colors"
              >
                <span>KYC Verification</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/welfare/request-assistance"
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 text-sm font-medium text-gray-300 transition-colors"
              >
                <span>Request Welfare Support</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link
                to="/network/direct-referrals"
                className="flex items-center justify-between p-2.5 rounded-lg hover:bg-white/10 text-sm font-medium text-gray-300 transition-colors"
              >
                <span>Direct Referrals</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* ─── BENEFIT DETAIL MODAL ───────────────────────────────────────── */}
      <BenefitDetailModal
        benefit={selectedBenefit}
        currentDays={currentDays}
        onClose={() => setSelectedBenefit(null)}
      />
    </motion.div>
  );
}
