import { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  UserIcon, 
  DocumentTextIcon, 
  AcademicCapIcon,  
  HomeIcon,
  PencilIcon,
  StarIcon} from '@heroicons/react/24/solid';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  }
  const navBarItem = (content, icon, link) => {
    return (
        <a href={link} className="sidebar-item">
          {content}
          {icon}
        </a>
    )
  }

  return (
    <div 
      className={`fixed text-left top-0 left-0 w-full w-48 shadow-lg text-white transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0 w-48' : '-translate-x-32 w-48'}` } 
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
       {navBarItem("Home", <HomeIcon className="h-10 w-10 ml-auto"/>, "/#Home")}
       {navBarItem("About", <UserIcon  className="h-10 w-10 ml-auto"/>, "/#About")}
       {navBarItem("Projects", <StarIcon  className="h-10 w-10 ml-auto"/>, "/#Projects")}
       {navBarItem("Education", <AcademicCapIcon className="h-10 w-10 ml-auto"/>, "/#Education")}
       {navBarItem("Blog", <PencilIcon className="h-10 w-10 ml-auto"/>, "/#Blog")}
       {navBarItem("Resume", <DocumentTextIcon  className="h-10 w-10 ml-auto"/>, "resume.pdf")}
       {navBarItem("Github", 
        <img src="\github-logo.png" alt="logo" className="h-9 w-9 ml-auto github-logo" />, 
        "https://github.com/kenncula")}
       {navBarItem(
        "LinkedIn", <img src="\linkedin.png" alt="logo" className="h-9 w-9 ml-auto linkedin-logo" />, 
        "https://linkedin.com/in/kenneth-cula")}
      </nav>
    </div>
  ); 
};

export default Navbar;

