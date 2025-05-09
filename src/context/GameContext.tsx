import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { GameState, Team, GameSettings, BattingAction, BowlingAction, ActionResult } from '../types/game';
import { getActionResult } from '../utils/gameLogic';

interface GameContextType {
  gameState: GameState;
  startNewGame: (settings: GameSettings) => void;
  playBall: (battingAction: BattingAction, bowlingAction: BowlingAction) => void;
  resetGame: () => void;
}

const initialTeam: Team = {
  name: '',
  runs: 0,
  wickets: 0,
  balls: 0,
  overs: 0,
  currentBatsman: 1,
};

const initialSettings: GameSettings = {
  team1Name: 'Team 1',
  team2Name: 'Team 2',
  maxOvers: 5,
  maxWickets: 10,
};

const initialState: GameState = {
  settings: initialSettings,
  team1: { ...initialTeam, name: initialSettings.team1Name },
  team2: { ...initialTeam, name: initialSettings.team2Name },
  currentInnings: 1,
  isGameOver: false,
  lastAction: '',
  lastRuns: 0,
  target: null,
};

type GameAction =
  | { type: 'START_GAME'; payload: GameSettings }
  | { type: 'PLAY_BALL'; payload: ActionResult }
  | { type: 'END_INNINGS' }
  | { type: 'END_GAME' }
  | { type: 'RESET_GAME' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        settings: action.payload,
        team1: { ...initialTeam, name: action.payload.team1Name },
        team2: { ...initialTeam, name: action.payload.team2Name },
      };
    
    case 'PLAY_BALL': {
      const currentTeam = state.currentInnings === 1 ? 'team1' : 'team2';
      const updatedTeam = {
        ...state[currentTeam],
        runs: state[currentTeam].runs + action.payload.runs,
        wickets: action.payload.isWicket ? state[currentTeam].wickets + 1 : state[currentTeam].wickets,
        balls: state[currentTeam].balls + 1,
        overs: Math.floor((state[currentTeam].balls + 1) / 6),
        currentBatsman: action.payload.isWicket ? state[currentTeam].currentBatsman + 1 : state[currentTeam].currentBatsman,
      };

      // Check if innings is over
      const isInningsOver = 
        updatedTeam.wickets >= state.settings.maxWickets || 
        updatedTeam.balls >= state.settings.maxOvers * 6;
      
      // For 2nd innings, check if target is achieved
      const isTargetAchieved = 
        state.currentInnings === 2 && 
        state.target !== null && 
        updatedTeam.runs > state.target;
      
      // Set target after 1st innings
      const target = 
        state.currentInnings === 1 && isInningsOver 
          ? updatedTeam.runs 
          : state.target;
      
      return {
        ...state,
        [currentTeam]: updatedTeam,
        lastAction: action.payload.commentary,
        lastRuns: action.payload.runs,
        target,
        ...(isInningsOver && state.currentInnings === 1 ? { currentInnings: 2 } : {}),
        isGameOver: (isInningsOver && state.currentInnings === 2) || isTargetAchieved,
      };
    }
    
    case 'RESET_GAME':
      return initialState;
    
    default:
      return state;
  }
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export function GameProvider({ children }: { children: ReactNode }) {
  const [gameState, dispatch] = useReducer(gameReducer, initialState);

  const startNewGame = (settings: GameSettings) => {
    dispatch({ type: 'START_GAME', payload: settings });
  };

  const playBall = (battingAction: BattingAction, bowlingAction: BowlingAction) => {
    const result = getActionResult(battingAction, bowlingAction);
    dispatch({ type: 'PLAY_BALL', payload: result });
  };

  const resetGame = () => {
    dispatch({ type: 'RESET_GAME' });
  };

  return (
    <GameContext.Provider value={{ gameState, startNewGame, playBall, resetGame }}>
      {children}
    </GameContext.Provider>
  );
}

export function useGameContext() {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  return context;
}