import React from 'react';

interface GaugeCardProps {
  title: string;
  value: number;
  min: number;
  max: number;
  unit: string;
}

const GaugeCard: React.FC<GaugeCardProps> = ({ title, value, min, max, unit }) => {
  // Calculate percentage for gauge
  const percentage = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  
  // Determine color based on percentage
  let color = 'bg-emerald-500';
  let textColor = 'text-emerald-400';
  let strokeColor = 'stroke-emerald-400';
  let glowColor = 'shadow-emerald-500/50';
  
  if (percentage > 80) {
    color = 'bg-rose-500';
    textColor = 'text-rose-400';
    strokeColor = 'stroke-rose-400';
    glowColor = 'shadow-rose-500/50';
  } else if (percentage > 60) {
    color = 'bg-amber-500';
    textColor = 'text-amber-400';
    strokeColor = 'stroke-amber-400';
    glowColor = 'shadow-amber-500/50';
  }
  
  // Calculate the stroke dash array for circular gauge
  const circumference = 2 * Math.PI * 40; // 40 is the radius
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  return (
    <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-xl shadow-xl p-4 text-white border border-slate-700 relative overflow-hidden">
      {/* Background glow effect */}
      <div className={`absolute -bottom-2 -right-2 w-16 h-16 rounded-full blur-xl opacity-20 ${color}`}></div>
      
      <h3 className="text-sm font-semibold mb-2 text-center tracking-wider uppercase text-slate-300">{title}</h3>
      
      {/* Circular Gauge */}
      <div className="flex justify-center mb-3">
        <div className="relative w-28 h-28">
          {/* Background circle */}
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="#1e293b" 
              strokeWidth="10"
            />
            {/* Track circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              stroke="#334155" 
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset="0"
              strokeLinecap="round"
            />
            {/* Progress circle */}
            <circle 
              cx="50" 
              cy="50" 
              r="40" 
              fill="none" 
              className={`${strokeColor} transition-all duration-500 ease-out`}
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
            />
          </svg>
          
          {/* Value display */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${textColor} transition-colors duration-300`}>{value.toFixed(1)}</span>
            <span className="text-xs text-slate-400">{unit}</span>
          </div>
        </div>
      </div>
      
      {/* Min/Max labels */}
      <div className="flex justify-between items-center text-xs text-slate-400 mb-1 px-1">
        <span>{min}</span>
        <span>{max}</span>
      </div>
      
      {/* Linear gauge */}
      <div className="w-full bg-slate-700/50 rounded-full h-1.5 mb-3">
        <div 
          className={`h-1.5 rounded-full ${color} transition-all duration-500 ease-out shadow-sm ${glowColor}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      
      {/* Status indicator */}
      <div className="flex items-center justify-center">
        <div className={`w-2 h-2 rounded-full ${color} mr-1.5 animate-pulse shadow-sm ${glowColor}`}></div>
        <span className={`text-xs font-medium ${textColor} transition-colors duration-300`}>
          {percentage < 30 ? 'Low' : percentage > 70 ? 'High' : 'Normal'}
        </span>
      </div>
    </div>
  );
};

export default GaugeCard;