import { useCallback } from 'react';
import { useNodesState } from 'reactflow';
import { WorkflowNode } from '../types/workflow';

export function useStartNodeTracker() {
  const [nodes] = useNodesState([]);

  const hasStartNode = useCallback(() => {
    return nodes.some((node) => (node.data as WorkflowNode['data']).type === 'start');
  }, [nodes]);

  return {
    hasStartNode,
  };
}