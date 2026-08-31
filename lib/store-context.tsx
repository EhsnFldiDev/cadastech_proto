'use client';

import React, { createContext, useContext, useState, useMemo, useCallback } from 'react';
import { Property, Demand, Deal, Agent, CommissionRule, DailyTask, SmartMatch, DealStage } from './types';
import {
  INITIAL_PROPERTIES,
  INITIAL_DEMANDS,
  INITIAL_DEALS,
  INITIAL_AGENTS,
  INITIAL_COMMISSION_RULE,
  INITIAL_DAILY_TASKS
} from './mock-data';
import { generateAllSmartMatches, calculateMatchScore } from './matching-engine';
import { toPersianDigits } from './utils';

export interface ToastMessage {
  id: string;
  title: string;
  description: string;
  type: 'success' | 'info' | 'warning';
  timestamp: number;
}

interface StoreContextType {
  properties: Property[];
  demands: Demand[];
  deals: Deal[];
  agents: Agent[];
  dailyTasks: DailyTask[];
  commissionRule: CommissionRule;
  smartMatches: SmartMatch[];
  toasts: ToastMessage[];
  currentAgent: Agent;
  activeRole: 'manager' | 'agent';
  setActiveRole: (role: 'manager' | 'agent') => void;
  // Actions
  addProperty: (property: Partial<Property>) => Property;
  addDemand: (demand: Partial<Demand>) => Demand;
  updateCommissionRule: (updatedRule: Partial<CommissionRule>) => void;
  moveDealStage: (dealId: string, newStage: DealStage) => void;
  toggleTaskComplete: (taskId: string) => void;
  addTask: (task: Omit<DailyTask, 'id'>) => void;
  addToast: (toast: Omit<ToastMessage, 'id' | 'timestamp'>) => void;
  dismissToast: (id: string) => void;
  requestSettlement: (amount: number) => void;
  scheduleVisit: (propertyId: string, demandId: string, dateStr: string, timeStr: string) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [demands, setDemands] = useState<Demand[]>(INITIAL_DEMANDS);
  const [deals, setDeals] = useState<Deal[]>(INITIAL_DEALS);
  const [agents, setAgents] = useState<Agent[]>(INITIAL_AGENTS);
  const [dailyTasks, setDailyTasks] = useState<DailyTask[]>(INITIAL_DAILY_TASKS);
  const [commissionRule, setCommissionRule] = useState<CommissionRule>(INITIAL_COMMISSION_RULE);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [activeRole, setActiveRole] = useState<'manager' | 'agent'>('manager');

  const currentAgent = useMemo(() => {
    return agents[0] || INITIAL_AGENTS[0];
  }, [agents]);

  // Generate real-time matches whenever properties or demands change
  const smartMatches = useMemo(() => {
    return generateAllSmartMatches(properties, demands, 50);
  }, [properties, demands]);

