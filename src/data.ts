/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Program, TeamMember, ActivityLog, DonationRecord, KPICardData } from './types';

export const CAROUSEL_IMAGES = [
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/8f/Doctor_examining_a_child_in_a_medical_camp%2C_organised_by_the_DFP%2C_during_the_Bharat_Nirman_Public_Information_Campaign%2C_at_Hilli_Block%2C_Dakshin_Dinajpur%2C_West_Bengal_on_February_06%2C_2012.jpg",
    title: "Bringing Joy and Dignity to Every Community",
    subtitle: "We reach out to remote marginalized areas with active medical treatment, nutritional kits, and warmth."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/8/82/Rural_Village_Children_School_in_Solan_Himachal_Pradesh_India.jpg",
    title: "Transforming Lives Through Rightful Education",
    subtitle: "By building libraries and sponsoring scholarship programs, we bridge the extreme digital and material divide."
  },
  {
    url: "https://upload.wikimedia.org/wikipedia/commons/1/10/Empowering_Rural_Women_through_the_Lakhpati_Didi_Initiative.jpg",
    title: "Unlocking Financial Freedom for Self-Help Groups",
    subtitle: "Providing micro-grants, vocational training, and raw logistics to support rural female-led micro enterprises."
  }
];

export const IMPACT_PROGRAMS: Program[] = [
  {
    id: "prog-edu",
    title: "Education Support Program",
    description: "Sponsoring children's tuition, distributing school backpacks, setting up tech-enabled classrooms, and modernizing primary learning structures.",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/84/India_-_Faces_-_rural_kids_on_their_way_to_school_%282832084021%29.jpg",
    raised: 34500,
    goal: 50000,
    beneficiaries: 1200,
    category: "Education"
  },
  {
    id: "prog-health",
    title: "Healthcare Initiative",
    description: "Running mobile community dispensaries, distributing clean drinking water purification systems, and hosting multi-specialty wellness camps.",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/71/A_Doctor_is_checking_a_baby_at_a_Healthy_Baby_Show_by_Directorate_of_Field_Publicity_at_a_function_on_National_Rural_Health_Mission_organised_by_PIB_Guwahati_on_the_occasion_of_the_Public_information_Campaign_on%22_Bharat.jpg",
    raised: 48900,
    goal: 60000,
    beneficiaries: 3400,
    category: "Health & Water"
  },
  {
    id: "prog-women",
    title: "Women Empowerment Guild",
    description: "Empowering local artisans with training, micro-capital credits, and global retail channels, turning rural housewives into bold leaders.",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a5/These_Mising_tribe_women_are_involved_in_the_traditional_craft_of_handloom_weaving.jpg",
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
    image: "https://randomuser.me/api/portraits/men/11.jpg",
    linkedin: "https://linkedin.com/in/adityasen-shukrana"
  },
  {
    id: "lead-2",
    name: "Meera Deshmukh",
    role: "Director of Operations",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    linkedin: "https://linkedin.com/in/meera-deshmukh-shukrana"
  },
  {
    id: "lead-3",
    name: "Rajesh Malhotra",
    role: "Head of Strategic Partnerships",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
    linkedin: "https://linkedin.com/in/rajesh-malhotra-shukrana"
  },
  {
    id: "lead-4",
    name: "Dr. Shalini Prakash",
    role: "Chief Medical & Welfare Advisor",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
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
