import { Outlet } from 'react-router-dom';
import SiteBrand from './SiteBrand';
import TopNav from './TopNav';
import CursorGlow from './CursorGlow';
import { IntroAnimationProvider } from '../context/IntroAnimationContext';
import { useTheme } from '../context/ThemeContext';

const Layout = () => {
  const { dark } = useTheme();
  const mainBg = dark
    ? 'bg-matte-pattern text-stone-50'
    : 'bg-stone-50 text-stone-950';

  return (
    <IntroAnimationProvider>
      <div
        className={`min-h-screen transition-colors duration-200 ${mainBg}`}
      >
        <CursorGlow />
        <SiteBrand />
        <TopNav />
        <main
          className={`relative min-h-screen pt-14 transition-colors duration-200 md:pt-16 ${mainBg}`}
        >
          <Outlet />
        </main>
      </div>
    </IntroAnimationProvider>
  );
};

export default Layout;
