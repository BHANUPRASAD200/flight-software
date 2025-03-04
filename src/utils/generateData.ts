import { SensorData } from '../types';
import { format } from 'date-fns';

// Set the maximum altitude for simulation
const MAX_ALTITUDE = 1200;

// Generate dummy data with proper state transitions and altitude decrease
export function generateDummyData(packetCount: number): SensorData {
  // Decrease altitude gradually based on the packet count
  const altitude = Math.max(MAX_ALTITUDE - packetCount * 0.5, 0); // Altitude decreases, but not below 0
  
  // Simulate state transitions based on altitude
  let currentState = "Ascent";
  if (altitude === 0) {
    currentState = "CanDown"; // Instead of showing "Landing", stay in "CanDown"
  } else if (altitude < 300) {
    currentState = "Parachute Deployment";
  } else if (altitude < 10) {
    currentState = "CanDown";
  }

  // Generate other sensor data
  return {
    altitude,
    temperature: Number((20 + 5 * (Math.random() * 2 - 1)).toFixed(2)), // Simulated temperature variation
    pressure: Number((1013 - altitude * 0.05).toFixed(2)), // Pressure decreases with altitude
    voltage: Number((5 - packetCount * 0.01).toFixed(2)), // Voltage decreases over time
    airspeed: Number((10 + 2 * Math.random()).toFixed(2)), // Simulated constant airspeed with variation
    particleCount: packetCount % 100, // Cycles every 100 packets
    dataPacketCount: packetCount, // Assign the current packet count
    missionTime: format(new Date(), 'HH:mm:ss'), // Current time
    state: currentState // State based on altitude
  };
}

// Initialize historical data
export function initializeHistoricalData() {
  const now = new Date();
  return {
    missionTime: Array(10).fill(0).map((_, i) => format(new Date(now.getTime() - (9 - i) * 1000), 'HH:mm:ss')),
    altitude: Array(10).fill(0).map(() => Math.floor(Math.random() * 600)),
    temperature: Array(10).fill(0).map(() => Number((Math.random() * 45 - 10).toFixed(2))),
    pressure: Array(10).fill(0).map(() => Number((Math.random() * 200 + 900).toFixed(2))),
    voltage: Array(10).fill(0).map(() => Number((Math.random() * 2 + 3).toFixed(2))),
    airspeed: Array(10).fill(0).map(() => Number((Math.random() * 20).toFixed(2))),
    particleCount: Array(10).fill(0).map(() => Math.floor(Math.random() * 100))
  };
}