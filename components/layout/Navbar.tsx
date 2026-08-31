'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTenant } from '@/lib/tenant-context';
import { useStore } from '@/lib/store-context';
import { TenantModal } from './TenantModal';
import {
  Building,
  Smartphone,
  Monitor,
  LayoutGrid,
  ChevronDown,
  Layers,
  Sparkles,
  User,
  Sliders
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const { currentTenant } = useTenant();
  const { smartMatches } = useStore();
  const [isTenantModalOpen, setIsTenantModalOpen] = useState(false);

  const isManager = pathname?.includes('/dashboard/manager');
  const isAgent = pathname?.includes('/dashboard/agent');
  const isSimulator = pathname === '/';

  return (
    <>
      <header
        className="w-full text-white shadow-md sticky top-0 z-40 transition-colors duration-300"
        style={{ backgroundColor: currentTenant.primaryColor }}
      >
        {/* Top Announcement / Quick Switch Bar */}
        <div className="border-b border-white/10 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between gap-2 bg-black/15 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 bg-white/20 text-white px-2 py-0.5 rounded text-[11px] font-bold">
              <Sparkles className="w-3 h-3 text-amber-300" />
              نسخه پیش‌نمایش معماری CadasTech
            </span>
            <span className="hidden sm:inline text-white/75 text-[11px]">
              پلتفرم ابری B2B دپارتمان‌های املاک و انطباق هوشمند فایل و متقاضی
            </span>
          </div>

          {/* Quick Viewport Switcher Controls */}
          <div className="flex items-center gap-1.5 bg-black/25 p-1 rounded-lg border border-white/15">
            <span className="text-[11px] text-white/70 px-1 font-medium hidden md:inline">
              حالت نمایش:
            </span>

            <Link
              href="/"
              className={cn(
                'flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all',
                isSimulator
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              )}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>شبیه‌ساز همزمان (Dual Mockup)</span>
            </Link>

            <Link
              href="/dashboard/manager"
              className={cn(
                'flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all',
                isManager
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              )}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>نمای مدیر دپارتمان (Desktop)</span>
            </Link>

            <Link
              href="/dashboard/agent"
              className={cn(
                'flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold transition-all',
                isAgent
                  ? 'bg-sky-500 text-white shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              )}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>نمای مشاور (Mobile PWA)</span>
              {smartMatches.length > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-400 text-slate-900 text-[10px] font-extrabold flex items-center justify-center">
                  {smartMatches.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Main Navigation Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          {/* Right: Tenant Logo & Brand Switcher */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsTenantModalOpen(true)}
              className="flex items-center gap-2.5 p-1.5 -mr-1.5 rounded-xl hover:bg-white/10 transition text-right group"
              title="تغییر آژانس یا رنگ‌بندی برند"
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 border border-white/25 flex items-center justify-center font-black text-sm tracking-wider shadow-inner group-hover:scale-105 transition-transform">
                [{currentTenant.logoText}]
              </div>

              <div>
                <div className="flex items-center gap-1">
                  <span className="font-extrabold text-base sm:text-lg tracking-tight">
                    {currentTenant.name}
                  </span>
                  <ChevronDown className="w-3.5 h-3.5 text-white/60 group-hover:text-white transition" />
                </div>
                <span className="text-[11px] text-white/70 block leading-none">
                  {currentTenant.city} • {currentTenant.licenseNumber}
                </span>
              </div>
            </button>

            {/* White-label badge */}
            <button
              onClick={() => setIsTenantModalOpen(true)}
              className="hidden lg:flex items-center gap-1 px-2 py-1 rounded-md bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] font-medium text-white/90 transition"
            >
              <Sliders className="w-3 h-3 text-sky-300" />
              تنظیمات برندینگ
            </button>
          </div>

          {/* Center: Main App Nav Items (Manager View) */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link
              href="/dashboard/manager"
              className={cn(
                'px-3.5 py-1.5 rounded-lg transition-colors',
                isManager ? 'bg-white/20 font-bold text-white' : 'text-white/80 hover:bg-white/10 hover:text-white'
              )}
            >
              داشبورد کلان
            </Link>
            <Link
              href="/dashboard/manager#pipeline"
              className="px-3.5 py-1.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              پایپ‌لاین معاملات
            </Link>
            <Link
              href="/dashboard/agent"
              className="px-3.5 py-1.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors flex items-center gap-1.5"
            >
              <span>موتور انطباق هوشمند</span>
              <span className="px-1.5 py-0.2 bg-emerald-500 text-white rounded text-[10px] font-bold">
                زنده
              </span>
            </Link>
            <Link
              href="/dashboard/manager#commission"
              className="px-3.5 py-1.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              فرمول‌ساز کمیسیون
            </Link>
            <Link
              href="/dashboard/manager#leaderboard"
              className="px-3.5 py-1.5 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition-colors"
            >
              رتبه‌بندی مشاورین
            </Link>
          </nav>

          {/* Left: User Profile & Actions */}
          <div className="flex items-center gap-3">
            {/* User Profile Pill */}
            <div className="flex items-center gap-2.5 bg-white/10 pl-3 pr-2 py-1.5 rounded-xl border border-white/15">
              <div className="w-8 h-8 rounded-lg bg-sky-500/80 flex items-center justify-center text-white font-bold text-xs shadow-sm">
                <User className="w-4 h-4" />
              </div>
              <div className="text-right hidden sm:block">
                <span className="text-xs font-bold block leading-none">{currentTenant.managerName}</span>
                <span className="text-[10px] text-white/70 block mt-0.5">
                  مدیر آژانس [نام شما]
                </span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tenant Customization Modal */}
      <TenantModal isOpen={isTenantModalOpen} onClose={() => setIsTenantModalOpen(false)} />
    </>
  );
}
