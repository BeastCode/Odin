import React from 'react';
import { Node } from 'reactflow';
import { X, Tag, Settings, Clock } from 'lucide-react';
import { WorkflowNode } from '../../types/workflow';

interface NodePropertiesProps {
  node: Node;
  onChange: (node: Node) => void;
  onClose: () => void;
}

const ConfigLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-sm font-medium text-neon-300 mb-1">
    {children}
  </label>
);

export function NodeProperties({ node, onChange, onClose }: NodePropertiesProps) {
  const nodeData = node.data as WorkflowNode['data'];
  const isSpecialNode = nodeData.type === 'start' || nodeData.type === 'end';

  return (
    <div className="w-80 border-l border-midnight-800/50 bg-midnight-900/50 backdrop-blur-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-neon-400" />
          <h3 className="text-lg font-medium text-white">Properties</h3>
        </div>
        <button
          onClick={onClose}
          className="p-1 hover:bg-midnight-800 rounded-full text-neon-300"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
      
      <div className="space-y-6">
        {!isSpecialNode && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-midnight-800">
            <Tag className="w-4 h-4 text-neon-400" />
            <ConfigLabel>Node Label</ConfigLabel>
          </div>
          <input
            type="text"
            value={nodeData.label}
            onChange={(e) =>
              onChange({
                ...node,
                data: { ...node.data, label: e.target.value },
              })
            }
            className="w-full px-3 py-2 border border-midnight-700 rounded-md shadow-sm bg-midnight-800 text-neon-300 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:border-neon-500"
            placeholder="Enter node label"
          />
        </div>
        )}
        
        {!isSpecialNode && nodeData.config && Object.entries(nodeData.config).length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-midnight-800">
            <Settings className="w-4 h-4 text-neon-400" />
            <ConfigLabel>Configuration</ConfigLabel>
          </div>
          {Object.entries(nodeData.config).map(([key, value]) => (
          <div key={key} className="space-y-1">
            <ConfigLabel>{key.charAt(0).toUpperCase() + key.slice(1)}</ConfigLabel>
            <input
              type="text"
              value={value as string}
              onChange={(e) =>
                onChange({
                  ...node,
                  data: {
                    ...node.data,
                    config: { ...node.data.config, [key]: e.target.value },
                  },
                })
              }
              className="w-full px-3 py-2 border border-midnight-700 rounded-md shadow-sm bg-midnight-800 text-neon-300 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:border-neon-500"
              placeholder={`Enter ${key}`}
            />
          </div>
          ))}
        </div>
        )}

        {nodeData.metadata && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-midnight-800">
            <Clock className="w-4 h-4 text-neon-400" />
            <ConfigLabel>Metadata</ConfigLabel>
          </div>
          <div className="space-y-2 text-sm text-neon-300/70">
            <p>Created: {new Date(nodeData.metadata.createdAt).toLocaleString()}</p>
            <p>Modified: {new Date(nodeData.metadata.lastModified).toLocaleString()}</p>
            <p>Version: {nodeData.metadata.version}</p>
          </div>
        </div>
        )}
      </div>
    </div>
  );
}