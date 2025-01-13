// import ReactTooltip from 'react-tooltip';

import { 
  UserIcon, 
  DocumentTextIcon, 
  AcademicCapIcon,  
  HomeIcon,
  PencilIcon,
  StarIcon} from '@heroicons/react/24/solid';
import { useEffect } from 'react';

const Navbar = () => {
  useEffect(() => {
    const isMobile = () => {
      const userAgent = navigator.userAgent;
      const regex = /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
      return regex.test(userAgent); 
    }
  
    if (isMobile()) {
      document.body.classList.add('sidebar-mobile');
    } else {
      document.body.classList.remove('sidebar-mobile');
    }
  }, []);

  const navbarItem = (icon, link) => {
    return (
      <>
        <a href={link} className="flex items-center py-2 px-1" rel="noopener noreferrer">
        {icon}
        </a>
      </>
    )
  }

  return (
    <div 
      className={`fixed top-0 left-0 h-20 w-full shadow-lg text-white z-50` } 
      style={{ backgroundColor: '#434343' }}
    >
      <nav className="-mt-14">
        <a href="/#Home" className="flex items-left px-40">
          <div className="flex items-left px-3 mx-3">
            <img src="\logos\png\logo-no-background.png" alt="logo" className="w-24 h-20" />
          </div>
       </a>
       <nav className="flex justify-around items-center py-2">
        {navbarItem(<HomeIcon className="h-6 w-6 ml-auto"/>, "/#Home")}
        {navbarItem(<UserIcon  className="h-6 w-6 ml-auto"/>, "/#About")}
        {navbarItem(<StarIcon  className="h-6 w-6 ml-auto"/>, "/#Projects")}
        {navbarItem(<AcademicCapIcon className="h-6 w-6 ml-auto"/>, "/#Education")}
        {navbarItem(<PencilIcon className="h-6 w-6 ml-auto"/>, "/#Blog" )}
        <a href={'resume.pdf'} className="flex items-center py-2 px-1" target="_blank" rel="noopener noreferrer">
          <DocumentTextIcon  className="h-6 w-6 ml-auto"/>
        </a>
        <a href={"https://github.com/kenncula"} className="flex items-center py-2 px-1" target="_blank" rel="noopener noreferrer">
          <img src="\github-logo.png" alt="logo" className="h-6 w-6 ml-auto github-logo" />
        </a>
        <a href={"https://linkedin.com/in/kenneth-cula"} className="flex items-center py-2 px-1" target="_blank" rel="noopener noreferrer">
          <img src="\linkedin.png" alt="logo" className="h-6 w-6 ml-auto linkedin-logo" />
        </a>
        </nav>
      </nav>
    </div>
  ); 
};

export default Navbar;

