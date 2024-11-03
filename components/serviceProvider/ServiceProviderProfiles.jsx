import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ProviderCard from './ProviderCard';
import ProviderFilters from './ProviderFilters';
import EnhancedModal from '../ui/modal/EnhancedModal';
import ProviderDetails from './ProviderDetails';

const ServiceProviderProfiles = () => {
  const [filters, setFilters] = useState({
    type: '',
    brand: '',
    service: '',
    location: ''
  });

  const [selectedProvider, setSelectedProvider] = useState(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  // Mock data - in real app this would come from API
  const providers = [
    {
      id: 1,
      name: "Ferrari Beverly Hills",
      type: "Official Dealership",
      brands: ["Ferrari"],
      rating: 4.9,
      certifications: [
        "Ferrari Factory Certified",
        "Master Technician Program",
        "Carbon Fiber Specialist"
      ],
      services: {
        maintenance: true,
        repairs: true,
        performance: true,
        bodywork: true,
        detailing: true,
        track: true
      },
      metrics: {
        totalServices: 156,
        avgResponseTime: "2 hours",
        satisfaction: 98,
        trackSupport: 12
      },
      location: {
        address: "Beverly Hills, CA",
        serviceArea: ["Los Angeles", "Orange County"]
      },
      availability: {
        nextAvailable: "2024-04-10",
        priority: true,
        homeService: true,
        trackside: true
      }
    }
    // Add more providers as needed
  ];

  // Filter providers based on selected filters
  const filteredProviders = providers.filter(provider => {
    if (filters.type && provider.type !== filters.type) return false;
    if (filters.brand && !provider.brands.includes(filters.brand)) return false;
    if (filters.service && !provider.services[filters.service]) return false;
    if (filters.location && !provider.location.serviceArea.includes(filters.location)) return false;
    return true;
  });

  const handleProviderSelect = (provider) => {
    setSelectedProvider(provider);
    setIsDetailsModalOpen(true);
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Jerry Service Network</h2>
          <p className="text-gray-500">
            {providers.length} verified providers in your network
          </p>
        </div>
      </div>

      {/* Filters */}
      <ProviderFilters 
        filters={filters} 
        setFilters={setFilters} 
      />

      {/* Provider Cards */}
      <div className="grid gap-6">
        {filteredProviders.map((provider) => (
          <ProviderCard
            key={provider.id}
            provider={provider}
            onSelect={handleProviderSelect}
          />
        ))}
      </div>

      {/* Provider Details Modal */}
      <EnhancedModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        title={selectedProvider?.name || 'Provider Details'}
      >
        {selectedProvider && (
          <ProviderDetails provider={selectedProvider} />
        )}
      </EnhancedModal>
    </div>
  );
};

export default ServiceProviderProfiles;