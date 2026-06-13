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
  ChevronRight, ChevronDown
} from 'lucide-react';

export interface SubmenuItem {
  name: string;
  path: string;
}

export interface MenuItem {
  name: string;
  icon: React.ComponentType<any>;
  path?: string;
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

  // Auto-expand the parent section whose child is currently active
  useEffect(() => {
    const currentPath = location.pathname;
    const activeSection = SIDEBAR_STRUCTURE.find(item =>
      item.submenus?.some(sub => sub.path === currentPath)
    );
    if (activeSection) {
      setOpenSections(prev => ({ ...prev, [activeSection.name]: true }));
    }
  }, [location.pathname]);

  const toggleSection = (name: string) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenSections(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const handleLogout = () => {
    localStorage.removeItem('shukrana_session');
    navigate('/login');
    if (onCloseMobile) onCloseMobile();
  };

  const isParentActive = (item: MenuItem): boolean => {
    if (item.path) return location.pathname === item.path;
    if (item.submenus) return item.submenus.some(sub => sub.path === location.pathname);
    return false;
  };

  return (
    <aside
      style={{ backgroundColor: '#232F46' }}
      className={`flex flex-col h-full shrink-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-[72px]' : 'w-[280px]'
      }`}
    >
      {/* ── LOGO ───────────────────────────────────────────── */}
      <div
        className="flex items-center gap-3 px-4 overflow-hidden shrink-0"
        style={{
          height: '56px',
          borderBottom: '1px solid rgba(255,255,255,0.08)'
        }}
      >
        {/* Icon badge */}
        <div
          className="flex items-center justify-center rounded-xl shrink-0"
          style={{
            width: '34px',
            height: '34px',
            backgroundColor: '#ED8C32',
          }}
        >
          <Award className="text-white" style={{ width: '18px', height: '18px', strokeWidth: 2.2 }} />
        </div>

        {/* Brand name — hidden when collapsed */}
        {!isCollapsed && (
          <div className="min-w-0">
            <span
              className="block font-display font-bold text-white leading-tight tracking-tight"
              style={{ fontSize: '13px', letterSpacing: '-0.01em' }}
            >
              SHUKRANA KALYAN
            </span>
            <span
              className="block font-mono font-semibold uppercase tracking-widest"
              style={{ fontSize: '8px', color: '#ED8C32', marginTop: '2px' }}
            >
              Foundation Desk
            </span>
          </div>
        )}
      </div>

      {/* ── COLLAPSE TOGGLE ────────────────────────────────── */}
      <div
        className="hidden sm:flex items-center justify-end px-3 shrink-0"
        style={{
          height: '36px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
          backgroundColor: 'rgba(0,0,0,0.12)'
        }}
      >
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
          className="flex items-center justify-center rounded-lg transition-colors duration-200 cursor-pointer"
          style={{
            width: '28px',
            height: '28px',
            color: 'rgba(255,255,255,0.45)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.08)';
            (e.currentTarget as HTMLButtonElement).style.color = '#ffffff';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)';
          }}
        >
          {isCollapsed
            ? <ChevronRight style={{ width: '14px', height: '14px' }} />
            : <ChevronLeft style={{ width: '14px', height: '14px' }} />
          }
        </button>
      </div>

      {/* ── NAV ITEMS ──────────────────────────────────────── */}
      <nav
        className="flex-1 overflow-y-auto overflow-x-hidden"
        style={{ padding: '8px 8px', scrollbarWidth: 'none' }}
      >
        <style>{`
          nav::-webkit-scrollbar { display: none; }
        `}</style>

        {SIDEBAR_STRUCTURE.map((item) => {
          const Icon = item.icon;
          const active = isParentActive(item);
          const hasSubmenus = !!item.submenus;
          const isOpen = !!openSections[item.name];

          // ── Direct link (Dashboard, Online Payment)
          if (!hasSubmenus && item.path) {
            return (
              <Link
                key={item.name}
                to={item.path}
                onClick={onCloseMobile}
                className="flex items-center gap-3 rounded-xl mb-0.5 relative overflow-hidden transition-all duration-200 group"
                style={{
                  height: '48px',
                  paddingLeft: isCollapsed ? '0' : '12px',
                  paddingRight: '10px',
                  justifyContent: isCollapsed ? 'center' : 'flex-start',
                  backgroundColor: active ? '#ED8C32' : 'transparent',
                  boxShadow: active ? '0 2px 8px rgba(237, 140, 50, 0.35)' : 'none',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.07)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active) {
                    (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                  }
                }}
              >
                {/* Active left accent bar */}
                {active && !isCollapsed && (
                  <div
                    className="absolute left-0 top-2 bottom-2 rounded-r-full"
                    style={{ width: '4px', backgroundColor: 'rgba(255,255,255,0.6)' }}
                  />
                )}

                <Icon
                  style={{
                    width: '18px',
                    height: '18px',
                    strokeWidth: active ? 2.2 : 1.8,
                    color: active ? '#ffffff' : 'rgba(255,255,255,0.5)',
                    flexShrink: 0,
                    transition: 'color 0.2s',
                  }}
                />
                {!isCollapsed && (
                  <span
                    style={{
                      fontSize: '14.5px',
                      fontWeight: active ? 600 : 500,
                      color: active ? '#ffffff' : 'rgba(255,255,255,0.65)',
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      transition: 'color 0.2s',
                    }}
                  >
                    {item.name}
                  </span>
                )}
              </Link>
            );
          }

          // ── Accordion item with submenus
          return (
            <div key={item.name} style={{ marginBottom: '1px' }}>
              {/* Parent button */}
              <button
                onClick={() => toggleSection(item.name)}
                className="w-full flex items-center rounded-xl transition-all duration-200 cursor-pointer relative overflow-hidden"
                style={{
                  height: '48px',
                  paddingLeft: isCollapsed ? '0' : '12px',
                  paddingRight: isCollapsed ? '0' : '10px',
                  justifyContent: isCollapsed ? 'center' : 'space-between',
                  backgroundColor: active && !isOpen
                    ? 'rgba(237, 140, 50, 0.15)'
                    : isOpen
                    ? 'rgba(255,255,255,0.06)'
                    : 'transparent',
                }}
                onMouseEnter={e => {
                  if (!active && !isOpen) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.07)';
                  }
                }}
                onMouseLeave={e => {
                  if (!active && !isOpen) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
                  } else if (isOpen) {
                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(255,255,255,0.06)';
                  }
                }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    style={{
                      width: '18px',
                      height: '18px',
                      strokeWidth: active ? 2.2 : 1.8,
                      color: active ? '#ED8C32' : isOpen ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.5)',
                      flexShrink: 0,
                      transition: 'color 0.2s',
                    }}
                  />
                  {!isCollapsed && (
                    <span
                      style={{
                        fontSize: '14.5px',
                        fontWeight: active || isOpen ? 600 : 500,
                        color: active ? '#ED8C32' : isOpen ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)',
                        letterSpacing: '-0.01em',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        transition: 'color 0.2s',
                      }}
                    >
                      {item.name}
                    </span>
                  )}
                </div>

