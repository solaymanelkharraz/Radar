import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Square,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Compass,
  Trophy,
} from 'lucide-react';

const TASKS = [
  {
    id: 'task-1',
    text: 'LinkedIn Jobs: Enter a keyword from the Vault and search Tangier opportunities.',
    tag: 'LinkedIn',
    tagColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    id: 'task-2',
    text: 'Indeed Maroc: Enter a keyword from the Vault and search Tangier opportunities.',
    tag: 'Indeed',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'task-3',
    text: "Government / Concours: Check Emploi-Public for 'Technicien de 3ème grade' or IT roles.",
    tag: 'Concours',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'task-4',
    text: "Remote Tech: Check Wellfound or RemoteOK for 'React' or 'Laravel' remote jobs.",
    tag: 'Remote',
    tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    id: 'task-5',
    text: 'BPO Portals: Do a quick check on MyOpla, Foundever, or Intelcia career pages.',
    tag: 'BPO Tangier',
    tagColor: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  {
    id: 'task-6',
    text: 'Map Recon: Open Google Maps and find 1-2 local companies (Logistics, IT, Transit in TFZ).',
    tag: 'Maps Recon',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'task-7',
    text: 'HR Hunt: Take the companies found on Maps, search them on LinkedIn, and find the HR/Manager profile.',
    tag: 'HR Outreach',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    id: 'task-8',
    text: "Vault Logging: Save all found jobs and companies into Radar as 'To Apply' (Prepared for Tuesday).",
    tag: 'Vault Save',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
];

const LOCAL_STORAGE_KEY = 'radar_daily_route_v1';

export function DailySourcingChecklist({ isCollapsible = false }) {
  const [completedTasks, setCompletedTasks] = useState(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });

  const [isOpen, setIsOpen] = useState(true);

  // Sync state with localStorage
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(completedTasks));
    } catch (e) {
      console.error('Failed to save route progress:', e);
    }
  }, [completedTasks]);

  const toggleTask = (id) => {
    setCompletedTasks((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReset = () => {
    if (window.confirm('Reset your Daily Scouting Route for today?')) {
      setCompletedTasks({});
    }
  };

  const completedCount = TASKS.filter((t) => !!completedTasks[t.id]).length;
  const isAllComplete = completedCount === TASKS.length;
  const progressPercent = Math.round((completedCount / TASKS.length) * 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden text-slate-900 transition-all font-sans">
      {/* Header Bar */}
      <div className="p-6 bg-slate-50/80 border-b border-slate-200 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-blue-600 shadow-2xs">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
              <span>Daily Scouting Route</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-blue-50 text-blue-700 border border-blue-200">
                Plan of the Day
              </span>
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              8-step daily sourcing checklist for local Tangier, concours & remote targets
            </p>
          </div>
        </div>

        {/* Progress Counter & Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-600">Progress:</span>
            <span
              className={`text-xs font-extrabold px-2.5 py-1 rounded-full border ${
                isAllComplete
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                  : 'bg-slate-100 text-slate-800 border-slate-200'
              }`}
            >
              {completedCount} / {TASKS.length} ({progressPercent}%)
            </span>
          </div>

          <button
            onClick={handleReset}
            className="px-3 py-1.5 rounded-xl bg-white border border-slate-300 hover:bg-slate-100 text-slate-600 hover:text-slate-900 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
            title="Clear all checkboxes for the next daily run"
          >
            <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
            <span>Reset Route</span>
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5">
        <div
          className={`h-1.5 transition-all duration-300 ${
            isAllComplete ? 'bg-emerald-500' : 'bg-blue-600'
          }`}
          style={{ width: `${progressPercent}%` }}
        />
      </div>

      {/* Success Celebration Banner */}
      {isAllComplete && (
        <div className="p-4 bg-emerald-50 border-b border-emerald-200 flex items-center gap-3 text-emerald-900 text-xs font-bold animate-fadeIn">
          <Trophy className="w-5 h-5 text-emerald-600 flex-shrink-0" />
          <div className="flex-1">
            <span>Route Complete! Targets acquired for Tuesday. 🚀</span>
          </div>
          <span className="text-[10px] font-extrabold bg-emerald-100 text-emerald-800 px-2.5 py-1 rounded-full border border-emerald-200">
            100% Done
          </span>
        </div>
      )}

      {/* Tasks List */}
      <div className="p-6 space-y-3">
        {TASKS.map((task, idx) => {
          const isChecked = !!completedTasks[task.id];
          return (
            <div
              key={task.id}
              onClick={() => toggleTask(task.id)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 ${
                isChecked
                  ? 'bg-slate-50/60 border-slate-200 opacity-75'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-blue-300 shadow-2xs'
              }`}
            >
              {/* Custom Checkbox */}
              <div className="mt-0.5 flex-shrink-0">
                {isChecked ? (
                  <CheckSquare className="w-5 h-5 text-emerald-600" />
                ) : (
                  <Square className="w-5 h-5 text-slate-300 hover:text-blue-500 transition-colors" />
                )}
              </div>

              {/* Task Text & Tag */}
              <div className="flex-1 space-y-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border text-slate-500 bg-slate-100 border-slate-200">
                    Step {idx + 1}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md border ${task.tagColor}`}
                  >
                    {task.tag}
                  </span>
                </div>
                <p
                  className={`text-xs font-medium leading-relaxed ${
                    isChecked ? 'line-through text-slate-400 font-normal' : 'text-slate-800 font-semibold'
                  }`}
                >
                  {task.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
