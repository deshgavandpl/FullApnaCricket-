/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Match } from "../types";
import { Badge, Card } from "./SportsUI";
import { motion } from "motion/react";
import { MapPin, Trophy } from "lucide-react";

export const MatchCard: React.FC<{ match: Match }> = ({ match }) => {
  const isLive = match.status === 'LIVE';

  return (
    <Card className="relative overflow-hidden group border-l-4 border-l-brand-red">
      <div className="flex justify-between items-start mb-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {isLive && (
              <motion.div 
                animate={{ scale: [1, 1.2, 1], opacity: [1, 0.7, 1] }} 
                transition={{ repeat: Infinity, duration: 2 }}
                className="w-2 h-2 rounded-full bg-brand-red"
              />
            )}
            <Badge variant={isLive ? 'danger' : 'default'}>{match.status}</Badge>
          </div>
          <p className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
            <MapPin className="w-3 h-3" /> {match.venue}
          </p>
        </div>
        <p className="micro-label !text-slate-400">{match.time}</p>
      </div>

      <div className="flex items-center justify-between gap-4">
        <TeamDisplay team={match.t1} score={match.score?.split('/')[0]} />
        <div className="flex flex-col items-center">
          <div className="w-px h-12 bg-slate-100" />
          <span className="sports-header text-sm text-slate-300 my-1 italic">VS</span>
          <div className="w-px h-12 bg-slate-100" />
        </div>
        <TeamDisplay team={match.t2} score={match.score?.split('/')[1]} reversed />
      </div>

      {isLive && match.overs && (
        <div className="mt-6 pt-4 border-t border-slate-50 flex justify-between items-center">
          <span className="micro-label text-brand-red font-bold">Overs: {match.overs}</span>
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-1 cursor-pointer">
            <Trophy className="w-4 h-4 text-amber-500" />
            <span className="micro-label !text-slate-900">Live Scorecard</span>
          </motion.div>
        </div>
      )}
    </Card>
  );
}

function TeamDisplay({ team, score, reversed = false }: { team: any, score?: string, reversed?: boolean }) {
  return (
    <div className={`flex flex-col ${reversed ? 'items-end' : 'items-start'} gap-3 flex-1`}>
      <div className={`flex items-center gap-3 ${reversed ? 'flex-row-reverse' : ''}`}>
        <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shadow-sm">
          <img src={team.logo} alt={team.name} className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all" referrerPolicy="no-referrer" />
        </div>
        <div className={`flex flex-col ${reversed ? 'items-end text-right' : 'items-start text-left'}`}>
          <h4 className="sports-header text-lg leading-tight">{team.shortName}</h4>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter max-w-[80px] truncate">{team.name}</p>
        </div>
      </div>
      {score && (
        <span className="sports-header text-3xl font-black text-brand-dark tracking-tighter">
          {score}
        </span>
      )}
    </div>
  );
}
