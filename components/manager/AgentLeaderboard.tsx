'use client';

import React from 'react';
import { useStore } from '@/lib/store-context';
import { Trophy, Star, Phone, CheckCircle, Flame, Award } from 'lucide-react';
import { formatTomanPrice, toPersianDigits } from '@/lib/utils';

export function AgentLeaderboard() {
  const { agents } = useStore();

  // Sort agents by monthly commission descending
  const sortedAgents = [...agents].sort((a, b) => b.monthlyCommission - a.monthlyCommission);

  const getRankBadge = (index: number) => {
    if (index === 0) {
      return (
        <span className="w-7 h-7 rounded-full bg-amber-400 text-amber-950 font-black text-xs flex items-center justify-center shadow-md shadow-amber-400/30 ring-2 ring-amber-300">
          ۱
        </span>
      );
    }
    if (index === 1) {
      return (
        <span className="w-7 h-7 rounded-full bg-slate-300 text-slate-900 font-black text-xs flex items-center justify-center shadow-md shadow-slate-300/30 ring-2 ring-slate-200">
          ۲
        </span>
      );
    }
    if (index === 2) {
      return (
        <span className="w-7 h-7 rounded-full bg-amber-700/80 text-amber-100 font-black text-xs flex items-center justify-center shadow-md shadow-amber-700/20 ring-2 ring-amber-600">
          ۳
        </span>
      );
    }
    return (
      <span className="w-7 h-7 rounded-full bg-slate-100 text-slate-600 font-bold text-xs flex items-center justify-center border border-slate-200">
        {toPersianDigits(index + 1)}
      </span>
    );
  };

  return (
    <div id="leaderboard" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 flex items-center justify-center font-bold">
            <Trophy className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">رتبه‌بندی مشاورین برتر (Leaderboard)</h3>
            <p className="text-xs text-slate-500">
              عملکرد مشاورین و سرپرستان رنج بر اساس قراردادهای نهایی و حجم پورسانت واریزی
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
          <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
          <span>برترین پلنرهای ماه جاری</span>
        </div>
      </div>

      {/* Table / List View */}
      <div className="overflow-x-auto">
        <table className="w-full text-right text-xs">
          <thead>
            <tr className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
              <th className="py-3 px-4 rounded-r-xl">رتبه</th>
              <th className="py-3 px-4">مشاور / سرپرست</th>
              <th className="py-3 px-4 text-center">تعداد قرارداد</th>
              <th className="py-3 px-4 text-center">فایل‌های فعال</th>
              <th className="py-3 px-4 text-center">امتیاز مشتری</th>
              <th className="py-3 px-4 text-left">مجموع پورسانت وصولی</th>
              <th className="py-3 px-4 text-center rounded-l-xl">عملیات</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedAgents.map((agent, idx) => (
              <tr key={agent.id} className="hover:bg-slate-50/80 transition group">
                {/* Rank */}
                <td className="py-3 px-4">{getRankBadge(idx)}</td>

                {/* Agent Profile */}
                <td className="py-3 px-4">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={agent.avatar}
                        alt={agent.name}
                        className="w-10 h-10 rounded-full object-cover border border-slate-200 shadow-sm"
                      />
                      {agent.isOnline && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-slate-900 text-sm">{agent.name}</h4>
                      <span className="text-[11px] text-slate-500">{agent.roleTitle}</span>
                    </div>
                  </div>
                </td>

                {/* Deals count */}
                <td className="py-3 px-4 text-center">
                  <span className="font-extrabold text-slate-800 text-sm bg-slate-100 px-2.5 py-1 rounded-lg">
                    {toPersianDigits(agent.dealsCount)}
                  </span>
                </td>

                {/* Active files */}
                <td className="py-3 px-4 text-center text-slate-600 font-medium">
                  {toPersianDigits(agent.activeFilesCount)} فایل
                </td>

                {/* Rating */}
                <td className="py-3 px-4 text-center">
                  <div className="inline-flex items-center gap-1 text-amber-600 font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-100">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span>{toPersianDigits(agent.rating)}</span>
                  </div>
                </td>

                {/* Total Commission */}
                <td className="py-3 px-4 text-left">
                  <span className="font-black text-emerald-600 text-sm">
                    {formatTomanPrice(agent.monthlyCommission)}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-3 px-4 text-center">
                  <a
                    href={`tel:${agent.phone}`}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-bold text-[11px] transition shadow-xs"
                  >
                    <Phone className="w-3 h-3" />
                    <span>تماس سریع</span>
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
