import React from 'react';

export function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const variantStyles = {
    // Semantic Statuses
    'Urgent': 'bg-amber-50 text-amber-700 border-amber-200 font-semibold',
    'To Apply': 'bg-blue-50 text-blue-700 border-blue-200 font-semibold',
    'Applied': 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',
    'Interview': 'bg-amber-50 text-amber-700 border-amber-200 font-bold',
    'Closed/Rejected': 'bg-slate-100 text-slate-600 border-slate-200',

    // Application Sources
    'Emploi-Public': 'bg-emerald-50 text-emerald-700 border-emerald-200 font-medium',
    'Rekrute': 'bg-indigo-50 text-indigo-700 border-indigo-200 font-medium',
    'Anapec': 'bg-amber-50 text-amber-700 border-amber-200 font-medium',
    'Wadifa': 'bg-sky-50 text-sky-700 border-sky-200 font-medium',
    'Spontaneous': 'bg-blue-50 text-blue-700 border-blue-200 font-medium',

    // Company Contact Statuses
    'Not Contacted': 'bg-slate-100 text-slate-600 border-slate-200',
    'CV Sent': 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold',

    // Fallbacks
    default: 'bg-slate-100 text-slate-700 border-slate-200',
    amber: 'bg-amber-50 text-amber-700 border-amber-200',
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-xs',
    lg: 'px-3 py-1.5 text-sm',
  };

  const styleClass = variantStyles[variant] || variantStyles[children] || variantStyles.default;

  return (
    <span
      className={`inline-flex items-center gap-1 font-medium rounded-full border transition-all ${styleClass} ${sizeStyles[size]} ${className}`}
    >
      {children}
    </span>
  );
}
