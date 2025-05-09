import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useGameContext } from '../context/GameContext';
import { Ticket as Cricket } from 'lucide-react';

function HomePage() {
  const navigate = useNavigate();
  const { startNewGame } = useGameContext();
  
  const [team1Name, setTeam1Name] = useState('Team 1');
  const [team2Name, setTeam2Name] = useState('Team 2');
  const [maxOvers, setMaxOvers] = useState(5);
  
  const handleStartGame = (e: React.FormEvent) => {
    e.preventDefault();
    
    startNewGame({
      team1Name,
      team2Name,
      maxOvers,
      maxWickets: 10
    });
    
    navigate('/game');
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-md w-full">
        <div className="flex items-center justify-center mb-6">
          <Cricket className="w-12 h-12 text-green-700 mr-3" />
          <h1 className="text-3xl font-bold text-gray-800">Cricket Match</h1>
        </div>
        
        <p className="text-gray-600 mb-6 text-center">
          Set up your two-player cricket match! Customize team names and match settings.
        </p>
        
        <form onSubmit={handleStartGame} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="team1" className="block text-sm font-medium text-gray-700">
                Team 1 Name
              </label>
              <input
                type="text"
                id="team1"
                value={team1Name}
                onChange={(e) => setTeam1Name(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
                maxLength={20}
              />
            </div>
            
            <div>
              <label htmlFor="team2" className="block text-sm font-medium text-gray-700">
                Team 2 Name
              </label>
              <input
                type="text"
                id="team2"
                value={team2Name}
                onChange={(e) => setTeam2Name(e.target.value)}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                required
                maxLength={20}
              />
            </div>
            
            <div>
              <label htmlFor="overs" className="block text-sm font-medium text-gray-700">
                Max Overs
              </label>
              <select
                id="overs"
                value={maxOvers}
                onChange={(e) => setMaxOvers(Number(e.target.value))}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
              >
                <option value="1">1 Over (Quick Game)</option>
                <option value="5">5 Overs</option>
                <option value="10">10 Overs</option>
                <option value="20">20 Overs (T20)</option>
              </select>
            </div>
          </div>
          
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
              Start Match
            </button>
          </div>
        </form>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h3 className="text-sm font-medium text-gray-700 mb-2">How to Play:</h3>
          <ol className="text-xs text-gray-600 list-decimal pl-4 space-y-1">
            <li>Each team bats for their innings (max overs or 10 wickets)</li>
            <li>Batsman chooses batting style (defensive, balanced, aggressive)</li>
            <li>Bowler chooses bowling style (spin, medium, fast)</li>
            <li>Your action determines runs scored or wickets taken</li>
            <li>Team with most runs at the end of two innings wins!</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default HomePage;