import React, { useState } from 'react';
import { Shield, Plus, Pencil, Trash2, AlertCircle } from 'lucide-react';
import { useFirewall } from '../contexts/FirewallContext';
import FirewallRuleModal from '../components/FirewallRuleModal';
import { FirewallRule } from '../types/firewall';

const FirewallRules = () => {
  const { rules, addRule, updateRule, deleteRule } = useFirewall();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRule, setSelectedRule] = useState<FirewallRule | undefined>();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleAddRule = () => {
    setSelectedRule(undefined);
    setIsModalOpen(true);
  };

  const handleEditRule = (rule: FirewallRule) => {
    setSelectedRule(rule);
    setIsModalOpen(true);
  };

  const handleSaveRule = (rule: Omit<FirewallRule, 'id' | 'createdAt'>) => {
    if (selectedRule) {
      updateRule(selectedRule.id, rule);
    } else {
      addRule(rule);
    }
  };

  const handleDeleteClick = (id: string) => {
    setShowDeleteConfirm(id);
    setTimeout(() => setShowDeleteConfirm(null), 3000);
  };

  const handleConfirmDelete = (id: string) => {
    deleteRule(id);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Shield className="h-6 w-6 text-purple-600" />
            <h2 className="text-2xl font-semibold text-purple-900">Firewall Rules</h2>
          </div>
          <button
            onClick={handleAddRule}
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="h-5 w-5" />
            Add Rule
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-purple-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">Source</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">Destination</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">Protocol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">Port</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-purple-900 uppercase tracking-wider">Action</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-purple-900 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-purple-100">
              {rules.map((rule) => (
                <tr key={rule.id} className="hover:bg-purple-50">
                  <td className="px-6 py-4 whitespace-nowrap text-purple-900">{rule.priority}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-purple-900">{rule.name}</div>
                      {rule.description && (
                        <div className="text-xs text-purple-600 mt-1">{rule.description}</div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-purple-700">{rule.source}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-purple-700">{rule.destination}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-purple-700">{rule.protocol}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-purple-700">{rule.port}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      rule.action === 'ALLOW' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {rule.action}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => handleEditRule(rule)}
                        className="text-purple-600 hover:text-purple-900"
                        title="Edit rule"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      {showDeleteConfirm === rule.id ? (
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-red-600">Confirm?</span>
                          <button
                            onClick={() => handleConfirmDelete(rule.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <AlertCircle className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => handleDeleteClick(rule.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete rule"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <FirewallRuleModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedRule(undefined);
        }}
        onSave={handleSaveRule}
        initialRule={selectedRule}
      />
    </div>
  );
};

export default FirewallRules;