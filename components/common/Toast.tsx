'use client';

import React from 'react';
import { useStore } from '@/lib/store-context';
import { CheckCircle2, Info, AlertTriangle, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export function ToastContainer() {
  const { toasts, dismissToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            'pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border backdrop-blur-md transition-all duration-300 transform translate-y-0',
            toast.type === 'success' && 'bg-emerald-950/90 text-white border-emerald-700/60 shadow-emerald-950/30',
            toast.type === 'info' && 'bg-slate-900/90 text-white border-slate-700/60 shadow-slate-950/30',
            toast.type === 'warning' && 'bg-amber-950/90 text-white border-amber-700/60 shadow-amber-950/30'
          )}
        >
          <div className="shrink-0 mt-0.5">
            {toast.type === 'success' && <CheckCircle2 className="w-5 h-5 text-emerald-400" />}
            {toast.type === 'info' && <Info className="w-5 h-5 text-sky-400" />}
            {toast.type === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
          </div>

          <div className="flex-1 min-w-0">
            <h5 className="text-sm font-bold leading-tight">{toast.title}</h5>
            <p className="text-xs text-slate-300 mt-1 leading-relaxed">{toast.description}</p>
          </div>

          <button
            onClick={() => dismissToast(toast.id)}
            className="shrink-0 p-1 text-slate-400 hover:text-white rounded transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}
