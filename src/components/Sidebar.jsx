import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  UserIcon, 
  DocumentTextIcon, 
  AcademicCapIcon,  
  HomeIcon} from '@heroicons/react/24/solid';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const sideBarItem = (itemId, Icon) => {
    return (
        <Link to={'/#' + itemId} className="sidebar-item" onClick={ () => scrollToSection(itemId)}>
          {itemId}
          <Icon className="h-10 w-10 ml-auto"/>
        </Link>
    )
  }

  return (
    <div 
      className={`fixed text-left top-0 left-0 h-full w-48 shadow-lg text-white transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0 w-48' : '-translate-x-32 w-48'}` } 
      style={{ backgroundColor: '#434343' }}
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <nav className="mt-4">
        <Link to="/#Home" className="flex items-left py-2 px-4 " onClick={ () => scrollToSection('Home')}>
          <div className="flex items-left py-8 px-3">
            <img src="\logos\png\logo-no-background.png" alt="logo" className="w-24 h-20 ml-auto" />
          </div>
       </Link>
       {sideBarItem("Home", HomeIcon)}
       {sideBarItem("About", UserIcon)}
       {sideBarItem("Projects", DocumentTextIcon)}
       {sideBarItem("Education", AcademicCapIcon)}
        <a href="https://github.com/kenncula" className="sidebar-item">
          Github
          <img src="\github-logo.png" alt="logo" className="h-9 w-9 ml-auto github-logo" />
        </a>
        <a href="https://linkedin.com/in/kenneth-cula" className="sidebar-item">
          LinkedIn
          <img src="\linkedin.png" alt="logo" className="h-9 w-9 ml-auto linkedin-logo" />
        </a>
      </nav>
      {/* </div> */}
    </div>
  ); 
};

export default Sidebar;

