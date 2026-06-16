import React from 'react';

export interface EmptyStateProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className = '' }: EmptyStateProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-8 sm:p-12 text-center ${className}`}>
      {icon && (
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center text-gray-400 mb-4">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-bold text-[#232F46] mb-2">{title}</h3>
      {description && <p className="text-sm text-gray-500 max-w-sm mx-auto mb-6">{description}</p>}
      {action && <div>{action}</div>}
    </div>
  );
}
