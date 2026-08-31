'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { SmartMatch } from '@/lib/types';
import { MatchScoreBadge } from '@/components/common/Badge';
import { ScheduleVisitModal } from './ScheduleVisitModal';
import { Modal } from '@/components/common/Modal';
import {
  Sparkles,
  Phone,
  Calendar,
  Check,
  Building,
  User,
  ShieldCheck,
  ArrowRight,
  Eye,
  Send
} from 'lucide-react';
import { formatTomanPrice, toPersianDigits, cn } from '@/lib/utils';

export function SmartMatchingFeed() {
  const { smartMatches, addToast } = useStore();
  const [selectedMatchForVisit, setSelectedMatchForVisit] = useState<SmartMatch | null>(null);
  const [selectedMatchForContact, setSelectedMatchForContact] = useState<SmartMatch | null>(null);
  const [revealedPhones, setRevealedPhones] = useState<Record<string, boolean>>({});

  const toggleRevealPhone = (propId: string) => {
    setRevealedPhones((prev) => ({
      ...prev,
      [propId]: !prev[propId]
    }));
    addToast({
      title: 'شماره مالک نمایان شد',
      description: 'ثبت رویداد تماس در گزارش نظارتی سیستم ثبت شد.',
      type: 'info'
    });
  };

  const handleShareToClient = (match: SmartMatch) => {
    addToast({
      title: '📤 لینک فایل برای مشتری ارسال شد',
      description: `پیش‌نویس کارشناسی فایل ${match.property.code} برای «${match.demand.clientName}» ارسال گردید.`,
      type: 'success'
    });
  };

  return (
    <div className="space-y-4">
      {/* Feed Header */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900">انطباق‌های هوشمند جدید</h3>
            <span className="text-[11px] text-slate-500">
              تطابق خودکار بین فایل‌های عرضه و متقاضیان فعال
            </span>
          </div>
        </div>

        <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-black rounded-full">
          {toPersianDigits(smartMatches.length)} مورد
        </span>
      </div>

      {/* Matches Cards List */}
      {smartMatches.length === 0 ? (
        <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-400 space-y-2">
          <Sparkles className="w-8 h-8 mx-auto text-slate-300 stroke-[1.5]" />
          <p className="text-xs font-bold text-slate-600">هنوز انطباق فعالی ثبت نشده است</p>
          <p className="text-[11px] text-slate-400">
            با ثبت اولین فایل یا تقاضا، موتور انطباق هوشمند بلافاصله فعال می‌شود.
          </p>
        </div>
      ) : (
        <div className="space-y-3.5">
          {smartMatches.map((match) => {
            const isPhoneRevealed = !!revealedPhones[match.property.id];

            return (
              <div
                key={match.id}
                className="bg-white rounded-2xl border border-slate-200/90 shadow-sm overflow-hidden hover:shadow-md transition-all group"
              >
                {/* Property Card Top Image Banner */}
                <div className="relative h-40 w-full overflow-hidden bg-slate-100">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={match.property.image}
                    alt={match.property.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Match Score Badge (Top Right) */}
                  <div className="absolute top-3 right-3">
                    <MatchScoreBadge score={match.score} />
                  </div>

                  {/* Property Deal Type Badge (Top Left) */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-md text-white text-[10px] font-extrabold rounded-md">
                      {match.property.dealType === 'sale' ? 'فروش مسکونی' : 'رهن و اجاره'}
                    </span>
                  </div>

                  {/* Price overlay on image */}
                  <div className="absolute bottom-2.5 right-3 text-white">
                    <span className="text-[10px] text-slate-300 block">ارزش پیشنهادی:</span>
                    <span className="text-base font-black">
                      {match.property.dealType === 'sale'
                        ? formatTomanPrice(match.property.totalPrice)
                        : `${formatTomanPrice(match.property.depositPrice)} ودیعه / ${formatTomanPrice(
                            match.property.monthlyRent
                          )} اجاره`}
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-4 space-y-3">
                  {/* Title and Specs */}
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-sm leading-tight">
                      {match.property.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                      <span>{match.property.neighborhood}</span>
                      <span>•</span>
                      <span>{toPersianDigits(match.property.bedrooms)} خوابه</span>
                      <span>•</span>
                      <span>{toPersianDigits(match.property.area)} متر مربع</span>
                      <span>•</span>
                      <span className="text-sky-600 font-bold">{match.property.code}</span>
                    </p>
                  </div>

                  {/* Matched Client Banner */}
                  <div className="bg-indigo-50/80 p-2.5 rounded-xl border border-indigo-100/80 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-indigo-200/80 text-indigo-800 flex items-center justify-center font-bold text-[10px]">
                        <User className="w-3 h-3" />
                      </div>
                      <div>
                        <span className="text-[10px] text-indigo-500 block leading-tight">
                          منطبق با متقاضی:
                        </span>
                        <span className="font-extrabold text-indigo-950">
                          {match.demand.clientName}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleShareToClient(match)}
                      className="px-2.5 py-1 bg-white hover:bg-indigo-100 text-indigo-700 rounded-lg text-[10px] font-bold border border-indigo-200 transition shadow-xs flex items-center gap-1"
                      title="ارسال مشخصات فایل برای مشتری"
                    >
                      <Send className="w-3 h-3" />
                      <span>ارسال به مشتری</span>
                    </button>
                  </div>

                  {/* Match Breakdown Reasoning Tags (matching mockup: دلایل تطابق) */}
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[10px] font-bold text-slate-400 block">دلایل انطباق هوشمند:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {match.reasons.map((reason, rIdx) => (
                        <span
                          key={rIdx}
                          className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-lg text-[11px] font-medium"
                        >
                          <Check className="w-3 h-3 text-emerald-600 stroke-[3]" />
                          <span>{reason}</span>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons (matching mockup: "تماس" و "پیگیری / ثبت جلسه بازدید") */}
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                    <button
                      onClick={() => setSelectedMatchForContact(match)}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-sm transition"
                    >
                      <Phone className="w-3.5 h-3.5 text-sky-400" />
                      <span>تماس با مالک</span>
                    </button>

                    <button
                      onClick={() => setSelectedMatchForVisit(match)}
                      className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-bold text-xs transition"
                    >
                      <Calendar className="w-3.5 h-3.5 text-sky-600" />
                      <span>ثبت جلسه بازدید</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Schedule Visit Modal */}
      {selectedMatchForVisit && (
        <ScheduleVisitModal
          match={selectedMatchForVisit}
          isOpen={!!selectedMatchForVisit}
          onClose={() => setSelectedMatchForVisit(null)}
        />
      )}

      {/* Owner Contact Dialog */}
      {selectedMatchForContact && (
        <Modal
          isOpen={!!selectedMatchForContact}
          onClose={() => setSelectedMatchForContact(null)}
          title="اطلاعات تماس مالک ملک"
          subtitle={`کد فایل: ${selectedMatchForContact.property.code}`}
          maxWidth="sm"
        >
          <div className="space-y-4 text-xs text-center">
            <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <span className="text-slate-500 block text-xs">مالک ثبت‌شده:</span>
              <h4 className="text-base font-black text-slate-900">
                {selectedMatchForContact.property.ownerName}
              </h4>

              {/* Masked / Unmasked Phone Display */}
              <div className="pt-2">
                <span className="text-slate-400 block text-[10px] mb-1">شماره تماس:</span>
                <span className="font-mono text-lg font-black text-sky-700 tracking-wider">
                  {revealedPhones[selectedMatchForContact.property.id]
                    ? toPersianDigits(selectedMatchForContact.property.ownerPhone)
                    : selectedMatchForContact.property.ownerPhoneMasked}
                </span>
              </div>
            </div>

            {/* Privacy Shield Info */}
            <div className="flex items-center gap-2 p-2.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-800 text-[11px] text-right">
              <ShieldCheck className="w-4 h-4 shrink-0 text-amber-600" />
              <span>شماره مالک جهت حفظ امنیت اطلاعات در سامانه حفاظت می‌شود.</span>
            </div>

            <div className="flex flex-col gap-2 pt-2">
              {!revealedPhones[selectedMatchForContact.property.id] ? (
                <button
                  onClick={() => toggleRevealPhone(selectedMatchForContact.property.id)}
                  className="w-full py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <Eye className="w-4 h-4" />
                  <span>آشکارسازی شماره کامل</span>
                </button>
              ) : (
                <a
                  href={`tel:${selectedMatchForContact.property.ownerPhone}`}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold flex items-center justify-center gap-2 transition"
                >
                  <Phone className="w-4 h-4" />
                  <span>تماس مستقیم تلفنی</span>
                </a>
              )}

              <button
                onClick={() => setSelectedMatchForContact(null)}
                className="w-full py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-semibold transition"
              >
                بستن
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
