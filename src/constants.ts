import { Match, Player, Tournament } from "./types";

export const MOCK_TEAMS = {
  STORM: { id: 't1', name: 'Desert Storm', shortName: 'DSM', logo: 'https://picsum.photos/seed/storm/100/100' },
  RAIDERS: { id: 't2', name: 'Mumbai Raiders', shortName: 'MRD', logo: 'https://picsum.photos/seed/raiders/100/100' },
  TITANS: { id: 't3', name: 'Punjab Titans', shortName: 'PTN', logo: 'https://picsum.photos/seed/titans/100/100' },
  BLASTERS: { id: 't4', name: 'Kerala Blasters', shortName: 'KBL', logo: 'https://picsum.photos/seed/kbl/100/100' },
};

export const MOCK_MATCHES: Match[] = [
  {
    id: 'm1',
    t1: MOCK_TEAMS.RAIDERS,
    t2: MOCK_TEAMS.STORM,
    status: 'LIVE',
    score: '142/4',
    overs: '16.2',
    venue: 'Mumbai Turf Park',
    time: 'STARTED',
  },
  {
    id: 'm2',
    t1: MOCK_TEAMS.TITANS,
    t2: MOCK_TEAMS.BLASTERS,
    status: 'UPCOMING',
    venue: 'Ludhiana Village Ground',
    time: '19:30 IST',
  },
];

export const MOCK_PLAYERS: Player[] = [
  {
    id: 'p1',
    name: 'Rohit Sharma (Jr)',
    role: 'Batsman',
    avatar: 'https://picsum.photos/seed/p1/200/200',
    stats: { matches: 45, runs: 1240, wickets: 2, average: 38.5, strikeRate: 142.1 },
    tags: ['POWER HITTER', 'CAPTAIN'],
  },
  {
    id: 'p2',
    name: 'Ishant Yadav',
    role: 'Bowler',
    avatar: 'https://picsum.photos/seed/p2/200/200',
    stats: { matches: 38, runs: 120, wickets: 62, average: 18.2, strikeRate: 120.5 },
    tags: ['WICKET TAKER', 'LOCAL HERO'],
  },
];

export const MOCK_TOURNAMENTS: Tournament[] = [
  {
    id: 'tr1',
    name: 'Village Premiere League 2026',
    banner: 'https://picsum.photos/seed/cricket1/800/400',
    category: 'Village',
    startDate: 'MAY 15',
    teamsCount: 16,
  },
  {
    id: 'tr2',
    name: 'Mumbai Turf Masters',
    banner: 'https://picsum.photos/seed/cricket2/800/400',
    category: 'Turf',
    startDate: 'JUNE 02',
    teamsCount: 12,
  },
];
