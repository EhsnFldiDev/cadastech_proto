'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { useTenant } from '@/lib/tenant-context';
import { Wallet, ArrowDownLeft, CheckCircle2, Clock, CreditCard, Building2, ChevronRight } from 'lucide-react';
import { formatTomanPrice, toPersianDigits } from '@/lib/utils';
import { Modal } from '@/components/common/Modal';

interface AgentWalletProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AgentWallet({ isOpen, onClose }: AgentWalletProps) {
  const { currentAgent, requestSettlement, commissionRule } = useStore();
  const { currentTenant } = useTenant();
  const [isConfirming, setIsConfirming] = useState(false);

  const readyForPayout = 45000000; // 45 Million Tomans
  const totalEarnedThisMonth = currentAgent.monthlyCommission;

  const handleRequest = () => {
    requestSettlement(readyForPayout);
    setIsConfirming(false);
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="کیف پول و حساب تسویه پورسانت مشاور"
      subtitle={`مشاور: ${currentAgent.name} • ${currentTenant.name}`}
      maxWidth="md"
    >
      <div className="space-y-4 text-xs">
        {/* Wallet Balance Hero */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white p-5 rounded-2xl shadow-md space-y-3">
          <div className="flex items-center justify-between text-slate-300">
            <span className="flex items-center gap-1.5 font-bold">
              <Wallet className="w-4 h-4 text-amber-400" />
              موجودی آماده تسویه حساب
            </span>
            <span className="text-[10px] px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full font-bold">
              تأیید مالی شده
            </span>
          </div>

          <div className="text-right">
            <h2 className="text-2xl font-black text-amber-300 tracking-tight">
              {toPersianDigits('۴۵,۰۰۰,۰۰۰')} <span className="text-xs text-white">تومان</span>
            </h2>
            <span className="text-[11px] text-slate-400 mt-1 block">
              حاصل از قرارداد اجاره واحد صرافهای جنوبی و پیش‌دریافت مبایعه‌نامه مروارید
            </span>
          </div>

          <div className="pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="text-[11px] text-slate-300">
              کل دریافتی این ماه: {formatTomanPrice(totalEarnedThisMonth)}
            </span>
            <button
              onClick={() => setIsConfirming(true)}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-black rounded-xl transition shadow-sm"
            >
              درخواست واریز آنی به شبا
            </button>
          </div>
        </div>

        {/* Current Active Rule Summary */}
        <div className="bg-sky-50/70 p-3.5 rounded-xl border border-sky-200 text-sky-950 space-y-1.5">
          <h5 className="font-bold flex items-center gap-1.5 text-xs">
            <Building2 className="w-3.5 h-3.5 text-sky-600" />
            فرمول تسهیم فعال شما در دپارتمان:
          </h5>
          <div className="flex items-center justify-between text-[11px] text-sky-800">
            <span>سهم پایه مشاور: ٪{commissionRule.agentPercent}</span>
            <span>کسر آگهی: {commissionRule.applyMarketingDeduction ? '٪۵' : 'ندارد'}</span>
            <span>تسویه: روزانه پس از وصول چک</span>
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="space-y-2">
          <h5 className="font-bold text-slate-700 text-xs">تراکنش‌ها و تسویه‌های اخیر:</h5>

          <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
            <div className="p-3 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="font-bold text-slate-900">تسویه پورسانت قرارداد DL-903</h6>
                  <span className="text-[10px] text-slate-400">واریز شبا بانک پاسارگاد • ۲۸ مرداد</span>
                </div>
              </div>
              <span className="font-black text-emerald-600 text-xs">+ ۲۴,۰۰۰,۰۰۰ تومان</span>
            </div>

            <div className="p-3 bg-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  <ArrowDownLeft className="w-4 h-4" />
                </div>
                <div>
                  <h6 className="font-bold text-slate-900">تسویه پورسانت قرارداد DL-885</h6>
                  <span className="text-[10px] text-slate-400">واریز شبا بانک ملی • ۱۵ مرداد</span>
                </div>
              </div>
              <span className="font-black text-emerald-600 text-xs">+ ۵۲,۰۰۰,۰۰۰ تومان</span>
            </div>
          </div>
        </div>

        {/* Bank Account Details */}
        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-[11px] text-slate-600">
          <div className="flex items-center gap-2">
            <CreditCard className="w-4 h-4 text-slate-400" />
            <span>شماره شبا پیش‌فرض:</span>
          </div>
          <span className="font-mono text-slate-900 font-bold">IR580540000000102938475601</span>
        </div>

        {/* Confirm Settlement Step */}
        {isConfirming && (
          <div className="p-4 bg-amber-50 rounded-xl border border-amber-300 space-y-3">
            <h5 className="font-bold text-amber-900 text-xs">تأیید صدور حواله تسویه پورسانت</h5>
            <p className="text-amber-800 text-[11px]">
              مبلغ ۴۵,۰۰۰,۰۰۰ تومان پس از کسر کسورات قانونی، تا حداکثر ۲ ساعت کاری به حساب متصل مشاور واریز می‌گردد.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setIsConfirming(false)}
                className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-lg font-bold text-xs"
              >
                انصراف
              </button>
              <button
                onClick={handleRequest}
                className="px-4 py-1.5 bg-emerald-600 text-white rounded-lg font-bold text-xs shadow-sm"
              >
                تأیید و ارسال درخواست به حسابداری
              </button>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold"
          >
            بستن
          </button>
        </div>
      </div>
    </Modal>
  );
}
