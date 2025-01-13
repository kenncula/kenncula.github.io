import { useEffect, useState } from 'react'
import { Tooltip } from "react-tooltip";

import { 
  UserIcon, 
  DocumentTextIcon, 
  AcademicCapIcon,  
  HomeIcon,
  PencilIcon,
  StarIcon} from '@heroicons/react/24/solid';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let timer;

  const handleMouseEnter = () => {
    timer = setTimeout(() => {
      setIsOpen(true);
      clearTimeout(timer)
    }, 2500); // slight delay
  };

  const handleMouseLeave = () => {
    clearTimeout(timer);
    setIsOpen(false);
  };

  useEffect(() => {
    const body = document.body;
    if (isOpen) {
      body.classList.add('sidebar-open');
      body.classList.remove('sidebar-mobile');
    } else {
      body.classList.remove('sidebar-open');
      body.classList.add('sidebar-mobile');
    }
  }, [isOpen]);

  const sideBarItem = (content, icon, link, external) => {
    return (
      <>
        <a 
          href={link} 
          className="sidebar-item" 
          rel="noopener noreferrer" 
          data-tooltip-id="custom-tooltip"
          target={external ? "_blank" : ""}
          data-tooltip-content={`${content}`}
          data-tooltip-place="right"
          >
          <Tooltip id="custom-tooltip"/>
          {content}
          {icon}
        </a>
      </>
    )
  }

  return (
    <div 
      className={`fixed text-left top-0 left-0 h-full w-48 shadow-lg text-white transition-transform duration-500 ease-in-out transform ${isOpen ? 'translate-x-0 w-48' : '-translate-x-32 w-48'}` } 
      style={{ backgroundColor: '#434343' }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <nav className="mt-4">
        <a href="/#Home" className="flex items-left py-2 px-4">
          <div className="flex items-left py-8 px-3">
            <img src="\logos\png\logo-no-background.png" alt="logo" className="w-24 h-20 ml-auto" />
          </div>
       </a>
       {sideBarItem("Home", <HomeIcon className="h-10 w-10 ml-auto"/>, "/#Home", false)}
       {sideBarItem("About", <UserIcon  className="h-10 w-10 ml-auto"/>, "/#About",false)}
       {sideBarItem("Projects", <StarIcon  className="h-10 w-10 ml-auto"/>, "/#Projects",false)}
       {sideBarItem("Education", <AcademicCapIcon className="h-10 w-10 ml-auto"/>, "/#Education",false)}
       {sideBarItem("Blog", <PencilIcon className="h-10 w-10 ml-auto"/>, "/#Blog",false)}

       {sideBarItem("Resume",  <DocumentTextIcon  className="h-10 w-10 ml-auto"/>, "resume.pdf",true)}
       {sideBarItem("Github", <img src="\github-logo.png" alt="github" className="h-9 w-9 ml-auto github-logo" />, 
        "https://github.com/kenncula",true)}
       {sideBarItem("LinkedIn", <img src="\linkedin.png" alt="linkedin" className="h-9 w-9 ml-auto linkedin-logo" />, 
        "https://linkedin.com/in/kenneth-cula",true)}
      </nav>
    </div>
  ); 
};

export default Sidebar;

