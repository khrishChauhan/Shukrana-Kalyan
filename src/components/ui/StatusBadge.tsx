import React from 'react';
import { Badge } from './Badge';

export type StatusType = 'Active' | 'Pending Approval' | 'Pending Verification' | 'Expired' | 'Suspended' | 'Inactive';

export interface StatusBadgeProps {
  status: StatusType;
  className?: string;
}

export function StatusBadge({ status, className = '' }: StatusBadgeProps) {
  let variant: 'success' | 'warning' | 'danger' | 'gray' = 'gray';

  if (status === 'Active') {
    variant = 'success';
  } else if (status === 'Pending Approval' || status === 'Pending Verification') {
    variant = 'warning';
  } else if (status === 'Expired' || status === 'Suspended' || status === 'Inactive') {
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
