import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import GaugeCard from './components/GaugeCard';
import LineChart from './components/LineChart';
import ParachuteState from './components/ParachuteState';
import DataTable from './components/DataTable';
import Map from './components/Map';
import { generateDummyData, initializeHistoricalData } from './utils/generateData';
import { SensorData, HistoricalData } from './types';

function App() {
  const [packetCount, setPacketCount] = useState(0);
  const [currentData, setCurrentData] = useState<SensorData>(generateDummyData(0));
  const [historicalData, setHistoricalData] = useState<HistoricalData>(initializeHistoricalData());
  const [tableData, setTableData] = useState<SensorData[]>([]);

  useEffect(() => {
    // Update data every second
    const interval = setInterval(() => {
      const newPacketCount = packetCount + 1;
      setPacketCount(newPacketCount);
      
      // Generate new data
      const newData = generateDummyData(newPacketCount);
      setCurrentData(newData);
      
      // Update historical data
      setHistoricalData(prev => {
        const newHistoricalData = { ...prev };
        
        newHistoricalData.missionTime.push(newData.missionTime);
        newHistoricalData.altitude.push(newData.altitude);
        newHistoricalData.temperature.push(newData.temperature);
        newHistoricalData.pressure.push(newData.pressure);
        newHistoricalData.voltage.push(newData.voltage);
        newHistoricalData.airspeed.push(newData.airspeed);
        newHistoricalData.particleCount.push(newData.particleCount);
        
        // Keep only the last 100 data points
        if (newHistoricalData.missionTime.length > 100) {
          for (const key in newHistoricalData) {
            newHistoricalData[key as keyof HistoricalData] = (newHistoricalData[key as keyof HistoricalData] as any[]).slice(-100);
          }
        }
        
        return newHistoricalData;
      });
      
      // Update table data
      setTableData(prev => {
        const newTableData = [newData, ...prev];
        return newTableData.slice(0, 10); // Keep only the last 10 entries
      });
      
    }, 1000);
    
    return () => clearInterval(interval);
  }, [packetCount]);

  return (
    <div className="min-h-screen bg-slate-950 text-white p-4">
      <div className="container mx-auto">
        {/* Navbar */}
        <Navbar packetCount={currentData.dataPacketCount} />
        
        {/* Gauge Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
          <GaugeCard 
            title="Altitude" 
            value={currentData.altitude} 
            min={0} 
            max={1500} 
            unit="m" 
          />
          <GaugeCard 
            title="Temperature" 
            value={currentData.temperature} 
            min={-10} 
            max={50} 
            unit="°C" 
          />
          <GaugeCard 
            title="Pressure" 
            value={currentData.pressure} 
            min={900} 
            max={1100} 
            unit="Pa" 
          />
          <GaugeCard 
            title="Voltage" 
            value={currentData.voltage} 
            min={3} 
            max={5} 
            unit="V" 
          />
          <GaugeCard 
            title="Airspeed" 
            value={currentData.airspeed} 
            min={0} 
            max={20} 
            unit="m/s" 
          />
          <GaugeCard 
            title="Particle Count" 
            value={currentData.particleCount} 
            min={0} 
            max={100} 
            unit="mg/m³" 
          />
        </div>
        
        {/* Parachute State */}
        <div className="mb-6">
          <ParachuteState state={currentData.state} />
        </div>
        
        {/* Charts - First Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <LineChart 
            title="Altitude" 
            labels={historicalData.missionTime} 
            data={historicalData.altitude}
            borderColor="rgb(59, 130, 246)"
            backgroundColor="rgba(59, 130, 246, 0.1)"
            yAxisLabel="Altitude (m)"
            currentValue={currentData.altitude}
            unit="m"
          />
          <LineChart 
            title="Temperature" 
            labels={historicalData.missionTime} 
            data={historicalData.temperature}
            borderColor="rgb(239, 68, 68)"
            backgroundColor="rgba(239, 68, 68, 0.1)"
            yAxisLabel="Temperature (°C)"
            currentValue={currentData.temperature}
            unit="°C"
          />
          <LineChart 
            title="Pressure" 
            labels={historicalData.missionTime} 
            data={historicalData.pressure}
            borderColor="rgb(16, 185, 129)"
            backgroundColor="rgba(16, 185, 129, 0.1)"
            yAxisLabel="Pressure (Pa)"
            currentValue={currentData.pressure}
            unit="Pa"
          />
        </div>
        
        {/* Charts - Second Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <LineChart 
            title="Voltage" 
            labels={historicalData.missionTime} 
            data={historicalData.voltage}
            borderColor="rgb(245, 158, 11)"
            backgroundColor="rgba(245, 158, 11, 0.1)"
            yAxisLabel="Voltage (V)"
            currentValue={currentData.voltage}
            unit="V"
          />
          <LineChart 
            title="Airspeed" 
            labels={historicalData.missionTime} 
            data={historicalData.airspeed}
            borderColor="rgb(139, 92, 246)"
            backgroundColor="rgba(139, 92, 246, 0.1)"
            yAxisLabel="Airspeed (m/s)"
            currentValue={currentData.airspeed}
            unit="m/s"
          />
          <LineChart 
            title="Particle Count" 
            labels={historicalData.missionTime} 
            data={historicalData.particleCount}
            borderColor="rgb(236, 72, 153)"
            backgroundColor="rgba(236, 72, 153, 0.1)"
            yAxisLabel="Particle Count (mg/m³)"
            currentValue={currentData.particleCount}
            unit="mg/m³"
          />
        </div>
        
        {/* Map */}
        <div className="mb-6">
          <Map />
        </div>
        
        {/* Data Table */}
        <div className="mb-6">
          <DataTable data={tableData} />
        </div>
      </div>
    </div>
  );
}

export default App;