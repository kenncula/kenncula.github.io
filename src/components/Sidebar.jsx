import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  UserIcon, 
  DocumentTextIcon, 
  AcademicCapIcon,  
  HomeIcon,
  PencilIcon,
  StarIcon} from '@heroicons/react/24/solid';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const sideBarItem = (itemId, Icon, to) => {
    return (
        <Link to={to} className="sidebar-item" onClick={ () => scrollToSection(itemId)}>
          {itemId}
          <Icon className="h-10 w-10 ml-auto"/>
        </Link>
    )
  }
  const sideBarLink = (content, Img, link) => {
    return (
        <a href={link} className="sidebar-item">
          {content}
          {Img}
        </a>
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
       {sideBarItem("Home", HomeIcon, "/#Home")}
       {sideBarItem("About", UserIcon, "/#About")}
       {sideBarItem("Projects", StarIcon, "/#Projects")}
       {sideBarItem("Education", AcademicCapIcon, "/#Education")}
       {sideBarItem("Blog", PencilIcon, "/#Blog")}
       {sideBarItem("Resume", DocumentTextIcon, "resume.pdf")}
       {sideBarLink("Github", 
        <img src="\github-logo.png" alt="logo" className="h-9 w-9 ml-auto github-logo" />, 
        "https://github.com/kenncula")}
       {sideBarLink(
        "LinkedIn", <img src="\linkedin.png" alt="logo" className="h-9 w-9 ml-auto linkedin-logo" />, 
        "https://linkedin.com/in/kenneth-cula")}
      </nav>
    </div>
  ); 
};

export default Sidebar;

