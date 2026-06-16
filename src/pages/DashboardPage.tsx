import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Users, UserCheck, Heart, ArrowUpRight, Award, ChevronRight, Activity, Wallet, ShieldCheck, Clock
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Button } from '../components/ui/Button';

export default function DashboardPage() {
  const navigate = useNavigate();
  const [adminUser, setAdminUser] = useState<any>(null);

  useEffect(() => {
    const sessionStr = localStorage.getItem('shukrana_session');
    if (!sessionStr) {
      navigate('/login');
      return;
    }
    setAdminUser(JSON.parse(sessionStr));
  }, [navigate]);

  if (!adminUser) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 max-w-6xl mx-auto"
    >
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
        <div>
          <h1 className="text-2xl font-bold text-[#232F46]">Dashboard Overview</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back, Demo User! Here is your account summary.</p>
        </div>
        <div className="flex gap-3">
          <Button onClick={() => navigate('/welfare/make-donation')} leftIcon={<Heart className="w-4 h-4" />}>
            Donate Now
          </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="flex flex-col relative overflow-hidden group hover:border-[#ED8C32] transition-colors cursor-pointer" onClick={() => navigate('/account/membership-status')}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <StatusBadge status="Active" />
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-1">Membership Status</p>
          <h3 className="text-xl font-bold text-[#232F46]">Verified</h3>
        </Card>

        <Card className="flex flex-col relative overflow-hidden group hover:border-[#ED8C32] transition-colors cursor-pointer" onClick={() => navigate('/account/profile-settings')}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-1">Profile Completion</p>
          <h3 className="text-xl font-bold text-[#232F46]">85%</h3>
          <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
            <div className="bg-blue-500 h-full w-[85%] rounded-full"></div>
          </div>
        </Card>

        <Card className="flex flex-col relative overflow-hidden group hover:border-[#ED8C32] transition-colors cursor-pointer" onClick={() => navigate('/network/overview')}>
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

        <Card className="flex flex-col relative overflow-hidden group hover:border-[#ED8C32] transition-colors cursor-pointer" onClick={() => navigate('/rewards/wallet-transactions')}>
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
              <Wallet className="w-6 h-6" />
            </div>
          </div>
          <p className="text-sm font-semibold text-gray-500 mb-1">Wallet Balance</p>
          <div className="flex items-end gap-2">
            <h3 className="text-2xl font-bold text-[#232F46]">₹250.00</h3>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-0 overflow-hidden">
            <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
              <h3 className="font-bold text-[#232F46] flex items-center gap-2">
                <Activity className="w-5 h-5 text-gray-400" />
                Recent Activity
              </h3>
              <Link to="/notifications" className="text-xs font-bold text-[#ED8C32] hover:text-[#ED8C32]/80 flex items-center">
                View All <ChevronRight className="w-3 h-3 ml-1" />
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {[
                { title: 'Payment Approved', time: '2 hours ago', icon: <Heart className="w-4 h-4 text-green-500" /> },
                { title: 'New Member Joined Network', time: '1 day ago', icon: <Users className="w-4 h-4 text-blue-500" /> },
                { title: 'Welcome Letter Generated', time: '2 days ago', icon: <Award className="w-4 h-4 text-[#ED8C32]" /> }
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

        {/* Right Sidebar Area */}
        <div className="space-y-6">
          <Card className="bg-[#232F46] text-white border-none relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/3"></div>
            <div className="relative z-10">
              <Award className="w-8 h-8 text-[#ED8C32] mb-4" />
              <h3 className="font-bold text-lg mb-2">Member Discount Card</h3>
              <p className="text-sm text-gray-400 mb-6 line-clamp-2">Get exclusive discounts at partner hospitals, pharmacies, and stores.</p>
              <Button 
                onClick={() => navigate('/rewards/discount-card')} 
                variant="outline" 
                className="w-full bg-white/10 hover:bg-white/20 border-white/20 text-white"
              >
                View Digital Card
              </Button>
            </div>
          </Card>

          <Card>
            <h3 className="font-bold text-[#232F46] mb-4 text-sm uppercase tracking-wide">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/account/kyc-verification" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                <span>Upload KYC Docs</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link to="/welfare/request-assistance" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                <span>Request Welfare Support</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
              <Link to="/network/direct-referrals" className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 text-sm font-medium text-gray-700 transition-colors">
                <span>View Direct Referrals</span>
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </div>
          </Card>
        </div>

      </div>
    </motion.div>
  );
}
