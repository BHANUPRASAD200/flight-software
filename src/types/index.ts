export interface SensorData {
  altitude: number;
  temperature: number;
  pressure: number;
  voltage: number;
  airspeed: number;
  particleCount: number;
  dataPacketCount: number;
  missionTime: string;
  state: string;
}

export interface HistoricalData {
  missionTime: string[];
  altitude: number[];
  temperature: number[];
  pressure: number[];
  voltage: number[];
  airspeed: number[];
  particleCount: number[];
}