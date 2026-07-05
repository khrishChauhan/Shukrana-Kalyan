import React from 'react';
import { Badge } from './Badge';

export type StatusType = 'Active' | 'Pending' | 'PENDING' | 'Pending Review' | 'Pending Approval' | 'Pending Verification' | 'Expired' | 'Suspended' | 'Inactive' | string;

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  let variant: 'success' | 'warning' | 'danger' | 'gray' = 'gray';

  const s = String(status).toLowerCase();
  if (s === 'active' || s === 'approved' || s === 'verified') {
    variant = 'success';
  } else if (s.includes('pending')) {
    variant = 'warning';
  } else if (s === 'expired' || s === 'suspended' || s === 'inactive' || s === 'rejected') {
    variant = 'danger';
  }

  return (
    <Badge variant={variant} className={className}>
      {/* Optional dot indicator */}
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        variant === 'success' ? 'bg-green-500' :
        variant === 'warning' ? 'bg-yellow-500' :
        variant === 'danger' ? 'bg-red-500' : 'bg-gray-400'
      }`} />
      {status}
    </Badge>
  );
}
