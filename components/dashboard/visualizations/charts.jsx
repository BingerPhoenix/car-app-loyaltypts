import React from 'react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart
} from 'recharts';

// Color constants for consistent styling
export const CHART_COLORS = {
  primary: ['#ff4e64', '#ff6b80', '#ff899c', '#ffa7b8'],
  secondary: ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'],
  success: '#22c55e',
  warning: '#f59e0b',
  background: {
    light: '#f8fafc',
    dark: '#f1f5f9'
  }
};

export const PointsHistoryChart = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '8px'
            }}
          />
          <Area
            type="monotone"
            dataKey="earned"
            stroke={CHART_COLORS.primary[0]}
            fill={CHART_COLORS.primary[0]}
            fillOpacity={0.1}
            name="Points Earned"
          />
          <Area
            type="monotone"
            dataKey="spent"
            stroke={CHART_COLORS.secondary[0]}
            fill={CHART_COLORS.secondary[0]}
            fillOpacity={0.1}
            name="Points Spent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ActivityPieChart = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={CHART_COLORS.primary[index % CHART_COLORS.primary.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '8px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export const ServiceHistoryChart = ({ data }) => {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
          <YAxis stroke="#64748b" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#ffffff',
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '8px'
            }}
          />
          <Bar
            dataKey="services"
            fill={CHART_COLORS.primary[0]}
            radius={[4, 4, 0, 0]}
          />
          <Bar
            dataKey="points"
            fill={CHART_COLORS.secondary[0]}
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};