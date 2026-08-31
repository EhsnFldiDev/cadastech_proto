'use client';

import React from 'react';
import { useTenant } from '@/lib/tenant-context';
import { Modal } from '@/components/common/Modal';
import { Building2, Check, Palette, Sparkles, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const PRESET_COLORS = [
  { name: 'آبی سرمه‌ای سازمانی (پیش‌فرض)', primary: '#0e3854', accent: '#0284c7' },
  { name: 'سبز کله‌غازی شمیرانات', primary: '#064e3b', accent: '#10b981' },
  { name: 'نیلی مدرن غرب تهران', primary: '#312e81', accent: '#6366f1' },
  { name: 'مشکی کربن و طلایی لوکس', primary: '#18181b', accent: '#d97706' },
  { name: 'یاقوتی سلطنتی دیپلماتیک', primary: '#881337', accent: '#f43f5e' }
];

export function TenantModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { currentTenant, tenants, switchTenant, updateTenantColor } = useTenant();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="تنظیمات چندمستأجره و برندینگ اختصاصی (White-Label)"
      subtitle="مدیریت هویت سازمانی، آژانس‌های متصل و پالت رنگی اختصاصی"
      maxWidth="2xl"
    >
      <div className="space-y-6">
        {/* Active Tenants Selection */}
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
            <Building2 className="w-4 h-4 text-sky-600" />
            انتخاب آژانس / دپارتمان فعال (Tenant Switcher):
          </label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {tenants.map((tenant) => {
              const isSelected = tenant.id === currentTenant.id;
              return (
                <button
                  key={tenant.id}
                  onClick={() => switchTenant(tenant.id)}
                  className={cn(
                    'flex flex-col p-4 rounded-xl text-right border transition-all relative overflow-hidden group',
                    isSelected
                      ? 'border-sky-500 bg-sky-50/40 ring-2 ring-sky-500/20 shadow-sm'
                      : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/50'
                  )}
                >
                  <div className="flex items-center justify-between w-full mb-2">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-black shadow-sm"
                        style={{ backgroundColor: tenant.primaryColor }}
                      >
                        {tenant.logoText}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 leading-none">{tenant.name}</h4>
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          مدیر: {tenant.managerName}
                        </span>
                      </div>
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-sky-600 text-white flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-1 mb-2">{tenant.subTitle}</p>

                  <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {tenant.city}
                    </span>
                    <span className="flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {tenant.phone}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Color Palettes */}
        <div className="pt-4 border-t border-slate-100">
          <label className="block text-xs font-bold text-slate-700 mb-3 flex items-center gap-1.5">
            <Palette className="w-4 h-4 text-sky-600" />
            شخصی‌سازی پالت رنگ اختصاصی آژانس (White-Label Palette):
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {PRESET_COLORS.map((preset, idx) => {
              const isColorActive = currentTenant.primaryColor === preset.primary;
              return (
                <button
                  key={idx}
                  onClick={() => updateTenantColor(preset.primary, preset.accent)}
                  className={cn(
                    'flex items-center justify-between p-3 rounded-lg border text-right transition-all',
                    isColorActive
                      ? 'border-slate-800 bg-slate-100/80 shadow-sm font-semibold'
                      : 'border-slate-200 hover:bg-slate-50'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="flex items-center -space-x-1 space-x-reverse">
                      <span
                        className="w-5 h-5 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: preset.primary }}
                      />
                      <span
                        className="w-4 h-4 rounded-full border-2 border-white shadow-sm"
                        style={{ backgroundColor: preset.accent }}
                      />
                    </div>
                    <span className="text-xs text-slate-800">{preset.name}</span>
                  </div>
                  {isColorActive && <Check className="w-4 h-4 text-emerald-600" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Information Callout */}
        <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl text-xs text-slate-600 flex items-start gap-2.5 leading-relaxed">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
          <p>
            معماری <strong>Multi-Tenant</strong> به هر دپارتمان اجازه می‌دهد تا با دامنه اختصاصی (مثلاً{' '}
            <code className="text-sky-700 font-mono">mosalas.cadastech.ir</code>)، رنگ‌بندی، فرمول کمیسیون و دیتابیس جداگانه فعالیت کند.
          </p>
        </div>

        {/* Footer */}
        <div className="flex justify-end pt-2">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold transition shadow-sm"
          >
            تأیید و ذخیره تنظیمات
          </button>
        </div>
      </div>
    </Modal>
  );
}
