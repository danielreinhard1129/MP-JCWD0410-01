"use client";

import NavbarDashboard from "@/components/DashboardAdmin/NavbarDashboard";
import Sidebar from "@/components/DashboardAdmin/sidebar";
import CreateCategoryPage from "@/features/dashboard/CreateCategoryPage";
import { useState } from "react";

const CreateEvent = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Event");

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
          <CreateCategoryPage />
        </div>
      </div>
    </div>
  );
};

export default CreateEvent;