                {!isCollapsed && (
                  <ChevronDown
                    style={{
                      width: '14px',
                      height: '14px',
                      flexShrink: 0,
                      color: isOpen ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.3)',
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.2s ease, color 0.2s ease',
                    }}
                  />
                )}
              </button>

              {/* Submenu accordion */}
              <AnimatePresence initial={false}>
                {!isCollapsed && isOpen && item.submenus && (
                  <motion.div
                    key="submenu"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                    style={{ overflow: 'hidden' }}
                  >
                    {/* Connector + items */}
                    <div
                      style={{
                        marginLeft: '27px',
                        paddingLeft: '16px',
                        borderLeft: '1.5px solid rgba(255,255,255,0.1)',
                        paddingTop: '2px',
                        paddingBottom: '4px',
                      }}
                    >
                      {item.submenus.map((sub) => {
                        const isSubActive = location.pathname === sub.path;
                        return (
                          <Link
                            key={sub.name}
                            to={sub.path}
                            onClick={onCloseMobile}
                            className="flex items-center gap-2.5 rounded-lg transition-all duration-200 group"
                            style={{
                              height: '38px',
                              paddingLeft: '10px',
                              paddingRight: '8px',
                              marginBottom: '1px',
                              textDecoration: 'none',
                              backgroundColor: isSubActive ? '#ED8C32' : 'transparent',
                              boxShadow: isSubActive ? '0 2px 8px rgba(237, 140, 50, 0.3)' : 'none',
                              borderRadius: '10px',
                              position: 'relative',
                            }}
                            onMouseEnter={e => {
                              if (!isSubActive) {
                                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'rgba(255,255,255,0.07)';
                              }
                            }}
                            onMouseLeave={e => {
                              if (!isSubActive) {
                                (e.currentTarget as HTMLAnchorElement).style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            {/* Dot indicator */}
                            <div
                              style={{
                                width: '5px',
                                height: '5px',
                                borderRadius: '50%',
                                flexShrink: 0,
                                backgroundColor: isSubActive ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.25)',
                                transition: 'background-color 0.2s',
                              }}
                            />
                            <span
                              style={{
                                fontSize: '13.5px',
                                fontWeight: isSubActive ? 600 : 500,
                                color: isSubActive ? '#ffffff' : 'rgba(255,255,255,0.55)',
                                whiteSpace: 'nowrap',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                letterSpacing: '-0.005em',
                                transition: 'color 0.2s',
                              }}
                              onMouseEnter={e => {
                                if (!isSubActive) (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.9)';
                              }}
                              onMouseLeave={e => {
                                if (!isSubActive) (e.currentTarget as HTMLSpanElement).style.color = 'rgba(255,255,255,0.55)';
                              }}
                            >
                              {sub.name}
                            </span>
                          </Link>
                        );
                      })}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </nav>

      {/* ── LOGOUT ─────────────────────────────────────────── */}
      <div
        className="shrink-0 px-2 py-3"
        style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
      >
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 rounded-xl transition-all duration-200 cursor-pointer"
          style={{
            height: '44px',
            paddingLeft: isCollapsed ? '0' : '12px',
            paddingRight: '10px',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            color: 'rgba(255,255,255,0.45)',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'rgba(239,68,68,0.1)';
            (e.currentTarget as HTMLButtonElement).style.color = '#f87171';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.backgroundColor = 'transparent';
            (e.currentTarget as HTMLButtonElement).style.color = 'rgba(255,255,255,0.45)';
          }}
        >
          <LogOut style={{ width: '17px', height: '17px', flexShrink: 0 }} />
          {!isCollapsed && (
            <span style={{ fontSize: '14px', fontWeight: 500, letterSpacing: '-0.01em' }}>
              Logout
            </span>
          )}
        </button>
      </div>
    </aside>
  );
}
