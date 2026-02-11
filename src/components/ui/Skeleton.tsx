import type { HTMLAttributes } from 'react';

type SkeletonProps = HTMLAttributes<HTMLDivElement>;

export default function Skeleton({ className = '', ...props }: SkeletonProps) {
  return (
    <div
      {...props}
      className={`animate-pulse rounded-2xl border border-white/10 bg-white/5 ${className}`}
    />
  );
}
