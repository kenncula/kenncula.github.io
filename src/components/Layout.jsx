import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
// import Navbar from './Navbar';

const Layout = () => {
  return (
    <div className="bg-hero-pattern min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for larger screens */}
      <div className="hidden md:flex">
        <Sidebar />
      </div>
      
      {/* Navbar for smaller screens */}
      <div className="md:hidden">
        <Navbar />
      </div>
      
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;