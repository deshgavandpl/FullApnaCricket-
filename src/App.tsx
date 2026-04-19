/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Trophy, 
  Search, 
  BarChart3, 
  ShieldCheck, 
  Bell, 
  User, 
  Flame,
  Plus
} from "lucide-react";
import { SportsHeader, IconButton, animations, GlassPanel, Card } from "./components/SportsUI";
import { MatchCard } from "./components/MatchCard";
import { PlayerScoutCard } from "./components/PlayerScoutCard";
import { MOCK_MATCHES, MOCK_PLAYERS, MOCK_TOURNAMENTS } from "./constants";

type Tab = 'home' | 'matches' | 'stats' | 'profile';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('home');

  return (
    <div className="min-h-screen bg-slate-50 pb-24 md:pb-8">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-brand-dark px-6 md:px-12 py-6 flex justify-between items-center text-white border-b border-white/10">
        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <Trophy className="text-white w-6 h-6" />
            </div>
            <SportsHeader label="PRO ECOSYSTEM" title="APNACRICKET" className="-mt-1 text-white" />
          </div>
          <nav className="hidden lg:flex gap-8">
            <button onClick={() => setActiveTab('home')} className={`micro-label !text-[11px] !tracking-[0.15em] transition-colors ${activeTab === 'home' ? '!text-brand-red' : '!text-white/70 hover:text-white'}`}>PERFORMANCE</button>
            <button onClick={() => setActiveTab('matches')} className={`micro-label !text-[11px] !tracking-[0.15em] transition-colors ${activeTab === 'matches' ? '!text-brand-red' : '!text-white/70 hover:text-white'}`}>TOURNAMENTS</button>
            <button onClick={() => setActiveTab('stats')} className={`micro-label !text-[11px] !tracking-[0.15em] transition-colors ${activeTab === 'stats' ? '!text-brand-red' : '!text-white/70 hover:text-white'}`}>TELEMETRY</button>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-2">
            <IconButton icon={Search} className="!bg-white/10 hover:!bg-white/20 !text-white" />
            <motion.div whileTap={{ scale: 0.9 }} className="relative">
              <IconButton icon={Bell} className="!bg-white/10 hover:!bg-white/20 !text-white" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-brand-red rounded-full border-2 border-brand-dark" />
            </motion.div>
          </div>
          <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-white/70">
            <User className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Main Content Areas */}
      <main className="max-w-7xl mx-auto px-6 pt-8">
        <AnimatePresence mode="wait">
          {activeTab === 'home' && (
             <motion.div 
               key="home"
               variants={animations.container}
               initial="hidden"
               animate="show"
               exit={{ opacity: 0, x: -20 }}
               className="grid grid-cols-1 lg:grid-cols-12 gap-8"
             >
                {/* Hero / Featured Tournament */}
                <motion.section variants={animations.item} className="lg:col-span-8 space-y-8">
                  <SportsHeader label="ACTIVE CHAMPIONSHIPS" title="FEATURED EVENTS" size="lg" />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {MOCK_TOURNAMENTS.map(tr => (
                      <Card key={tr.id} noPadding className="group relative h-[360px] overflow-hidden flex flex-col justify-end">
                        <img 
                          src={tr.banner} 
                          alt={tr.name} 
                          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-transparent opacity-90" />
                        
                        <div className="relative p-6 space-y-4">
                          <div className="flex justify-between items-center">
                            <span className="micro-label !text-white opacity-60">CAT: {tr.category}</span>
                            <span className="micro-label !text-brand-red font-black">STARTS {tr.startDate}</span>
                          </div>
                          <h3 className="sports-header text-3xl text-white leading-tight">{tr.name}</h3>
                          <div className="flex items-center gap-4">
                            <div className="flex -space-x-3">
                              {[1,2,3,4].map(i => (
                                <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-dark bg-slate-200 overflow-hidden">
                                  <img src={`https://picsum.photos/seed/${i+10}/50/50`} alt="Team" referrerPolicy="no-referrer" />
                                </div>
                              ))}
                            </div>
                            <span className="micro-label !text-slate-300">+{tr.teamsCount} Teams Joined</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <div className="space-y-6">
                    <div className="flex justify-between items-end">
                      <SportsHeader label="INSTANT UPDATE" title="LIVE ACTIONS" />
                      <button className="micro-label !text-brand-red hover:underline">VIEW ALL MATCHES</button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                      {MOCK_MATCHES.filter(m => m.status === 'LIVE').map(match => (
                        <MatchCard key={match.id} match={match} />
                      ))}
                    </div>
                  </div>
                </motion.section>

                {/* Sidebar / Stats */}
                <motion.aside variants={animations.item} className="lg:col-span-4 space-y-10">
                   <div className="space-y-6">
                      <SportsHeader label="TALENT POOL" title="PRO SCOUT" />
                      {MOCK_PLAYERS.slice(0, 1).map(player => (
                        <PlayerScoutCard key={player.id} player={player} />
                      ))}
                   </div>

                   <Card className="bg-slate-900 border-none">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="p-3 bg-brand-red rounded-2xl">
                          <Flame className="w-6 h-6 text-white" />
                        </div>
                        <SportsHeader label="SYSTEM STATUS" title="HOT LEAGUES" className="text-white" />
                      </div>
                      <div className="space-y-4">
                        {[1,2,3].map(i => (
                          <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-slate-800/50 border border-slate-700/50">
                            <span className="sports-header text-slate-200 text-sm">DELHI TURF PRO</span>
                            <span className="micro-label !text-brand-red font-black">+240% ACTIVITY</span>
                          </div>
                        ))}
                      </div>
                   </Card>
                </motion.aside>
             </motion.div>
          )}

          {activeTab === 'matches' && (
            <motion.div 
              key="matches"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <SportsHeader label="FULL SCHEDULE" title="MATCH CENTER" size="lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {MOCK_MATCHES.map(match => (
                   <MatchCard key={match.id} match={match} />
                 ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'stats' && (
            <motion.div 
              key="stats"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <SportsHeader label="RANKINGS" title="PLAYER STANDINGS" size="lg" />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {MOCK_PLAYERS.map(player => (
                   <PlayerScoutCard key={player.id} player={player} />
                 ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Floating Action Button */}
      <motion.button 
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed right-6 bottom-28 md:bottom-8 z-50 w-16 h-16 bg-brand-red text-white rounded-2xl shadow-2xl flex items-center justify-center -rotate-6"
      >
        <Plus className="w-8 h-8" />
      </motion.button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 inset-x-0 z-50 p-4 pb-8 md:pb-4 pointer-events-none">
        <div className="max-w-md mx-auto pointer-events-auto">
          <GlassPanel className="flex justify-between items-center shadow-2xl p-2 md:p-1 overflow-hidden backdrop-blur-3xl border-white/20">
            <NavButton 
              active={activeTab === 'home'} 
              icon={Flame} 
              label="DASHBOARD" 
              onClick={() => setActiveTab('home')} 
            />
            <NavButton 
              active={activeTab === 'matches'} 
              icon={Trophy} 
              label="MATCHES" 
              onClick={() => setActiveTab('matches')} 
            />
            <NavButton 
              active={activeTab === 'stats'} 
              icon={BarChart3} 
              label="STATS" 
              onClick={() => setActiveTab('stats')} 
            />
            <NavButton 
              active={activeTab === 'profile'} 
              icon={ShieldCheck} 
              label="PROFILE" 
              onClick={() => setActiveTab('profile')} 
            />
          </GlassPanel>
        </div>
      </nav>
    </div>
  );
}

function NavButton({ active, icon: Icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex flex-col items-center gap-1 flex-1 py-3 transition-all rounded-2xl ${active ? 'bg-brand-red/10' : ''}`}
    >
      <Icon className={`w-6 h-6 ${active ? 'text-brand-red' : 'text-slate-400'}`} />
      <span className={`micro-label !text-[7px] ${active ? 'text-brand-red font-black' : 'text-slate-400'}`}>
        {label}
      </span>
      {active && (
        <motion.div 
          layoutId="activeTab" 
          className="absolute inset-0 rounded-2xl border-2 border-brand-red/50 pointer-events-none" 
        />
      )}
    </button>
  );
}
