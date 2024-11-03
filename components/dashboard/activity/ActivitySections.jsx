import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Tool, 
  Shield, 
  Gift, 
  Award, 
  Activity,
  Clock,
  MapPin
} from 'lucide-react';

const getActivityIcon = (type) => {
  const iconProps = { className: "h-5 w-5" };
  switch (type) {
    case 'service':
      return <Tool {...iconProps} className={`${iconProps.className} text-blue-500`} />;
    case 'insurance':
      return <Shield {...iconProps} className={`${iconProps.className} text-green-500`} />;
    case 'reward':
      return <Gift {...iconProps} className={`${iconProps.className} text-purple-500`} />;
    case 'achievement':
      return <Award {...iconProps} className={`${iconProps.className} text-yellow-500`} />;
    default:
      return <Activity {...iconProps} className={`${iconProps.className} text-gray-500`} />;
  }
};

const ActivityDetails = ({ activity }) => {
  switch (activity.type) {
    case 'service':
      return (
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p className="text-gray-500">Service Type</p>
            <p className="font-medium">{activity.details.service}</p>
          </div>
          <div>
            <p className="text-gray-500">Cost</p>
            <p className="font-medium">{activity.details.cost}</p>
          </div>
          <div>
            <p className="text-gray-500">Location</p>
            <p className="font-medium flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {activity.details.location}
            </p>
          </div>
          <div>
            <p className="text-gray-500">Next Service</p>
            <p className="font-medium">{activity.details.nextService}</p>
          </div>
        </div>
      );
    case 'insurance':
      return (
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p className="text-gray-500">Policy</p>
            <p className="font-medium">{activity.details.policy}</p>
          </div>
          <div>
            <p className="text-gray-500">Annual Savings</p>
            <p className="font-medium text-green-600">{activity.details.savings}</p>
          </div>
        </div>
      );
    case 'reward':
      return (
        <div className="grid grid-cols-2 gap-4 mt-4 text-sm">
          <div>
            <p className="text-gray-500">Reward</p>
            <p className="font-medium">{activity.details.reward}</p>
          </div>
          <div>
            <p className="text-gray-500">Value</p>
            <p className="font-medium">{activity.details.value}</p>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const ActivityCard = ({ activity }) => {
  return (
    <Card className="hover:shadow-md transition-all duration-200">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {getActivityIcon(activity.type)}
            <div>
              <h4 className="font-medium">
                {activity.title || activity.type.charAt(0).toUpperCase() + activity.type.slice(1)}
              </h4>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                {activity.date}
                {activity.provider && ` • ${activity.provider}`}
              </p>
            </div>
          </div>
          <Badge
            variant={activity.points > 0 ? 'success' : 'destructive'}
            className="ml-2"
          >
            {activity.points > 0 ? '+' : ''}{activity.points} points
          </Badge>
        </div>
        <ActivityDetails activity={activity} />
      </CardContent>
    </Card>
  );
};

const ActivitySection = ({ activities }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          Recent Activity
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity, index) => (
            <ActivityCard
              key={index}
              activity={activity}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivitySection;