import React from 'react';
import { ReactFlowProvider } from 'reactflow';
import { WorkflowCanvas } from '../components/WorkflowCanvas';

export function Workflow() {
  return (
    <ReactFlowProvider>
      <div className="min-h-screen bg-gradient-to-br from-midnight-950 to-midnight-900">
        <WorkflowCanvas />
      </div>
    </ReactFlowProvider>
  );
}