import React from 'react';

export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

export function Avatar({ src, alt, initials, size = 'md', className = '' }: AvatarProps) {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-base',
    xl: 'w-20 h-20 text-xl',
  };

  const baseClasses = `relative inline-flex items-center justify-center rounded-full overflow-hidden shrink-0 ${sizes[size]} ${className}`;

  if (src) {
    return (
      <div className={baseClasses}>
        <img src={src} alt={alt || 'Avatar'} className="w-full h-full object-cover" />
      </div>
    );
  }

  // Fallback to initials
  return (
    <div className={`${baseClasses} bg-blue-50 text-[#232F46] font-bold border border-blue-100`}>
      {initials ? initials.substring(0, 2).toUpperCase() : 'SK'}
    </div>
  );
}
