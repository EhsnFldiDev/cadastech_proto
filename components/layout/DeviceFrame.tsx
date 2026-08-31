'use client';

import React from 'react';
import { Wifi, Battery, Signal } from 'lucide-react';
import { cn, toPersianDigits } from '@/lib/utils';

interface DeviceFrameProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export function DeviceFrame({ children, className, title }: DeviceFrameProps) {
  return (
    <div className="flex flex-col items-center">
      {title && (
        <div className="mb-3 text-center">
          <span className="inline-block px-3 py-1 bg-slate-200 text-slate-700 rounded-full text-xs font-bold shadow-sm">
            {title}
          </span>
        </div>
      )}

      {/* Realistic Mobile Device Mockup Frame */}
      <div
        className={cn(
          'relative w-[360px] sm:w-[380px] h-[780px] bg-slate-900 rounded-[50px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.35)] ring-1 ring-slate-800 border-[4px] border-slate-700/80 flex flex-col',
          className
        )}
      >
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-5 bg-black rounded-full z-30 flex items-center justify-between px-3">
          <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800" />
          <div className="w-2.5 h-2.5 rounded-full bg-blue-950/80 ring-1 ring-blue-900" />
        </div>

        {/* Screen Bezel Container */}
        <div className="relative w-full h-full bg-slate-50 rounded-[40px] overflow-hidden flex flex-col border border-slate-200 shadow-inner">
          {/* Status Bar */}
          <div className="h-10 px-6 flex items-center justify-between text-slate-800 text-[11px] font-bold z-20 shrink-0 select-none pt-1">
            <span>{toPersianDigits('09:41')}</span>
            <div className="flex items-center gap-1.5 text-slate-800">
              <Signal className="w-3.5 h-3.5 fill-current" />
              <Wifi className="w-3.5 h-3.5" />
              <Battery className="w-4 h-4 fill-current" />
            </div>
          </div>

          {/* Screen Scrollable Viewport */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden flex flex-col relative">
            {children}
          </div>

          {/* Home Indicator Bar */}
          <div className="h-4 flex items-center justify-center shrink-0 bg-white/80 backdrop-blur-sm z-20">
            <div className="w-32 h-1 bg-slate-300 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
