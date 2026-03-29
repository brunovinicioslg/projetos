
export interface UserStats {
  level: number;
  xp: number;
  distance: number; // km
  territories: number;
  stamina: number; // 0-100
}

export interface Territory {
  id: string;
  ownerId: string;
  ownerName: string;
  color: string;
  path: [number, number][];
  area: number; // m2
  status: 'captured' | 'neutral';
}

export interface Activity {
  points: [number, number][];
  startTime: number;
  distance: number;
  speed: number;
}

export enum AppState {
  MAP = 'MAP',
  TRACKING = 'TRACKING',
  PROFILE = 'PROFILE',
  LEADERBOARD = 'LEADERBOARD',
  SUMMARY = 'SUMMARY'
}
