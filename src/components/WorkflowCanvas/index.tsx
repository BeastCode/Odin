import React, { useCallback, useState, DragEvent } from 'react';
import ReactFlow, { 
  Background,
  Controls,
  Connection,
  Node,
  XYPosition,
  addEdge,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { AppBar } from '../AppBar';
import { WorkflowNode as CustomNode } from './WorkflowNode';
import { NodeProperties } from './NodeProperties';
import { NodePalette } from './NodePalette';
import { useWorkflowEngine } from '../../hooks/useWorkflowEngine';
import { WorkflowNode as WorkflowNodeType, NodeType } from '../../types/workflow';

const nodeTypes = {
  customNode: CustomNode,
};

const getNodePosition = (event: DragEvent): XYPosition => {
  const reactFlowBounds = document.querySelector('.react-flow__renderer')?.getBoundingClientRect();
  const position = reactFlowBounds
    ? {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }
    : { x: 0, y: 0 };
  return position;
};

export function WorkflowCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const { project } = useReactFlow();
  
  const { validateConnection, executeWorkflow, createNode } = useWorkflowEngine();

  const isValidConnection = useCallback((connection: Connection) => {
    // Check if the source handle already has a connection
    const sourceNode = nodes.find(node => node.id === connection.source);
    if (sourceNode) {
      const existingEdges = edges.filter(edge => 
        edge.source === connection.source && 
        edge.sourceHandle === connection.sourceHandle
      );
      if (existingEdges.length > 0) {
        return false;
      }
    }
    return validateConnection(connection);
  }, [nodes, edges, validateConnection]);

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow');
      if (!nodeType) return;

      const reactFlowBounds = document.querySelector('.react-flow__renderer')?.getBoundingClientRect();
      if (!reactFlowBounds) return;

      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = createNode(nodeType as NodeType, position);
      
      setNodes((nds) => [...nds, newNode]);
    },
    [createNode, setNodes, project]
  );

  const onConnect = useCallback(
    (params: Connection) => {
      if (validateConnection(params)) {
        setEdges((eds) => addEdge(params, eds));
      }
    },
    [validateConnection]
  );

  const onNodeClick = useCallback((_, node: Node) => {
    setSelectedNode(node);
  }, []);

  const handleDebug = useCallback(() => {
    console.log('Current Workflow State:', {
      nodes,
      edges,
    });
  }, [nodes, edges]);

  return (
    <div className="h-screen flex flex-col">
      <AppBar onDebug={handleDebug} />
      <div className="flex flex-1 overflow-hidden">
      <NodePalette />
      <div className="flex-1 h-full">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnectStart={undefined}
          onConnectEnd={undefined}
          onConnect={(params) => isValidConnection(params) && onConnect(params)}
          onNodeClick={onNodeClick}
          onDragOver={onDragOver}
          onDrop={onDrop}
          nodeTypes={nodeTypes}
          fitView
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      {selectedNode && (
        <NodeProperties
          node={selectedNode}
          onChange={(updatedNode) => {
            setNodes((nds) =>
              nds.map((n) => (n.id === updatedNode.id ? updatedNode : n))
            );
          }}
          onClose={() => setSelectedNode(null)}
        />
      )}
      </div>
    </div>
  );
}