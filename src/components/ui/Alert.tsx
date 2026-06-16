import React from 'react';
import { AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'info' | 'success' | 'warning' | 'danger';
  title?: string;
  children: React.ReactNode;
}

export function Alert({ variant = 'info', title, children, className = '', ...props }: AlertProps) {
  const styles = {
    info: 'bg-blue-50 text-blue-800 border-blue-200',
    success: 'bg-green-50 text-green-800 border-green-200',
    warning: 'bg-yellow-50 text-yellow-800 border-yellow-200',
    danger: 'bg-red-50 text-red-800 border-red-200',
  };

  const icons = {
    info: <Info className="h-5 w-5 text-blue-500 shrink-0" />,
    success: <CheckCircle2 className="h-5 w-5 text-green-500 shrink-0" />,
    warning: <AlertTriangle className="h-5 w-5 text-yellow-500 shrink-0" />,
    danger: <AlertCircle className="h-5 w-5 text-red-500 shrink-0" />,
  };

  return (
    <div className={`p-4 rounded-xl border flex gap-3 ${styles[variant]} ${className}`} {...props}>
      {icons[variant]}
      <div>
        {title && <h4 className="text-sm font-bold mb-1">{title}</h4>}
        <div className="text-sm opacity-90 leading-relaxed">
          {children}
        </div>
      </div>
    </div>
  );
}
