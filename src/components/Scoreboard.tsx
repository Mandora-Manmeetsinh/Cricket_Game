import React from 'react';
import { Team, GameSettings } from '../types/game';
import { formatOvers, calculateRunRate, calculateRequiredRunRate, getBallsRemaining } from '../utils/gameLogic';

interface ScoreboardProps {
  battingTeam: Team;
  bowlingTeam: Team;
  settings: GameSettings;
  currentInnings: 1 | 2;
  target: number | null;
}

function Scoreboard({ battingTeam, bowlingTeam, settings, currentInnings, target }: ScoreboardProps) {
  const ballsRemaining = getBallsRemaining(settings.maxOvers, battingTeam.balls);
  const currentRunRate = calculateRunRate(battingTeam.runs, battingTeam.balls);
  const requiredRunRate = currentInnings === 2 && target 
    ? calculateRequiredRunRate(target, battingTeam.runs, ballsRemaining)
    : '0.00';

  return (
    <div className="bg-gray-100 rounded-lg shadow-md p-4 w-full max-w-2xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">
          {battingTeam.name} <span className="text-red-600">{battingTeam.wickets}</span>/{battingTeam.runs}
        </h2>
        <div className="text-gray-700 font-medium">
          Overs: {formatOvers(battingTeam.balls)}/{settings.maxOvers}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-green-100 p-2 rounded">
          <div className="text-sm text-gray-600">Current Run Rate</div>
          <div className="font-bold">{currentRunRate}</div>
        </div>
        
        {currentInnings === 2 && target && (
          <div className="bg-blue-100 p-2 rounded">
            <div className="text-sm text-gray-600">Required Run Rate</div>
            <div className="font-bold">{requiredRunRate}</div>
          </div>
        )}
      </div>
      
      {currentInnings === 2 && target && (
        <div className="bg-amber-100 p-3 rounded-md text-center mb-4">
          <p className="font-medium">
            {battingTeam.name} needs {target - battingTeam.runs + 1} runs from {ballsRemaining} balls to win
          </p>
        </div>
      )}
      
      <div className="border-t pt-2 text-gray-700 flex justify-between items-center">
        <div>
          Batsman #{battingTeam.currentBatsman}
        </div>
        <div>
          Bowling: {bowlingTeam.name}
        </div>
      </div>
    </div>
  );
}

export default Scoreboard;