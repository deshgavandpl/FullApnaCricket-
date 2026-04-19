/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Player } from "../types";
import { Badge, Card, SportsHeader } from "./SportsUI";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, TrendingUp, UserCheck, Loader2 } from "lucide-react";
import { scoutPlayer } from "../services/geminiService";

export const PlayerScoutCard: React.FC<{ player: Player }> = ({ player }) => {
  const [report, setReport] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleScout = async () => {
    if (report) return;
    setLoading(true);
    const result = await scoutPlayer(player);
    setReport(result);
    setLoading(false);
  };

  return (
    <Card className="flex flex-col gap-6" noPadding>
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img 
          src={player.avatar} 
          alt={player.name} 
          className="w-full h-full object-cover grayscale transition-all hover:grayscale-0 duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          {player.tags?.map(tag => (
            <Badge key={tag} variant="danger">{tag}</Badge>
          ))}
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <div className="glass-panel py-2 px-4 inline-block">
             <SportsHeader label={player.role} title={player.name} size="sm" />
          </div>
        </div>
      </div>

      <div className="px-6 pb-6 pt-2">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <StatBox label="Runs" value={player.stats.runs} />
          <StatBox label="Wickets" value={player.stats.wickets} />
          <StatBox label="S.R" value={player.stats.strikeRate.toFixed(1)} />
          <StatBox label="AVG" value={player.stats.average.toFixed(1)} />
        </div>

        <button 
          onClick={handleScout}
          disabled={loading}
          className="w-full bg-brand-dark text-white py-4 rounded-2xl sports-header text-xs flex items-center justify-center gap-2 group transition-all active:scale-95 disabled:opacity-50"
        >
          {loading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
             <Sparkles className="w-4 h-4 text-amber-400 group-hover:scale-125 transition-transform" />
          )}
          {report ? 'ANALYSIS COMPLETE' : 'UNLOCK AI SCOUT REPORT'}
        </button>

        <AnimatePresence>
          {report && (
            <motion.div 
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              className="mt-6 p-5 rounded-2xl bg-slate-900 border border-slate-700 relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-2 opacity-10">
                <Sparkles className="w-12 h-12 text-white" />
              </div>
              <div className="flex items-center gap-2 mb-3">
                <div className="micro-label !text-amber-400 flex items-center gap-1">
                  <UserCheck className="w-3 h-3" /> GEMINI AI SCOUT
                </div>
              </div>
              <p className="text-slate-200 text-sm italic font-medium leading-relaxed">
                "{report}"
              </p>
              <div className="mt-4 flex items-center gap-4 border-t border-slate-800 pt-4">
                <div className="flex items-center gap-1">
                  <TrendingUp className="w-3 h-3 text-emerald-400" />
                  <span className="micro-label !text-[8px] !text-emerald-400">High Growth Potential</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Card>
  );
}

function StatBox({ label, value }: { label: string, value: string | number }) {
  return (
    <div className="flex flex-col items-start metric-border">
      <span className="micro-label !text-[8px] !text-slate-400">{label}</span>
      <span className="sports-header text-xl leading-none">{value}</span>
    </div>
  );
}
