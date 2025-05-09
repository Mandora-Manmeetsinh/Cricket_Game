import React, { useState, useEffect } from 'react';
import { Bath as Bat, Ticket as Cricket } from 'lucide-react';
import { BattingAction, BowlingAction } from '../types/game';

interface GameFieldProps {
  battingTeam: string;
  bowlingTeam: string;
  lastRuns: number;
  lastAction: string;
  currentAnimation: 'batting' | 'bowling' | null;
  onAnimationComplete: () => void;
}

function GameField({ 
  battingTeam, 
  bowlingTeam, 
  lastRuns, 
  lastAction, 
  currentAnimation,
  onAnimationComplete 
}: GameFieldProps) {
  const [animating, setAnimating] = useState(false);
  
  useEffect(() => {
    if (currentAnimation) {
      setAnimating(true);
      const timer = setTimeout(() => {
        setAnimating(false);
        onAnimationComplete();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [currentAnimation, onAnimationComplete]);

  return (
    <div className="relative bg-gradient-to-b from-green-500 to-green-600 rounded-lg shadow-lg p-8 w-full max-w-2xl mx-auto min-h-[250px] overflow-hidden">
      {/* Cricket pitch */}
      <div className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-24 bg-amber-100 z-0"></div>
      
      {/* Stumps */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 z-10">
        <div className="w-2 h-16 bg-gray-200 rounded-t-sm"></div>
        <div className="w-2 h-16 bg-gray-200 rounded-t-sm"></div>
        <div className="w-2 h-16 bg-gray-200 rounded-t-sm"></div>
      </div>
      
      {/* Batsman */}
      <div className={`absolute bottom-6 left-1/4 transition-all duration-300 ${
        currentAnimation === 'batting' ? 'scale-110 -rotate-45' : ''
      }`}>
        <div className="relative">
          <Bat className="w-12 h-12 text-amber-800" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
        </div>
      </div>
      
      {/* Bowler */}
      <div className={`absolute bottom-6 right-1/4 transition-all duration-300 ${
        currentAnimation === 'bowling' ? 'translate-x-4 -translate-y-2' : ''
      }`}>
        <div className="relative">
          <Cricket className="w-12 h-12 text-red-600" />
          <div className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-red-500 border-2 border-white"></div>
        </div>
      </div>
      
      {/* Ball */}
      {currentAnimation === 'bowling' && (
        <div className="absolute w-3 h-3 bg-red-600 rounded-full bottom-10 animate-ball"></div>
      )}
      
      {/* Result display */}
      <div className={`absolute top-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-90 px-4 py-2 rounded-lg shadow-md transition-opacity duration-300 ${
        animating ? 'opacity-0' : 'opacity-100'
      }`}>
        <p className="text-center font-medium">{lastAction}</p>
        {lastRuns > 0 && <p className="text-center text-2xl font-bold text-blue-600">{lastRuns} runs</p>}
      </div>
      
      {/* Team names */}
      <div className="absolute bottom-2 left-4 text-xs font-medium text-white bg-blue-600 px-2 py-1 rounded-full">
        {battingTeam} (Batting)
      </div>
      <div className="absolute bottom-2 right-4 text-xs font-medium text-white bg-red-600 px-2 py-1 rounded-full">
        {bowlingTeam} (Bowling)
      </div>
    </div>
  );
}

export default GameField;