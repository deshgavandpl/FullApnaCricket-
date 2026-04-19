/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface PlayerStats {
  matches: number;
  runs: number;
  wickets: number;
  average: number;
  strikeRate: number;
}

export interface Player {
  id: string;
  name: string;
  role: 'Batsman' | 'Bowler' | 'All-rounder' | 'Wicket-keeper';
  avatar: string;
  stats: PlayerStats;
  tags?: string[];
}

export interface Team {
  id: string;
  name: string;
  logo: string;
  shortName: string;
}

export interface Match {
  id: string;
  t1: Team;
  t2: Team;
  status: 'LIVE' | 'UPCOMING' | 'FINISHED';
  score?: string;
  overs?: string;
  venue: string;
  time: string;
}

export interface Tournament {
  id: string;
  name: string;
  banner: string;
  category: 'Village' | 'Tennis' | 'Turf' | 'Street';
  startDate: string;
  teamsCount: number;
}
