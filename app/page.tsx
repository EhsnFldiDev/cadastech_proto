'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { ExecutiveKpiCards } from '@/components/manager/ExecutiveKpiCards';
import { CommissionBuilder } from '@/components/manager/CommissionBuilder';
import { DealPipeline } from '@/components/manager/DealPipeline';
import { AgentLeaderboard } from '@/components/manager/AgentLeaderboard';
import { AgentPwaView } from '@/components/agent/AgentPwaView';
import { DeviceFrame } from '@/components/layout/DeviceFrame';
import { useStore } from '@/lib/store-context';
import { useTenant } from '@/lib/tenant-context';
import {
  Monitor,
  Smartphone,
  LayoutGrid,
  Sparkles,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building,
  CheckCircle2
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default function MultiDeviceShowcasePage() {
  const { currentTenant } = useTenant();
  const { smartMatches } = useStore();
  const [viewMode, setViewMode] = useState<'showcase' | 'manager_only' | 'agent_only'>('showcase');

  return (
    <div className="min-h-screen flex flex-col bg-slate-100/80">
      {/* Top Navbar */}
      <Navbar />

      {/* Simulator Mode Control Header */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <h1 className="text-sm sm:text-base font-black text-slate-900">
              شبیه‌ساز تعاملی همزمان CadasTech (Multi-Device Simulator)
            </h1>
            <span className="text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md font-medium hidden md:inline">
              داده‌های زنده و هماهنگ بین مدیر و مشاوران
            </span>
          </div>

          {/* View Toggles */}
          <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setViewMode('showcase')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all',
                viewMode === 'showcase'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>نمایش همزمان دسکتاپ و موبایل (مطابق طرح)</span>
            </button>

            <button
              onClick={() => setViewMode('manager_only')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all',
                viewMode === 'manager_only'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>تنها مدیر</span>
            </button>

            <button
              onClick={() => setViewMode('agent_only')}
              className={cn(
                'flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all',
                viewMode === 'agent_only'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              )}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>تنها مشاور</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        {/* Showcase Mode: Dual-Device side-by-side like the image! */}
        {viewMode === 'showcase' && (
          <div className="max-w-[1750px] mx-auto space-y-8">
            {/* Introductory explanation banner */}
            <div className="bg-gradient-to-l from-sky-900 to-slate-900 text-white p-4 sm:p-5 rounded-2xl shadow-sm flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <h2 className="text-sm sm:text-base font-extrabold text-white">
                    پیش‌نمایش تعاملی معماری پلتفرم کاداستک (مدیر دپارتمان + مشاوران PWA)
                  </h2>
                </div>
                <p className="text-xs text-slate-300">
                  هر فایـل یا تقاضای جدیدی که در نمای موبایل مشاور ثبت کنید، بلافاصله در موتور انطباق هوشمند ارزیابی شده و آمار آن در داشبورد کلان مدیر منعکس می‌شود.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <Link
                  href="/dashboard/manager"
                  className="px-3.5 py-1.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Monitor className="w-3.5 h-3.5" />
                  <span>ورود به نمای کامل مدیر</span>
                </Link>
                <Link
                  href="/dashboard/agent"
                  className="px-3.5 py-1.5 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-bold transition flex items-center gap-1"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>ورود به PWA مشاور</span>
                </Link>
              </div>
            </div>

            {/* Split layout: Left Desktop Manager, Right Mobile PWA(s) */}
            <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
              {/* Left Column: Manager Desktop Components (7 Cols) */}
              <div className="xl:col-span-8 space-y-6">
                {/* Desktop Monitor Frame Header */}
                <div className="bg-slate-800 text-white px-4 py-2 rounded-t-2xl flex items-center justify-between text-xs border-b border-slate-700">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-amber-500 inline-block" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block" />
                    <span className="font-mono text-slate-400 mr-2 text-[11px]">
                      cadastech.ir/dashboard/manager
                    </span>
                  </div>
                  <span className="font-bold text-slate-300">
                    داشبورد کلان دپارتمان املاک ({currentTenant.name})
                  </span>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-b-2xl border border-slate-200 shadow-sm space-y-6">
                  {/* Executive KPIs */}
                  <ExecutiveKpiCards />

                  {/* Commission Rule Builder */}
                  <CommissionBuilder />

                  {/* Deal Pipeline */}
                  <DealPipeline />

                  {/* Leaderboard */}
                  <AgentLeaderboard />
                </div>
              </div>

              {/* Right Column: Two Mobile Devices (matching the reference image: Agent Home & Smart Matching) (4 Cols) */}
              <div className="xl:col-span-4 flex flex-col sm:flex-row xl:flex-col gap-6 items-center justify-center">
                {/* Device 1: Agent Dashboard (Wallet, Tasks, Actions) */}
                <DeviceFrame title="نمای مشاور (PWA Mobile) - داشبورد و پیگیری‌ها">
                  <AgentPwaView initialTab="feed" />
                </DeviceFrame>

                {/* Device 2: Smart Matching Feed Screen */}
                <DeviceFrame title="موتور انطباق هوشمند (Smart Matching Feed)">
                  <AgentPwaView initialTab="matches" />
                </DeviceFrame>
              </div>
            </div>
          </div>
        )}

        {/* Manager Only View */}
        {viewMode === 'manager_only' && (
          <div className="max-w-7xl mx-auto space-y-6">
            <ExecutiveKpiCards />
            <CommissionBuilder />
            <DealPipeline />
            <AgentLeaderboard />
          </div>
        )}

        {/* Agent Only View */}
        {viewMode === 'agent_only' && (
          <div className="flex justify-center py-6">
            <div className="w-full max-w-lg bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden flex flex-col min-h-[750px]">
              <AgentPwaView />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
