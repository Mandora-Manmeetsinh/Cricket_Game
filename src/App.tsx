import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import GamePage from './pages/GamePage';
import ResultsPage from './pages/ResultsPage';
import { GameProvider } from './context/GameContext';

function App() {
  return (
    <Router>
      <GameProvider>
        <div className="min-h-screen bg-gradient-to-b from-green-800 to-green-600">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/game" element={<GamePage />} />
            <Route path="/results" element={<ResultsPage />} />
          </Routes>
        </div>
      </GameProvider>
    </Router>
  );
}

export default App;