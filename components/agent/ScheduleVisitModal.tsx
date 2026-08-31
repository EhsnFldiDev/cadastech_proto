'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { Modal } from '@/components/common/Modal';
import { SmartMatch } from '@/lib/types';
import { Calendar, Clock, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { formatTomanPrice } from '@/lib/utils';

interface ScheduleVisitModalProps {
  match: SmartMatch | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleVisitModal({ match, isOpen, onClose }: ScheduleVisitModalProps) {
  const { scheduleVisit } = useStore();
  const [visitDate, setVisitDate] = useState('امروز (دوشنبه)');
  const [visitTime, setVisitTime] = useState('۱۷:۳۰');
  const [reminderNote, setReminderNote] = useState('هماهنگی با سرایداری جهت پارکینگ مهمان');

  if (!match) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleVisit(match.propertyId, match.demandId, visitDate, visitTime);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تنظیم و هماهنگی جلسه بازدید حضوری"
      subtitle={`فایل ${match.property.code} برای ${match.demand.clientName}`}
      maxWidth="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Match Summary Box */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
          <div className="flex justify-between items-center">
            <span className="font-bold text-slate-900">{match.property.title}</span>
            <span className="text-emerald-700 bg-emerald-100 font-bold px-2 py-0.5 rounded-full text-[11px]">
              ٪{match.score} تطابق
            </span>
          </div>
          <p className="text-slate-500 flex items-center gap-1">
            <MapPin className="w-3 h-3 text-slate-400" />
            <span>{match.property.address}</span>
          </p>
          <div className="text-slate-600 font-semibold pt-1 border-t border-slate-200/60 flex justify-between">
            <span>متقاضی: {match.demand.clientName}</span>
            <span className="text-sky-700">
              {match.property.dealType === 'sale'
                ? formatTomanPrice(match.property.totalPrice)
                : `${formatTomanPrice(match.property.depositPrice)} ودیعه`}
            </span>
          </div>
        </div>

        {/* Date and Time Selector */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              روز بازدید:
            </label>
            <select
              value={visitDate}
              onChange={(e) => setVisitDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-medium"
            >
              <option value="امروز (دوشنبه)">امروز (دوشنبه)</option>
              <option value="فردا (سه‌شنبه)">فردا (سه‌شنبه)</option>
              <option value="پس‌فردا (چهارشنبه)">پس‌فردا (چهارشنبه)</option>
              <option value="پنج‌شنبه">پنج‌شنبه عصر</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-sky-600" />
              ساعت بازدید:
            </label>
            <select
              value={visitTime}
              onChange={(e) => setVisitTime(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white font-medium"
            >
              <option value="۱۱:۰۰">۱۱:۰۰ صبح</option>
              <option value="۱۵:۳۰">۱۵:۳۰ بعدازظهر</option>
              <option value="۱۷:۰۰">۱۷:۰۰ عصر</option>
              <option value="۱۸:۳۰">۱۸:۳۰ غروب</option>
              <option value="۲۰:۰۰">۲۰:۰۰ شب</option>
            </select>
          </div>
        </div>

        {/* Note */}
        <div>
          <label className="block font-bold text-slate-700 mb-1">یادداشت هماهنگی مشاور:</label>
          <input
            type="text"
            value={reminderNote}
            onChange={(e) => setReminderNote(e.target.value)}
            className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
          />
        </div>

        {/* Auto Actions Checklist */}
        <div className="bg-sky-50/70 p-3 rounded-xl border border-sky-200/60 text-[11px] text-sky-900 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <Sparkles className="w-3.5 h-3.5 text-sky-600" />
            <span>عملیات خودکار پس از ثبت:</span>
          </div>
          <p className="text-sky-700 pr-5">
            • افزودن فوری به لیست پیگیری‌های امروز مشاور
            <br />
            • ارسال پیامک هماهنگی به مالک و متقاضی
            <br />
            • ارتقای وضعیت در پایپ‌لاین به مرحله «هماهنگی و بازدید»
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 pt-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
          >
            انصراف
          </button>
          <button
            type="submit"
            className="px-5 py-2 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold shadow-md flex items-center gap-1.5"
          >
            <CheckCircle className="w-4 h-4" />
            <span>ثبت نهایی جلسه بازدید</span>
          </button>
        </div>
      </form>
    </Modal>
  );
}
