import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout = () => {
  return (
    <div className="bg-hero-pattern min-h-screen flex">
      <Sidebar />
      <div className="flex-grow">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;