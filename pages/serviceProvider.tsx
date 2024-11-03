import React from 'react';
import LocationMap from '../components/serviceProvider/LocationMap';
import ProviderCard from '../components/serviceProvider/ProviderCard';
import ProviderDetails from '../components/serviceProvider/ProviderDetails';
import ProviderFilters from '../components/serviceProvider/ProviderFilters';
import ReviewsSection from '../components/serviceProvider/ReviewsSection';
import ServiceProviderProfiles from '../components/serviceProvider/ServiceProviderProfiles';
import ServiceScheduler from '../components/serviceProvider/ServiceScheduler';

const ServiceProviderPage: React.FC = () => {
  return (
    <div>
      <h1>Service Provider Page</h1>
      <LocationMap />
      <ProviderCard />
      <ProviderDetails />
      <ProviderFilters />
      <ReviewsSection />
      <ServiceProviderProfiles />
      <ServiceScheduler />
    </div>
  );
};

export default ServiceProviderPage;