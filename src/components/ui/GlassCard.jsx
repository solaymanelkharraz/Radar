import React from 'react';
import { motion } from 'framer-motion';

export function GlassCard({ children, className = '', hoverEffect = false, onClick, ...props }) {
  return (
    <motion.div
      onClick={onClick}
      className={`bg-white rounded-2xl p-6 border border-slate-200 shadow-sm ${
        hoverEffect ? 'hover:border-slate-300 hover:shadow transition-all cursor-pointer' : ''
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
