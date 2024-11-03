import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Tool, MapPin, Star, Calendar, Clock, Shield,
  Award, Certificate, Car, Settings, Heart
} from 'lucide-react';
import ServiceScheduler from './ServiceScheduler';
import ReviewsSection from './ReviewsSection';
import LocationMap from './LocationMap';

const ServicesList = ({ services }) => (
  <div className="grid grid-cols-2 gap-4">
    {Object.entries(services).map(([service, details]) => (
      <Card key={service} className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Tool className="h-5 w-5 text-blue-500 mt-1" />
            <div>
              <h4 className="font-medium">
                {service.charAt(0).toUpperCase() + service.slice(1)}
              </h4>
              <p className="text-sm text-gray-500 mt-1">
                {details.description}
              </p>
              {details.price && (
                <div className="mt-2 text-sm font-medium text-blue-600">
                  Starting from ${details.price}
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const CertificationList = ({ certifications }) => (
  <div className="grid grid-cols-2 gap-4">
    {certifications.map((cert, index) => (
      <Card key={index} className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <Certificate className="h-5 w-5 text-blue-500 mt-1" />
            <div>
              <h4 className="font-medium">{cert.title}</h4>
              <p className="text-sm text-gray-500 mt-1">
                {cert.issuer}
              </p>
              <div className="text-sm text-gray-500 mt-2 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Valid until {cert.validUntil}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const ProviderStats = ({ metrics }) => (
  <div className="grid grid-cols-4 gap-4 mb-6">
    {Object.entries(metrics).map(([key, value]) => (
      <div key={key} className="p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-500">
          {key.split(/(?=[A-Z])/).join(' ')}
        </div>
        <div className="text-xl font-bold mt-1">
          {typeof value === 'number' ? 
            value.toLocaleString() : 
            value}
        </div>
      </div>
    ))}
  </div>
);

const ProviderDetails = ({ provider }) => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="space-y-6">
      {/* Provider Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold">{provider.name}</h2>
            <Badge variant="secondary">{provider.type}</Badge>
            {provider.availability.priority && (
              <Badge variant="success">Priority Provider</Badge>
            )}
          </div>
          <div className="flex items-center gap-4 mt-2 text-gray-500">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {provider.location.address}
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 text-yellow-500" />
              {provider.rating} ({provider.metrics.totalServices} services)
            </div>
          </div>
        </div>
        <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <Heart className="h-5 w-5 text-gray-400" />
        </button>
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <button className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg 
          hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
          <Calendar className="h-5 w-5" />
          Schedule Service
        </button>
        <button className="flex-1 border border-gray-200 px-4 py-2 rounded-lg 
          hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
          <Settings className="h-5 w-5" />
          Request Quote
        </button>
      </div>

      {/* Tabs Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
          <TabsTrigger value="location">Location</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card>
            <CardContent className="p-6 space-y-6">
              <ProviderStats metrics={provider.metrics} />
              <div className="prose max-w-none">
                <h3 className="text-lg font-semibold mb-2">About Us</h3>
                <p className="text-gray-600">{provider.description}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <ServicesList services={provider.services} />
        </TabsContent>

        <TabsContent value="certifications">
          <CertificationList certifications={provider.certifications} />
        </TabsContent>

        <TabsContent value="reviews">
          <ReviewsSection providerId={provider.id} />
        </TabsContent>

        <TabsContent value="location">
          <LocationMap location={provider.location} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProviderDetails;