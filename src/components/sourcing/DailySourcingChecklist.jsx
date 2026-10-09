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
    text: 'Check saved Indeed / local search feeds for fresh Tangier listings posted in the last 24–48 hours (Full-Stack, React, Laravel).',
    tag: 'Aggregators',
    tagColor: 'bg-purple-50 text-purple-700 border-purple-200',
  },
  {
    id: 'task-2',
    text: 'Use Search Library terms on Google Maps Tangier (Centre-Ville, Technopark, TFZ) to identify 1–2 target companies.',
    tag: 'Maps Recon',
    tagColor: 'bg-amber-50 text-amber-700 border-amber-200',
  },
  {
    id: 'task-3',
    text: 'Open target agency website: review portfolio, tech stack, and locate public email or direct WhatsApp contact.',
    tag: 'Screening',
    tagColor: 'bg-blue-50 text-blue-700 border-blue-200',
  },
  {
    id: 'task-4',
    text: 'Search company on LinkedIn under People filters to locate Founder, Managing Director, CTO, or Lead Developer.',
    tag: 'LinkedIn HR',
    tagColor: 'bg-sky-50 text-sky-700 border-sky-200',
  },
  {
    id: 'task-5',
    text: 'Create entry in Vault / Directory (Name, Website, Email/Contact, Key Person) and set status to "À Contacter".',
    tag: 'Vault Save',
    tagColor: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  },
  {
    id: 'task-6',
    text: 'Run targeted Dork commands from Search Library and skim top 5 organic hits for unadvertised roles or founder calls.',
    tag: 'Dork Scan',
    tagColor: 'bg-rose-50 text-rose-700 border-rose-200',
  },
  {
    id: 'task-7',
    text: 'Scan Wellfound and RemoteOK for junior/mid remote React or Laravel positions, and log viable matches to Vault.',
    tag: 'Remote Hub',
    tagColor: 'bg-indigo-50 text-indigo-700 border-indigo-200',
  },
  {
    id: 'task-8',
    text: 'Scan Emploi-Public for newly published Technicien de 3ème grade IT concours or municipal tech listings.',
    tag: 'Concours',
    tagColor: 'bg-teal-50 text-teal-700 border-teal-200',
  },
  {
    id: 'task-9',
    text: 'Verify at least 1–2 high-quality targets logged in Vault and mark daily route complete.',
    tag: 'Completion',
    tagColor: 'bg-green-50 text-green-700 border-green-200',
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
              9-step daily sourcing protocol for local Tangier, concours & remote targets
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
