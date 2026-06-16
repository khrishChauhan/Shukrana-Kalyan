import React from 'react';

export interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div className={`animate-pulse bg-gray-200 rounded ${className}`} />
  );
}

// Pre-configured skeleton layouts
export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full border border-gray-200 rounded-xl bg-white overflow-hidden">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex gap-4">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-4 w-1/4" />
      </div>
      <div className="divide-y divide-gray-100">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="px-6 py-4 flex gap-4">
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
            <Skeleton className="h-4 w-1/4" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <Skeleton className="h-6 w-1/2 mb-4" />
      <Skeleton className="h-4 w-full mb-2" />
      <Skeleton className="h-4 w-3/4 mb-6" />
      <Skeleton className="h-10 w-full rounded-lg" />
    </div>
  );
}
