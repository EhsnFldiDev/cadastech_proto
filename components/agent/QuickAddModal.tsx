'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/lib/store-context';
import { Modal } from '@/components/common/Modal';
import { Property, Demand, DealType, PropertyType } from '@/lib/types';
import { Building2, UserPlus, Sparkles, Check, Phone, ShieldCheck, DollarSign } from 'lucide-react';
import { maskPhoneNumber, toPersianDigits, cn } from '@/lib/utils';

interface QuickAddModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTab?: 'property' | 'demand';
}

const NEIGHBORHOOD_OPTIONS = [
  'سعادت‌آباد',
  'شهرک غرب',
  'نیاوران',
  'پاسداران',
  'جردن',
  'زعفرانیه',
  'قیطریه',
  'فرمانیه',
  'الهیه',
  'مرزداران'
];

export function QuickAddModal({ isOpen, onClose, defaultTab = 'property' }: QuickAddModalProps) {
  const { addProperty, addDemand } = useStore();
  const [activeTab, setActiveTab] = useState<'property' | 'demand'>(defaultTab);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);

  // Property Form State
  const [propTitle, setPropTitle] = useState('');
  const [propDealType, setPropDealType] = useState<DealType>('sale');
  const [propType, setPropType] = useState<PropertyType>('apartment');
  const [propNeighborhood, setPropNeighborhood] = useState('سعادت‌آباد');
  const [propArea, setPropArea] = useState('140');
  const [propBedrooms, setPropBedrooms] = useState('3');
  const [propPriceBillions, setPropPriceBillions] = useState('21'); // Billions
  const [propDepositMillions, setPropDepositMillions] = useState('800'); // Millions
  const [propRentMillions, setPropRentMillions] = useState('35'); // Millions
  const [propOwnerName, setPropOwnerName] = useState('آقای مهندس محمدی');
  const [propOwnerPhone, setPropOwnerPhone] = useState('09121234567');
  const [propHasParking, setPropHasParking] = useState(true);
  const [propHasElevator, setPropHasElevator] = useState(true);
  const [propHasStorage, setPropHasStorage] = useState(true);

  // Demand Form State
  const [demClientName, setDemClientName] = useState('دکتر رامین کیانی');
  const [demClientPhone, setDemClientPhone] = useState('09129876543');
  const [demDealType, setDemDealType] = useState<DealType>('sale');
  const [demSelectedNeighborhoods, setDemSelectedNeighborhoods] = useState<string[]>([
    'سعادت‌آباد',
    'شهرک غرب'
  ]);
  const [demMinArea, setDemMinArea] = useState('130');
  const [demMinBedrooms, setDemMinBedrooms] = useState('3');
  const [demMinBudgetBillions, setDemMinBudgetBillions] = useState('19');
  const [demMaxBudgetBillions, setDemMaxBudgetBillions] = useState('23');
  const [demMaxDepositMillions, setDemMaxDepositMillions] = useState('900');
  const [demMaxRentMillions, setDemMaxRentMillions] = useState('40');
  const [demUrgency, setDemUrgency] = useState<'immediate' | 'high' | 'normal'>('immediate');
  const [demNotes, setDemNotes] = useState('خریدار نقد با آماده‌باش برای نشست، ترجیحاً نوساز با نور مستقیم.');

  const toggleNeighborhood = (n: string) => {
    if (demSelectedNeighborhoods.includes(n)) {
      setDemSelectedNeighborhoods((prev) => prev.filter((item) => item !== n));
    } else {
      setDemSelectedNeighborhoods((prev) => [...prev, n]);
    }
  };

  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const areaNum = Number(propArea) || 100;
    const bedroomsNum = Number(propBedrooms) || 2;
    const priceNum = propDealType === 'sale' ? Number(propPriceBillions) * 1_000_000_000 : undefined;
    const depositNum =
      propDealType === 'rent' ? Number(propDepositMillions) * 1_000_000 : undefined;
    const rentNum = propDealType === 'rent' ? Number(propRentMillions) * 1_000_000 : undefined;

    const title =
      propTitle.trim() ||
      `${propArea} متر ${toPersianDigits(bedroomsNum)} خوابه ${propNeighborhood}`;

    addProperty({
      title,
      dealType: propDealType,
      propertyType: propType,
      neighborhood: propNeighborhood,
      area: areaNum,
      bedrooms: bedroomsNum,
      totalPrice: priceNum,
      pricePerMeter: priceNum ? Math.round(priceNum / areaNum) : undefined,
      depositPrice: depositNum,
      monthlyRent: rentNum,
      hasParking: propHasParking,
      hasElevator: propHasElevator,
      hasStorage: propHasStorage,
      ownerName: propOwnerName,
      ownerPhone: propOwnerPhone,
      ownerPhoneMasked: maskPhoneNumber(propOwnerPhone)
    });

    onClose();
  };

  const handleDemandSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const minAreaNum = Number(demMinArea) || 100;
    const minBedroomsNum = Number(demMinBedrooms) || 2;
    const minBudgetNum =
      demDealType === 'sale' ? Number(demMinBudgetBillions) * 1_000_000_000 : undefined;
    const maxBudgetNum =
      demDealType === 'sale' ? Number(demMaxBudgetBillions) * 1_000_000_000 : undefined;
    const maxDepositNum =
      demDealType === 'rent' ? Number(demMaxDepositMillions) * 1_000_000 : undefined;
    const maxRentNum =
      demDealType === 'rent' ? Number(demMaxRentMillions) * 1_000_000 : undefined;

    addDemand({
      clientName: demClientName,
      clientPhone: demClientPhone,
      dealType: demDealType,
      propertyType: 'apartment',
      targetNeighborhoods: demSelectedNeighborhoods.length > 0 ? demSelectedNeighborhoods : ['سعادت‌آباد'],
      minArea: minAreaNum,
      minBedrooms: minBedroomsNum,
      budgetMin: minBudgetNum,
      budgetMax: maxBudgetNum,
      maxDeposit: maxDepositNum,
      maxMonthlyRent: maxRentNum,
      urgency: demUrgency,
      notes: demNotes
    });

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="ورود سریع اطلاعات ملکی"
      subtitle="سیستم هوشمند انطباق خودکار فایل با تقاضای مشتریان"
      maxWidth="xl"
    >
      {/* Tabs */}
      <div className="flex border-b border-slate-200 mb-5">
        <button
          type="button"
          onClick={() => setActiveTab('property')}
          className={cn(
            'flex-1 pb-3 text-xs font-black flex items-center justify-center gap-2 border-b-2 transition-all',
            activeTab === 'property'
              ? 'border-sky-600 text-sky-700 bg-sky-50/50 rounded-t-lg'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          )}
        >
          <Building2 className="w-4 h-4" />
          <span>ثبت فایل عرضه (ملک)</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab('demand')}
          className={cn(
            'flex-1 pb-3 text-xs font-black flex items-center justify-center gap-2 border-b-2 transition-all',
            activeTab === 'demand'
              ? 'border-indigo-600 text-indigo-700 bg-indigo-50/50 rounded-t-lg'
              : 'border-transparent text-slate-500 hover:text-slate-800'
          )}
        >
          <UserPlus className="w-4 h-4" />
          <span>ثبت تقاضای متقاضی (خریدار/مستأجر)</span>
        </button>
      </div>

      {/* Property Form */}
      {activeTab === 'property' && (
        <form onSubmit={handlePropertySubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">عنوان فایل ملکی:</label>
            <input
              type="text"
              placeholder="مثال: ۱۴۵ متر ۳ خوابه سوپرلاکچری کلیدنخورده"
              value={propTitle}
              onChange={(e) => setPropTitle(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نوع معامله:</label>
              <select
                value={propDealType}
                onChange={(e) => setPropDealType(e.target.value as DealType)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
              >
                <option value="sale">فروش (خرید و فروش)</option>
                <option value="rent">رهن و اجاره</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">محله / منطقه:</label>
              <select
                value={propNeighborhood}
                onChange={(e) => setPropNeighborhood(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
              >
                {NEIGHBORHOOD_OPTIONS.map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">متراژ (متر مربع):</label>
              <input
                type="number"
                value={propArea}
                onChange={(e) => setPropArea(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">تعداد اتاق خواب:</label>
              <select
                value={propBedrooms}
                onChange={(e) => setPropBedrooms(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none bg-white"
              >
                <option value="1">۱ خوابه</option>
                <option value="2">۲ خوابه</option>
                <option value="3">۳ خوابه</option>
                <option value="4">۴ خوابه و بیشتر</option>
              </select>
            </div>
          </div>

          {/* Pricing Fields */}
          {propDealType === 'sale' ? (
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                قیمت کل فروش (میلیارد تومان):
              </label>
              <div className="relative">
                <input
                  type="number"
                  step="0.5"
                  value={propPriceBillions}
                  onChange={(e) => setPropPriceBillions(e.target.value)}
                  className="w-full px-3 py-2 pl-24 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none font-bold"
                />
                <span className="absolute left-3 top-2 text-slate-400 font-medium">
                  میلیارد تومان
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">مبلغ ودیعه (میلیون):</label>
                <input
                  type="number"
                  value={propDepositMillions}
                  onChange={(e) => setPropDepositMillions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  اجاره ماهانه (میلیون):
                </label>
                <input
                  type="number"
                  value={propRentMillions}
                  onChange={(e) => setPropRentMillions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none font-bold"
                />
              </div>
            </div>
          )}

          {/* Features Checkboxes */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">امکانات اصلی ملک:</label>
            <div className="flex flex-wrap gap-4 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={propHasParking}
                  onChange={(e) => setPropHasParking(e.target.checked)}
                  className="rounded text-sky-600"
                />
                <span>پارکینگ اختصاصی</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={propHasElevator}
                  onChange={(e) => setPropHasElevator(e.target.checked)}
                  className="rounded text-sky-600"
                />
                <span>آسانسور</span>
              </label>
              <label className="flex items-center gap-1.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={propHasStorage}
                  onChange={(e) => setPropHasStorage(e.target.checked)}
                  className="rounded text-sky-600"
                />
                <span>انباری سندی</span>
              </label>
            </div>
          </div>

          {/* Owner Info & Masked Phone */}
          <div className="grid grid-cols-2 gap-3 pt-1 border-t border-slate-100">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نام مالک ملک:</label>
              <input
                type="text"
                value={propOwnerName}
                onChange={(e) => setPropOwnerName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1 flex items-center justify-between">
                <span>شماره تماس مالک:</span>
                <span className="text-[10px] text-sky-600 flex items-center gap-0.5">
                  <ShieldCheck className="w-3 h-3" />
                  ماسک‌گذاری
                </span>
              </label>
              <input
                type="tel"
                value={propOwnerPhone}
                onChange={(e) => setPropOwnerPhone(e.target.value)}
                placeholder="09121234567"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none font-mono text-left"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                نمایش برای عموم مشاورین: {maskPhoneNumber(propOwnerPhone)}
              </span>
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white font-bold text-xs transition shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>ثبت فایل و اجرای انطباق هوشمند</span>
            </button>
          </div>
        </form>
      )}

      {/* Demand Form */}
      {activeTab === 'demand' && (
        <form onSubmit={handleDemandSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نام متقاضی / مشتری:</label>
              <input
                type="text"
                placeholder="مثال: دکتر کیانی"
                value={demClientName}
                onChange={(e) => setDemClientName(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">شماره تماس متقاضی:</label>
              <input
                type="tel"
                value={demClientPhone}
                onChange={(e) => setDemClientPhone(e.target.value)}
                placeholder="09129876543"
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-mono text-left"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">نوع تقاضا:</label>
              <select
                value={demDealType}
                onChange={(e) => setDemDealType(e.target.value as DealType)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                <option value="sale">خرید ملک (فروش)</option>
                <option value="rent">رهن و اجاره</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">میزان فوریت تقاضا:</label>
              <select
                value={demUrgency}
                onChange={(e) =>
                  setDemUrgency(e.target.value as 'immediate' | 'high' | 'normal')
                }
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                <option value="immediate">فوری (آماده نشست در ۳ روز)</option>
                <option value="high">بالا (خرید در ۲ هفته)</option>
                <option value="normal">عادی (در حال بررسی بازار)</option>
              </select>
            </div>
          </div>

          {/* Target Neighborhoods Multiple */}
          <div>
            <label className="block font-bold text-slate-700 mb-1.5">
              محله‌های مورد تقاضا (انتخاب چندگانه):
            </label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-slate-50 rounded-xl border border-slate-200">
              {NEIGHBORHOOD_OPTIONS.map((n) => {
                const isSelected = demSelectedNeighborhoods.includes(n);
                return (
                  <button
                    key={n}
                    type="button"
                    onClick={() => toggleNeighborhood(n)}
                    className={cn(
                      'px-2.5 py-1 rounded-lg text-xs font-semibold transition-all flex items-center gap-1',
                      isSelected
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    )}
                  >
                    {isSelected && <Check className="w-3 h-3" />}
                    <span>{n}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Area and Beds */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">حداقل متراژ (متر):</label>
              <input
                type="number"
                value={demMinArea}
                onChange={(e) => setDemMinArea(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-bold text-slate-700 mb-1">حداقل تعداد خواب:</label>
              <select
                value={demMinBedrooms}
                onChange={(e) => setDemMinBedrooms(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none bg-white"
              >
                <option value="1">حداقل ۱ خواب</option>
                <option value="2">حداقل ۲ خواب</option>
                <option value="3">حداقل ۳ خواب</option>
                <option value="4">۴ خوابه</option>
              </select>
            </div>
          </div>

          {/* Budget Range */}
          {demDealType === 'sale' ? (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  کف بودجه (میلیارد تومان):
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={demMinBudgetBillions}
                  onChange={(e) => setDemMinBudgetBillions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  سقف بودجه (میلیارد تومان):
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={demMaxBudgetBillions}
                  onChange={(e) => setDemMaxBudgetBillions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold"
                />
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  سقف ودیعه (میلیون تومان):
                </label>
                <input
                  type="number"
                  value={demMaxDepositMillions}
                  onChange={(e) => setDemMaxDepositMillions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold"
                />
              </div>
              <div>
                <label className="block font-bold text-slate-700 mb-1">
                  سقف اجاره (میلیون تومان):
                </label>
                <input
                  type="number"
                  value={demMaxRentMillions}
                  onChange={(e) => setDemMaxRentMillions(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none font-bold"
                />
              </div>
            </div>
          )}

          {/* Notes */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">یادداشت و ترجیحات متقاضی:</label>
            <textarea
              rows={2}
              value={demNotes}
              onChange={(e) => setDemNotes(e.target.value)}
              className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition shadow-md flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              <span>ثبت متقاضی و شروع انطباق هوشمند</span>
            </button>
          </div>
        </form>
      )}
    </Modal>
  );
}
