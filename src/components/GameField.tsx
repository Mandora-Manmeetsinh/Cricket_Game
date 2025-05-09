import React, { useState, useEffect } from 'react';
import { Bath as Bat, Ticket as Cricket } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSpring, animated } from '@react-spring/web';
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
  
  const fieldRotation = useSpring({
    transform: currentAnimation 
      ? 'perspective(2000px) rotateX(25deg) rotateY(5deg)' 
      : 'perspective(2000px) rotateX(20deg) rotateY(0deg)',
    config: { tension: 300, friction: 40 },
  });

  const [{ scale }, api] = useSpring(() => ({ scale: 1 }));

  useEffect(() => {
    if (currentAnimation) {
      setAnimating(true);
      api.start({ scale: 1.05 });
      const timer = setTimeout(() => {
        setAnimating(false);
        api.start({ scale: 1 });
        onAnimationComplete();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [currentAnimation, onAnimationComplete, api]);

  return (
    <animated.div 
      style={{ ...fieldRotation, scale }}
      className="relative bg-gradient-radial from-green-500 via-green-600 to-green-700 rounded-xl shadow-elevation-3d p-8 w-full max-w-2xl mx-auto min-h-[400px] overflow-hidden card-3d"
    >
      {/* Field lighting effect */}
      <div className="absolute inset-0 field-lighting opacity-40"></div>
      
      {/* Enhanced grass pattern */}
      <div className="absolute inset-0 grass-pattern opacity-30"></div>
      
      {/* Cricket pitch with 3D effect */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-28 pitch-3d"
      >
        {/* Pitch markings */}
        <div className="absolute inset-x-0 top-1/4 h-px bg-white opacity-30"></div>
        <div className="absolute inset-x-0 top-2/4 h-px bg-white opacity-30"></div>
        <div className="absolute inset-x-0 top-3/4 h-px bg-white opacity-30"></div>
      </motion.div>
      
      {/* Enhanced 3D stumps */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 z-10 transform-gpu">
        {[0, 1, 2].map((index) => (
          <motion.div 
            key={index}
            initial={{ rotateX: -45, opacity: 0 }}
            animate={{ rotateX: 0, opacity: 1 }}
            transition={{ delay: index * 0.1 }}
            className="w-2 h-16 bg-gradient-to-b from-gray-100 to-gray-300 rounded-t-sm stump-3d"
          >
            {/* Stump bail */}
            <div className="absolute -top-1 w-3 h-1 bg-gray-200 rounded-full transform -translate-x-1/4"></div>
          </motion.div>
        ))}
      </div>
      
      {/* Enhanced batsman */}
      <motion.div 
        className="absolute bottom-6 left-1/4 player-shadow"
        animate={currentAnimation === 'batting' ? {
          scale: [1, 1.2, 1],
          rotate: [-30, -45, -30],
          y: [-10, 0, -10]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="relative transform-gpu">
          <Bat className="w-14 h-14 text-amber-800 filter drop-shadow-lg" />
          <motion.div 
            className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-blue-500 border-2 border-white shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          ></motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced bowler */}
      <motion.div 
        className="absolute bottom-6 right-1/4 player-shadow"
        animate={currentAnimation === 'bowling' ? {
          x: [0, 16, 0],
          y: [0, -12, 0],
          rotate: [0, -30, 0]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="relative transform-gpu">
          <Cricket className="w-14 h-14 text-red-600 filter drop-shadow-lg" />
          <motion.div 
            className="absolute -bottom-2 -right-2 w-5 h-5 rounded-full bg-red-500 border-2 border-white shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          ></motion.div>
        </div>
      </motion.div>
      
      {/* Enhanced ball animation */}
      <AnimatePresence>
        {currentAnimation === 'bowling' && (
          <motion.div 
            initial={{ right: '25%', bottom: '10rem', scale: 1, rotate: 0 }}
            animate={{ 
              right: '75%', 
              bottom: '3rem', 
              scale: [1, 1.2, 1], 
              rotate: 720 
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-4 h-4 bg-gradient-radial from-red-400 to-red-600 rounded-full shadow-lg"
            style={{
              boxShadow: '0 0 10px rgba(255, 0, 0, 0.3), inset 0 0 5px rgba(255, 255, 255, 0.5)'
            }}
          />
        )}
      </AnimatePresence>
      
      {/* Enhanced result display */}
      <AnimatePresence>
        {!animating && lastAction && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-90 px-6 py-3 rounded-lg shadow-elevation-3d backdrop-blur-sm"
          >
            <p className="text-center font-medium text-gray-800">{lastAction}</p>
            {lastRuns > 0 && (
              <motion.p 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center text-3xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent"
              >
                {lastRuns} runs
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Enhanced team indicators */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute bottom-2 left-4 text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-2 rounded-full shadow-lg"
      >
        {battingTeam} (Batting)
      </motion.div>
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute bottom-2 right-4 text-sm font-medium text-white bg-gradient-to-r from-red-600 to-red-500 px-4 py-2 rounded-full shadow-lg"
      >
        {bowlingTeam} (Bowling)
      </motion.div>
    </animated.div>
  );
}

export default GameField;