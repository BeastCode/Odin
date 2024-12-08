import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal } from '../Modal';

interface CreateWorkflowModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateWorkflowModal({ isOpen, onClose }: CreateWorkflowModalProps) {
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      // Here you would typically create the workflow in your backend
      // For now, we'll just navigate to the workflow page
      navigate('/workflow');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Workflow">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="workflow-name" className="block text-sm font-medium text-neon-300">
            Workflow Name
          </label>
          <input
            type="text"
            id="workflow-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border border-midnight-700 bg-midnight-900 px-3 py-2 text-white placeholder-midnight-400 focus:border-neon-500 focus:outline-none focus:ring-1 focus:ring-neon-500"
            placeholder="Enter workflow name"
            autoFocus
          />
        </div>
        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-neon-300 hover:text-neon-400"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={!name.trim()}
            className="rounded-md bg-neon-500 px-4 py-2 text-sm font-medium text-white hover:bg-neon-600 focus:outline-none focus:ring-2 focus:ring-neon-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </form>
    </Modal>
  );
}