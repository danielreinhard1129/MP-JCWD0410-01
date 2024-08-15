import { BellIcon, UserIcon, CogIcon } from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export const NavbarDashboard = () => {
  return (
    <div className="flex items-center justify-between p-4 bg-white shadow-md">
      {/* Breadcrumb / Page Title */}
      <div className="flex items-center space-x-2 text-gray-500">
        <span>Dashboard</span>
        <span>/</span>
        <span className="font-bold text-black">Home</span>
      </div>

      {/* Search Bar and Icons */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="p-2 pl-8 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="absolute w-4 h-4 text-gray-400 left-2 top-2" />
        </div>

        <div className="flex items-center space-x-3 text-gray-500">
          <UserIcon className="w-5 h-5" />
          <span>Sign In</span>
          <BellIcon className="w-5 h-5" />
          <CogIcon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
