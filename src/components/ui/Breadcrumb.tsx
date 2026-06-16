import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  return (
    <nav className={`flex text-xs text-gray-500 ${className}`} aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        <li className="inline-flex items-center">
          <Link to="/dashboard" className="inline-flex items-center hover:text-[#ED8C32] transition-colors">
            <Home className="w-3 h-3 mr-1" />
            Home
          </Link>
        </li>
        
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={index}>
              <div className="flex items-center">
                <ChevronRight className="w-3 h-3 text-gray-400 mx-1" />
                {isLast || !item.href ? (
                  <span className="text-gray-400 font-medium" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link to={item.href} className="hover:text-[#ED8C32] transition-colors">
                    {item.label}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
