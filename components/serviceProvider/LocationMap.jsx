import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, Mail, Globe, Clock, Car } from 'lucide-react';

const LocationMap = ({ location }) => {
  const businessHours = [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  return (
    <div className="grid grid-cols-3 gap-6">
      <div className="col-span-2">
        <Card>
          <CardContent className="p-4">
            {/* Placeholder for map - in a real app, you'd use a mapping library */}
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center">
              <MapPin className="h-8 w-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="font-medium mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <div className="font-medium">{location.address}</div>
                  <div className="text-sm text-gray-500">{location.city}, {location.state} {location.zip}</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <div className="font-medium">{location.phone}</div>
                  <div className="text-sm text-gray-500">Main Contact</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-blue-500 mt-1" />
                <div>
                  <div className="font-medium">{location.email}</div>
                  <div className="text-sm text-gray-500">Service Inquiries</div>
                </div>
              </div>

              {location.website && (
                <div className="flex items-start gap-3">
                  <Globe className="h-5 w-5 text-blue-500 mt-1" />
                  <div>
                    <a 
                      href={location.website} 
                      className="font-medium text-blue-500 hover:text-blue-600"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </div>
                </div>
              )}
            </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
            <h3 className="font-medium mb-4">Business Hours</h3>
            <div className="space-y-2">
              {businessHours.map((schedule) => (
                <div 
                  key={schedule.day} 
                  className="flex justify-between items-center py-1"
                >
                  <span className="text-sm text-gray-500">{schedule.day}</span>
                  <span className="text-sm font-medium">
                    {schedule.hours}
                  </span>
                </div>
              ))}
            </div>
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
            <h3 className="font-medium mb-4">Service Area</h3>
            <div className="space-y-3">
              {location.serviceAreas?.map((area, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <Car className="h-4 w-4 text-blue-500" />
                    <span className="text-sm">{area.name}</span>
                  </div>
                  <Badge variant="secondary">
                    {area.radius} mile radius
                  </Badge>
                </div>
              ))}
            </div>

            <div className="mt-4 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-500 mt-1" />
                <div className="text-sm text-blue-700">
                  Average response time in service area: {location.avgResponseTime}
                </div>
              </div>
            </div>

            {location.mobileService && (
              <div className="mt-4">
                <Badge variant="success" className="w-full justify-center py-1">
                  Mobile Service Available
                </Badge>
                <p className="text-sm text-gray-500 mt-2">
                  We offer on-site service within our service area for eligible maintenance and repairs.
                </p>
              </div>
            )}
            </CardContent>
            </Card>

            <Card>
            <CardContent className="p-4">
            <h3 className="font-medium mb-4">Parking Information</h3>
            <div className="space-y-3">
              {location.parking?.facilities?.map((facility, index) => (
                <div 
                  key={index} 
                  className="flex items-start gap-2"
                >
                  <MapPin className="h-4 w-4 text-blue-500 mt-1" />
                  <div>
                    <div className="text-sm font-medium">{facility.name}</div>
                    <div className="text-sm text-gray-500">{facility.description}</div>
                  </div>
                </div>
              ))}

              {location.parking?.instructions && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg text-sm text-gray-600">
                  {location.parking.instructions}
                </div>
              )}
            </div>
            </CardContent>
            </Card>
            </div>
            </div>
            );
            };

            export default LocationMap;