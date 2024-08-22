// src/app/dashboard/transaction/event/page.tsx
"use client"
import React, { useState } from 'react';
import Sidebar from '@/components/DashboardAdmin/sidebar';
import NavbarDashboard from '@/components/DashboardAdmin/NavbarDashboard';
import VoucherTable from '@/features/dashboard/VoucherTablePage';



const voucher = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('Event');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleMenuSelect = (title: string) => {
    setSelectedMenu(title);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} onMenuSelect={handleMenuSelect} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col bg-gray-50 overflow-y-auto">
        {/* Navbar */}
        <NavbarDashboard onMenuToggle={toggleSidebar} selectedMenu={selectedMenu} />

        {/* Page Content */}
        <div className="p-6 flex-1 overflow-y-auto">
         <VoucherTable/>
        </div>
      </div>
    </div>
  );
};

export default voucher;
