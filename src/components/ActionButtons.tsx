import React from 'react';
import { BattingAction, BowlingAction } from '../types/game';
import { Bath as Bat, ShieldAlert, ShieldCheck, Zap, Gauge, Wind } from 'lucide-react';

interface ActionButtonsProps {
  currentPlayerType: 'batting' | 'bowling';
  onSelectAction: (action: BattingAction | BowlingAction) => void;
  disabled?: boolean;
}

function ActionButtons({ currentPlayerType, onSelectAction, disabled = false }: ActionButtonsProps) {
  if (currentPlayerType === 'batting') {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-medium text-white text-center">Select your batting style</h3>
        <div className="grid grid-cols-3 gap-3">
          <button
            className="flex flex-col items-center justify-center bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onSelectAction(BattingAction.DEFENSIVE)}
            disabled={disabled}
          >
            <ShieldCheck className="w-6 h-6 mb-2" />
            <span>Defensive</span>
            <span className="text-xs mt-1 text-blue-200">Safe play, fewer runs</span>
          </button>
          
          <button
            className="flex flex-col items-center justify-center bg-amber-600 hover:bg-amber-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onSelectAction(BattingAction.BALANCED)}
            disabled={disabled}
          >
            <Gauge className="w-6 h-6 mb-2" />
            <span>Balanced</span>
            <span className="text-xs mt-1 text-amber-200">Mix of safety and runs</span>
          </button>
          
          <button
            className="flex flex-col items-center justify-center bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => onSelectAction(BattingAction.AGGRESSIVE)}
            disabled={disabled}
          >
            <Zap className="w-6 h-6 mb-2" />
            <span>Aggressive</span>
            <span className="text-xs mt-1 text-red-200">High risk, high reward</span>
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-white text-center">Select your bowling style</h3>
      <div className="grid grid-cols-3 gap-3">
        <button
          className="flex flex-col items-center justify-center bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onSelectAction(BowlingAction.SPIN)}
          disabled={disabled}
        >
          <Wind className="w-6 h-6 mb-2" />
          <span>Spin</span>
          <span className="text-xs mt-1 text-purple-200">Tricky, creates confusion</span>
        </button>
        
        <button
          className="flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onSelectAction(BowlingAction.MEDIUM)}
          disabled={disabled}
        >
          <Gauge className="w-6 h-6 mb-2" />
          <span>Medium</span>
          <span className="text-xs mt-1 text-green-200">Balanced pace</span>
        </button>
        
        <button
          className="flex flex-col items-center justify-center bg-orange-600 hover:bg-orange-700 text-white py-3 px-4 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => onSelectAction(BowlingAction.FAST)}
          disabled={disabled}
        >
          <ShieldAlert className="w-6 h-6 mb-2" />
          <span>Fast</span>
          <span className="text-xs mt-1 text-orange-200">Quick, intimidating</span>
        </button>
      </div>
    </div>
  );
}

export default ActionButtons;