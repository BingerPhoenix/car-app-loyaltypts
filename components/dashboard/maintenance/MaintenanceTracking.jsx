import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tool,
  Calendar,
  AlertTriangle,
  Check,
  Clock,
  ArrowRight
} from 'lucide-react';

const MaintenanceItem = ({ item }) => {
  const statusColors = {
    upcoming: 'bg-blue-50 text-blue-700',
    overdue: 'bg-red-50 text-red-700',
    completed: 'bg-green-50 text-green-700',
    inProgress: 'bg-yellow-50 text-yellow-700'
  };

  return (
    <div className="flex items-center gap-4 p-4 rounded-lg bg-gray-50">
      <div className="flex-shrink-0">
        <Tool className="h-5 w-5 text-gray-500" />
      </div>

      <div className="flex-grow">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{item.service}</h4>
          <Badge variant={item.status === 'overdue' ? 'destructive' : 'secondary'}>
            {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
          </Badge>
        </div>

        <div className="mt-1 text-sm text-gray-500 flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            {item.dueDate}
          </span>
          {item.mileage && (
            <span>{item.mileage.toLocaleString()} miles</span>
          )}
        </div>
      </div>

      <div className={`px-3 py-1 rounded-full text-sm ${statusColors[item.status]}`}>
        {item.status === 'upcoming' && (
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            Due in {item.daysUntilDue} days
          </span>
        )}
        {item.status === 'overdue' && (
          <span className="flex items-center gap-1">
            <AlertTriangle className="h-4 w-4" />
            {item.daysOverdue} days overdue
          </span>
        )}
        {item.status === 'completed' && (
          <span className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            Completed
          </span>
        )}
      </div>
    </div>
  );
};

const MaintenanceSchedule = ({ schedule, onScheduleService }) => (
  <Card>
    <CardHeader>
      <CardTitle>Maintenance Schedule</CardTitle>
    </CardHeader>
    <CardContent>
      <div className="space-y-4">
        {schedule.map((item, index) => (
          <div key={index}>
            <MaintenanceItem item={item} />
            {item.status !== 'completed' && (
              <button
                onClick={() => onScheduleService(item)}
                className="mt-2 text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
              >
                Schedule Service
                <ArrowRight className="h-4 w-4" />
              </button>
            )}
          </div>
        ))}
      </div>
    </CardContent>
  </Card>
);

const MaintenanceTracking = ({
  maintenanceSchedule,
  vehicleStats,
  onScheduleService
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {vehicleStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="text-2xl font-bold mt-1">{stat.value}</div>
              {stat.trend && (
                <div className={`text-sm mt-1 ${
                  stat.trend > 0 ? 'text-green-500' : 'text-red-500'
                }`}>
                  {stat.trend > 0 ? '↑' : '↓'} {Math.abs(stat.trend)}%
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      <MaintenanceSchedule
        schedule={maintenanceSchedule}
        onScheduleService={onScheduleService}
      />
    </div>
  );
};

export default MaintenanceTracking;