/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  ChevronRight, Calendar, Star, Clock, AlertTriangle, ShieldCheck, 
  Sparkles, Compass, Lightbulb, Landmark, Hammer, ArrowLeft
} from 'lucide-react';

interface ComingSoonPageProps {
  title?: string;
  category?: string;
}

export default function ComingSoonPage({ title: propTitle, category: propCategory }: ComingSoonPageProps) {
  const location = useLocation();

  // Try to derive Category and Title from path if not provided explicitly
  // e.g. /account/activity-tracker => Account, Activity Tracker
  const pathParts = location.pathname.split('/').filter(Boolean);
  
  const formatSegment = (segment: string) => {
    return segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const category = propCategory || (pathParts[0] ? formatSegment(pathParts[0]) : 'Core');
  const title = propTitle || (pathParts[1] ? formatSegment(pathParts[1]) : formatSegment(pathParts[0] || 'page'));

  // Get matching icon for visual flare
  const getFeatureIcon = () => {
    const lowerCategory = category.toLowerCase();
    if (lowerCategory.includes('account')) return <ShieldCheck className="h-10 w-10 text-brand-light0" />;
    if (lowerCategory.includes('deposit') || lowerCategory.includes('nidhi')) return <Landmark className="h-10 w-10 text-brand-light0" />;
    if (lowerCategory.includes('team')) return <Compass className="h-10 w-10 text-brand-light0" />;
    return <Sparkles className="h-10 w-10 text-brand-light0" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-6 text-left"
    >
      {/* Dynamic Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs font-mono font-bold text-brand-charcoal/60 select-none">
        <Link to="/dashboard" className="hover:text-brand-light0 transition-colors uppercase tracking-wider">
          Dashboard
        </Link>
        <ChevronRight className="h-3. w-3. text-slate-300" />
        <span className="text-brand-charcoal/60 uppercase tracking-wider">{category}</span>
        {pathParts[1] && (
          <>
            <ChevronRight className="h-3. w-3. text-slate-300" />
            <span className="text-brand-light0 uppercase tracking-wider">{title}</span>
          </>
        )}
      </nav>

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-brand-charcoal tracking-tight font-display">
            {title}
          </h1>
          <p className="text-xs text-brand-gray0 mt-1">
            Registered interface for {category} operations and NGO administration.
          </p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-brand-gray hover:bg-brand-gray/80 border border-brand-gray/80 rounded-xl text-xs font-mono text-slate-650 transition-colors shrink-0 max-w-max">
          <Calendar className="h-4 w-4 text-brand-gray0" />
          <span>Sync: Live Sandbox</span>
        </div>
      </div>

      {/* Modern Coming Soon Card */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-150 shadow-brand flex flex-col items-center text-center max-w-2xl mx-auto my-8 relative overflow-hidden">
        {/* Subtle decorative background blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-primary/5 rounded-full blur-2xl -ml-16 -mb-16 pointer-events-none" />

        {/* Animated Icon Wrapper */}
        <div className="p-4 bg-[#FFF8F2] border border-brand-primary/40/50 rounded-2xl mb-6 relative">
          {getFeatureIcon()}
          <span className="absolute -top-1 -right-1 h-3.5 w-3.5 bg-brand-primary border-2 border-white rounded-full flex items-center justify-center">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-charcoal animate-ping" />
          </span>
        </div>

        <span className="px-3.5 py-1 bg-brand-primary/15 text-brand-primary border border-brand-primary/30 text-[10px] font-mono tracking-widest uppercase font-black rounded-full mb-4">
          🚧 Coming Soon
        </span>

        <h3 className="text-xl sm:text-2xl font-black font-display text-slate-905 tracking-tight">
          Module Under Development
        </h3>
        
        <p className="text-brand-gray0 text-sm max-w-md leading-relaxed mt-3">
          The <span className="font-bold text-brand-charcoal">{title}</span> workspace is currently undergoing secure ledger synchronization, compliance auditing, or interface mapping.
        </p>

        {/* Real-time details list to make it look highly professional and SaaS-polished */}
        <div className="w-full max-w-md bg-brand-gray p-4 rounded-2xl border border-brand-gray text-left text-xs space-y-2.5 mt-8 font-mono text-slate-450">
          <div className="flex items-center justify-between border-b border-brand-gray/80/60 pb-2">
            <span className="text-brand-charcoal/60">Target Segment</span>
            <span className="font-bold text-brand-charcoal/90">{category}</span>
          </div>
          <div className="flex items-center justify-between border-b border-brand-gray/80/60 pb-2">
            <span className="text-brand-charcoal/60">Service Status</span>
            <span className="text-brand-primary font-bold flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FFF8F2]5 animate-pulse" /> Pending Deploy
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-brand-charcoal/60">Active Pipeline</span>
            <span className="font-bold text-brand-charcoal/90">Sandbox Authorization</span>
          </div>
        </div>

        <div className="mt-8 pt-4 flex flex-col sm:flex-row items-center gap-3">
          <Link
            to="/dashboard"
            className="flex items-center gap-1.5 px-4 py-2.5 bg-brand-charcoal hover:bg-slate-850 text-white rounded-xl text-xs font-bold transition-all shadow-brand"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
          <div className="text-xs text-brand-charcoal/60 font-medium">
            Contact regional support if you require immediate access.
          </div>
        </div>
      </div>
    </motion.div>
  );
}
