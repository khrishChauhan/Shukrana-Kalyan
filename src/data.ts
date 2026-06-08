/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Program, TeamMember, ActivityLog, DonationRecord, KPICardData } from './types';

export const CAROUSEL_IMAGES = [
  {
    url: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&q=80&w=1200",
    title: "Bringing Joy and Dignity to Every Community",
    subtitle: "We reach out to remote marginalized areas with active medical treatment, nutritional kits, and warmth."
  },
  {
    url: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&q=80&w=1200",
    title: "Transforming Lives Through Rightful Education",
    subtitle: "By building libraries and sponsoring scholarship programs, we bridge the extreme digital and material divide."
  },
  {
    url: "https://images.unsplash.com/photo-1542810634-71277d95dcbb?auto=format&fit=crop&q=80&w=1200",
    title: "Unlocking Financial Freedom for Self-Help Groups",
    subtitle: "Providing micro-grants, vocational training, and raw logistics to support rural female-led micro enterprises."
  }
];

export const IMPACT_PROGRAMS: Program[] = [
  {
    id: "prog-edu",
    title: "Education Support Program",
    description: "Sponsoring children's tuition, distributing school backpacks, setting up tech-enabled classrooms, and modernizing primary learning structures.",
    image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=600",
    raised: 34500,
    goal: 50000,
    beneficiaries: 1200,
    category: "Education"
  },
  {
    id: "prog-health",
    title: "Healthcare Initiative",
    description: "Running mobile community dispensaries, distributing clean drinking water purification systems, and hosting multi-specialty wellness camps.",
    image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&q=80&w=600",
    raised: 48900,
    goal: 60000,
    beneficiaries: 3400,
    category: "Health & Water"
  },
  {
    id: "prog-women",
    title: "Women Empowerment Guild",
    description: "Empowering local artisans with training, micro-capital credits, and global retail channels, turning rural housewives into bold leaders.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
    raised: 28000,
    goal: 40000,
    beneficiaries: 850,
    category: "Livelihood"
  }
];

export const LEADERSHIP_TEAM: TeamMember[] = [
  {
    id: "lead-1",
    name: "Dr. Aditya Sen",
    role: "President & Founder",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300",
    linkedin: "https://linkedin.com/in/adityasen-shukrana"
  },
  {
    id: "lead-2",
    name: "Meera Deshmukh",
    role: "Director of Operations",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=300",
    linkedin: "https://linkedin.com/in/meera-deshmukh-shukrana"
  },
  {
    id: "lead-3",
    name: "Rajesh Malhotra",
    role: "Head of Strategic Partnerships",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=300",
    linkedin: "https://linkedin.com/in/rajesh-malhotra-shukrana"
  },
  {
    id: "lead-4",
    name: "Dr. Shalini Prakash",
    role: "Chief Medical & Welfare Advisor",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=300",
    linkedin: "https://linkedin.com/in/shalini-prakash-shukrana"
  }
];

export const KPI_DATA: KPICardData[] = [
  {
    title: "Total Donations",
    value: "$111,400",
    change: "+14.2% vs last month",
    isPositive: true,
    indicator: "up",
    desc: "Cumulative micro-donations & corporate grants received"
  },
  {
    title: "Active Volunteers",
    value: "418",
    change: "+28% year-to-date",
    isPositive: true,
    indicator: "up",
    desc: "Enrolled citizens active on developmental fronts"
  },
  {
    title: "Impact Programs",
    value: "3 Active",
    change: "100% execution",
    isPositive: true,
    indicator: "neutral",
    desc: "Sustained programs in critical high-need sectors"
  },
  {
    title: "Beneficiaries Helped",
    value: "5,450",
    change: "+18.4% growth rate",
    isPositive: true,
    indicator: "up",
    desc: "Verified citizens assisted by our active initiatives"
  },
  {
    title: "Campaigns Launched",
    value: "8 Campaigns",
    change: "6 successfully funded",
    isPositive: true,
    indicator: "up",
    desc: "Targeted localized drives for rapid crisis relief"
  },
  {
    title: "Events Hosted",
    value: "42 Seminars",
    change: "+12 from past quarter",
    isPositive: true,
    indicator: "up",
    desc: "Physical awareness clinics, webinars, and benefits"
  },
  {
    title: "Community Projects",
    value: "14 Villages",
    change: "Expanded +4 last week",
    isPositive: true,
    indicator: "up",
    desc: "Rural micro-infrastructure units fully established"
  },
  {
    title: "Impact Score",
    value: "96.4%",
    change: "+1.2% audit standard",
    isPositive: true,
    indicator: "up",
    desc: "Evaluation score granted by independent social observers"
  }
];

export const ACTIVITY_TIMELINE: ActivityLog[] = [
  {
    id: "act-1",
    type: "donation",
    content: "Corporate grant of $15,000 cleared for the Rural Healthcare project.",
    amount: "$15,000",
    time: "2 hours ago",
    status: "success"
  },
  {
    id: "act-2",
    type: "volunteer",
    content: "14 clinical residents from King George General committed to the next wellness camp.",
    time: "5 hours ago",
    status: "success"
  },
  {
    id: "act-3",
    type: "program",
    content: "Education Support launched a digital lab in Devgarh district with 12 laptops.",
    time: "Yesterday",
    status: "completed"
  },
  {
    id: "act-4",
    type: "campaign",
    content: "Female Entrepreneurship micro-credit goal has been achieved ahead of schedule.",
    time: "3 days ago",
    status: "success"
  },
  {
    id: "act-5",
    type: "donation",
    content: "Micro-donation of $250 received from user (khrishchauhan@gmail.com).",
    amount: "$250",
    time: "4 days ago",
    status: "success"
  }
];

export const MONTHLY_IMPACT_HISTORY = [
  { month: "Jan", raised: 12000, target: 8000, individuals: 340 },
  { month: "Feb", raised: 18500, target: 10000, individuals: 450 },
  { month: "Mar", raised: 24000, target: 15000, individuals: 680 },
  { month: "Apr", raised: 22000, target: 15000, individuals: 810 },
  { month: "May", raised: 31000, target: 20000, individuals: 1100 },
  { month: "Jun", raised: 45000, target: 30000, individuals: 1450 }
];

export const DONATION_RECORDS: DonationRecord[] = [
  { id: "TXN-7341", donorName: "Aarav Mehta", amount: 450, program: "Education Support", date: "2026-06-08", status: "completed" },
  { id: "TXN-7342", donorName: "Priyanka Sharma", amount: 1200, program: "Healthcare Initiative", date: "2026-06-07", status: "completed" },
  { id: "TXN-7343", donorName: "Vikram Kapoor", amount: 250, program: "Women Empowerment Guild", date: "2026-06-05", status: "completed" },
  { id: "TXN-7344", donorName: "Preeti Iyer", amount: 5000, program: "Global General Fund", date: "2026-06-04", status: "completed" },
  { id: "TXN-7345", donorName: "Kabir Singh", amount: 150, program: "Education Support", date: "2026-06-02", status: "processing" }
];
