import React from 'react';
import ActivitySection from '../components/dashboard/activity/ActivitySection';
import AnalyticsSection from '../components/dashboard/analytics/AnalyticsSection';
import MaintenanceTracking from '../components/dashboard/maintenance/MaintenanceTracking';
import MembershipStatus from '../components/dashboard/membership/MembershipStatus';
import TierBenefits from '../components/dashboard/membership/TierBenefits';
import MetricCard from '../components/dashboard/metrics/MetricCard';
import ProgressIndicators from '../components/dashboard/progress/ProgressIndicators';
import RewardsSection from '../components/dashboard/rewards/RewardsSection';
import ServiceHistorySection from '../components/dashboard/service/ServiceHistorySection';
import Charts from '../components/dashboard/visualizations/charts';

const DashboardPage: React.FC = () => {
  return (
    <div>
      <h1>Dashboard Page</h1>
      <ActivitySection />
      <AnalyticsSection />
      <MaintenanceTracking />
      <MembershipStatus />
      <TierBenefits />
      <MetricCard />
      <ProgressIndicators />
      <RewardsSection />
      <ServiceHistorySection />
      <Charts />
    </div>
  );
};

export default DashboardPage;