import { useState, useEffect } from 'react';
import { navItems } from '@/utils';
import MobileNavigation from '../MobileNavigation';
import DesktopNavigation from '../DesktopNavigation';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(0);

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
          image="/horizontal-logo.svg"
        />
      ) : (
        <DesktopNavigation navItems={navItems} />
      )}
    </header>
  );
};

export default Navbar;
