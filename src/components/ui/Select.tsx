import React, { forwardRef } from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  options: { value: string; label: string }[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className = '', label, error, fullWidth = true, options, ...props }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          <select
            ref={ref}
            className={`
              appearance-none bg-gray-50 border rounded-lg text-sm text-[#232F46] outline-none transition-colors
              focus:bg-white focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32]
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200'}
              pl-4 pr-10 py-2.5
              ${fullWidth ? 'w-full' : ''}
              ${className}
            `}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3 text-gray-400 pointer-events-none">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
