import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { FirewallRule, Protocol, Action } from '../types/firewall';

interface FirewallRuleModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (rule: Omit<FirewallRule, 'id' | 'createdAt'>) => void;
  initialRule?: FirewallRule;
}

const protocols: Protocol[] = ['TCP', 'UDP', 'ICMP', 'ANY'];
const actions: Action[] = ['ALLOW', 'DENY'];

const FirewallRuleModal: React.FC<FirewallRuleModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialRule,
}) => {
  const [rule, setRule] = useState<Omit<FirewallRule, 'id' | 'createdAt'>>({
    name: '',
    source: '',
    destination: '',
    protocol: 'TCP',
    port: '',
    action: 'ALLOW',
    priority: 100,
    description: '',
  });

  useEffect(() => {
    if (initialRule) {
      setRule(initialRule);
    }
  }, [initialRule]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(rule);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-purple-900">
            {initialRule ? 'Edit Rule' : 'Add New Rule'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Rule Name
              </label>
              <input
                type="text"
                value={rule.name}
                onChange={(e) => setRule({ ...rule, name: e.target.value })}
                className="w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Priority
              </label>
              <input
                type="number"
                value={rule.priority}
                onChange={(e) => setRule({ ...rule, priority: parseInt(e.target.value) })}
                className="w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                min="1"
                max="1000"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Source IP/Range
              </label>
              <input
                type="text"
                value={rule.source}
                onChange={(e) => setRule({ ...rule, source: e.target.value })}
                className="w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                placeholder="e.g., 192.168.1.0/24"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Destination IP/Range
              </label>
              <input
                type="text"
                value={rule.destination}
                onChange={(e) => setRule({ ...rule, destination: e.target.value })}
                className="w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                placeholder="e.g., 10.0.0.0/8"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Protocol
              </label>
              <select
                value={rule.protocol}
                onChange={(e) => setRule({ ...rule, protocol: e.target.value as Protocol })}
                className="w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
              >
                {protocols.map(protocol => (
                  <option key={protocol} value={protocol}>{protocol}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Port
              </label>
              <input
                type="text"
                value={rule.port}
                onChange={(e) => setRule({ ...rule, port: e.target.value })}
                className="w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
                placeholder="e.g., 80, 443, or ANY"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-purple-700 mb-1">
                Action
              </label>
              <select
                value={rule.action}
                onChange={(e) => setRule({ ...rule, action: e.target.value as Action })}
                className="w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
              >
                {actions.map(action => (
                  <option key={action} value={action}>{action}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-purple-700 mb-1">
              Description
            </label>
            <textarea
              value={rule.description}
              onChange={(e) => setRule({ ...rule, description: e.target.value })}
              className="w-full rounded-md border-purple-300 shadow-sm focus:border-purple-500 focus:ring focus:ring-purple-200"
              rows={3}
              placeholder="Add a description for this rule..."
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 rounded-lg"
            >
              {initialRule ? 'Update Rule' : 'Add Rule'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FirewallRuleModal;