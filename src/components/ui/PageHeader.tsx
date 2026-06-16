import React from 'react';
import { Breadcrumb, BreadcrumbItem } from './Breadcrumb';

export interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, breadcrumbs, action, className = '' }: PageHeaderProps) {
  return (
    <div className={`mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 ${className}`}>
      <div>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <Breadcrumb items={breadcrumbs} className="mb-2" />
        )}
        <h1 className="text-2xl font-extrabold text-[#232F46] tracking-tight">{title}</h1>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      
      {action && (
        <div className="shrink-0">
          {action}
        </div>
      )}
    </div>
  );
}
