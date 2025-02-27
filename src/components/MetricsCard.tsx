import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';

interface MetricsCardProps {
  title: string;
  value: string | number;
  change?: number;
  icon: React.ReactNode;
}

const MetricsCard: React.FC<MetricsCardProps> = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-md">
      <div className="flex items-center justify-between">
        <div className="text-purple-600">{title}</div>
        <div className="text-purple-700">{icon}</div>
      </div>
      <div className="mt-4">
        <div className="text-2xl font-semibold text-purple-900">{value}</div>
        {change !== undefined && (
          <div className={`flex items-center mt-2 ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {change >= 0 ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />}
            <span className="ml-1">{Math.abs(change)}%</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MetricsCard;