
import NavbarDashboard from '@/components/NavbarDahboard';
import Sidebar from '@/components/sidebar';


const Dashboard = () => {


  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar  />

      {/* Main Content Area */}
      <div className="flex-1 bg-gray-50">
        {/* Navbar */}
        <NavbarDashboard  />

        {/* Page Content */}
        <div className="p-6">
          {/* Konten halaman dashboard Anda akan muncul di sini */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
