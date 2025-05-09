export interface Team {
  name: string;
  runs: number;
  wickets: number;
  balls: number;
  overs: number;
  currentBatsman: number;
}

export interface GameSettings {
  team1Name: string;
  team2Name: string;
  maxOvers: number;
  maxWickets: number;
}

export interface GameState {
  settings: GameSettings;
  team1: Team;
  team2: Team;
  currentInnings: 1 | 2;
  isGameOver: boolean;
  lastAction: string;
  lastRuns: number;
  target: number | null;
}

export enum BattingAction {
  DEFENSIVE = 'defensive',
  BALANCED = 'balanced',
  AGGRESSIVE = 'aggressive'
}

export enum BowlingAction {
  SPIN = 'spin',
  MEDIUM = 'medium',
  FAST = 'fast'
}

export interface ActionResult {
  runs: number;
  isWicket: boolean;
  commentary: string;
}