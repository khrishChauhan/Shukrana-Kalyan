/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Award, LayoutDashboard, UserCheck, Users, Briefcase,
  LogOut, ChevronLeft,
  ChevronRight, ChevronDown, Bell
} from 'lucide-react';

export interface SubmenuItem {
  nameKey: string;
  path: string;
}

export interface MenuItem {
  nameKey: string;
  icon: React.ComponentType<any>;
  path?: string;
  submenus?: SubmenuItem[];
}

export const SIDEBAR_STRUCTURE: MenuItem[] = [
  {
    nameKey: 'sidebar.dashboard',
    icon: LayoutDashboard,
    path: '/dashboard'
  },
  {
    nameKey: 'sidebar.myAccount',
    icon: UserCheck,
    submenus: [
      { nameKey: 'sidebar.activityTimeline', path: '/account/activity-timeline' },
      { nameKey: 'sidebar.profileSettings', path: '/account/profile-settings' },
      { nameKey: 'sidebar.membershipStatus', path: '/account/membership-status' },
      { nameKey: 'sidebar.membershipCard', path: '/account/membership-card' },
      { nameKey: 'sidebar.welcomeLetter', path: '/account/welcome-letter' },
      { nameKey: 'sidebar.consentLetter', path: '/account/consent-letter' },
      { nameKey: 'sidebar.changePassword', path: '/account/change-password' },
      { nameKey: 'sidebar.paymentCenter', path: '/payments' },
      { nameKey: 'sidebar.kycCenter', path: '/account/kyc' },
      { nameKey: 'sidebar.bankDetails', path: '/account/bank-details' },
    ]
  },
  {
    nameKey: 'sidebar.memberNetwork',
    icon: Users,
    submenus: [
      { nameKey: 'sidebar.overview', path: '/network/overview' },
      { nameKey: 'sidebar.directReferrals', path: '/network/direct-referrals' },
      { nameKey: 'sidebar.verifiedMembers', path: '/network/verified-members' },
      { nameKey: 'sidebar.pendingApproval', path: '/network/pending-approval' },
    ]
  },
  {
    nameKey: 'sidebar.business',
    icon: Briefcase,
    submenus: [
      { nameKey: 'sidebar.businessDashboard', path: '/business/dashboard' },
      { nameKey: 'sidebar.businessProfile', path: '/business/profile' },
      { nameKey: 'sidebar.walletCenter', path: '/wallet' },
      { nameKey: 'sidebar.walletLedger', path: '/wallet/ledger' },
      { nameKey: 'sidebar.withdrawalCenter', path: '/wallet/withdrawals' },
      { nameKey: 'sidebar.sponsorTree', path: '/business/sponsor-tree' },
      { nameKey: 'sidebar.placementTree', path: '/business/placement-tree' },
      { nameKey: 'sidebar.businessCalculator', path: '/business/calculator' },
      { nameKey: 'sidebar.incomeDashboard', path: '/business/income-dashboard' },
      { nameKey: 'sidebar.bvDashboard', path: '/business/bv-dashboard' },
      { nameKey: 'sidebar.pairMatching', path: '/business/pair-matching' },
      { nameKey: 'sidebar.reports', path: '/business/reports' },
      { nameKey: 'sidebar.downloads', path: '/business/downloads' },
      { nameKey: 'sidebar.businessTimeline', path: '/business/timeline' },
      { nameKey: 'sidebar.payoutHistory', path: '/wallet/payout-history' },
    ]
  },
  {
    nameKey: 'sidebar.notifications',
    icon: Bell,
    path: '/notifications'
  }
];

import { useTranslation } from '../context/LanguageContext';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
  onCloseMobile?: () => void;
}

export default function Sidebar({ isCollapsed, setIsCollapsed, onCloseMobile }: SidebarProps) {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Auto-expand the parent section whose child is currently active
  useEffect(() => {
    const currentPath = location.pathname;
    const activeSection = SIDEBAR_STRUCTURE.find(item =>
      item.submenus?.some(sub => sub.path === currentPath)
    );
    if (activeSection) {
      setOpenSections(prev => ({ ...prev, [activeSection.nameKey]: true }));
    }
  }, [location.pathname]);

  const toggleSection = (nameKey: string) => {
    if (isCollapsed) setIsCollapsed(false);
    setOpenSections(prev => ({ ...prev, [nameKey]: !prev[nameKey] }));
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
              {t('sidebar.foundationDesk')}
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
          const isOpen = !!openSections[item.nameKey];

          // ── Direct link (Dashboard, Online Payment)
          if (!hasSubmenus && item.path) {
            return (
              <Link
                key={item.nameKey}
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
                    {t(item.nameKey)}
                  </span>
                )}
              </Link>
            );
          }

          // ── Accordion item with submenus
          return (
            <div key={item.nameKey} style={{ marginBottom: '1px' }}>
              {/* Parent button */}
              <button
                onClick={() => toggleSection(item.nameKey)}
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
                      {t(item.nameKey)}
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
                            key={sub.nameKey}
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
                              {t(sub.nameKey)}
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
