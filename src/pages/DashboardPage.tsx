/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Award, ClipboardList, Wallet, Heart, Users, BarChart3, HelpCircle, 
  Settings, TrendingUp, RefreshCw, Star, Info, Shield
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from 'recharts';
import { Program, ActivityLog, DonationRecord } from '../types';
import { KPI_DATA, ACTIVITY_TIMELINE, MONTHLY_IMPACT_HISTORY, DONATION_RECORDS } from '../data';

export default function DashboardPage() {
  const navigate = useNavigate();

  // Authentication validation state
  const [adminUser, setAdminUser] = useState<any>(null);
  
  // Local state initialized with dummy data or local storage
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [timeline, setTimeline] = useState<ActivityLog[]>([]);
  const [volunteerCount, setVolunteerCount] = useState(418);
  const [totalDonatedAmount, setTotalDonatedAmount] = useState(111400);

  const loadData = () => {
    const sessionStr = localStorage.getItem('shukrana_session');
    if (!sessionStr) {
      navigate('/login');
      return;
    }
    setAdminUser(JSON.parse(sessionStr));

    // Get donations or set default list
    const storedDonations = localStorage.getItem('shukrana_donations');
    if (storedDonations) {
      setDonations(JSON.parse(storedDonations));
    } else {
      localStorage.setItem('shukrana_donations', JSON.stringify(DONATION_RECORDS));
      setDonations(DONATION_RECORDS);
    }

    // Get activities / set default list
    const storedActivities = localStorage.getItem('shukrana_activities');
    if (storedActivities) {
      setTimeline(JSON.parse(storedActivities));
    } else {
      localStorage.setItem('shukrana_activities', JSON.stringify(ACTIVITY_TIMELINE));
      setTimeline(ACTIVITY_TIMELINE);
    }

    // Get volunteer counts
    const storedVolunteers = localStorage.getItem('shukrana_volunteer_count');
    if (storedVolunteers) {
      setVolunteerCount(Number(storedVolunteers));
    } else {
      localStorage.setItem('shukrana_volunteer_count', '418');
      setVolunteerCount(418);
    }

    // Get Total donated
    const storedTotalRaised = localStorage.getItem('shukrana_total_donated');
    if (storedTotalRaised) {
      setTotalDonatedAmount(Number(storedTotalRaised));
    } else {
      localStorage.setItem('shukrana_total_donated', '111400');
      setTotalDonatedAmount(111400);
    }
  };

  // Load and sync local storage variables
  useEffect(() => {
    loadData();

    // Listen to changes dispatched by the global DashboardLayout module
    window.addEventListener('shukrana-donation-updated', loadData);
    return () => {
      window.removeEventListener('shukrana-donation-updated', loadData);
    };
  }, [navigate]);

  if (!adminUser) {
    return null; // Layout will redirect
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="space-y-8 select-none text-left w-full max-w-full overflow-hidden"
    >
      {/* 1. DYNAMIC SYSTEM NOTIFICATIONS */}
      <div className="p-4 bg-amber-55 border border-amber-250/20 rounded-2xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-start gap-3">
          <Info className="h-5 w-5 text-brand-light0 shrink-0 mt-0.5" />
          <div>
            <h4 className="font-bold text-brand-charcoal text-sm font-display">Real-time Data Active</h4>
            <p className="text-brand-charcoal/80 text-xs mt-0.5">This dashboard is connected with client-side localStorage. Contributions authorized on the landing page or layout header will immediately reflect below.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="h-2 w-2 rounded-full bg-emerald-500 " />
          <span className="text-[10px] font-mono font-bold text-brand-gray5 uppercase tracking-widest">Active Sandbox Session</span>
        </div>
      </div>

      {/* 2. KPI METRIC SECTION */}
      <div>
        <h3 className="text-xs font-mono font-bold text-brand-charcoal/60 tracking-wider uppercase mb-4">Core Foundation Metrics</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {KPI_DATA.map((kpi) => {
            let displayValue = kpi.value;
            let displayChange = kpi.change;

            // Override metric numbers dynamically with synchronized variables
            if (kpi.title === 'Total Donations') {
              displayValue = `$${totalDonatedAmount.toLocaleString()}`;
            } else if (kpi.title === 'Active Volunteers') {
              displayValue = String(volunteerCount);
            }

            return (
              <div 
                key={kpi.title}
                className="bg-white p-5 rounded-2xl border border-slate-150 shadow-brand flex flex-col justify-between hover:shadow-brand transition-shadow relative overflow-hidden text-left"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold text-brand-gray0 font-sans">{kpi.title}</span>
                  <span className="h-2 w-2 rounded-full bg-brand-primary/60" />
                </div>

                <div className="space-y-1">
                  <p className="text-2xl font-extrabold text-brand-charcoal tracking-tight font-display">
                    {displayValue}
                  </p>
                  <p className="flex items-center gap-1 text-[11px] font-medium text-emerald-600">
                    <span className="text-xs">▲</span>
                    <span>{displayChange}</span>
                  </p>
                </div>
                
                <div className="absolute top-0 left-0 h-1 bg-brand-primary w-0 hover:w-full transition-all" />
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. RECHARTS COMMUNITY IMPACT OVERVIEW */}
      <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-150 shadow-brand">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h3 className="text-lg font-bold text-brand-charcoal font-display">Community Impact Overview</h3>
            <p className="text-xs text-brand-gray0 mt-1">Authorized contribution trend mapping targets ($) vs individuals assisted.</p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded bg-brand-primary" />
              <span className="text-brand-charcoal/80">Actual Raised ($)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded bg-brand-accent" />
              <span className="text-brand-charcoal/80">Target Standard ($)</span>
            </div>
          </div>
        </div>

        {/* Recharts Wrapper */}
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={MONTHLY_IMPACT_HISTORY}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="colorRaised" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ED8C32" stopOpacity={0.25}/>
                  <stop offset="95%" stopColor="#ED8C32" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorTarget" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#232F46" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#232F46" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis 
                dataKey="month" 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false} 
                dy={10}
              />
              <YAxis 
                stroke="#94a3b8" 
                fontSize={11} 
                tickLine={false} 
                axisLine={false}
                tickFormatter={(v) => `$${v/1000}k`}
              />
              <Tooltip 
                contentStyle={{ 
                  background: '#1F2937', 
                  color: '#FFFFFF', 
                  borderRadius: '12px',
                  border: 'none',
                  fontSize: '12px',
                  padding: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="raised" 
                stroke="#ED8C32" 
                strokeWidth={2.5}
                fillOpacity={1} 
                fill="url(#colorRaised)" 
              />
              <Area 
                type="monotone" 
                dataKey="target" 
                stroke="#232F46" 
                strokeWidth={1.5}
                fillOpacity={1} 
                fill="url(#colorTarget)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 4. ACTIVITY TIMELINE & TRANSACTIONS SPLIT ROW */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Timeline (7 columns column-span-7) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-150 shadow-brand text-left">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base font-bold text-brand-charcoal font-display">System Activity log</h3>
              <p className="text-xs text-brand-gray0 mt-0.5">Physical camp launches, cleared micro-credits, and ledger receipts.</p>
            </div>
            <button 
              onClick={() => {
                const stored = localStorage.getItem('shukrana_activities');
                if (stored) { setTimeline(JSON.parse(stored)); }
              }}
              className="p-1 px-2 hover:bg-brand-gray border border-brand-gray/80 rounded-lg text-[10px] font-mono text-brand-gray0 cursor-pointer"
            >
              Refresh Log
            </button>
          </div>

          <div className="relative border-l-2 border-slate-150 pl-6 ml-3 space-y-7 py-2 text-left">
            {timeline.slice(0, 5).map((log) => (
              <div key={log.id} className="relative">
                {/* Indicator dot */}
                <div className="absolute -left-[31px] top-1.5 w-4 h-4 bg-brand-primary rounded-full border-4 border-white shadow-brand shrink-0" />
                <div className="text-left space-y-1">
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-brand-charcoal/60 font-mono font-medium">{log.time}</span>
                    <span className="px-2 py-0.5 bg-brand-accent/10 text-[10px] font-mono tracking-widest text-brand-accent font-bold uppercase rounded-full">
                      {log.type}
                    </span>
                  </div>
                  <p className="text-brand-charcoal/90 text-sm font-medium">{log.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* High-impact recent transactions list (5 columns column-span-5) */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-150 shadow-brand text-left flex flex-col h-full justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-brand-charcoal font-display">Recent Contributions</h3>
                <p className="text-xs text-brand-charcoal/60 mt-0.5">Cleared micro-grants in active segments.</p>
              </div>
            </div>

            <div className="overflow-x-auto w-full custom-scrollbar pb-1">
              <div className="space-y-4 text-left min-w-[280px]">
                {donations.slice(0, 4).map((record) => (
                  <div 
                    key={record.id}
                    className="flex items-center justify-between p-3.5 bg-brand-gray border border-slate-105 rounded-xl text-left"
                  >
                    <div className="flex items-center gap-3 truncate text-left">
                      <div className="w-10 h-10 rounded-full bg-[#FFF8F2] text-brand-primary flex items-center justify-center font-black shrink-0">
                        $
                      </div>
                      <div className="text-left truncate">
                        <h4 className="text-xs sm:text-sm font-bold text-brand-charcoal truncate">{record.donorName}</h4>
                        <p className="text-[10px] font-mono text-brand-charcoal/60 truncate">{record.program}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="block text-sm font-extrabold text-brand-charcoal">+${record.amount.toLocaleString()}</span>
                      <span className="inline-block px-1.5 py-0.5 bg-emerald-50 text-[9px] font-mono text-emerald-650 rounded-lg uppercase">
                        {record.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-brand-gray mt-6 flex items-center justify-between">
            <span className="text-xs text-brand-charcoal/60 font-semibold uppercase">Secured Audited Vault</span>
            <Shield className="h-4 w-4 text-emerald-500" />
          </div>

        </div>

      </div>
    </motion.div>
  );
}
