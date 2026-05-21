import { useTheme } from '../context/ThemeContext';

// eslint-disable-next-line no-empty-pattern
const Projects = ({}) => {
  const { dark } = useTheme();
  const panel = dark ? 'bg-matte-pattern' : 'bg-stone-50';
  const title = dark ? 'text-stone-50' : 'text-stone-950';
  const shadow = dark ? '' : 'text-shadow-medium';

  return (
    <div className={`min-h-screen transition-colors duration-200 ${panel}`} id="Projects">
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className={`text-6xl font-bold ${title} ${shadow}`}>My Projects</h1>
      </div>
    </div>
  );
};

export default Projects;
