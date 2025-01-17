import Image from 'next/image';
import Link from 'next/link';
import Hamburger from '@/components/Atoms/Hamburger';
import useTranslation from 'next-translate/useTranslation';
import LanguageSwitcher from '@/components/Atoms/LanguageSwitcher';
import { siteName } from '@/utils';

const MobileNavigation = ({
  menuOpen = false,
  setMenuOpen,
  navItems,
  handleClick,
  image,
}) => {
  const { t } = useTranslation('common');
  return (
    <nav
      className="container relative flex items-center justify-between mx-auto md:px-4"
      aria-label="Global"
    >
      <Link href="/">
        <Image
          src={image}
          alt={siteName}
          width={120}
          height={36}
          priority
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </Link>
      <Hamburger open={menuOpen} setOpen={setMenuOpen} />
      <ul
        className={`ps-8 flex flex-col gap-1 justify-center fixed w-screen h-screen left-0 top-0 transition-all bg-black bg-opacity-95 ${menuOpen ? 'top-0' : 'top-[-120%]'}`}
      >
        {navItems
          .filter((item) => item.label !== 'Factoring')
          .map((item) => (
            <li className="text-xl font-bold" key={item.label}>
              {item.children?.length > 1 ? (
                <>
                  {item.children.map((subItem) => (
                    <a
                      key={subItem.path}
                      href={subItem.path}
                      onClick={(e) => {
                        setMenuOpen(false);
                        handleClick(e, subItem.label, subItem.path);
                      }}
                    >
                      <p className="mb-1">{t(subItem.label)}</p>
                    </a>
                  ))}
                </>
              ) : (
                <Link href={item.path}>
                  <p className="mb-1">{t(item.label)}</p>
                </Link>
              )}
            </li>
          ))}
        <li className="mb-5 text-xl font-bold">
          <a href="https://tusk.shiftcam.com/" target="_blank">
            Store
          </a>
        </li>
        <li>
          <LanguageSwitcher />
        </li>
      </ul>
    </nav>
  );
};

export default MobileNavigation;
