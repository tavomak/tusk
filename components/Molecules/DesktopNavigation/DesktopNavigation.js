import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import LanguageSwitcher from '@/components/Atoms/LanguageSwitcher';
import { siteName } from '@/utils';
import { AnimatePresence, motion } from 'motion/react';

const DesktopNavigation = ({
  navItems,
  showSubMenu,
  setShowSubMenu,
  handleClick,
}) => {
  const { t } = useTranslation('common');
  const firstThreeItems = navItems.slice(0, 3);
  const lastThreeItems = navItems.slice(3, 6);
  return (
    <nav
      className="container relative flex items-center justify-between max-w-screen-xl mx-auto md:px-4"
      aria-label="Global"
    >
      <div className="w-1/3">
        <ul className="flex justify-around">
          {firstThreeItems
            .filter((item) => item.visible)
            .map((item) => (
              <li key={item.label}>
                <Link href={item.path}>{t(item.label)}</Link>
              </li>
            ))}
        </ul>
      </div>
      <div className="flex justify-center w-1/3">
        <Link href="/">
          <Image
            src="/vertical-logo.svg"
            alt={siteName}
            width={18}
            height={114}
            priority
          />
        </Link>
      </div>
      <div className="w-1/3">
        <ul className="flex justify-around">
          {lastThreeItems
            .filter((item) => item.visible)
            .map((item) => (
              <li
                key={item.label}
                onMouseEnter={() => setShowSubMenu(item.label)}
                onMouseLeave={() => setShowSubMenu(null)}
              >
                {item.external ? (
                  <a href={item.path} target="_blank">
                    {t(item.label)}
                  </a>
                ) : (
                  <Link href={item.path}>{t(item.label)}</Link>
                )}
                {item.children?.length > 1 && (
                  <AnimatePresence>
                    {item.label === showSubMenu && (
                      <motion.div
                        initial={{ opacity: 1, transform: 'translateY(-5px)' }}
                        animate={{ opacity: 1, transform: 'translateY(15px)' }}
                        exit={{ opacity: 0, transform: 'translateY(-5px)' }}
                        transition={{ duration: 0.2, ease: 'easeInOut' }}
                        className="absolute p-5 bg-transparent rounded-lg backdrop-blur-sm top-8 "
                      >
                        <ul className="flex flex-col gap-4">
                          {item.children.map((subItem) => (
                            <li key={subItem.path}>
                              <a
                                href={subItem.path}
                                onClick={(e) => handleClick(e, subItem.path)}
                                className="py-2 text-white hover:text-primary-color"
                              >
                                {t(subItem.label)}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </li>
            ))}
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNavigation;
