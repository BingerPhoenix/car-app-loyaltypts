import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Tool,
  Star,
  MapPin,
  Shield,
  Award,
  Calendar,
  Clock,
  Settings,
  Certificate
} from 'lucide-react';

const ProviderCard = ({ provider, onSelect }) => {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        {/* Provider Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="text-xl font-semibold flex items-center gap-2">
              {provider.name}
              <Badge variant="secondary">
                {provider.type}
              </Badge>
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
              <MapPin className="h-4 w-4" />
              {provider.location.address}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            <span className="font-bold">{provider.rating}</span>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Total Services</div>
            <div className="text-xl font-bold">{provider.metrics.totalServices}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Response Time</div>
            <div className="text-xl font-bold">{provider.metrics.avgResponseTime}</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Satisfaction</div>
            <div className="text-xl font-bold">{provider.metrics.satisfaction}%</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500">Track Days</div>
            <div className="text-xl font-bold">{provider.metrics.trackSupport}</div>
          </div>
        </div>

        {/* Services & Certifications */}
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <h4 className="font-semibold mb-3">Services</h4>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(provider.services).map(([service, available]) => (
                <div
                  key={service}
                  className={`p-2 rounded-lg text-sm ${
                    available
                      ? 'bg-green-50 text-green-700'
                      : 'bg-gray-50 text-gray-400'
                  }`}
                >
                  {service.charAt(0).toUpperCase() + service.slice(1)}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Certifications</h4>
            <div className="space-y-2">
              {provider.certifications.map((cert, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Certificate className="h-4 w-4 text-blue-500" />
                  {cert}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Availability & Actions */}
        <div className="flex justify-between items-center mt-4">
          <div className="flex items-center gap-4">
            <div className="text-sm">
              <span className="text-gray-500">Next Available: </span>
              <span className="font-medium">
                {new Date(provider.availability.nextAvailable).toLocaleDateString()}
              </span>
            </div>
            {provider.availability.priority && (
              <Badge variant="success">Priority Access</Badge>
            )}
          </div>
          <button
            onClick={() => onSelect(provider)}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            View Details
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProviderCard;