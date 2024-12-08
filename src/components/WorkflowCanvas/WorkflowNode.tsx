import React, { memo } from 'react';
import { Handle, Position, NodeProps } from 'reactflow';
import { Timer, AlertCircle, Brain, CheckCircle2, CircleSlash, Circle, Workflow } from 'lucide-react';
import { WorkflowNode as WorkflowNodeType } from '../../types/workflow';

const nodeIcons = {
  task: Workflow,
  validation: CheckCircle2,
  ai: Brain,
  decision: CircleSlash,
  start: Circle,
  end: Circle,
} as const;

export const WorkflowNode = memo(({ data, isConnectable }: NodeProps) => {
  const node = data as WorkflowNodeType['data'];
  const Icon = nodeIcons[node.type];
  
  const getInputPosition = (index: number, total: number): number => {
    if (total === 1) return 50;
    const spacing = 80 / (total - 1);
    return 10 + (spacing * index);
  };

  const getOutputPosition = (index: number, total: number): number => {
    if (total === 1) return 50;
    const spacing = 80 / (total - 1);
    return 10 + (spacing * index);
  };

  const isSpecialNode = node.type === 'start' || node.type === 'end';

  return (
    <div className={`
      px-4 py-2 rounded-lg shadow-lg border-2 min-w-[180px]
      ${isSpecialNode ? 'border-none bg-transparent shadow-none min-w-0 !p-0 text-neon-400' :
        node.status === 'error' ? 'border-red-500 bg-midnight-800/80' :
        node.status === 'running' ? 'border-neon-500 bg-midnight-800/80' :
        node.status === 'completed' ? 'border-green-500 bg-midnight-800/80' :
        'border-midnight-700 bg-midnight-800/80'}
    `}>
      <div className="flex items-center gap-2">
        {node.type === 'start' ? (
          <div className="w-6 h-6 rounded-full bg-neon-400 relative">
            <Handle
              type="source"
              position={Position.Bottom}
              id={node.outputs[0].id}
              style={{ bottom: '-2px' }}
              className="w-2 h-2 !bg-neon-400"
              isConnectable={isConnectable}
            />
          </div>
        ) : node.type === 'end' ? (
          <div className="w-6 h-6 rounded-full bg-midnight-900 border-2 border-neon-400 flex items-center justify-center relative">
            <div className="w-3 h-3 rounded-full bg-neon-400" />
            <Handle
              type="target"
              position={Position.Top}
              id={node.inputs[0].id}
              style={{ top: '-2px' }}
              className="w-2 h-2 !bg-neon-400"
              isConnectable={isConnectable}
            />
          </div>
        ) : (
          <>
            <Icon className="w-4 h-4 text-neon-400" />
            <span className="font-medium text-neon-300">{node.label}</span>
          </>
        )}
        {node.status === 'error' && (
          <AlertCircle className="w-4 h-4 text-red-500" />
        )}
        {node.executionTime && (
          <div className="flex items-center text-xs text-neon-300/70">
            <Timer className="w-3 h-3 mr-1" />
            {node.executionTime}ms
          </div>
        )}
      </div>
      
      <div className="mt-2 relative min-h-[60px]">
        {!isSpecialNode && node.inputs.map((input, index) => (
          <Handle
            key={input.id}
            type="target"
            position={Position.Top}
            id={input.id}
            style={{ left: `${getInputPosition(index, node.inputs.length)}%` }}
            className="w-2 h-2 !bg-neon-400 hover:!bg-neon-500 !-top-[48px]"
            isConnectable={isConnectable}
          />
        ))}
        
        {!isSpecialNode && (
          node.outputs.map((output, index) => (
            <Handle
              key={output.id}
              type="source"
              position={Position.Bottom}
              id={output.id}
              style={{ left: `${getOutputPosition(index, node.outputs.length)}%` }}
              className={`w-2 h-2 !-bottom-4 ${
                data.type === 'validation'
                  ? output.name === 'Pass'
                    ? '!bg-emerald-400'
                    : '!bg-red-500'
                  : '!bg-neon-400 hover:!bg-neon-500'
              }`}
              isConnectable={isConnectable}
            >
              <div className={`
                  absolute -top-4 text-xs whitespace-nowrap transform -translate-x-1/2 left-1/2
                  ${data.type === 'validation'
                    ? output.name === 'Pass'
                      ? 'text-emerald-400'
                      : 'text-red-600'
                    : 'text-neon-300/70'}
                `}>
                  {output.name}
              </div>
            </Handle>
          ))
        )}
      </div>
    </div>
  );
});