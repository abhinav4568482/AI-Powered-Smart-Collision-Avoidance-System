import React, { useState } from 'react';
import { AlertTriangle, Activity, Truck, Battery, Cpu, MemoryStick as Memory, Wifi, RefreshCw } from 'lucide-react';
import { format } from 'date-fns';
import type { AlertEvent, SystemStatus } from './types';

// Mock data - In production, this would come from your API
const mockAlerts: AlertEvent[] = [
  {
    id: '1',
    timestamp: new Date(),
    severity: 'critical',
    message: 'Imminent collision detected',
    objectType: 'Vehicle',
    distance: 2.5,
    location: 'Zone A',
    speed: 15
  },
  {
    id: '2',
    timestamp: new Date(Date.now() - 300000),
    severity: 'warning',
    message: 'Object in blind spot',
    objectType: 'Person',
    distance: 4.8,
    location: 'Zone B',
    speed: 12
  },
  {
    id: '3',
    timestamp: new Date(Date.now() - 600000),
    severity: 'info',
    message: 'Path clear',
    objectType: 'None',
    distance: 10,
    location: 'Zone C',
    speed: 8
  }
];

const mockStatus: SystemStatus = {
  isOnline: true,
  lastUpdate: new Date(),
  activeVehicles: 3,
  detectionRate: 95.5,
  cpuUsage: 45,
  memoryUsage: 60,
  batteryLevel: 85
};

function App() {
  const [alerts] = useState<AlertEvent[]>(mockAlerts);
  const [status] = useState<SystemStatus>(mockStatus);

  const getSeverityColor = (severity: AlertEvent['severity']) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'info':
        return 'bg-blue-100 text-blue-800 border-blue-200';
    }
  };

  const StatusCard = ({ 
    icon: Icon, 
    label, 
    value, 
    unit = '', 
    color = 'text-gray-700' 
  }: { 
    icon: React.ElementType; 
    label: string; 
    value: number | string; 
    unit?: string;
    color?: string;
  }) => (
    <div className="bg-white rounded-xl p-4 shadow-md">
      <div className="flex items-center gap-3 mb-2">
        <Icon className="w-5 h-5 text-indigo-600" />
        <h3 className="text-sm font-medium text-gray-500">{label}</h3>
      </div>
      <p className={`text-2xl font-bold ${color}`}>
        {value}{unit}
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertTriangle className="h-8 w-8 text-indigo-600" />
              <h1 className="ml-3 text-2xl font-bold text-gray-900">
                Collision Avoidance System
              </h1>
            </div>
            <button
              className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* System Status Grid */}
        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">System Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatusCard
              icon={Wifi}
              label="System Status"
              value={status.isOnline ? 'Online' : 'Offline'}
              color={status.isOnline ? 'text-green-600' : 'text-red-600'}
            />
            <StatusCard
              icon={Truck}
              label="Active Vehicles"
              value={status.activeVehicles}
            />
            <StatusCard
              icon={Activity}
              label="Detection Rate"
              value={status.detectionRate}
              unit="%"
            />
            <StatusCard
              icon={Battery}
              label="Battery Level"
              value={status.batteryLevel}
              unit="%"
            />
            <StatusCard
              icon={Cpu}
              label="CPU Usage"
              value={status.cpuUsage}
              unit="%"
            />
            <StatusCard
              icon={Memory}
              label="Memory Usage"
              value={status.memoryUsage}
              unit="%"
            />
          </div>
        </div>

        {/* Alert Log */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Alert Log</h2>
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="flow-root">
              <ul role="list" className="divide-y divide-gray-200">
                {alerts.map((alert) => (
                  <li key={alert.id} className="p-4 hover:bg-gray-50">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <span className={`inline-flex items-center justify-center h-8 w-8 rounded-full ${getSeverityColor(alert.severity)}`}>
                          <AlertTriangle className="h-5 w-5" />
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {alert.message}
                        </p>
                        <div className="flex items-center gap-4 mt-1">
                          <p className="text-sm text-gray-500">
                            {format(alert.timestamp, 'MMM d, yyyy HH:mm:ss')}
                          </p>
                          <p className="text-sm text-gray-500">
                            Object: {alert.objectType}
                          </p>
                          <p className="text-sm text-gray-500">
                            Distance: {alert.distance}m
                          </p>
                          <p className="text-sm text-gray-500">
                            Speed: {alert.speed} km/h
                          </p>
                          <p className="text-sm text-gray-500">
                            Location: {alert.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;