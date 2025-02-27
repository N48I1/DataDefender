import React from 'react';
import { Activity, Users, Wifi, Database } from 'lucide-react';
import MetricsCard from '../components/MetricsCard';

const Dashboard = () => {
  const metrics = [
    {
      title: 'Bandwidth Utilization',
      value: '85%',
      change: 12,
      icon: <Activity className="h-6 w-6" />,
    },
    {
      title: 'Active Connections',
      value: '1,284',
      change: -3,
      icon: <Users className="h-6 w-6" />,
    },
    {
      title: 'Network Latency',
      value: '24ms',
      change: -8,
      icon: <Wifi className="h-6 w-6" />,
    },
    {
      title: 'Packet Loss Rate',
      value: '0.02%',
      change: 5,
      icon: <Database className="h-6 w-6" />,
    },
  ];

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <MetricsCard
            key={index}
            title={metric.title}
            value={metric.value}
            change={metric.change}
            icon={metric.icon}
          />
        ))}
      </div>

      <div className="mt-8 bg-white rounded-lg p-6 shadow-md h-96">
        <h2 className="text-xl font-semibold mb-4 text-purple-900">Network Topology</h2>
        <div className="h-full flex items-center justify-center text-gray-500">
          Network Topology Visualization will be implemented here
        </div>
      </div>

      <div className="mt-8 bg-white rounded-lg p-6 shadow-md">
        <h2 className="text-xl font-semibold mb-4 text-purple-900">Recent Alerts</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="border-l-4 border-purple-500 bg-purple-50 p-4 rounded">
              <div className="flex items-center justify-between">
                <div className="font-medium text-purple-900">High CPU Usage Warning</div>
                <div className="text-sm text-purple-600">2 minutes ago</div>
              </div>
              <div className="text-sm text-purple-700 mt-1">
                Node SW-Core-01 experiencing CPU utilization above 80%
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;