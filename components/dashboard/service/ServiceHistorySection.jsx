import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tool,
  MapPin,
  Calendar,
  Clock,
  Star,
  AlertTriangle,
  Settings,
  Circle
} from 'lucide-react';
import { ServiceHistoryChart } from '../visualizations/charts';

const ServiceStatusBadge = ({ status }) => {
  const variants = {
    completed: { variant: 'success', label: 'Completed' },
    scheduled: { variant: 'secondary', label: 'Scheduled' },
    overdue: { variant: 'destructive', label: 'Overdue' },
    upcoming: { variant: 'outline', label: 'Upcoming' }
  };

  const { variant, label } = variants[status] || variants.completed;
  return <Badge variant={variant}>{label}</Badge>;
};

const ServiceCard = ({ service }) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardContent className="p-6">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="font-medium flex items-center gap-2">
            <Tool className="h-4 w-4 text-blue-500" />
            {service.type}
          </h4>
          <p className="text-sm text-gray-500 mt-1 flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {service.date}
            {service.vehicle && ` • ${service.vehicle}`}
          </p>
        </div>
        <ServiceStatusBadge status={service.status} />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
        <div className="flex items-center gap-2">
          <Settings className="h-4 w-4 text-blue-500" />
          <span>{service.provider}</span>
        </div>
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-red-500" />
          <span>{service.location}</span>
        </div>
        {service.rating && (
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-500" />
            <span>{service.rating}/5</span>
          </div>
        )}
      </div>

      {service.notes && (
        <p className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
          {service.notes}
        </p>
      )}

      {service.cost && (
        <div className="mt-4 flex justify-between items-center pt-4 border-t">
          <span className="text-sm text-gray-500">Service Cost</span>
          <span className="font-medium">${service.cost.toLocaleString()}</span>
        </div>
      )}
    </CardContent>
  </Card>
);

const MaintenanceAlert = ({ alert }) => {
  const icons = {
    warning: AlertTriangle,
    info: Circle,
    success: Star
  };

  const Icon = icons[alert.type] || icons.info;

  return (
    <div className={`p-4 rounded-lg flex items-start gap-3 
      ${alert.type === 'warning' ? 'bg-red-50' : 
        alert.type === 'success' ? 'bg-green-50' : 'bg-blue-50'}`}>
      <Icon className={`h-5 w-5 mt-0.5
        ${alert.type === 'warning' ? 'text-red-500' : 
          alert.type === 'success' ? 'text-green-500' : 'text-blue-500'}`} />
      <div>
        <h5 className="font-medium">{alert.title}</h5>
        <p className="text-sm text-gray-600 mt-1">{alert.message}</p>
        {alert.action && (
          <button className="text-sm font-medium text-blue-500 hover:text-blue-600 mt-2">
            {alert.action}
          </button>
        )}
      </div>
    </div>
  );
};

const ServiceHistorySection = ({ 
  serviceHistory, 
  maintenanceAlerts,
  serviceStats,
  onServiceSelect 
}) => {
  return (
    <div className="space-y-6">
      {maintenanceAlerts?.length > 0 && (
        <div className="space-y-4">
          {maintenanceAlerts.map((alert, index) => (
            <MaintenanceAlert key={index} alert={alert} />
          ))}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Service History Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <ServiceHistoryChart data={serviceStats} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Service History</CardTitle>
            <button className="text-sm text-blue-500 hover:text-blue-600">
              View All
            </button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serviceHistory.map((service, index) => (
              <ServiceCard
                key={index}
                service={service}
                onClick={() => onServiceSelect(service)}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ServiceHistorySection;