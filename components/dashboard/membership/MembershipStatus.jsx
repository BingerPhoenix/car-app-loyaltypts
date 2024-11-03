import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Star,
  Award,
  Calendar,
  TrendingUp,
  Clock,
  Shield,
  Gift,
  AlertTriangle
} from 'lucide-react';

const StatusAlert = ({ type, message, action }) => {
  const alertStyles = {
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <div className={`p-4 rounded-lg border ${alertStyles[type]} flex items-start gap-3`}>
      {type === 'warning' && <AlertTriangle className="h-5 w-5" />}
      {type === 'success' && <Shield className="h-5 w-5" />}
      {type === 'info' && <Gift className="h-5 w-5" />}
      <div className="flex-1">
        <p className="text-sm">{message}</p>
        {action && (
          <button className="text-sm font-medium mt-2 hover:underline">
            {action}
          </button>
        )}
      </div>
    </div>
  );
};

const BenefitCard = ({ benefit }) => (
  <Card className="hover:shadow-md transition-all duration-200">
    <CardContent className="p-4">
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg ${benefit.active ? 'bg-blue-50' : 'bg-gray-50'}`}>
          {benefit.icon}
        </div>
        <div>
          <h4 className="font-medium">{benefit.title}</h4>
          <p className="text-sm text-gray-500 mt-1">{benefit.description}</p>
          {benefit.expiry && (
            <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
              <Clock className="h-4 w-4" />
              Expires: {benefit.expiry}
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const PointsSummary = ({ points }) => (
  <div className="grid grid-cols-3 gap-4">
    <Card>
      <CardContent className="p-4">
        <div className="text-sm text-gray-500">Available Points</div>
        <div className="text-2xl font-bold mt-1">{points.available.toLocaleString()}</div>
        <div className="text-sm text-gray-500 mt-1">
          Next expiry: {points.nextExpiry}
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="text-sm text-gray-500">Points Earned This Month</div>
        <div className="text-2xl font-bold mt-1 text-green-600">
          +{points.earnedThisMonth.toLocaleString()}
        </div>
        <div className="text-sm text-green-600 mt-1 flex items-center gap-1">
          <TrendingUp className="h-4 w-4" />
          {points.monthlyGrowth}% vs last month
        </div>
      </CardContent>
    </Card>
    <Card>
      <CardContent className="p-4">
        <div className="text-sm text-gray-500">Lifetime Points</div>
        <div className="text-2xl font-bold mt-1">{points.lifetime.toLocaleString()}</div>
        <div className="text-sm text-gray-500 mt-1">
          Since {points.memberSince}
        </div>
      </CardContent>
    </Card>
  </div>
);

const MembershipStatus = ({
  member,
  points,
  activeBenefits,
  statusAlerts
}) => {
  return (
    <div className="space-y-6">
      {statusAlerts?.length > 0 && (
        <div className="space-y-4">
          {statusAlerts.map((alert, index) => (
            <StatusAlert key={index} {...alert} />
          ))}
        </div>
      )}

      <Card className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex justify-between items-center">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">{member.name}</h2>
                <Badge variant="secondary">{member.tier}</Badge>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Member since {member.joinDate}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Award className="h-6 w-6 text-blue-500" />
              <span className="text-sm text-gray-600">
                Member ID: {member.id}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <PointsSummary points={points} />

      <Card>
        <CardHeader>
          <CardTitle>Active Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4">
            {activeBenefits.map((benefit, index) => (
              <BenefitCard key={index} benefit={benefit} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MembershipStatus;