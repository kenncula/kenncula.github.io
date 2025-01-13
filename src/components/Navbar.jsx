import { Tooltip } from "react-tooltip";

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

  const navbarItem = (content, icon, link, external) => {
    return (
      <>
        <a 
          href={link} 
          className="flex items-center py-2 px-1"
          rel="noopener noreferrer" 
          data-tooltip-id="custom-tooltip"
          target={external ? "_blank" : ""}
          data-tooltip-content={`${content}`}
          data-tooltip-place="bottom"
          >
          <Tooltip id="custom-tooltip"/>
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
        <a href="/#Home" className="flex items-center px-32 justify-center">
          <div>
            <img src="\logos\png\logo-no-background.png" alt="logo" className="w-32 h-20" />
          </div>
       </a>
       <nav className="flex justify-around items-center py-2">
        {navbarItem("Home", <HomeIcon className="h-6 w-6 ml-auto"/>, "/#Home",false)}
        {navbarItem("About",<UserIcon  className="h-6 w-6 ml-auto"/>, "/#About",false)}
        {navbarItem("Projects",<StarIcon  className="h-6 w-6 ml-auto"/>, "/#Projects",false)}
        {navbarItem("Education",<AcademicCapIcon className="h-6 w-6 ml-auto"/>, "/#Education",false)}
        {navbarItem("Blog",<PencilIcon className="h-6 w-6 ml-auto"/>, "/#Blog" ,false)}
        {navbarItem("Resume",<DocumentTextIcon  className="h-6 w-6 ml-auto"/>, "resume.pdf" ,true)}
        {navbarItem("Github",<img src="\github-logo.png" alt="Github logo" className="h-6 w-6 ml-auto github-logo" />, 
        "https://github.com/kenncula" ,true)}
        {navbarItem("LinkedIn",<img src="\linkedin.png" alt="LinkedIn logo" className="h-6 w-6 ml-auto linkedin-logo" />, 
        "https://linkedin.com/in/kenneth-cula" ,true)}
        </nav>
      </nav>
    </div>
  ); 
};

export default Navbar;

