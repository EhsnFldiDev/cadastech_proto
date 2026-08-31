'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { Sliders, Calculator, CheckCircle, Percent, Sparkles, AlertCircle } from 'lucide-react';
import { formatTomanPrice, toPersianDigits, formatPercent, cn } from '@/lib/utils';

export function CommissionBuilder() {
  const { commissionRule, updateCommissionRule, addToast } = useStore();

  const [agentPercent, setAgentPercent] = useState(commissionRule.agentPercent);
  const [managerPercent, setManagerPercent] = useState(commissionRule.managerPercent);
  const [agencyPercent, setAgencyPercent] = useState(commissionRule.agencyPercent);
  const [applyMarketingDeduction, setApplyMarketingDeduction] = useState(
    commissionRule.applyMarketingDeduction
  );
  const [marketingPercent, setMarketingPercent] = useState(
    commissionRule.marketingDeductionPercent || 5
  );
  const [sampleCommission, setSampleCommission] = useState(100000000); // 100 Million Tomans

  const totalPercent = agentPercent + managerPercent + agencyPercent;
  const isBalanced = totalPercent === 100;

  // Live Math Calculation
  const marketingDeductionAmount = applyMarketingDeduction
    ? (sampleCommission * marketingPercent) / 100
    : 0;
  const distributablePool = sampleCommission - marketingDeductionAmount;

  const agentAmount = (distributablePool * agentPercent) / 100;
  const managerAmount = (distributablePool * managerPercent) / 100;
  const agencyAmount = (distributablePool * agencyPercent) / 100;

  const applyPreset = (agent: number, manager: number, agency: number, name: string) => {
    setAgentPercent(agent);
    setManagerPercent(manager);
    setAgencyPercent(agency);
    updateCommissionRule({
      agentPercent: agent,
      managerPercent: manager,
      agencyPercent: agency,
      name
    });
    addToast({
      title: 'تنظیمات کمیسیون بارگذاری شد',
      description: `الگوی «${name}» فعال گردید.`,
      type: 'info'
    });
  };

  const handleSave = () => {
    if (!isBalanced) {
      addToast({
        title: 'خطا در جمع درصدها',
        description: `مجموع درصدها باید دقیقاً ۱۰۰٪ باشد (در حال حاضر ${formatPercent(totalPercent)} است).`,
        type: 'warning'
      });
      return;
    }

    updateCommissionRule({
      agentPercent,
      managerPercent,
      agencyPercent,
      applyMarketingDeduction,
      marketingDeductionPercent: marketingPercent,
      sampleDealCommission: sampleCommission
    });

    addToast({
      title: '✅ فرمول کمیسیون با موفقیت ثبت شد',
      description: 'این قوانین به طور خودکار بر تمام قراردادها و تسویه‌های جدید دپارتمان اعمال می‌شود.',
      type: 'success'
    });
  };

  return (
    <div id="commission" className="bg-white rounded-2xl border border-slate-200/80 shadow-sm p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 flex items-center justify-center font-bold">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-slate-900">فرمول‌ساز کمیسیون داینامیک</h3>
            <p className="text-xs text-slate-500">
              مدیر آژانس در هر لحظه می‌تواند سهم‌بندی کمیسیون را بر اساس سیاست‌های دپارتمان تنظیم کند.
            </p>
          </div>
        </div>

        {/* Validation indicator */}
        <div
          className={cn(
            'px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 border',
            isBalanced
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
              : 'bg-rose-50 text-rose-700 border-rose-200 animate-pulse'
          )}
        >
          {isBalanced ? (
            <>
              <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
              <span>مجموع سهم‌ها: ۱۰۰٪ (متعادل)</span>
            </>
          ) : (
            <>
              <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
              <span>مجموع سهم‌ها: {formatPercent(totalPercent)} (باید ۱۰۰٪ شود)</span>
            </>
          )}
        </div>
      </div>

      {/* Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-bold text-slate-500 ml-1">الگوهای سریع:</span>
        <button
          onClick={() => applyPreset(40, 10, 50, 'طرح استاندارد تهران (۴۰-۱۰-۵۰)')}
          className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
        >
          استاندارد تهران (۴۰٪ مشاور | ۱۰٪ سرپرست | ۵۰٪ آژانس)
        </button>
        <button
          onClick={() => applyPreset(50, 10, 40, 'طرح مشاورین ارشد (۵۰-۱۰-۴۰)')}
          className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
        >
          مشاورین ارشد (۵۰٪ مشاور | ۱۰٪ سرپرست | ۴۰٪ آژانس)
        </button>
        <button
          onClick={() => applyPreset(35, 15, 50, 'طرح رنج لوکس (۳۵-۱۵-۵۰)')}
          className="px-3 py-1 text-xs font-semibold rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
        >
          رنج لوکس (۳۵٪ مشاور | ۱۵٪ سرپرست | ۵۰٪ آژانس)
        </button>
      </div>

      {/* Sliders & Deduction Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 pt-2">
        {/* Slider 1: Agent Share */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">سهم مشاور (Agent Share)</span>
            <span className="text-base font-extrabold text-sky-600">
              {formatPercent(agentPercent)}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="80"
            step="5"
            value={agentPercent}
            onChange={(e) => setAgentPercent(Number(e.target.value))}
            className="w-full accent-sky-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>۱۰٪</span>
            <span>۴۰٪</span>
            <span>۸۰٪</span>
          </div>
        </div>

        {/* Slider 2: Manager Share */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">سهم سرپرست رنج / طبقه</span>
            <span className="text-base font-extrabold text-indigo-600">
              {formatPercent(managerPercent)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="30"
            step="5"
            value={managerPercent}
            onChange={(e) => setManagerPercent(Number(e.target.value))}
            className="w-full accent-indigo-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>۰٪</span>
            <span>۱۰٪</span>
            <span>۳۰٪</span>
          </div>
        </div>

        {/* Slider 3: Agency Share */}
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/70 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700">سهم آژانس / دپارتمان</span>
            <span className="text-base font-extrabold text-emerald-600">
              {formatPercent(agencyPercent)}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="80"
            step="5"
            value={agencyPercent}
            onChange={(e) => setAgencyPercent(Number(e.target.value))}
            className="w-full accent-emerald-600 cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-400 font-mono">
            <span>۱۰٪</span>
            <span>۵۰٪</span>
            <span>۸۰٪</span>
          </div>
        </div>
      </div>

      {/* Deduction Toggle */}
      <div className="bg-slate-50/80 p-4 rounded-xl border border-slate-200 flex flex-wrap items-center justify-between gap-4">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={applyMarketingDeduction}
            onChange={(e) => setApplyMarketingDeduction(e.target.checked)}
            className="w-4 h-4 rounded text-sky-600 accent-sky-600"
          />
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              کسر هزینه بازاریابی، آگهی و پورتال‌ها پیش از تقسیم (Marketing Deduction)
            </span>
            <span className="text-[11px] text-slate-500">
              مبلغ ۵٪ از کمیسیون ناخالص به صندوق تبلیغات آژانس اختصاص می‌یابد.
            </span>
          </div>
        </label>

        {applyMarketingDeduction && (
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-500 font-medium">درصد کسر تبلیغات:</span>
            <select
              value={marketingPercent}
              onChange={(e) => setMarketingPercent(Number(e.target.value))}
              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 font-bold text-slate-800 text-xs"
            >
              <option value="3">۳٪</option>
              <option value="5">۵٪</option>
              <option value="7">۷٪</option>
              <option value="10">۱۰٪</option>
            </select>
          </div>
        )}
      </div>

      {/* Live Preview Calculator Box */}
      <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-6 shadow-md relative overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5 border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-amber-400" />
            <h4 className="text-sm font-black text-white">
              پیش‌نمایش زنده محاسبه کمیسیون (Live Split Preview)
            </h4>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-300">مبلغ فرضی پورسانت قرارداد:</span>
            <select
              value={sampleCommission}
              onChange={(e) => setSampleCommission(Number(e.target.value))}
              className="bg-slate-800 border border-white/20 text-amber-300 font-extrabold text-xs rounded-lg px-3 py-1"
            >
              <option value="50000000">۵۰ میلیون تومان</option>
              <option value="100000000">۱۰۰ میلیون تومان</option>
              <option value="200000000">۲۰۰ میلیون تومان</option>
              <option value="500000000">۵۰۰ میلیون تومان</option>
            </select>
          </div>
        </div>

        {/* Live Split Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-right">
          {/* Deductions if any */}
          {applyMarketingDeduction && (
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3.5 border border-white/10">
              <span className="text-[11px] text-slate-300 block mb-1">
                صندوق آگهی و تبلیغات ({formatPercent(marketingPercent)})
              </span>
              <span className="text-base font-black text-rose-300 block">
                {formatTomanPrice(marketingDeductionAmount)}
              </span>
              <span className="text-[10px] text-slate-400 mt-1 block">کسر قبل از تقسیم</span>
            </div>
          )}

          {/* Agent Share */}
          <div className="bg-sky-500/20 backdrop-blur-sm rounded-xl p-3.5 border border-sky-400/30">
            <span className="text-[11px] text-sky-200 block mb-1">
              سهم مشاور ({formatPercent(agentPercent)})
            </span>
            <span className="text-base font-black text-sky-300 block">
              {formatTomanPrice(agentAmount)}
            </span>
            <span className="text-[10px] text-sky-200/70 mt-1 block">واریز به کیف پول مشاور</span>
          </div>

          {/* Manager Share */}
          <div className="bg-indigo-500/20 backdrop-blur-sm rounded-xl p-3.5 border border-indigo-400/30">
            <span className="text-[11px] text-indigo-200 block mb-1">
              سهم سرپرست ({formatPercent(managerPercent)})
            </span>
            <span className="text-base font-black text-indigo-300 block">
              {formatTomanPrice(managerAmount)}
            </span>
            <span className="text-[10px] text-indigo-200/70 mt-1 block">پاداش مدیریت رنج</span>
          </div>

          {/* Agency Share */}
          <div className="bg-emerald-500/20 backdrop-blur-sm rounded-xl p-3.5 border border-emerald-400/30">
            <span className="text-[11px] text-emerald-200 block mb-1">
              سهم آژانس ({formatPercent(agencyPercent)})
            </span>
            <span className="text-base font-black text-emerald-300 block">
              {formatTomanPrice(agencyAmount)}
            </span>
            <span className="text-[10px] text-emerald-200/70 mt-1 block">درآمد خالص دپارتمان</span>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end pt-1">
        <button
          onClick={handleSave}
          disabled={!isBalanced}
          className={cn(
            'px-6 py-2.5 rounded-xl text-xs font-black transition-all shadow-md flex items-center gap-2',
            isBalanced
              ? 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-600/20'
              : 'bg-slate-300 text-slate-500 cursor-not-allowed'
          )}
        >
          <Sparkles className="w-4 h-4" />
          <span>ذخیره و اعمال فرمول جدید بر معاملات</span>
        </button>
      </div>
    </div>
  );
}
