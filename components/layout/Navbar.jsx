import React from 'react';
import { Card } from '@/components/ui/card';

const Navbar = ({ children }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-white border-b">
      <div className="h-16 px-4 flex items-center justify-between">
        {children}
      </div>
    </header>
  );
};

export default Navbar;