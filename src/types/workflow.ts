export type NodeType = 'task' | 'validation' | 'ai' | 'decision' | 'start' | 'end';

export interface Port {
  id: string;
  type: 'input' | 'output';
  name: string;
  nodeId: string;
  connections: string[];
}

export interface WorkflowNode {
  id: string;
  type: 'customNode';
  position: { x: number; y: number };
  data: {
    type: NodeType;
    label: string;
    inputs: Port[];
    outputs: Port[];
    config: Record<string, any>;
    status?: 'idle' | 'running' | 'completed' | 'error';
    executionTime?: number;
    error?: string;
    metadata?: {
      createdAt: string;
      lastModified: string;
      version: string;
      description?: string;
      tags?: string[];
    };
  };
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  sourceHandle: string;
  targetHandle: string;
}

export interface Workflow {
  nodes: WorkflowNode[];
  connections: Connection[];
}