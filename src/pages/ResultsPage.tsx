import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { formatOvers, calculateRunRate } from '../utils/gameLogic';
import { Trophy, Home, RefreshCw } from 'lucide-react';

function ResultsPage() {
  const navigate = useNavigate();
  const { gameState, resetGame } = useGameContext();
  const { team1, team2, settings } = gameState;
  
  // Determine the winner
  let winningTeam;
  let margin = 0;
  let winByRuns = false;
  let winByWickets = false;
  let isDraw = false;
  
  if (team1.runs > team2.runs) {
    winningTeam = team1.name;
    margin = team1.runs - team2.runs;
    winByRuns = true;
  } else if (team2.runs > team1.runs) {
    winningTeam = team2.name;
    margin = settings.maxWickets - team2.wickets;
    winByWickets = true;
  } else {
    isDraw = true;
  }
  
  // Calculate match statistics
  const team1RunRate = calculateRunRate(team1.runs, team1.balls);
  const team2RunRate = calculateRunRate(team2.runs, team2.balls);
  const totalRuns = team1.runs + team2.runs;
  const totalWickets = team1.wickets + team2.wickets;
  const totalBoundaries = Math.floor(totalRuns / 4); // Just an estimate for display
  
  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };
  
  return (
    <div className="min-h-screen py-8 flex flex-col items-center">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6 text-white text-center">
            <Trophy className="w-16 h-16 mx-auto mb-3" />
            <h1 className="text-3xl font-bold mb-2">Match Results</h1>
            
            {isDraw ? (
              <p className="text-xl">It's a tie! Both teams scored {team1.runs} runs.</p>
            ) : (
              <p className="text-xl">
                <span className="font-bold">{winningTeam}</span> wins by{' '}
                {winByRuns ? `${margin} runs` : `${margin} wickets`}
              </p>
            )}
          </div>
          
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-bold text-blue-800 text-center mb-2 border-b pb-1">
                  {team1.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-medium">{team1.runs}/{team1.wickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overs:</span>
                    <span className="font-medium">{formatOvers(team1.balls)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Run Rate:</span>
                    <span className="font-medium">{team1RunRate}</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-bold text-red-800 text-center mb-2 border-b pb-1">
                  {team2.name}
                </h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Score:</span>
                    <span className="font-medium">{team2.runs}/{team2.wickets}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Overs:</span>
                    <span className="font-medium">{formatOvers(team2.balls)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Run Rate:</span>
                    <span className="font-medium">{team2RunRate}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-bold text-center mb-3">Match Statistics</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-blue-600">{totalRuns}</div>
                  <div className="text-sm text-gray-600">Total Runs</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">{totalWickets}</div>
                  <div className="text-sm text-gray-600">Total Wickets</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-amber-600">{totalBoundaries}</div>
                  <div className="text-sm text-gray-600">Boundaries</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
              <button 
                onClick={handlePlayAgain}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
                Play Again
              </button>
              
              <button 
                onClick={() => navigate('/')}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
              >
                <Home className="w-5 h-5" />
                Home
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResultsPage;