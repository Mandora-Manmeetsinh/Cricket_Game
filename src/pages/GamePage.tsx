import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { BattingAction, BowlingAction } from '../types/game';
import Scoreboard from '../components/Scoreboard';
import ActionButtons from '../components/ActionButtons';
import GameField from '../components/GameField';
import CommentaryBox from '../components/CommentaryBox';
import { isBatting } from '../utils/gameLogic';

function GamePage() {
  const navigate = useNavigate();
  const { gameState, playBall } = useGameContext();
  const [commentary, setCommentary] = useState<string[]>([]);
  const [battingAction, setBattingAction] = useState<BattingAction | null>(null);
  const [bowlingAction, setBowlingAction] = useState<BowlingAction | null>(null);
  const [currentAnimation, setCurrentAnimation] = useState<'batting' | 'bowling' | null>(null);
  const [showPlayerMessage, setShowPlayerMessage] = useState(true);
  
  const {
    settings,
    team1,
    team2,
    currentInnings,
    isGameOver,
    lastAction,
    lastRuns
  } = gameState;
  
  // Determine which team is batting and bowling
  const battingTeam = currentInnings === 1 ? team1 : team2;
  const bowlingTeam = currentInnings === 1 ? team2 : team1;
  
  // Player turn message
  const playerTurnMessage = isBatting(currentInnings, 1) 
    ? `Player 1 (${team1.name}): Batting Turn` 
    : `Player 2 (${team2.name}): Batting Turn`;
  
  // Add commentary when a new ball is played
  useEffect(() => {
    if (lastAction && lastAction !== '') {
      setCommentary(prev => [...prev, lastAction]);
    }
  }, [lastAction]);
  
  // Check for game over or innings change
  useEffect(() => {
    if (isGameOver) {
      // Add a delay before redirecting to results
      const timer = setTimeout(() => {
        navigate('/results');
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isGameOver, navigate]);
  
  // Handle action selection
  const handleBattingActionSelect = (action: BattingAction) => {
    setBattingAction(action);
    setCurrentAnimation('batting');
  };
  
  const handleBowlingActionSelect = (action: BowlingAction) => {
    setBowlingAction(action);
    setCurrentAnimation('bowling');
  };
  
  // Handle animation completion
  const handleAnimationComplete = () => {
    setCurrentAnimation(null);
    
    if (battingAction && bowlingAction) {
      // Execute the ball
      playBall(battingAction, bowlingAction);
      
      // Reset actions
      setBattingAction(null);
      setBowlingAction(null);
      
      // Toggle player message
      setShowPlayerMessage(true);
    }
  };
  
  // Determine current player type (batting or bowling)
  const getCurrentPlayerType = (): 'batting' | 'bowling' => {
    return battingAction === null ? 'batting' : 'bowling';
  };
  
  // Handle action button click
  const handleActionSelect = (action: BattingAction | BowlingAction) => {
    if (getCurrentPlayerType() === 'batting') {
      handleBattingActionSelect(action as BattingAction);
    } else {
      handleBowlingActionSelect(action as BowlingAction);
    }
    setShowPlayerMessage(false);
  };
  
  return (
    <div className="min-h-screen py-6 flex flex-col items-center">
      <div className="container px-4 mx-auto max-w-4xl space-y-6">
        <header className="text-center mb-4">
          <h1 className="text-2xl font-bold text-white mb-1">Cricket Match</h1>
          <p className="text-green-200">
            Innings {currentInnings}: {battingTeam.name} batting
          </p>
        </header>
        
        <Scoreboard 
          battingTeam={battingTeam}
          bowlingTeam={bowlingTeam}
          settings={settings}
          currentInnings={currentInnings}
          target={gameState.target}
        />
        
        <GameField 
          battingTeam={battingTeam.name}
          bowlingTeam={bowlingTeam.name}
          lastRuns={lastRuns}
          lastAction={lastAction}
          currentAnimation={currentAnimation}
          onAnimationComplete={handleAnimationComplete}
        />
        
        <CommentaryBox commentary={commentary} />
        
        {currentAnimation === null && (
          <div className="bg-white bg-opacity-90 rounded-lg p-4 shadow-md">
            {showPlayerMessage && (
              <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-3 rounded-lg mb-4 text-center animate-pulse">
                {getCurrentPlayerType() === 'batting' ? (
                  <p>{playerTurnMessage}</p>
                ) : (
                  <p>Player {currentInnings === 1 ? '2' : '1'} ({bowlingTeam.name}): Bowling Turn</p>
                )}
              </div>
            )}
            
            <ActionButtons 
              currentPlayerType={getCurrentPlayerType()}
              onSelectAction={handleActionSelect}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default GamePage;