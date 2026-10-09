import React from 'react';
import { DailySourcingChecklist } from './DailySourcingChecklist';
import { Headphones, Package, Landmark, Laptop, ArrowRight, Sparkles } from 'lucide-react';

export function DailyRoutePage({ onNavigateCategory }) {
  const categories = [
    {
      id: 'sourcing-government',
      title: '🏛️ Government Concours',
      desc: 'Emploi-Public.ma & Alwadifa-Maroc.com public sector IT notices.',
      icon: Landmark,
      color: 'text-emerald-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      badge: 'Step 8',
    },
    {
      id: 'sourcing-remote',
      title: '💻 Remote Tech Hub',
      desc: 'Wellfound & RemoteOK global tech startup roles.',
      icon: Laptop,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      badge: 'Step 7',
    },
    {
      id: 'sourcing-local-fallback',
      title: '🎧 Local Fallback',
      desc: 'MyOpla Careers Tangier & Tetouan tech support hub.',
      icon: Headphones,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      badge: 'Step 1',
    },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 font-sans">
      {/* Primary Daily Scouting Checklist */}
      <DailySourcingChecklist />

      {/* Sourcing Launchpad Categories Shortcuts */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between pb-2 border-b border-slate-200">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <h3 className="text-base font-extrabold text-slate-900">
              High-Signal Sourcing Hubs
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-400 bg-slate-100 px-2.5 py-1 rounded-full">
            3 Focused Hubs
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onNavigateCategory(cat.id)}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between group space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className={`p-2.5 rounded-xl ${cat.bgColor} border ${cat.borderColor} ${cat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] font-extrabold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md border border-slate-200">
                      {cat.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {cat.title}
                    </h4>
                    <p className="text-xs text-slate-500 mt-1 font-normal leading-relaxed line-clamp-2">
                      {cat.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-blue-600 group-hover:text-blue-700">
                  <span>Open Hub Page</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
