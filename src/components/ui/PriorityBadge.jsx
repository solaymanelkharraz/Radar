import React from 'react';

export function PriorityBadge({ priority = 'Medium' }) {
  const getBadgeStyle = (p) => {
    switch (p) {
      case 'High':
        return 'bg-red-50 text-red-700 border-red-200';
      case 'Low':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Medium':
      default:
        return 'bg-amber-50 text-amber-700 border-amber-200';
    }
  };

  const getEmoji = (p) => {
    switch (p) {
      case 'High':
        return '🔴';
      case 'Low':
        return '🟢';
      case 'Medium':
      default:
        return '🟡';
    }
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider border ${getBadgeStyle(
        priority
      )}`}
    >
      <span className="text-[9px]">{getEmoji(priority)}</span>
      <span>{priority}</span>
    </span>
  );
}
