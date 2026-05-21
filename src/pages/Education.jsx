import { useTheme } from '../context/ThemeContext';

const Education = () => {
  const { dark } = useTheme();
  const panel = dark ? 'bg-matte-pattern' : 'bg-stone-50';
  const title = dark ? 'text-stone-50' : 'text-stone-950';
  const sub = dark ? 'text-stone-300' : 'text-stone-700';

  return (
    <div
      id="Experience"
      className={`flex flex-col items-center justify-center min-h-screen transition-colors duration-200 ${panel}`}
    >
      <h1 className={`text-6xl font-bold ${title}`}>Experience</h1>
      <p className={`mt-4 text-xl ${sub}`}>Cornell University</p>
    </div>
  );
};

export default Education;
