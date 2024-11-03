import React from 'react';
import { CHART_COLORS } from '../visualizations/charts';

export const TrendIndicator = ({ current, previous, label }) => {
  const percentChange = ((current - previous) / previous) * 100;
  const isPositive = percentChange > 0;

  return (
    <div className="flex items-center space-x-2">
      <span className={`text-sm ${isPositive ? 'text-green-500' : 'text-red-500'}`}>
        {isPositive ? '↑' : '↓'} {Math.abs(percentChange).toFixed(1)}%
      </span>
      <span className="text-gray-500 text-sm">vs last {label}</span>
    </div>
  );
};

export const ProgressRing = ({ 
  progress, 
  size = 120, 
  strokeWidth = 8, 
  color = CHART_COLORS.primary[0] 
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          className="text-gray-200"
          strokeWidth={strokeWidth}
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          className="transition-all duration-1000 ease-out"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          stroke={color}
          fill="transparent"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
      </svg>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{progress}%</span>
        <span className="text-sm text-gray-500">Complete</span>
      </div>
    </div>
  );
};

export const TierProgress = ({ current, target }) => (
  <div className="mt-4">
    <div className="flex justify-between text-sm mb-1">
      <span>Progress to Next Tier</span>
      <span>{current.toLocaleString()}/{target.toLocaleString()} points</span>
    </div>
    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-500"
        style={{ width: `${(current/target) * 100}%` }}
      />
    </div>
  </div>
);