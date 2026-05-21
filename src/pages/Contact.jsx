import { useTheme } from '../context/ThemeContext';

const Contact = () => {
  const { dark } = useTheme();
  const panel = dark ? 'bg-matte-pattern' : 'bg-stone-50';
  const title = dark ? 'text-stone-50' : 'text-stone-950';
  const body = dark ? 'text-stone-300' : 'text-stone-700';
  const link = dark
    ? 'text-brand-gold hover:text-brand-gold-light underline-offset-4 hover:underline'
    : 'text-stone-800 hover:text-stone-950 underline-offset-4 hover:underline';

  return (
    <section
      id="Contact"
      className={`flex min-h-screen flex-col items-center justify-center px-6 transition-colors duration-200 ${panel}`}
    >
      <h1 className={`text-4xl font-bold sm:text-6xl ${title}`}>Contacts</h1>
      <ul className={`mt-8 flex flex-col items-center gap-4 text-lg ${body}`}>
        <li>
          <a href="mailto:kenncula@gmail.com" className={link}>
            kenncula@gmail.com
          </a>
        </li>
        <li>
          <a
            href="https://github.com/kenncula"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            GitHub
          </a>
        </li>
        <li>
          <a
            href="https://linkedin.com/in/kenneth-cula"
            target="_blank"
            rel="noopener noreferrer"
            className={link}
          >
            LinkedIn
          </a>
        </li>
      </ul>
    </section>
  );
};

export default Contact;
