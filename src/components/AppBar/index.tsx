import React from 'react';
import { Link } from 'react-router-dom';
import { Workflow, Braces } from 'lucide-react';

interface AppBarProps {
  onDebug: () => void;
}

export function AppBar({ onDebug }: AppBarProps) {
  return (
    <div className="h-14 bg-midnight-900/50 backdrop-blur-sm border-b border-midnight-800/50 px-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Link to="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <Workflow className="w-6 h-6 text-neon-400" />
          <div>
            <h1 className="text-lg font-semibold text-white">Odin</h1>
            <p className="text-xs text-neon-400">AI Orchestration </p>
          </div>
        </Link>
      </div>
      
      <div className="flex items-center space-x-2">
        <button
          onClick={onDebug}
          className="inline-flex items-center px-3 py-1.5 border border-midnight-700 shadow-sm text-sm font-medium rounded text-neon-300 bg-midnight-800 hover:bg-midnight-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-neon-500"
        >
          <Braces className="w-4 h-4 mr-2 text-neon-400" />
          Debug View
        </button>
      </div>
    </div>
  );
}