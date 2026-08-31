'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { DealStage, Deal } from '@/lib/types';
import {
  GitPullRequest,
  CheckCircle2,
  Clock,
  Users,
  ChevronLeft,
  ChevronRight,
  Plus,
  Building2,
  DollarSign
} from 'lucide-react';
import { formatTomanPrice, toPersianDigits, cn } from '@/lib/utils';
import { Modal } from '@/components/common/Modal';

const STAGES: { key: DealStage; label: string; description: string; color: string; badgeBg: string }[] = [
  {
    key: 'appraisal',
    label: 'کارشناسی و قیمت‌گذاری',
    description: 'بررسی مدارک، ارزش‌گذاری و عکاسی',
    color: 'border-amber-400',
    badgeBg: 'bg-amber-100 text-amber-800'
  },
  {
    key: 'showing',
    label: 'هماهنگی و بازدید',
    description: 'پرزنت حضوری برای متقاضیان منطبق',
    color: 'border-sky-400',
    badgeBg: 'bg-sky-100 text-sky-800'
  },
  {
    key: 'meeting',
    label: 'نشست و مذاکره',
    description: 'جلسه توافق نهایی قیمت و شرایط پرداخت',
    color: 'border-indigo-400',
    badgeBg: 'bg-indigo-100 text-indigo-800'
  },
  {
    key: 'closed',
    label: 'قرارداد نهایی و تسویه',
    description: 'امضای مبایعه‌نامه/اجاره‌نامه و تسهیم پورسانت',
    color: 'border-emerald-500',
    badgeBg: 'bg-emerald-100 text-emerald-800'
  }
];

