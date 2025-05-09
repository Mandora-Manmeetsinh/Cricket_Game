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
    transform: currentAnimation ? 'perspective(1000px) rotateX(20deg)' : 'perspective(1000px) rotateX(0deg)',
    config: { tension: 300, friction: 40 },
  });

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
    <animated.div style={fieldRotation} className="relative bg-gradient-radial from-green-500 via-green-600 to-green-700 rounded-xl shadow-elevation-3d p-8 w-full max-w-2xl mx-auto min-h-[300px] overflow-hidden card-3d">
      {/* Grass pattern overlay */}
      <div className="absolute inset-0 grass-pattern opacity-20"></div>
      
      {/* Cricket pitch */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 w-24 bg-gradient-to-b from-amber-100 to-amber-200 z-0 shadow-inner-lg"
      ></motion.div>
      
      {/* Stumps with 3D effect */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-1 z-10 transform preserve-3d">
        <motion.div 
          initial={{ rotateX: -45 }}
          animate={{ rotateX: 0 }}
          className="w-2 h-16 bg-gradient-to-b from-gray-100 to-gray-300 rounded-t-sm shadow-lg"
        ></motion.div>
        <motion.div 
          initial={{ rotateX: -45 }}
          animate={{ rotateX: 0 }}
          transition={{ delay: 0.1 }}
          className="w-2 h-16 bg-gradient-to-b from-gray-100 to-gray-300 rounded-t-sm shadow-lg"
        ></motion.div>
        <motion.div 
          initial={{ rotateX: -45 }}
          animate={{ rotateX: 0 }}
          transition={{ delay: 0.2 }}
          className="w-2 h-16 bg-gradient-to-b from-gray-100 to-gray-300 rounded-t-sm shadow-lg"
        ></motion.div>
      </div>
      
      {/* Batsman */}
      <motion.div 
        className={`absolute bottom-6 left-1/4 transition-all duration-300`}
        animate={currentAnimation === 'batting' ? {
          scale: 1.1,
          rotate: -45,
          y: [-10, 0, -10]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <Bat className="w-12 h-12 text-amber-800 drop-shadow-lg" />
          <motion.div 
            className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          ></motion.div>
        </div>
      </motion.div>
      
      {/* Bowler */}
      <motion.div 
        className={`absolute bottom-6 right-1/4`}
        animate={currentAnimation === 'bowling' ? {
          x: 16,
          y: -8,
          rotate: [0, -20, 0]
        } : {}}
        transition={{ duration: 0.5 }}
      >
        <div className="relative">
          <Cricket className="w-12 h-12 text-red-600 drop-shadow-lg" />
          <motion.div 
            className="absolute -bottom-2 -right-2 w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow-lg"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          ></motion.div>
        </div>
      </motion.div>
      
      {/* Ball with enhanced animation */}
      <AnimatePresence>
        {currentAnimation === 'bowling' && (
          <motion.div 
            initial={{ right: '25%', bottom: '10rem', scale: 1, rotate: 0 }}
            animate={{ right: '75%', bottom: '3rem', scale: [1, 1.2, 1], rotate: 360 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="absolute w-3 h-3 bg-gradient-radial from-red-500 to-red-600 rounded-full shadow-lg"
          />
        )}
      </AnimatePresence>
      
      {/* Result display with animation */}
      <AnimatePresence>
        {!animating && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 bg-white bg-opacity-90 px-6 py-3 rounded-lg shadow-elevation-3d"
          >
            <p className="text-center font-medium">{lastAction}</p>
            {lastRuns > 0 && (
              <motion.p 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-center text-2xl font-bold text-blue-600"
              >
                {lastRuns} runs
              </motion.p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Team names with 3D effect */}
      <motion.div 
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute bottom-2 left-4 text-xs font-medium text-white bg-blue-600 px-3 py-1.5 rounded-full shadow-elevation-3d"
      >
        {battingTeam} (Batting)
      </motion.div>
      <motion.div 
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="absolute bottom-2 right-4 text-xs font-medium text-white bg-red-600 px-3 py-1.5 rounded-full shadow-elevation-3d"
      >
        {bowlingTeam} (Bowling)
      </motion.div>
    </animated.div>
  );
}

export default GameField;