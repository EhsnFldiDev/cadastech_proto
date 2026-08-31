'use client';

import React from 'react';
import { useStore } from '@/lib/store-context';
import { useTenant } from '@/lib/tenant-context';
import { Bell, Plus, UserPlus, Wallet, Sparkles, ChevronLeft } from 'lucide-react';
import { formatTomanPrice, toPersianDigits } from '@/lib/utils';

interface AgentHeaderProps {
  onOpenQuickAdd: (tab: 'property' | 'demand') => void;
  onOpenWallet: () => void;
}

export function AgentHeader({ onOpenQuickAdd, onOpenWallet }: AgentHeaderProps) {
  const { currentAgent, smartMatches } = useStore();
  const { currentTenant } = useTenant();

  // Pending settlement amount (e.g. 45,000,000 Tomans)
  const pendingSettlement = 45000000;

  return (
    <div
      className="text-white p-4 pb-5 rounded-b-3xl shadow-lg relative overflow-hidden transition-colors duration-300"
      style={{ backgroundColor: currentTenant.primaryColor }}
    >
      {/* Background Subtle Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />

      {/* Top row: Agent Profile & Bell */}
      <div className="flex items-center justify-between relative z-10 mb-4">
        <div className="flex items-center gap-2.5">
          <div className="relative">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={currentAgent.avatar}
              alt={currentAgent.name}
              className="w-10 h-10 rounded-full object-cover border-2 border-white/40 shadow-sm"
            />
            <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 border-2 border-slate-900 rounded-full" />
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-black text-sm text-white leading-tight">{currentAgent.name}</h3>
              <span className="text-[10px] px-1.5 py-0.2 bg-white/20 rounded font-medium text-white/90">
                مشاور
              </span>
            </div>
            <span className="text-[11px] text-white/70 block mt-0.5">{currentTenant.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            className="w-9 h-9 rounded-full bg-white/15 hover:bg-white/25 flex items-center justify-center text-white relative transition"
            aria-label="اعلان‌ها"
          >
            <Bell className="w-4 h-4" />
            {smartMatches.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-400 text-slate-950 font-black text-[10px] rounded-full flex items-center justify-center animate-pulse">
                {smartMatches.length}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Commission Balance Card (matching mockup: "پورسانت قابل تسویه: ۴۵,۰۰۰,۰۰۰ ریال/تومان") */}
      <div
        onClick={onOpenWallet}
        className="bg-white/15 backdrop-blur-md rounded-2xl p-4 border border-white/20 shadow-inner cursor-pointer hover:bg-white/20 transition relative z-10 mb-4"
      >
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-white/80 font-medium flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5 text-amber-300" />
            پورسانت آماده تسویه:
          </span>
          <span className="text-[11px] text-sky-200 flex items-center gap-0.5 font-bold">
            <span>کیف پول</span>
            <ChevronLeft className="w-3 h-3" />
          </span>
        </div>

        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-black text-white tracking-tight">
            {toPersianDigits('۴۵,۰۰۰,۰۰۰')} <span className="text-xs font-normal text-white/80">تومان</span>
          </h2>
          <span className="text-[10px] text-emerald-300 font-bold bg-emerald-500/20 px-2 py-0.5 rounded-full border border-emerald-400/30">
            آماده واریز آنی
          </span>
        </div>
      </div>

      {/* Quick Action Buttons (matching mockup: "+ ثبت فایل جدید" / "👤 ثبت متقاضی جدید") */}
      <div className="grid grid-cols-2 gap-2.5 relative z-10">
        <button
          onClick={() => onOpenQuickAdd('property')}
          className="flex items-center justify-center gap-2 bg-white text-slate-900 font-extrabold text-xs py-3 px-3 rounded-xl shadow-md hover:bg-slate-100 active:scale-95 transition"
        >
          <div className="w-6 h-6 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
            <Plus className="w-4 h-4 stroke-[3]" />
          </div>
          <span>ثبت فایل جدید</span>
        </button>

        <button
          onClick={() => onOpenQuickAdd('demand')}
          className="flex items-center justify-center gap-2 bg-white text-slate-900 font-extrabold text-xs py-3 px-3 rounded-xl shadow-md hover:bg-slate-100 active:scale-95 transition"
        >
          <div className="w-6 h-6 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center">
            <UserPlus className="w-4 h-4 stroke-[2.5]" />
          </div>
          <span>ثبت متقاضی جدید</span>
        </button>
      </div>
    </div>
  );
}
