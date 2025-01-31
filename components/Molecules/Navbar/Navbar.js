import { useState, useEffect } from 'react';
import { navItems } from '@/utils';
import { useRouter } from 'next/router';
import MobileNavigation from '../MobileNavigation';
import DesktopNavigation from '../DesktopNavigation';

const Navbar = () => {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showSubMenu, setShowSubMenu] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

  const handleClick = (e, path) => {
    e.preventDefault();
    router.push(path);
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    if (viewportWidth === 0) handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [viewportWidth]);
  return (
    <header className="relative z-20 p-2 transition">
      {viewportWidth < 972 ? (
        <MobileNavigation
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          navItems={navItems}
          handleClick={handleClick}
          image="/horizontal-logo.svg"
        />
      ) : (
        <DesktopNavigation
          navItems={navItems}
          showSubMenu={showSubMenu}
          setShowSubMenu={setShowSubMenu}
          handleClick={handleClick}
        />
      )}
    </header>
  );
};

export default Navbar;
