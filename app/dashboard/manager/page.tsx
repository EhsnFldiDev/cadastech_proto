'use client';

import React from 'react';
import { ExecutiveKpiCards } from '@/components/manager/ExecutiveKpiCards';
import { CommissionBuilder } from '@/components/manager/CommissionBuilder';
import { DealPipeline } from '@/components/manager/DealPipeline';
import { AgentLeaderboard } from '@/components/manager/AgentLeaderboard';
import { useTenant } from '@/lib/tenant-context';
import { Monitor, Sparkles, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ManagerDashboardPage() {
  const { currentTenant } = useTenant();

  return (
    <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-8">
      {/* Top Banner / Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
            <Monitor className="w-3.5 h-3.5 text-sky-600" />
            <span>داشبورد دسکتاپ مدیریت دپارتمان</span>
            <span>•</span>
            <span className="text-sky-700">{currentTenant.name}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            داشبورد کلان و مرکز کنترل عملیات ملکی
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/agent"
            className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl shadow-xs transition flex items-center gap-1.5"
          >
            <span>مشاهده نمای PWA مشاور</span>
            <ArrowLeft className="w-3.5 h-3.5" />
          </Link>
          <Link
            href="/"
            className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center gap-1.5"
          >
            <span>شبیه‌ساز همزمان دو نمایشگر</span>
          </Link>
        </div>
      </div>

      {/* 1. Executive KPIs (Volume, Commission, Conversion Rate) */}
      <ExecutiveKpiCards />

      {/* 2. Dynamic Commission Rule Builder */}
      <CommissionBuilder />

      {/* 3. Deal Pipeline Kanban */}
      <DealPipeline />

      {/* 4. Top Agent Leaderboard */}
      <AgentLeaderboard />
    </div>
  );
}
