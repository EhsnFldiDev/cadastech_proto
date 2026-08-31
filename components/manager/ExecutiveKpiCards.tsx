'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { SparklineChart } from '@/components/common/SparklineChart';
import { TrendingUp, Users, Calendar, ArrowUpRight, DollarSign } from 'lucide-react';
import { formatTomanPrice, toPersianDigits, formatPercent } from '@/lib/utils';

export function ExecutiveKpiCards() {
  const { deals, agents } = useStore();
  const [period, setPeriod] = useState<'month' | 'quarter' | 'year'>('month');

  // Calculate stats from deals
  const totalVolume = deals.reduce((acc, d) => acc + d.dealAmount, 0);
  const totalGrossCommission = deals.reduce((acc, d) => acc + d.grossCommission, 0);
  const closedDealsCount = deals.filter((d) => d.stage === 'closed').length;
  const conversionRate = Math.round((closedDealsCount / Math.max(1, deals.length)) * 100);

  return (
    <div className="space-y-4">
      {/* Top Section Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200/80 shadow-sm">
        <div>
          <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
            <span>خلاصه عملکرد ماه جاری دپارتمان</span>
            <span className="text-xs font-normal text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
              منطقه ۲ و ۵ تهران
            </span>
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            آمار تحلیلی حجم معاملات، جریان درآمدی پورسانت‌ها و نرخ تبدیل مشتریان
          </p>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl text-xs font-bold border border-slate-200">
          <Calendar className="w-3.5 h-3.5 text-slate-500 mr-1" />
          <button
            onClick={() => setPeriod('month')}
            className={`px-3 py-1 rounded-lg transition-all ${
              period === 'month' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ماه جاری
          </button>
          <button
            onClick={() => setPeriod('quarter')}
            className={`px-3 py-1 rounded-lg transition-all ${
              period === 'quarter' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            ۳ ماهه
          </button>
          <button
            onClick={() => setPeriod('year')}
            className={`px-3 py-1 rounded-lg transition-all ${
              period === 'year' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            سالانه
          </button>
        </div>
      </div>

      {/* 3 Main KPI Wave Cards (matching the reference image layout) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* KPI 1: Volume */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-xs font-bold text-slate-500 block mb-1">حجم کل معاملات</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {formatTomanPrice(totalVolume)}
              </h3>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>٪۱۸.۴+</span>
            </span>
          </div>

          {/* Sleek Sparkline Wave Chart */}
          <div className="mt-4 pt-2">
            <SparklineChart
              data={[25, 42, 35, 68, 48, 85, 65, 92]}
              color="#0284c7"
              fillGradientStart="#0284c7"
              height={65}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>میانگین ارزش قرارداد: ۲۴.۲ میلیارد</span>
            <span className="font-semibold text-slate-600">۳ ماه رشد متوالی</span>
          </div>
        </div>

        {/* KPI 2: Gross Commission */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-xs font-bold text-slate-500 block mb-1">پورسانت ناخالص صندوق</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {formatTomanPrice(totalGrossCommission)}
              </h3>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>٪۱۴.۲+</span>
            </span>
          </div>

          {/* Sleek Sparkline Wave Chart */}
          <div className="mt-4 pt-2">
            <SparklineChart
              data={[30, 25, 55, 40, 78, 62, 88, 79]}
              color="#0d9488"
              fillGradientStart="#0d9488"
              height={65}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>سهم ناخالص آژانس: ۵۰٪</span>
            <span className="font-semibold text-teal-700">تراز تسویه: مثبت</span>
          </div>
        </div>

        {/* KPI 3: Conversion Rate */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-5 flex flex-col justify-between hover:shadow-md transition-shadow relative overflow-hidden group">
          <div className="flex items-start justify-between mb-2">
            <div>
              <span className="text-xs font-bold text-slate-500 block mb-1">نرخ تبدیل فایل به نشست</span>
              <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                {formatPercent(conversionRate || 34)}
              </h3>
            </div>
            <span className="flex items-center gap-1 text-xs font-bold text-sky-600 bg-sky-50 px-2 py-1 rounded-lg border border-sky-100">
              <Users className="w-3.5 h-3.5" />
              <span>{toPersianDigits(agents.length)} مشاور فعال</span>
            </span>
          </div>

          {/* Sleek Sparkline Wave Chart */}
          <div className="mt-4 pt-2">
            <SparklineChart
              data={[20, 35, 45, 30, 60, 50, 72, 65]}
              color="#6366f1"
              fillGradientStart="#6366f1"
              height={65}
            />
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 pt-2 border-t border-slate-100">
            <span>سرعت میانگین تبدیل: ۹ روز</span>
            <span className="font-semibold text-indigo-700">بالاتر از میانگین صنف</span>
          </div>
        </div>
      </div>
    </div>
  );
}
