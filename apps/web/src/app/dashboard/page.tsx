"use client";

import { useState } from "react";
import DashboardCard from "@/components/DashboardAdmin/DashboardCard";
import { BanknotesIcon, UserGroupIcon, UserPlusIcon, ChartBarIcon } from "@heroicons/react/24/solid";
import Sidebar from "@/components/DashboardAdmin/sidebar";
import NavbarDashboard from "@/components/DashboardAdmin/NavbarDashboard";
import ToDoList from "@/components/DashboardAdmin/TodoList";
import SalesChart from "@/components/DashboardAdmin/Statistik";


const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState("Home"); // Initial menu text

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleMenuSelect = (title: string) => {
    setSelectedMenu(title); // Update selected menu
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <DashboardCard
              title="Today's Money"
              value="$53k"
              percentageChange="+55%"
              percentageText="than last week"
              isPositive={true}
              icon={<BanknotesIcon className="w-6 h-6 text-black" />}
            />
            <DashboardCard
              title="Today's Users"
              value="2,300"
              percentageChange="+3%"
              percentageText="than last month"
              isPositive={true}
              icon={<UserGroupIcon className="w-6 h-6 text-black" />}
            />
            <DashboardCard
              title="New Clients"
              value="3,462"
              percentageChange="-2%"
              percentageText="than yesterday"
              isPositive={false}
              icon={<UserPlusIcon className="w-6 h-6 text-black" />}
            />
            <DashboardCard
              title="Sales"
              value="$103,430"
              percentageChange="+5%"
              percentageText="than yesterday"
              isPositive={true}
              icon={<ChartBarIcon className="w-6 h-6 text-black" />}
            />
          </div>

          {/* Sales Chart Component */}
          <div className="mt-6">
            <SalesChart />
          </div>

          {/* To-Do List Component */}
          <div className="mt-6">
            <ToDoList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
