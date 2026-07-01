import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Bell,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Briefcase,
  Settings,
  Banknote,
  ShieldCheck,
  FileCheck,
  Network,
  ShieldAlert
} from 'lucide-react';

interface NavItem {
  label: string;
  path?: string;
  icon: React.ElementType;
  comingSoon?: boolean;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',      path: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Members',        path: '/admin/members',   icon: Users },
  { label: 'Pending Payments',path: '/admin/payments', icon: Banknote },
  { label: 'Payouts',        path: '/admin/business/payouts',  icon: Banknote },
  { label: 'Unified Ledger', path: '/admin/business/ledger',   icon: Briefcase },
  { label: 'Activity Monitor',path: '/admin/business/activity', icon: Bell },
  { label: 'Biz KYC',        path: '/admin/business/kyc',      icon: FileCheck },
  { label: 'Global Placement', path: '/admin/business/global-placement-tree', icon: Network },
  { label: 'Notifications',  path: '/admin/notifications', icon: Bell },
];

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  function handleLogout() {
    localStorage.removeItem('shukrana_admin_session');
    navigate('/admin');
  }

  return (
    <aside
      className={`flex flex-col bg-[#232F46] text-white transition-all duration-200 shrink-0 ${
        collapsed ? 'w-16' : 'w-56'
      }`}
    >
      {/* Brand / Toggle */}
      <div className="flex items-center justify-between px-4 h-16 border-b border-white/10">
        {!collapsed && (
          <span className="text-sm font-bold text-white tracking-tight leading-tight">
            SKS <span className="text-[#ED8C32]">Admin</span>
          </span>
        )}
        <button
          onClick={() => setCollapsed(c => !c)}
          className="p-1.5 rounded-lg hover:bg-white/10 transition-colors ml-auto"
          aria-label="Toggle sidebar"
        >
          {collapsed ? (
            <ChevronRight className="w-4 h-4 text-white/70" />
          ) : (
            <ChevronLeft className="w-4 h-4 text-white/70" />
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={label}
              to={path!}
              title={collapsed ? label : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  collapsed ? 'justify-center' : ''
                } ${
                  isActive
                    ? 'bg-[#ED8C32] text-white'
                    : 'text-white/70 hover:bg-white/10 hover:text-white'
                }`
              }
            >
              <Icon className="w-5 h-5 shrink-0" />
              {!collapsed && (
                <span className="text-sm font-medium">{label}</span>
              )}
            </NavLink>
          )
        )}
      </nav>

      {/* Logout */}
      <div className="px-2 pb-4 border-t border-white/10 pt-3">
        <button
          onClick={handleLogout}
          title={collapsed ? 'Logout' : undefined}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/60 hover:bg-red-500/20 hover:text-red-400 transition-colors ${
            collapsed ? 'justify-center' : ''
          }`}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}
