import React from 'react';
import { BarChart3 } from 'lucide-react';

const Analytics = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-2xl font-semibold mb-6 text-purple-900">Network Analytics</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-purple-900 mb-4">Traffic Overview</h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-purple-200 rounded">
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
          </div>

          <div className="bg-purple-50 p-6 rounded-lg">
            <h3 className="text-lg font-medium text-purple-900 mb-4">Bandwidth Usage</h3>
            <div className="h-64 flex items-center justify-center border-2 border-dashed border-purple-200 rounded">
              <BarChart3 className="h-8 w-8 text-purple-400" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;