'use client';

import React, { useState } from 'react';
import { AgentPwaView } from '@/components/agent/AgentPwaView';
import { DeviceFrame } from '@/components/layout/DeviceFrame';
import { Smartphone, Maximize2, Minimize2, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function AgentDashboardPage() {
  const [useDeviceFrame, setUseDeviceFrame] = useState(false);

  return (
    <div className="flex-1 flex flex-col items-center justify-start p-2 sm:p-4 lg:p-6 w-full">
      {/* View Switcher Controls (on Desktop screens) */}
      <div className="w-full max-w-lg mb-3 flex items-center justify-between px-2 text-xs">
        <div className="flex items-center gap-1.5 font-bold text-slate-700">
          <Smartphone className="w-4 h-4 text-sky-600" />
          <span>اپلیکیشن PWA مشاور</span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setUseDeviceFrame(!useDeviceFrame)}
            className="hidden md:flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-white hover:bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-lg shadow-xs transition"
          >
            {useDeviceFrame ? (
              <>
                <Maximize2 className="w-3 h-3" />
                <span>نمای تمام‌صفحه</span>
              </>
            ) : (
              <>
                <Minimize2 className="w-3 h-3" />
                <span>قاب فیزیکی آیفون</span>
              </>
            )}
          </button>

          <Link
            href="/dashboard/manager"
            className="flex items-center gap-1 text-[11px] font-bold text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200 px-2.5 py-1 rounded-lg transition"
          >
            <span>داشبورد مدیر</span>
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Either Phone Mockup Frame or Direct Responsive Container */}
      {useDeviceFrame ? (
        <div className="py-4">
          <DeviceFrame title="پیش‌نمایش در آیفون ۱۵ پرو">
            <AgentPwaView />
          </DeviceFrame>
        </div>
      ) : (
        <div className="w-full max-w-lg bg-white rounded-3xl shadow-md border border-slate-200 overflow-hidden flex flex-col min-h-[750px]">
          <AgentPwaView />
        </div>
      )}
    </div>
  );
}
