'use client';

import React, { useState } from 'react';
import { AgentHeader } from './AgentHeader';
import { SmartMatchingFeed } from './SmartMatchingFeed';
import { DailyTasks } from './DailyTasks';
import { QuickAddModal } from './QuickAddModal';
import { AgentWallet } from './AgentWallet';
import { useStore } from '@/lib/store-context';
import {
  Home,
  Sparkles,
  CalendarCheck,
  Wallet,
  Plus,
  Compass,
  FileText,
  UserCheck
} from 'lucide-react';
import { toPersianDigits, cn } from '@/lib/utils';

interface AgentPwaViewProps {
  initialTab?: 'feed' | 'tasks' | 'matches' | 'wallet';
  className?: string;
}

export function AgentPwaView({ initialTab = 'feed', className }: AgentPwaViewProps) {
  const { smartMatches, dailyTasks } = useStore();
  const [activeBottomNav, setActiveBottomNav] = useState<'feed' | 'tasks' | 'matches' | 'wallet'>(
    initialTab
  );
  const [quickAddTab, setQuickAddTab] = useState<'property' | 'demand'>('property');
  const [isQuickAddOpen, setIsQuickAddOpen] = useState(false);
  const [isWalletOpen, setIsWalletOpen] = useState(false);

  const openQuickAdd = (tab: 'property' | 'demand') => {
    setQuickAddTab(tab);
    setIsQuickAddOpen(true);
  };

  const pendingTasksCount = dailyTasks.filter((t) => !t.completed).length;

  return (
    <div className={cn('w-full flex-1 flex flex-col bg-slate-100/70 relative pb-20', className)}>
      {/* PWA Top Header */}
      <AgentHeader
        onOpenQuickAdd={openQuickAdd}
        onOpenWallet={() => setIsWalletOpen(true)}
      />

      {/* Main Scrollable Content */}
      <div className="p-3.5 space-y-4 max-w-lg mx-auto w-full">
        {/* If Active Tab is 'feed' (All-in-one home dashboard) */}
        {activeBottomNav === 'feed' && (
          <>
            {/* Daily Tasks Card */}
            <DailyTasks />

            {/* Smart Matching Feed */}
            <SmartMatchingFeed />
          </>
        )}

        {/* If Active Tab is 'matches' (Direct Smart Match Focus) */}
        {activeBottomNav === 'matches' && (
          <div className="pt-1">
            <SmartMatchingFeed />
          </div>
        )}

        {/* If Active Tab is 'tasks' (Follow-up Tasks focus) */}
        {activeBottomNav === 'tasks' && (
          <div className="pt-1">
            <DailyTasks />
          </div>
        )}

        {/* If Active Tab is 'wallet' */}
        {activeBottomNav === 'wallet' && (
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm text-center space-y-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center mx-auto">
              <Wallet className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900">کیف پول و تسویه پورسانت</h3>
              <p className="text-xs text-slate-500 mt-1">
                مشاهده مانده، تاریخچه واریزها و درخواست انتقال آنی به شبا
              </p>
            </div>
            <button
              onClick={() => setIsWalletOpen(true)}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl shadow-md transition"
            >
              مشاهده جزئیات کامل حساب و تسویه
            </button>
          </div>
        )}
      </div>

      {/* Floating Action Button (FAB) for Quick Add */}
      <div className="fixed bottom-20 left-4 z-30 sm:absolute">
        <button
          onClick={() => openQuickAdd('property')}
          className="w-12 h-12 rounded-full bg-sky-600 hover:bg-sky-700 text-white flex items-center justify-center shadow-lg shadow-sky-600/40 hover:scale-105 active:scale-95 transition-all"
          title="ثبت سریع فایل جدید"
        >
          <Plus className="w-6 h-6 stroke-[2.5]" />
        </button>
      </div>

      {/* Bottom PWA Navigation Bar (Fixed at bottom) */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-lg mx-auto bg-white/95 backdrop-blur-md border-t border-slate-200 px-4 py-2 flex items-center justify-around z-30 shadow-lg sm:absolute">
        <button
          onClick={() => setActiveBottomNav('feed')}
          className={cn(
            'flex flex-col items-center gap-1 transition-colors py-1 px-2 rounded-lg',
            activeBottomNav === 'feed'
              ? 'text-sky-600 font-extrabold'
              : 'text-slate-400 hover:text-slate-700'
          )}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">داشبورد</span>
        </button>

        <button
          onClick={() => setActiveBottomNav('matches')}
          className={cn(
            'flex flex-col items-center gap-1 transition-colors py-1 px-2 rounded-lg relative',
            activeBottomNav === 'matches'
              ? 'text-sky-600 font-extrabold'
              : 'text-slate-400 hover:text-slate-700'
          )}
        >
          <Sparkles className="w-5 h-5" />
          <span className="text-[10px]">انطباق هوشمند</span>
          {smartMatches.length > 0 && (
            <span className="absolute -top-0.5 right-1 w-4 h-4 bg-emerald-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
              {smartMatches.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveBottomNav('tasks')}
          className={cn(
            'flex flex-col items-center gap-1 transition-colors py-1 px-2 rounded-lg relative',
            activeBottomNav === 'tasks'
              ? 'text-sky-600 font-extrabold'
              : 'text-slate-400 hover:text-slate-700'
          )}
        >
          <CalendarCheck className="w-5 h-5" />
          <span className="text-[10px]">پیگیری‌ها</span>
          {pendingTasksCount > 0 && (
            <span className="absolute -top-0.5 right-1 w-4 h-4 bg-sky-500 text-white rounded-full text-[9px] font-black flex items-center justify-center">
              {pendingTasksCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setIsWalletOpen(true)}
          className={cn(
            'flex flex-col items-center gap-1 transition-colors py-1 px-2 rounded-lg',
            activeBottomNav === 'wallet'
              ? 'text-sky-600 font-extrabold'
              : 'text-slate-400 hover:text-slate-700'
          )}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px]">کیف پول</span>
        </button>
      </nav>

      {/* Quick Add Modal */}
      <QuickAddModal
        isOpen={isQuickAddOpen}
        onClose={() => setIsQuickAddOpen(false)}
        defaultTab={quickAddTab}
      />

      {/* Wallet Modal */}
      <AgentWallet isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
    </div>
  );
}
