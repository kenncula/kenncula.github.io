import { useEffect, useState } from 'react'
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
    }, 200); // slight delay
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

  const sideBarItem = (content, icon, link) => {
    return (
      <>
        <a href={link} className="sidebar-item" rel="noopener noreferrer">
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
       {sideBarItem("Home", <HomeIcon className="h-10 w-10 ml-auto"/>, "/#Home")}
       {sideBarItem("About", <UserIcon  className="h-10 w-10 ml-auto"/>, "/#About")}
       {sideBarItem("Projects", <StarIcon  className="h-10 w-10 ml-auto"/>, "/#Projects")}
       {sideBarItem("Education", <AcademicCapIcon className="h-10 w-10 ml-auto"/>, "/#Education")}
       {sideBarItem("Blog", <PencilIcon className="h-10 w-10 ml-auto"/>, "/#Blog" )}
       
       <a href={"resume.pdf"} className="sidebar-item" target='_blank' rel='noopener noreferrer' >
          Resume
          <DocumentTextIcon  className="h-10 w-10 ml-auto"/>
        </a>
       <a href={"https://github.com/kenncula"} className="sidebar-item" target="_blank" rel="noopener noreferrer">
          Github
          <img src="\github-logo.png" alt="logo" className="h-9 w-9 ml-auto github-logo" />
        </a>
       <a href={"https://linkedin.com/in/kenneth-cula"} className="sidebar-item" target="_blank" rel="noopener noreferrer">
          LinkedIn
          <img src="\linkedin.png" alt="logo" className="h-9 w-9 ml-auto linkedin-logo" />
        </a>
      </nav>
    </div>
  ); 
};

export default Sidebar;

