/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Award, LayoutDashboard, UserCheck, Landmark, Wallet, CreditCard, Heart, 
  TrendingUp, Sparkles, MessageSquare, Users, Globe, ArrowLeftRight, 
  ClipboardList, HelpCircle, ArrowUpRight, Settings, LogOut, ChevronLeft, 
  ChevronRight, ChevronDown, Check
} from 'lucide-react';

export interface SubmenuItem {
  name: string;
  path: string;
}

export interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  path?: string; // Direct link
  submenus?: SubmenuItem[];
}

export const SIDEBAR_STRUCTURE: MenuItem[] = [
  {
    name: 'Dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    name: 'Account',
    icon: UserCheck,
    submenus: [
      { name: 'Activity Tracker', path: '/account/activity-tracker' },
      { name: 'KYC Verification', path: '/account/kyc-verification' },
      { name: 'Change Password', path: '/account/change-password' },
      { name: 'Consent Letter', path: '/account/consent-letter' },
      { name: 'Welcome Letter', path: '/account/welcome-letter' },
      { name: 'Edit Profile', path: '/account/edit-profile' },
      { name: 'ID Card', path: '/account/id-card' },
      { name: 'Upload KYC', path: '/account/upload-kyc' },
      { name: 'Transaction Password', path: '/account/transaction-password' }
    ]
  },
  {
    name: 'Bhavishya Nidhi',
    icon: Landmark,
    submenus: [
      { name: 'Income To Bhavishya Nidhi', path: '/bhavishya-nidhi/income' },
      { name: 'Activation To Bhavishya Nidhi', path: '/bhavishya-nidhi/activation' }
    ]
  },
  {
    name: 'Deposit',
    icon: Wallet,
    submenus: [
      { name: 'Activate Now', path: '/deposit/activate' },
      { name: 'Member Donation Wallet', path: '/deposit/member-donation-wallet' },
      { name: 'Wallet Statement', path: '/deposit/wallet-statement' },
      { name: 'Request Donation', path: '/deposit/request-donation' },
      { name: 'Deposit INR', path: '/deposit/deposit-inr' }
    ]
  },
  {
    name: 'Discount Card',
    icon: CreditCard,
    submenus: [
      { name: 'Discount Card', path: '/discount-card/view' },
      { name: 'Card Upgrade Deduction', path: '/discount-card/upgrade-deduction' },
      { name: 'Card Income', path: '/discount-card/income' },
      { name: 'Buy Discount Card', path: '/discount-card/buy' }
    ]
  },
  {
    name: 'Donation',
    icon: Heart,
    submenus: [
      { name: 'Donate Now', path: '/donation/donate' },
      { name: 'Donation Razorpay History', path: '/donation/razorpay-history' },
      { name: 'Donation Razorpay', path: '/donation/razorpay' },
      { name: 'Request Donation', path: '/donation/request' }
    ]
  },
  {
    name: 'Income',
    icon: TrendingUp,
    submenus: [
      { name: 'Level Income', path: '/income/level' },
      { name: 'Matching Income', path: '/income/matching' },
      { name: 'Income Detail', path: '/income/detail' },
      { name: 'Running Income', path: '/income/running' },
      { name: 'Income Statement', path: '/income/statement' }
    ]
  },
  {
    name: 'Jivandaan Samriddhi',
    icon: Sparkles,
    submenus: [
      { name: 'Activate Now', path: '/jivandaan/activate' },
      { name: 'Activation To Jivandaan', path: '/jivandaan/activation' },
      { name: 'Jivandaan Samriddhi', path: '/jivandaan/samriddhi' }
    ]
  },
  {
    name: 'Message',
    icon: MessageSquare,
    submenus: [
      { name: 'Message', path: '/message' }
    ]
  },
  {
    name: 'My Team',
    icon: Users,
    submenus: [
      { name: 'My Left Downline', path: '/my-team/left-downline' },
      { name: 'Left Downline Paid', path: '/my-team/left-downline-paid' },
      { name: 'Level Wise Downline', path: '/my-team/level-wise' },
      { name: 'Tree View', path: '/my-team/tree-view' },
      { name: 'Right Downline', path: '/my-team/right-downline' },
      { name: 'Right Downline Paid', path: '/my-team/right-downline-paid' },
      { name: 'My Direct Member', path: '/my-team/direct-member' }
    ]
  },
  {
    name: 'Online Payment',
    icon: Globe,
    path: '/online-payment'
  },
  {
    name: 'Payment',
    icon: ArrowLeftRight,
    submenus: [
      { name: 'Transaction', path: '/payment/transaction' },
      { name: 'Income To Activation', path: '/payment/income-to-activation' }
    ]
  },
  {
    name: 'Project Fund',
    icon: ClipboardList,
    submenus: [
      { name: 'Request Grantee', path: '/project-fund/request-grantee' },
      { name: 'Fund Status', path: '/project-fund/status' },
      { name: 'My Fund', path: '/project-fund/my-fund' },
      { name: 'Grantee Verification', path: '/project-fund/verification' },
      { name: 'Fund Repayment', path: '/project-fund/repayment' },
      { name: 'Project Fund (P2P)', path: '/project-fund/p2p' },
      { name: 'Income To Project Fund', path: '/project-fund/income-to-fund' }
    ]
  },
  {
    name: 'Support',
    icon: HelpCircle,
    submenus: [
      { name: 'My Complaint', path: '/support/complaint' },
      { name: 'My Suggestion', path: '/support/suggestion' },
      { name: 'Seminar & Meeting', path: '/support/seminar-meeting' }
    ]
  },
  {
    name: 'Withdraw',
    icon: ArrowUpRight,
    submenus: [
      { name: 'Withdrawal Request', path: '/withdraw/request' }
    ]
  },
  {
    name: 'Settings',
    icon: Settings,
    submenus: [
      { name: 'General Settings', path: '/settings/general' },
      { name: 'Profile Settings', path: '/settings/profile' }
    ]
  }
];

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  onCloseMobile?: () => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed, onCloseMobile }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Parse active route to auto-expand parent menu item on load
  useEffect(() => {
    const currentPath = location.pathname;
    const activeSection = SIDEBAR_STRUCTURE.find(item => {
      if (item.submenus) {
        return item.submenus.some(sub => sub.path === currentPath);
      }
      return false;
    });

    if (activeSection) {
      setOpenSections(prev => ({
        ...prev,
        [activeSection.name]: true
      }));
    }
  }, [location.pathname]);

  const toggleSection = (name: string) => {
    // If sidebar collapsed, expand it first for optimal user view
    if (isCollapsed) {
      setIsCollapsed(false);
    }
    setOpenSections(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };

  const handleLogout = () => {
    localStorage.removeItem('shukrana_session');
    navigate('/login');
    if (onCloseMobile) onCloseMobile();
  };

  const isCurrentRouteActive = (item: MenuItem): boolean => {
    if (item.path) {
      return location.pathname === item.path;
    }
    if (item.submenus) {
      return item.submenus.some(sub => sub.path === location.pathname);
    }
    return false;
  };

  return (
    <aside 
      className={`bg-slate-950 text-slate-300 flex flex-col h-full z-45 transition-all duration-300 shrink-0 border-r border-slate-900 ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* 1. Header Logo banner */}
      <div className="p-4 flex items-center gap-3 border-b border-slate-900 overflow-hidden relative min-h-[73px]">
        <div className="p-1.5 bg-amber-400 rounded-xl text-slate-950 flex items-center justify-center shrink-0">
          <Award className="h-5 w-5 stroke-[2.2]" />
        </div>
        {!isCollapsed && (
          <div className="text-left">
            <span className="block font-bold tracking-tight text-white text-[13px] uppercase leading-tight font-display">
              SHUKRANA KALYAN
            </span>
            <span className="block text-[8px] text-amber-400 uppercase tracking-widest font-mono font-bold leading-none mt-0.5">
              Foundation Desk
            </span>
          </div>
        )}
      </div>

      {/* 2. Desktop expand/collapse toggle panel */}
      <div className="hidden sm:flex justify-end p-2 border-b border-slate-900 bg-slate-900/40">
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg mx-auto cursor-pointer"
          title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      {/* 3. Main accordion navigation elements */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto custom-scrollbar">
        {SIDEBAR_STRUCTURE.map((item) => {
          const IconComp = item.icon;
          const isParentActive = isCurrentRouteActive(item);
          const hasSubmenus = !!item.submenus;
          const isSectionOpen = !!openSections[item.name];

          if (!hasSubmenus && item.path) {
            // Direct Link (Dashboard, Online Payment)
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onCloseMobile}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all cursor-pointer ${
                  isParentActive 
                    ? 'bg-amber-400/10 text-brand-gold border-l-[3.5px] border-brand-gold font-semibold' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-900 border-l-[3.5px] border-transparent'
                }`}
              >
                <IconComp className={`h-4.5 w-4.5 shrink-0 ${isParentActive ? 'text-brand-gold' : 'text-slate-500'}`} />
                {!isCollapsed && <span className="truncate">{item.name}</span>}
              </Link>
            );
          }

          // Accordion Item with Submenus
          return (
            <div key={item.name} className="space-y-0.5">
              <button
                onClick={() => toggleSection(item.name)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium text-xs tracking-wide transition-all cursor-pointer ${
                  isParentActive 
                    ? 'bg-amber-400/5 text-brand-gold font-semibold' 
                    : 'text-slate-405 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3 truncate">
                  <IconComp className={`h-4.5 w-4.5 shrink-0 ${isParentActive ? 'text-brand-gold' : 'text-slate-500'}`} />
                  {!isCollapsed && <span className="truncate">{item.name}</span>}
                </div>
                
                {!isCollapsed && (
                  <ChevronDown 
                    className={`h-3.5 w-3.5 text-slate-500 transition-transform duration-200 ${
                      isSectionOpen ? 'transform rotate-180 text-brand-gold' : ''
                    }`} 
                  />
                )}
              </button>

              {/* Submenus Dropdown */}
              <AnimatePresence initial={false}>
                {!isCollapsed && isSectionOpen && item.submenus && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden pl-7.5 space-y-0.5 border-l border-slate-900 ml-5.5 text-left"
                  >
                    {item.submenus.map((sub) => {
                      const isSubActive = location.pathname === sub.path;
                      return (
                        <Link
                          key={sub.name}
                          to={sub.path}
                          onClick={onCloseMobile}
                          className={`block py-1.5 pr-3 pl-3 text-[11px] font-medium tracking-wide rounded-lg transition-colors truncate ${
                            isSubActive 
                              ? 'text-amber-400 font-semibold bg-amber-450/5' 
                              : 'text-slate-500 hover:text-slate-205 hover:bg-slate-900/40'
                          }`}
                        >
                          {sub.name}
                        </Link>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* 4. Logout trigger row at bottom */}
      <div className="p-3 border-t border-slate-900 bg-slate-900/20">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:text-rose-450 hover:bg-rose-500/10 rounded-xl font-medium text-xs tracking-wide transition-all cursor-pointer text-left"
        >
          <LogOut className="h-4.5 w-4.5 text-slate-500 hover:text-rose-400 shrink-0" />
          {!isCollapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
}
