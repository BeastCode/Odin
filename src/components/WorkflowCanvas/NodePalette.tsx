import React from 'react';
import { useReactFlow } from 'reactflow';
import {
  CircleSlash,
  Brain,
  Circle,
  CheckCircle2,
  Workflow,
} from 'lucide-react';
import { NodeType } from '../../types/workflow';

const nodeTypes: Array<{
  type: NodeType;
  label: string;
  icon: React.FC<{ className?: string }>;
  preview: React.ReactNode;
}> = [
  {
    type: 'start',
    label: 'Start',
    icon: Circle,
    preview: (
      <div className="flex items-center gap-2">
        <div className="w-6 h-6 rounded-full bg-neon-400" />
        <span className="font-medium text-neon-300">Start</span>
      </div>
    ),
  },
  {
    type: 'task',
    label: 'Task',
    icon: Workflow,
    preview: (
      <div className="px-4 py-2 rounded-lg shadow-lg border-2 border-midnight-700 bg-midnight-800/80 min-w-[180px]">
        <div className="flex items-center gap-2">
          <Workflow className="w-4 h-4 text-neon-400" />
          <span className="font-medium text-neon-300">Task</span>
        </div>
      </div>
    ),
  },
  {
    type: 'validation',
    label: 'Validation',
    icon: CheckCircle2,
    preview: (
      <div className="px-4 py-2 rounded-lg shadow-lg border-2 border-midnight-700 bg-midnight-800/80 min-w-[180px]">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-neon-400" />
          <span className="font-medium text-neon-300">Validation</span>
        </div>
      </div>
    ),
  },
  {
    type: 'ai',
    label: 'AI Processing',
    icon: Brain,
    preview: (
      <div className="px-4 py-2 rounded-lg shadow-lg border-2 border-midnight-700 bg-midnight-800/80 min-w-[180px]">
        <div className="flex items-center gap-2">
          <Brain className="w-4 h-4 text-neon-400" />
          <span className="font-medium text-neon-300">AI Processing</span>
        </div>
      </div>
    ),
  },
  {
    type: 'decision',
    label: 'Decision',
    icon: CircleSlash,
    preview: (
      <div className="px-4 py-2 rounded-lg shadow-lg border-2 border-midnight-700 bg-midnight-800/80 min-w-[180px]">
        <div className="flex items-center gap-2">
          <CircleSlash className="w-4 h-4 text-neon-400" />
          <span className="font-medium text-neon-300">Decision</span>
        </div>
      </div>
    ),
  },
  {
    type: 'end',
    label: 'End',
    icon: Circle,
    preview: ( 
      <div className="flex items-center gap-2">
      <div className="w-6 h-6 rounded-full bg-midnight-900 border-2 border-neon-400 flex items-center justify-center">
        <div className="w-3 h-3 rounded-full bg-neon-400" />
      </div>
        <span className="font-medium text-neon-300">End</span>
      </div>
    ),
  },
];

export function NodePalette() {
  const { getNodes } = useReactFlow();
  
  const hasStartNode = () => {
    return getNodes().some((node) => node.data.type === 'start');
  };

  const onDragStart = (event: React.DragEvent, nodeType: NodeType) => {
    if (nodeType === 'start' && hasStartNode()) {
      event.preventDefault();
      return;
    }
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="w-64 border-r border-midnight-800/50 bg-midnight-900/50 backdrop-blur-sm p-4">
      <h3 className="text-lg font-medium mb-4 text-white">Node Palette</h3>
      <div className="space-y-2">
        {nodeTypes.map(({ type, preview }) => (
          <div
            key={type}
            draggable={!(type === 'start' && hasStartNode())}
            className={`${
              type === 'start' && hasStartNode()
                ? 'opacity-50 cursor-not-allowed'
                : 'cursor-move hover:opacity-80'
            } transition-opacity`}
            onDragStart={(e) => onDragStart(e, type)}
          >
            {preview}
          </div>
        ))}
      </div>
    </div>
  );
}
