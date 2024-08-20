import {
  BellIcon,
  UserIcon,
  CogIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

interface NavbarDashboardProps {
  onMenuToggle: () => void;
  selectedMenu?: string; // Optional prop to show the selected menu
}

const NavbarDashboard: React.FC<NavbarDashboardProps> = ({
  onMenuToggle,
  selectedMenu,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-4 shadow-md">
      {/* Breadcrumb / Page Title */}
      <div className="flex items-center space-x-2 text-gray-500">
        <button onClick={onMenuToggle} className="lg:hidden">
          <Bars3Icon className="h-6 w-6" />
        </button>
        <span>{selectedMenu ? selectedMenu : "Dashboard"}</span>
        {!selectedMenu && (
          <>
            <span>/</span>
            <span className="font-bold text-black">Home</span>
          </>
        )}
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search"
            className="rounded-md border p-2 pl-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <MagnifyingGlassIcon className="absolute left-2 top-2 h-4 w-4 text-gray-400" />
        </div>

        <div className="flex items-center space-x-3 text-gray-500">
          <UserIcon className="h-5 w-5" />
          <span>Sign In</span>
          <BellIcon className="h-5 w-5" />
          <CogIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default NavbarDashboard;
