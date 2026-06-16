import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', label, error, leftIcon, rightIcon, fullWidth = true, ...props }, ref) => {
    return (
      <div className={`${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label className="block text-xs font-bold text-[#232F46] uppercase tracking-wide mb-1.5">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3 text-gray-400 pointer-events-none">
              {leftIcon}
            </div>
          )}
          <input
            ref={ref}
            className={`
              bg-gray-50 border rounded-lg text-sm text-[#232F46] outline-none transition-colors
              focus:bg-white focus:ring-2 focus:ring-[#ED8C32] focus:border-[#ED8C32]
              disabled:opacity-50 disabled:cursor-not-allowed
              ${error ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : 'border-gray-200'}
              ${leftIcon ? 'pl-10' : 'pl-4'}
              ${rightIcon ? 'pr-10' : 'pr-4'}
              ${fullWidth ? 'w-full' : ''}
              py-2.5
              ${className}
            `}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3 text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';
