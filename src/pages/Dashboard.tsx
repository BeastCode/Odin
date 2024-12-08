import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Workflow, 
  GitBranch, 
  Settings, 
  Plus,
  Activity,
  Clock,
  CheckCircle2,
  XCircle,
} from 'lucide-react';
import { WorkflowMenu } from '../components/WorkflowMenu';
import { CreateWorkflowModal } from '../components/CreateWorkflowModal';

interface WorkflowItem {
  id: number;
  name: string;
  status: 'active' | 'idle';
  lastRun: string;
  success: number;
  failed: number;
}

export function Dashboard() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [workflows, setWorkflows] = useState<WorkflowItem[]>([
  { id: 1, name: 'Content Generation', status: 'active', lastRun: '2 hours ago', success: 156, failed: 3 },
  { id: 2, name: 'Data Processing', status: 'idle', lastRun: '1 day ago', success: 1205, failed: 12 },
  { id: 3, name: 'Image Analysis', status: 'active', lastRun: '5 minutes ago', success: 89, failed: 1 },
  ]);

  const handleToggleActive = (id: number, active: boolean) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === id ? { ...workflow, status: active ? 'active' : 'idle' } : workflow
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight-950 to-midnight-900">
      {/* Main Content */}
      <div>
        <div className="p-8">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <Workflow className="w-8 h-8 text-neon-400" />
              <div>
                <h1 className="text-xl font-semibold text-white">Odin</h1>
                <p className="text-sm text-neon-400">AI Orchestration</p>
              </div>
            </div>
            <h2 className="text-2xl font-semibold text-white">Dashboard</h2>            
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-midnight-800/50 backdrop-blur-sm rounded-lg p-6 border border-midnight-700">
              <div className="flex items-center gap-4">
                <Activity className="w-8 h-8 text-neon-400" />
                <div>
                  <p className="text-neon-300">Active Workflows</p>
                  <p className="text-2xl font-semibold text-white">2</p>
                </div>
              </div>
            </div>
            <div className="bg-midnight-800/50 backdrop-blur-sm rounded-lg p-6 border border-midnight-700">
              <div className="flex items-center gap-4">
                <Clock className="w-8 h-8 text-neon-400" />
                <div>
                  <p className="text-neon-300">Total Runtime</p>
                  <p className="text-2xl font-semibold text-white">24.5h</p>
                </div>
              </div>
            </div>
            <div className="bg-midnight-800/50 backdrop-blur-sm rounded-lg p-6 border border-midnight-700">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="w-8 h-8 text-neon-400" />
                <div>
                  <p className="text-neon-300">Success Rate</p>
                  <p className="text-2xl font-semibold text-white">98.2%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Workflows Table */}
          <div className="bg-midnight-800/30 backdrop-blur-sm rounded-lg border border-midnight-700">
            <div className="px-6 py-4 border-b border-midnight-700">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-white">Workflows</h3>
                <Link
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCreateModalOpen(true);
                  }}
                  to="#"
                  className="inline-flex items-center px-3 py-1.5 bg-neon-500/10 text-neon-400 rounded-lg hover:bg-neon-500/20 transition-colors border border-neon-500/20"
                >
                  <Plus className="w-4 h-4" />
                </Link>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-midnight-700 text-left">
                    <th className="px-6 py-3 text-left text-xs font-medium text-neon-300 uppercase tracking-wider">Name</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neon-300 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neon-300 uppercase tracking-wider">Last Run</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neon-300 uppercase tracking-wider">Success</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-neon-300 uppercase tracking-wider">Failed</th>
                    <th className="px-6 py-3 w-px"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-midnight-700">
                  {workflows.map((workflow) => (
                    <tr key={workflow.id} className="group hover:bg-midnight-800/30">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <GitBranch className="w-5 h-5 text-neon-400 mr-3" />
                          <div className="text-sm font-medium text-white">{workflow.name}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          workflow.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {workflow.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-neon-300">
                        {workflow.lastRun}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-green-400">
                          <CheckCircle2 className="w-4 h-4 mr-1" />
                          {workflow.success}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center text-sm text-red-400">
                          <XCircle className="w-4 h-4 mr-1" />
                          {workflow.failed}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <WorkflowMenu
                          workflowId={workflow.id}
                          isActive={workflow.status === 'active'}
                          onToggleActive={handleToggleActive}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      <CreateWorkflowModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}