export function DealPipeline() {
  const { deals, moveDealStage, commissionRule } = useStore();
  const [selectedDeal, setSelectedDeal] = useState<Deal | null>(null);

  const getStageNext = (current: DealStage): DealStage | null => {
    if (current === 'appraisal') return 'showing';
    if (current === 'showing') return 'meeting';
    if (current === 'meeting') return 'closed';
    return null;
  };

  const getStagePrev = (current: DealStage): DealStage | null => {
    if (current === 'closed') return 'meeting';
    if (current === 'meeting') return 'showing';
    if (current === 'showing') return 'appraisal';
    return null;
  };

  return (
    <div id="pipeline" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-5">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center font-bold">
            <GitPullRequest className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">پایپ‌لاین هوشمند معاملات (Deal Pipeline)</h3>
            <p className="text-xs text-slate-500">
              مدیریت مرحله به مرحله پرونده‌های معاملاتی از کارشناسی اولیه تا وصول و تسویه پورسانت
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">
            مجموع معاملات جاری: {toPersianDigits(deals.length)} پرونده
          </span>
        </div>
      </div>

      {/* 4 Stages Kanban Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {STAGES.map((stage) => {
          const stageDeals = deals.filter((d) => d.stage === stage.key);
          const stageTotalVolume = stageDeals.reduce((sum, d) => sum + d.dealAmount, 0);

          return (
            <div
              key={stage.key}
              className="bg-slate-50/70 rounded-2xl border border-slate-200/80 flex flex-col min-h-[450px]"
            >
              {/* Stage Header */}
              <div className="p-3.5 border-b border-slate-200 bg-white/70 rounded-t-2xl">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-extrabold text-sm text-slate-900">{stage.label}</h4>
                  <span className={cn('text-[11px] font-black px-2 py-0.5 rounded-full', stage.badgeBg)}>
                    {toPersianDigits(stageDeals.length)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[130px]">{stage.description}</span>
                  <span className="font-bold text-slate-700">{formatTomanPrice(stageTotalVolume)}</span>
                </div>
              </div>

              {/* Deals in Stage */}
              <div className="p-3 space-y-3 flex-1 overflow-y-auto max-h-[520px]">
                {stageDeals.length === 0 ? (
                  <div className="h-40 flex flex-col items-center justify-center text-slate-400 text-xs text-center border-2 border-dashed border-slate-200 rounded-xl p-4">
                    <Clock className="w-6 h-6 mb-2 stroke-[1.5] text-slate-300" />
                    <span>پرونده‌ای در این مرحله نیست</span>
                  </div>
                ) : (
                  stageDeals.map((deal) => {
                    const nextStage = getStageNext(deal.stage);
                    const prevStage = getStagePrev(deal.stage);

                    return (
                      <div
                        key={deal.id}
                        onClick={() => setSelectedDeal(deal)}
                        className="bg-white rounded-xl p-3.5 border border-slate-200/90 shadow-sm hover:shadow-md hover:border-sky-300 transition cursor-pointer space-y-2.5 relative group"
                      >
                        {/* Title and Code */}
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-bold text-xs text-slate-900 leading-tight">
                            {deal.title}
                          </h5>
                          <span className="text-[10px] font-mono text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded">
                            {deal.code}
                          </span>
                        </div>

                        {/* Property summary */}
                        <p className="text-[11px] text-slate-600 flex items-center gap-1">
                          <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{deal.propertyTitle}</span>
                        </p>

                        {/* Amount & Commission */}
                        <div className="bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-between text-xs">
                          <div>
                            <span className="text-[10px] text-slate-400 block">ارزش معامله:</span>
                            <span className="font-bold text-slate-800">
                              {formatTomanPrice(deal.dealAmount)}
                            </span>
                          </div>
                          <div className="text-left">
                            <span className="text-[10px] text-slate-400 block">پورسانت ناخالص:</span>
                            <span className="font-bold text-emerald-600">
                              {formatTomanPrice(deal.grossCommission)}
                            </span>
                          </div>
                        </div>

                        {/* Parties and Agent */}
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <span>مشاور: {deal.agentName}</span>
                          <span className="text-[10px] text-slate-400">{deal.updatedAt}</span>
                        </div>

                        {/* Stage Progression Action Buttons */}
                        <div
                          className="flex items-center justify-between pt-1"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {prevStage ? (
                            <button
                              onClick={() => moveDealStage(deal.id, prevStage)}
                              className="text-[10px] text-slate-500 hover:text-slate-800 hover:bg-slate-100 px-2 py-1 rounded flex items-center gap-0.5 transition"
                              title="انتقال به مرحله قبل"
                            >
                              <ChevronRight className="w-3 h-3" />
                              <span>مرحله قبل</span>
                            </button>
                          ) : (
                            <span />
                          )}

                          {nextStage ? (
                            <button
                              onClick={() => moveDealStage(deal.id, nextStage)}
                              className="text-[10px] bg-sky-50 text-sky-700 hover:bg-sky-100 border border-sky-200 font-bold px-2 py-1 rounded flex items-center gap-0.5 transition"
                              title="پیشروی به مرحله بعد"
                            >
                              <span>مرحله بعد</span>
                              <ChevronLeft className="w-3 h-3" />
                            </button>
                          ) : (
                            <span className="text-[10px] text-emerald-600 font-bold flex items-center gap-0.5">
                              <CheckCircle2 className="w-3 h-3" />
                              تسویه شد
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Deal Details Modal */}
      {selectedDeal && (
        <Modal
          isOpen={!!selectedDeal}
          onClose={() => setSelectedDeal(null)}
          title={`جزئیات پرونده معامله: ${selectedDeal.code}`}
          subtitle={selectedDeal.title}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 block mb-1">ارزش کل معامله:</span>
                <span className="text-base font-extrabold text-slate-900">
                  {formatTomanPrice(selectedDeal.dealAmount)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">پورسانت ناخالص برآوردی:</span>
                <span className="text-base font-extrabold text-emerald-600">
                  {formatTomanPrice(selectedDeal.grossCommission)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">متقاضی / خریدار:</span>
                <span className="font-bold text-slate-800">{selectedDeal.clientName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">مالک ملک:</span>
                <span className="font-bold text-slate-800">{selectedDeal.ownerName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">مشاور مسئول پرونده:</span>
                <span className="font-bold text-slate-800">{selectedDeal.agentName}</span>
              </div>
              <div>
                <span className="text-slate-400 block mb-1">محله و موقعیت:</span>
                <span className="font-bold text-slate-800">{selectedDeal.neighborhood}</span>
              </div>
            </div>

            {/* Split preview based on current commission rule */}
            <div className="p-4 bg-sky-50 rounded-xl border border-sky-200 space-y-2">
              <h5 className="font-bold text-xs text-sky-900">
                تسهیم پورسانت طبق فرمول فعال دپارتمان ({commissionRule.name}):
              </h5>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                  <span className="text-slate-500 block text-[10px]">
                    سهم مشاور ({commissionRule.agentPercent}٪):
                  </span>
                  <span className="font-bold text-sky-700">
                    {formatTomanPrice(
                      (selectedDeal.grossCommission * (commissionRule.agentPercent / 100)) *
                        (commissionRule.applyMarketingDeduction ? 0.95 : 1)
                    )}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                  <span className="text-slate-500 block text-[10px]">
                    سهم سرپرست ({commissionRule.managerPercent}٪):
                  </span>
                  <span className="font-bold text-indigo-700">
                    {formatTomanPrice(
                      (selectedDeal.grossCommission * (commissionRule.managerPercent / 100)) *
                        (commissionRule.applyMarketingDeduction ? 0.95 : 1)
                    )}
                  </span>
                </div>
                <div className="bg-white p-2.5 rounded-lg border border-sky-100">
                  <span className="text-slate-500 block text-[10px]">
                    سهم آژانس ({commissionRule.agencyPercent}٪):
                  </span>
                  <span className="font-bold text-emerald-700">
                    {formatTomanPrice(
                      (selectedDeal.grossCommission * (commissionRule.agencyPercent / 100)) *
                        (commissionRule.applyMarketingDeduction ? 0.95 : 1)
                    )}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-2">
              <button
                onClick={() => setSelectedDeal(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold"
              >
                بستن پنجره
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
