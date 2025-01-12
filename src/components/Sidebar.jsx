import { Link } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-opacity-75 bg-gray-800 text-white fixed">
      <h1 className="text-2xl font-bold p-4"><Link to="/" className="block">Ken Cula</Link></h1>
      <nav className="mt-4">
        <Link to="/about" className="block py-2 px-4 hover:bg-gray-700">About</Link>
        <Link to="/resume.pdf" className="block py-2 px-4 hover:bg-gray-700">Resume</Link>
        <a href="https://github.com/kenncula" className="block py-2 px-4 hover:bg-gray-700">Github</a>
        <a href="https://linkedin.com/in/kenneth-cula" className="block py-2 px-4 hover:bg-gray-700">LinkedIn</a>
      </nav>
    </div>
  );
};

export default Sidebar;

