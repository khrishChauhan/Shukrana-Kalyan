import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  Heart, ChevronRight, Activity, Clock, ShieldCheck,
  CreditCard, Award, FileText, UserCircle, Bell, Users, UserCheck, UserPlus, Megaphone
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';
import { BenefitCard } from '../components/Dashboard/BenefitCard';
import { BenefitJourney } from '../components/Dashboard/BenefitJourney';
import { BenefitDetailModal } from '../components/Dashboard/BenefitDetailModal';
import { benefitsData, CATEGORIES, getMemberDays, Benefit } from '../data/benefitsData';
import { useTranslation } from '../context/LanguageContext';
import { supabase } from '../lib/supabase';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState<any>(null);
  const [selectedBenefit, setSelectedBenefit] = useState<Benefit | null>(null);
  const [businessData, setBusinessData] = useState<any>(null);
  const [memberStatus, setMemberStatus] = useState<string>('PENDING');
  const [loadingData, setLoadingData] = useState(true);
  const currentDays = getMemberDays();
  const { t } = useTranslation();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoadingData(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          navigate('/login');
          return;
        }

        // 1. Fetch status and profile
        const { data: memberData } = await supabase
          .from('members')
          .select('status, created_at, member_profile(full_name)')
          .eq('id', user.id)
          .single();
          
        if (memberData) {
          setMemberStatus(memberData.status);
          const profile = Array.isArray(memberData.member_profile) ? memberData.member_profile[0] : memberData.member_profile;
          setAdminUser({
            name: profile?.full_name || 'Member',
            joinDate: new Date(memberData.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
          });
        }
        
        // 2. Fetch business data
        const { data: bData } = await supabase
          .from('member_business')
          .select('carry_forward_left, carry_forward_right, total_left_bv, total_right_bv, matched_bv')
          .eq('id', user.id)
          .single();
          
        if (bData) setBusinessData(bData);
      } catch (err) {
        console.error('Error fetching dashboard data', err);
      } finally {
        setLoadingData(false);
      }
    };
    
    fetchDashboardData();
  }, [navigate]);

  if (!adminUser) return null;

  const benefitsByCategory = (category: string) =>
    benefitsData.filter((b) => b.categoryKey === category);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-8 max-w-6xl mx-auto pb-10"
    >
      {/* ─── 1. WELCOME BANNER ─────────────────────────────────────────── */}
      <Card className="text-white border-0 shadow-sm relative overflow-hidden p-6 md:p-8" style={{ backgroundColor: '#232F46' }}>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl md:text-3xl font-extrabold text-white">
              {t('dashboard.welcomeTitle')}, {adminUser.name || 'Member'}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-white/80">
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <ShieldCheck className="w-4 h-4 text-[#ED8C32]" /> {memberStatus} Member
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full cursor-pointer hover:bg-white/20 transition-colors" onClick={() => navigate('/account/kyc')}>
                <UserCheck className="w-4 h-4 text-green-400" /> KYC: 60% Complete
              </span>
              <span className="flex items-center gap-1.5 bg-white/10 px-3 py-1 rounded-full">
                <Clock className="w-4 h-4 text-[#ED8C32]" /> Joined: {adminUser.joinDate || 'Oct 15, 2023'}
              </span>
            </div>
          </div>
        </div>
      </Card>
      {/* ─── 1.5 BINARY ENGINE SNAPSHOT ─────────────────────────────────────────── */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {loadingData ? (
           <div className="col-span-full py-4 text-center text-gray-500 font-medium">Loading Business Data...</div>
        ) : (
           <>
              <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Carry Left BV</p>
                <p className="text-lg font-bold text-[#232F46]">{businessData?.carry_forward_left || 0}</p>
              </Card>
              <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Carry Right BV</p>
                <p className="text-lg font-bold text-[#ED8C32]">{businessData?.carry_forward_right || 0}</p>
              </Card>
              <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Total Matched Pairs</p>
                <p className="text-lg font-bold text-[#232F46]">{businessData?.matched_bv || 0}</p>
              </Card>
              <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Total Left BV</p>
                <p className="text-lg font-bold text-[#ED8C32]">{businessData?.total_left_bv || 0}</p>
              </Card>
              <Card className="p-4 bg-gray-50 border border-gray-100 flex flex-col justify-center">
                <p className="text-[10px] font-bold text-gray-500 uppercase mb-1">Total Right BV</p>
                <p className="text-lg font-bold text-[#232F46]">{businessData?.total_right_bv || 0}</p>
              </Card>
              <Card 
                className="p-4 bg-[#ED8C32]/10 border border-[#ED8C32]/20 hover:bg-[#ED8C32]/20 transition-colors cursor-pointer flex flex-col justify-center items-center text-center"
                onClick={() => navigate('/business/pair-matching')}
              >
                <p className="text-xs font-bold text-[#ED8C32] uppercase">Binary History</p>
                <ChevronRight className="w-5 h-5 text-[#ED8C32] mt-1" />
              </Card>
           </>
        )}
      </div>

      {/* ─── 2. MEMBERSHIP JOURNEY ─────────────────────────────────────── */}
      <BenefitJourney currentDays={currentDays} />

      {/* ─── 3. आपके 10 सदस्य लाभ ─────────────────────────────────────── */}
      <div>
        <h2 className="text-xl font-bold text-[#232F46] mb-1">{t('journey.benefitsTitle')}</h2>
        <p className="text-sm text-gray-500 mb-6">
          {t('journey.benefitsSubtitle')}
        </p>

        {CATEGORIES.map((category) => {
          const cards = benefitsByCategory(category);
          if (cards.length === 0) return null;
          return (
            <div key={category} className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <span className="w-1 h-5 rounded-full bg-[#ED8C32]" />
                <h3 className="text-base font-bold text-[#232F46]">{t(category)}</h3>
                <span className="text-xs text-gray-400 font-medium">
                  ({cards.length} {t('journey.schemesCount')})
                </span>
              </div>
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

      {/* ─── 4. QUICK ACTIONS ──────────────────────────────────────────── */}
      <div>
        <h2 className="text-lg font-bold text-[#232F46] mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <Card 
            className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:border-[#ED8C32] hover:bg-orange-50/30 transition-colors group"
            onClick={() => navigate('/account/membership-card')}
          >
            <div className="p-3 bg-gray-50 rounded-full group-hover:bg-white transition-colors mb-3">
              <CreditCard className="w-6 h-6 text-gray-500 group-hover:text-[#ED8C32]" />
            </div>
            <span className="text-xs font-bold text-gray-600 group-hover:text-[#232F46]">Membership Card</span>
          </Card>
          <Card 
            className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:border-[#ED8C32] hover:bg-orange-50/30 transition-colors group"
            onClick={() => navigate('/account/welcome-letter')}
          >
            <div className="p-3 bg-gray-50 rounded-full group-hover:bg-white transition-colors mb-3">
              <Award className="w-6 h-6 text-gray-500 group-hover:text-[#ED8C32]" />
            </div>
            <span className="text-xs font-bold text-gray-600 group-hover:text-[#232F46]">Welcome Letter</span>
          </Card>
          <Card 
            className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:border-[#ED8C32] hover:bg-orange-50/30 transition-colors group"
            onClick={() => navigate('/account/consent-letter')}
          >
            <div className="p-3 bg-gray-50 rounded-full group-hover:bg-white transition-colors mb-3">
              <FileText className="w-6 h-6 text-gray-500 group-hover:text-[#ED8C32]" />
            </div>
            <span className="text-xs font-bold text-gray-600 group-hover:text-[#232F46]">Consent Letter</span>
          </Card>
          <Card 
            className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:border-[#ED8C32] hover:bg-orange-50/30 transition-colors group"
            onClick={() => navigate('/account/profile-settings')}
          >
            <div className="p-3 bg-gray-50 rounded-full group-hover:bg-white transition-colors mb-3">
              <UserCircle className="w-6 h-6 text-gray-500 group-hover:text-[#ED8C32]" />
            </div>
            <span className="text-xs font-bold text-gray-600 group-hover:text-[#232F46]">Edit Profile</span>
          </Card>
          <Card 
            className="flex flex-col items-center justify-center p-4 text-center cursor-pointer hover:border-[#ED8C32] hover:bg-orange-50/30 transition-colors group"
            onClick={() => navigate('/notifications')}
          >
            <div className="p-3 bg-gray-50 rounded-full group-hover:bg-white transition-colors mb-3">
              <Bell className="w-6 h-6 text-gray-500 group-hover:text-[#ED8C32]" />
            </div>
            <span className="text-xs font-bold text-gray-600 group-hover:text-[#232F46]">Notifications</span>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* ─── 5. COMMUNITY OVERVIEW ─────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h3 className="font-bold text-[#232F46] mb-4 text-sm uppercase tracking-wide">
              Community Overview
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex flex-col items-center text-center">
                <Users className="w-6 h-6 text-[#ED8C32] mb-2" />
                <p className="text-2xl font-bold text-[#232F46]">12</p>
                <p className="text-xs text-gray-500 mt-1">My Referrals</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex flex-col items-center text-center">
                <UserCheck className="w-6 h-6 text-green-600 mb-2" />
                <p className="text-2xl font-bold text-[#232F46]">8</p>
                <p className="text-xs text-gray-500 mt-1">Verified Members</p>
              </div>
              <div className="p-4 bg-gray-50 border border-gray-100 rounded-xl flex flex-col items-center text-center">
                <UserPlus className="w-6 h-6 text-blue-600 mb-2" />
                <p className="text-2xl font-bold text-[#232F46]">4</p>
                <p className="text-xs text-gray-500 mt-1">Pending Members</p>
              </div>
            </div>
            <div className="mt-5 text-center">
              <Button
                variant="outline"
                onClick={() => navigate('/network/overview')}
                size="sm"
              >
                View Community
              </Button>
            </div>
          </Card>

          {/* ─── 6. RECENT ACTIVITY TIMELINE ───────────────────────────────── */}
          <Card className="p-0 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-[#232F46] flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-400" />
                {t('dashboard.recentActivity')}
              </h3>
              <Link
                to="/account/activity-timeline"
                className="text-xs font-bold text-[#ED8C32] hover:text-[#D97A24] flex items-center"
              >
                {t('dashboard.viewAll')} <ChevronRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                {
                  title: t('timeline.paymentApproved'),
                  time: `2 ${t('timeline.hoursAgo')}`,
                  icon: <Heart className="w-4 h-4 text-green-500" />,
                },
                {
                  title: t('timeline.newMember'),
                  time: `1 ${t('timeline.dayAgo')}`,
                  icon: <Users className="w-4 h-4 text-blue-500" />,
                },
                {
                  title: t('timeline.welcomeLetter'),
                  time: `2 ${t('timeline.daysAgo')}`,
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
        </div>

        {/* ─── 7. ANNOUNCEMENTS ──────────────────────────────────────────── */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="p-5 border-b border-gray-100 bg-[#232F46] text-white">
              <h3 className="font-bold flex items-center gap-2">
                <Megaphone className="w-5 h-5 text-[#ED8C32]" />
                Announcements
              </h3>
            </div>
            <div className="p-5 space-y-4 bg-white">
              <div className="border-l-2 border-[#ED8C32] pl-3">
                <p className="text-xs text-gray-400 font-medium mb-1">June 20, 2026</p>
                <h4 className="text-sm font-bold text-[#232F46] leading-tight mb-1">Upcoming Health Camp in Mumbai</h4>
                <p className="text-xs text-gray-500 line-clamp-2">Join us for the free health checkup camp organized for all verified NGO members and their families.</p>
              </div>
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="text-xs text-gray-400 font-medium mb-1">June 15, 2026</p>
                <h4 className="text-sm font-bold text-[#232F46] leading-tight mb-1">New Education Grants Available</h4>
                <p className="text-xs text-gray-500 line-clamp-2">Applications for the newly introduced girl child education fund are now open for the current academic year.</p>
              </div>
              <div className="border-l-2 border-gray-200 pl-3">
                <p className="text-xs text-gray-400 font-medium mb-1">June 01, 2026</p>
                <h4 className="text-sm font-bold text-gray-600 leading-tight mb-1">Digital Literacy Program Wrap-up</h4>
                <p className="text-xs text-gray-500 line-clamp-2">Over 500 members successfully completed the basic digital skills course this May.</p>
              </div>
            </div>
            <div className="p-3 border-t border-gray-100 bg-gray-50 text-center">
              <Button variant="outline" size="sm" className="w-full">
                View All Announcements
              </Button>
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
