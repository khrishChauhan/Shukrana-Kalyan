import React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'gray';
  children: React.ReactNode;
  [key: string]: any;
}

export function Badge({ className = '', variant = 'primary', children, ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-orange-50 text-orange-700 border-orange-200',
    secondary: 'bg-blue-50 text-[#232F46] border-blue-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    danger: 'bg-red-50 text-red-700 border-red-200',
    gray: 'bg-gray-50 text-gray-700 border-gray-200',
  };

  return (
    <span 
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}
