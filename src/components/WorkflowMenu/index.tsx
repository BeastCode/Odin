import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MoreVertical, ExternalLink, Power } from 'lucide-react';

interface WorkflowMenuProps {
  workflowId: number;
  isActive: boolean;
  onToggleActive: (id: number, active: boolean) => void;
}

export function WorkflowMenu({ workflowId, isActive, onToggleActive }: WorkflowMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpen = () => {
    navigate('/workflow');
    setIsOpen(false);
  };

  const handleToggleActive = () => {
    onToggleActive(workflowId, !isActive);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-1 hover:bg-midnight-800 rounded-full text-neon-300"
      >
        <MoreVertical className="w-5 h-5" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-md shadow-lg bg-midnight-800 border border-midnight-700 z-50">
          <div className="py-1">
            <button
              onClick={handleOpen}
              className="flex items-center w-full px-4 py-2 text-sm text-neon-300 hover:bg-midnight-700"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Open
            </button>
            <button
              onClick={handleToggleActive}
              className="flex items-center w-full px-4 py-2 text-sm text-neon-300 hover:bg-midnight-700"
            >
              <Power className={`w-4 h-4 mr-2 ${isActive ? 'text-green-400' : 'text-gray-400'}`} />
              {isActive ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}