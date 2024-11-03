import React from 'react';
import MainLayout from '../components/layout/MainLayout';
import Navbar from '../components/layout/Navbar';
import NotificationsDropdown from '../components/layout/NotificationsDropdown';
import Sidebar from '../components/layout/Sidebar';
import Badge from '../components/ui/badge';
import EnhancedModal from '../components/ui/modal/EnhancedModal';
import Tabs from '../components/ui/tabs/index';

const LayoutPage: React.FC = () => {
  return (
    <MainLayout>
      <Navbar />
      <Sidebar />
      <div>
        <h1>Layout and UI Components Page</h1>
        <NotificationsDropdown />
        <Tabs />
        <EnhancedModal />
        <Badge />
      </div>
    </MainLayout>
  );
};

export default LayoutPage;