/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from "motion/react";
import { LucideIcon } from "lucide-react";
import React, { ReactNode } from "react";

interface SkewedHeaderProps {
  label: string;
  title: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SportsHeader({ label, title, className = "", size = 'md' }: SkewedHeaderProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl md:text-5xl",
  };

  return (
    <div className={`flex flex-col gap-0.5 ${className}`}>
      <span className="micro-label !text-brand-red">{label}</span>
      <h2 className={`sports-header ${sizeClasses[size]}`}>{title}</h2>
    </div>
  );
}

export function IconButton({ icon: Icon, onClick, className = "" }: { icon: LucideIcon, onClick?: () => void, className?: string }) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className={`p-3 rounded-2xl bg-slate-100 hover:bg-slate-200 transition-colors ${className}`}
    >
      <Icon className="w-5 h-5 text-brand-dark" />
    </motion.button>
  );
}

export const Badge: React.FC<{ children: ReactNode, variant?: 'default' | 'danger' | 'success' }> = ({ children, variant = "default" }) => {
  const variants = {
    default: "bg-slate-100 text-slate-800",
    danger: "bg-brand-red text-white",
    success: "bg-emerald-500 text-white",
  };

  return (
    <span className={`px-2 py-0.5 rounded-md micro-label !text-[8px] ${variants[variant]}`}>
      {children}
    </span>
  );
}

export const Card: React.FC<{ children: ReactNode, className?: string, noPadding?: boolean }> = ({ children, className = "", noPadding = false }) => {
  return (
    <div className={`card-base ${!noPadding ? 'p-6' : ''} ${className}`}>
      {children}
    </div>
  );
}

export const GlassPanel: React.FC<{ children: ReactNode, className?: string }> = ({ children, className = "" }) => {
  return (
    <div className={`glass-panel p-4 rounded-3xl ${className}`}>
      {children}
    </div>
  );
}

export const animations = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  },
  item: {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  }
};
