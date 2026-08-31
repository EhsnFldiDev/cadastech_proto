'use client';

import React, { useState } from 'react';
import { useStore } from '@/lib/store-context';
import { DailyTask } from '@/lib/types';
import {
  CheckSquare,
  Square,
  Calendar,
  Clock,
  PhoneCall,
  Users,
  Building,
  Plus,
  ChevronLeft,
  CheckCircle2
} from 'lucide-react';
import { toPersianDigits, cn } from '@/lib/utils';
import { Modal } from '@/components/common/Modal';

export function DailyTasks() {
  const { dailyTasks, toggleTaskComplete, addTask } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskClient, setNewTaskClient] = useState('');
  const [newTaskTime, setNewTaskTime] = useState('۱۵:۰۰');
  const [newTaskType, setNewTaskType] = useState<DailyTask['type']>('showing');

  const pendingTasksCount = dailyTasks.filter((t) => !t.completed).length;

  const handleCreateTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    addTask({
      title: newTaskTitle,
      clientName: newTaskClient || 'متقاضی',
      time: newTaskTime,
      type: newTaskType,
      completed: false,
      urgency: 'high'
    });

    setNewTaskTitle('');
    setNewTaskClient('');
    setIsAddModalOpen(false);
  };

  const getTypeIcon = (type: DailyTask['type']) => {
    switch (type) {
      case 'showing':
        return <Building className="w-4 h-4 text-sky-600" />;
      case 'call':
        return <PhoneCall className="w-4 h-4 text-emerald-600" />;
      case 'meeting':
        return <Users className="w-4 h-4 text-indigo-600" />;
      default:
        return <Clock className="w-4 h-4 text-amber-600" />;
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 shadow-sm p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center font-bold">
            <Calendar className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-xs font-black text-slate-900">پیگیری‌های امروز (Follow-ups)</h3>
            <span className="text-[10px] text-slate-400">
              {toPersianDigits(pendingTasksCount)} وظیفه در انتظار انجام
            </span>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="p-1.5 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 rounded-lg text-xs font-bold transition flex items-center gap-1"
          title="افزودن پیگیری جدید"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>جدید</span>
        </button>
      </div>

      {/* Task List (matching mockup chevrons layout) */}
      <div className="space-y-2">
        {dailyTasks.map((task) => (
          <div
            key={task.id}
            onClick={() => toggleTaskComplete(task.id)}
            className={cn(
              'p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 group',
              task.completed
                ? 'bg-slate-50 border-slate-200 opacity-60'
                : 'bg-white border-slate-200/80 hover:border-sky-300 hover:shadow-xs'
            )}
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <button
                type="button"
                className="shrink-0 text-slate-400 group-hover:text-sky-600 transition"
              >
                {task.completed ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <h5
                    className={cn(
                      'text-xs font-bold text-slate-900 truncate',
                      task.completed && 'line-through text-slate-400'
                    )}
                  >
                    {task.title}
                  </h5>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    {getTypeIcon(task.type)}
                    {task.clientName}
                  </span>
                  <span>•</span>
                  <span className="font-mono text-slate-400">{task.time}</span>
                </div>
              </div>
            </div>

            <ChevronLeft className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition shrink-0" />
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="افزودن پیگیری روزانه"
          maxWidth="sm"
        >
          <form onSubmit={handleCreateTask} className="space-y-3 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">عنوان کار / پیگیری:</label>
              <input
                type="text"
                placeholder="مثال: تماس با متقاضی برای ارسال تصاویر"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block font-bold text-slate-700 mb-1">طرف پیگیری:</label>
                <input
                  type="text"
                  placeholder="نام مشتری یا مالک"
                  value={newTaskClient}
                  onChange={(e) => setNewTaskClient(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">ساعت موعد:</label>
                <input
                  type="text"
                  placeholder="مثال: ۱۶:۳۰"
                  value={newTaskTime}
                  onChange={(e) => setNewTaskTime(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 rounded-xl focus:ring-2 focus:ring-sky-500 focus:outline-none text-center"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">دسته‌بندی پیگیری:</label>
              <select
                value={newTaskType}
                onChange={(e) => setNewTaskType(e.target.value as DailyTask['type'])}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl bg-white"
              >
                <option value="showing">بازدید ملک</option>
                <option value="call">تماس تلفنی و استعلام</option>
                <option value="meeting">نشست مذاکره</option>
                <option value="file_check">کارشناسی فایل</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-3 py-1.5 text-slate-600 rounded-xl hover:bg-slate-100"
              >
                انصراف
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl shadow-xs"
              >
                ثبت پیگیری
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
