import React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  noPadding?: boolean;
  [key: string]: any;
}

export function Card({ className = '', children, noPadding = false, ...props }: CardProps) {
  return (
    <div 
      className={`bg-white border border-gray-200 rounded-xl shadow-sm ${noPadding ? '' : 'p-6'} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mb-4 flex items-center justify-between ${className}`} {...props}>
      {children}
    </div>
  );
}

export function CardTitle({ className = '', children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3 className={`text-lg font-bold text-[#232F46] ${className}`} {...props}>
      {children}
    </h3>
  );
}

export function CardBody({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
}

export function CardFooter({ className = '', children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`mt-6 pt-4 border-t border-gray-100 flex items-center ${className}`} {...props}>
      {children}
    </div>
  );
}
