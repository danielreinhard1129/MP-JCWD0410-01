"use client";
import NavbarDashboard from "@/components/DashboardAdmin/NavbarDashboard";
import Sidebar from "@/components/DashboardAdmin/sidebar";
import CreateVoucherPage from "@/features/dashboard/CreateVoucherPage"; // Pastikan path ini benar
import React, { useState } from "react";

const CreateVoucher = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Voucher");

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
      <Sidebar
        isOpen={sidebarOpen}
        onClose={closeSidebar}
        onMenuSelect={handleMenuSelect}
      />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-y-auto bg-gray-50">
        {/* Navbar */}
        <NavbarDashboard
          onMenuToggle={toggleSidebar}
          selectedMenu={selectedMenu}
        />

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <CreateVoucherPage /> {/* Menggunakan komponen CreateVoucherPage */}
        </div>
      </div>
    </div>
  );
};

export default CreateVoucher;
