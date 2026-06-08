/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Program {
  id: string;
  title: string;
  description: string;
  image: string;
  raised: number;
  goal: number;
  beneficiaries: number;
  category: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  image: string;
  linkedin: string;
}

export interface ActivityLog {
  id: string;
  type: 'donation' | 'volunteer' | 'program' | 'campaign';
  content: string;
  amount?: string;
  time: string;
  status: 'completed' | 'pending' | 'success';
}

export interface DonationRecord {
  id: string;
  donorName: string;
  amount: number;
  program: string;
  date: string;
  status: 'completed' | 'processing';
}

export interface KPICardData {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  indicator: 'up' | 'down' | 'neutral';
  desc: string;
}