  const addToast = useCallback((toast: Omit<ToastMessage, 'id' | 'timestamp'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
    const newToast: ToastMessage = {
      ...toast,
      id,
      timestamp: Date.now()
    };
    setToasts((prev) => [newToast, ...prev].slice(0, 5));

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 5000);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Add new property
  const addProperty = useCallback(
    (newPropData: Partial<Property>): Property => {
      const id = `prop-${Date.now()}`;
      const codeNum = Math.floor(1000 + Math.random() * 9000);
      const code = `CD-${toPersianDigits(codeNum)}`;

      const newProperty: Property = {
        id,
        code,
        title: newPropData.title || 'فایل جدید ثبت‌شده',
        dealType: newPropData.dealType || 'sale',
        propertyType: newPropData.propertyType || 'apartment',
        neighborhood: newPropData.neighborhood || 'سعادت‌آباد',
        district: newPropData.district || 2,
        address: newPropData.address || `${newPropData.neighborhood || 'سعادت‌آباد'}، فرعی اختصاصی`,
        area: newPropData.area || 100,
        bedrooms: newPropData.bedrooms || 2,
        floor: newPropData.floor || 2,
        totalFloors: newPropData.totalFloors || 5,
        totalPrice: newPropData.totalPrice,
        pricePerMeter: newPropData.pricePerMeter,
        depositPrice: newPropData.depositPrice,
        monthlyRent: newPropData.monthlyRent,
        hasParking: newPropData.hasParking ?? true,
        hasElevator: newPropData.hasElevator ?? true,
        hasStorage: newPropData.hasStorage ?? true,
        hasBalcony: newPropData.hasBalcony ?? true,
        yearBuilt: newPropData.yearBuilt || 1402,
        ownerName: newPropData.ownerName || 'مالک محترم',
        ownerPhone: newPropData.ownerPhone || '09120000000',
        ownerPhoneMasked: newPropData.ownerPhoneMasked || '۰۹۱۲***۰۰۰۰',
        assignedAgentId: currentAgent.id,
        status: 'active',
        createdAt: 'امروز',
        image:
          newPropData.image ||
          'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80',
        description: newPropData.description || 'فایل تازه کارشناسی شده با مدارک کامل و آماده بازدید.',
        tags: newPropData.tags || ['نوساز', 'شخصی‌ساز', 'آماده بازدید']
      };

      setProperties((prev) => [newProperty, ...prev]);

      // Check for immediate matches
      let matchingCount = 0;
      let highestScore = 0;

      demands.forEach((d) => {
        const { score } = calculateMatchScore(newProperty, d);
        if (score >= 60) {
          matchingCount++;
          if (score > highestScore) highestScore = score;
        }
      });

      if (matchingCount > 0) {
        addToast({
          title: `🎯 انطباق هوشمند پیدا شد! (${toPersianDigits(matchingCount)} مورد)`,
          description: `فایل «${newProperty.title}» با متقاضیان فعال دارای بالاترین درصد تطابق (٪${toPersianDigits(highestScore)}) است.`,
          type: 'success'
        });
      } else {
        addToast({
          title: '✅ فایل با موفقیت ثبت شد',
          description: `فایل با کد ${newProperty.code} به مخزن فایل‌های آژانس اضافه شد.`,
          type: 'info'
        });
      }

      return newProperty;
    },
    [demands, currentAgent.id, addToast]
  );

  // Add new demand
  const addDemand = useCallback(
    (newDemandData: Partial<Demand>): Demand => {
      const id = `dem-${Date.now()}`;

      const newDemand: Demand = {
        id,
        clientName: newDemandData.clientName || 'متقاضی جدید',
        clientPhone: newDemandData.clientPhone || '09120000000',
        dealType: newDemandData.dealType || 'sale',
        propertyType: newDemandData.propertyType || 'apartment',
        targetNeighborhoods: newDemandData.targetNeighborhoods || ['سعادت‌آباد'],
        minArea: newDemandData.minArea || 100,
        maxArea: newDemandData.maxArea,
        minBedrooms: newDemandData.minBedrooms || 2,
        budgetMin: newDemandData.budgetMin,
        budgetMax: newDemandData.budgetMax,
        maxDeposit: newDemandData.maxDeposit,
        maxMonthlyRent: newDemandData.maxMonthlyRent,
        urgency: newDemandData.urgency || 'high',
        notes: newDemandData.notes || 'متقاضی جدی و آماده نشست.',
        assignedAgentId: currentAgent.id,
        status: 'active',
        createdAt: 'امروز'
      };

      setDemands((prev) => [newDemand, ...prev]);

      // Check immediate matches
      let matchingCount = 0;
      let highestScore = 0;

      properties.forEach((p) => {
        const { score } = calculateMatchScore(p, newDemand);
        if (score >= 60) {
          matchingCount++;
          if (score > highestScore) highestScore = score;
        }
      });

      if (matchingCount > 0) {
        addToast({
          title: `🎯 ${toPersianDigits(matchingCount)} فایل منطبق با تقاضا پیدا شد!`,
          description: `تقاضای «${newDemand.clientName}» با موفقیت با فایل‌های موجود مطابقت داده شد (تطابق تا ٪${toPersianDigits(highestScore)}).`,
          type: 'success'
        });
      } else {
        addToast({
          title: '✅ تقاضای متقاضی ذخیره شد',
          description: `اطلاعات تقاضای ${newDemand.clientName} در صف رصد هوشمند قرار گرفت.`,
          type: 'info'
        });
      }

      return newDemand;
    },
    [properties, currentAgent.id, addToast]
  );

  // Update dynamic commission rule
  const updateCommissionRule = useCallback((updatedRule: Partial<CommissionRule>) => {
    setCommissionRule((prev) => ({
      ...prev,
      ...updatedRule
    }));
  }, []);

  // Move deal pipeline stage
  const moveDealStage = useCallback(
    (dealId: string, newStage: DealStage) => {
      setDeals((prev) =>
        prev.map((d) => {
          if (d.id === dealId) {
            return {
              ...d,
              stage: newStage,
              updatedAt: 'امروز'
            };
          }
          return d;
        })
      );

      const stageNamesFa: Record<DealStage, string> = {
        appraisal: 'کارشناسی',
        showing: 'بازدید',
        meeting: 'نشست مذاکره',
        closed: 'قرارداد نهایی و تسویه'
      };

      addToast({
        title: '📊 تغییر وضعیت معامله',
        description: `معامله به مرحله «${stageNamesFa[newStage]}» انتقال یافت.`,
        type: newStage === 'closed' ? 'success' : 'info'
      });
    },
    [addToast]
  );

  // Toggle task completed
  const toggleTaskComplete = useCallback((taskId: string) => {
    setDailyTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, completed: !t.completed } : t))
    );
  }, []);

  // Add daily task
  const addTask = useCallback(
    (task: Omit<DailyTask, 'id'>) => {
      const newTask: DailyTask = {
        ...task,
        id: `task-${Date.now()}`
      };
      setDailyTasks((prev) => [newTask, ...prev]);
      addToast({
        title: '🗓️ پیگیری جدید اضافه شد',
        description: `پیگیری ساعت ${newTask.time} برای «${newTask.clientName}» ثبت شد.`,
        type: 'info'
      });
    },
    [addToast]
  );

  // Request settlement
  const requestSettlement = useCallback(
    (amount: number) => {
      addToast({
        title: '💳 درخواست تسویه حساب ارسال شد',
        description: `درخواست تسویه پورسانت به مبلغ ${toPersianDigits((amount / 1000000).toFixed(0))} میلیون تومان به واحد مالی و مدیریت دپارتمان ارسال شد.`,
        type: 'success'
      });
    },
    [addToast]
  );

  // Schedule visit
  const scheduleVisit = useCallback(
    (propertyId: string, demandId: string, dateStr: string, timeStr: string) => {
      const prop = properties.find((p) => p.id === propertyId);
      const dem = demands.find((d) => d.id === demandId);

      const title = `بازدید فایل: ${prop?.title || 'ملک'}`;
      const clientName = dem?.clientName || 'متقاضی';

      addTask({
        title,
        clientName,
        time: timeStr || '۱۷:۰۰',
        type: 'showing',
        propertyTitle: prop?.title,
        completed: false,
        urgency: 'high'
      });

      addToast({
        title: '📅 جلسه بازدید رزرو و ثبت شد',
        description: `پیگیری بازدید برای ساعت ${timeStr || '۱۷:۰۰'} در تقویم کاری قرار گرفت.`,
        type: 'success'
      });
    },
    [properties, demands, addTask, addToast]
  );

  return (
    <StoreContext.Provider
      value={{
        properties,
        demands,
        deals,
        agents,
        dailyTasks,
        commissionRule,
        smartMatches,
        toasts,
        currentAgent,
        activeRole,
        setActiveRole,
        addProperty,
        addDemand,
        updateCommissionRule,
        moveDealStage,
        toggleTaskComplete,
        addTask,
        addToast,
        dismissToast,
        requestSettlement,
        scheduleVisit
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
