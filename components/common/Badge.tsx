import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'purple' | 'gold' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Badge({
  children,
  variant = 'default',
  size = 'md',
  className
}: BadgeProps) {
  const variantStyles = {
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    warning: 'bg-amber-50 text-amber-700 border-amber-200',
    danger: 'bg-rose-50 text-rose-700 border-rose-200',
    info: 'bg-sky-50 text-sky-700 border-sky-200',
    purple: 'bg-indigo-50 text-indigo-700 border-indigo-200',
    gold: 'bg-yellow-50 text-amber-800 border-yellow-300 font-bold',
    outline: 'bg-transparent border-slate-300 text-slate-600'
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs font-medium',
    lg: 'px-3 py-1.5 text-sm font-semibold'
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border transition-all',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
}

export function MatchScoreBadge({ score, className }: { score: number; className?: string }) {
  let colorClass = 'bg-emerald-500 text-white shadow-emerald-500/20';
  if (score < 75) {
    colorClass = 'bg-sky-500 text-white shadow-sky-500/20';
  }
  if (score < 65) {
    colorClass = 'bg-amber-500 text-white shadow-amber-500/20';
  }

  const persianScore = score.toString().replace(/\d/g, (d) => ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'][parseInt(d)]);

  return (
    <div
      className={cn(
        'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold shadow-sm',
        colorClass,
        className
      )}
    >
      <span>تطابق</span>
      <span className="font-extrabold tracking-wide">٪{persianScore}</span>
    </div>
  );
}
