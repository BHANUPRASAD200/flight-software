import React from 'react';
import { SensorData } from '../types';
import { Download } from 'lucide-react';

interface DataTableProps {
  data: SensorData[];
}

const DataTable: React.FC<DataTableProps> = ({ data }) => {
  // Function to download data as CSV
  const downloadCSV = () => {
    if (data.length === 0) return;
    
    // Create headers
    const headers = [
      'Altitude (m)',
      'Temperature (°C)',
      'Pressure (Pa)',
      'Voltage (V)',
      'Airspeed (m/s)',
      'Particle Count (mg/m³)',
      'Packet Count',
      'Mission Time',
      'State'
    ];
    
    // Create CSV content
    const csvContent = [
      headers.join(','),
      ...data.map(row => [
        row.altitude.toFixed(2),
        row.temperature.toFixed(2),
        row.pressure.toFixed(2),
        row.voltage.toFixed(2),
        row.airspeed.toFixed(2),
        row.particleCount,
        row.dataPacketCount,
        row.missionTime,
        row.state
      ].join(','))
    ].join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `cansat_data_${new Date().toISOString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-xl p-4 text-white overflow-x-auto border border-slate-700">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-semibold text-slate-200">Mission Data Log</h3>
        <button 
          onClick={downloadCSV}
          className="flex items-center bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-lg shadow-blue-600/20"
        >
          <Download size={16} className="mr-2" />
          Export CSV
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-700/50">
          <thead>
            <tr className="bg-slate-800/70">
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Altitude (m)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Temperature (°C)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Pressure (Pa)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Voltage (V)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Airspeed (m/s)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Particle Count (mg/m³)</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Packet Count</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">Mission Time</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-300 uppercase tracking-wider">State</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/30">
            {data.map((row, index) => {
              // Determine row color based on state
              let rowClass = index % 2 === 0 ? 'bg-slate-800/20' : 'bg-slate-800/10';
              
              // Highlight rows based on state
              if (row.state === 'Parachute Deployment') {
                rowClass += ' bg-green-900/10';
              } else if (row.state === 'CanDown') {
                rowClass += ' bg-rose-900/10';
              }
              
              return (
                <tr key={index} className={rowClass}>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">{row.altitude.toFixed(2)}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">{row.temperature.toFixed(2)}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">{row.pressure.toFixed(2)}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">{row.voltage.toFixed(2)}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">{row.airspeed.toFixed(2)}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">{row.particleCount}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">{row.dataPacketCount}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm text-slate-300">{row.missionTime}</td>
                  <td className="px-6 py-3 whitespace-nowrap text-sm">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      row.state === 'Ascent' ? 'bg-blue-900/30 text-blue-400' : 
                      row.state === 'Parachute Deployment' ? 'bg-green-900/30 text-green-400' : 
                      'bg-rose-900/30 text-rose-400'
                    }`}>
                      {row.state}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;