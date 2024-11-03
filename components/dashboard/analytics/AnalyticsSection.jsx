import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../../ui/card";
import { PointsHistoryChart, ActivityPieChart } from '../visualizations/charts';

const TimeframeSelector = ({ timeframe, setTimeframe }) => (
  <div className="flex gap-4 mb-6">
    {['monthly', 'quarterly', 'yearly'].map((period) => (
      <button
        key={period}
        onClick={() => setTimeframe(period)}
        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
          timeframe === period
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
        }`}
      >
        {period.charAt(0).toUpperCase() + period.slice(1)}
      </button>
    ))}
  </div>
);

const MetricsSummary = ({ metrics }) => (
  <div className="grid grid-cols-2 gap-4 mb-6">
    {Object.entries(metrics).map(([key, value]) => (
      <div key={key} className="p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-500">
          {key.split(/(?=[A-Z])/).join(' ')}
        </div>
        <div className="text-2xl font-bold">
          {typeof value === 'number' ? value.toLocaleString() : value}
        </div>
      </div>
    ))}
  </div>
);

const AnalyticsSection = ({ pointsData, categoryData, metrics }) => {
  const [timeframe, setTimeframe] = useState('monthly');

  return (
    <div className="space-y-6">
      <TimeframeSelector 
        timeframe={timeframe} 
        setTimeframe={setTimeframe}
      />

      <Card>
        <CardHeader>
          <CardTitle>Points History</CardTitle>
        </CardHeader>
        <CardContent>
          <PointsHistoryChart data={pointsData[timeframe]} />
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Points by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ActivityPieChart data={categoryData} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <MetricsSummary metrics={metrics} />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsSection;