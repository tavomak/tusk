import Link from 'next/link';
import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import LanguageSwitcher from '@/components/Atoms/LanguageSwitcher';
import { siteName } from '@/utils';

const DesktopNavigation = ({ navItems }) => {
  const { t } = useTranslation('common');
  const firstThreeItems = navItems.slice(0, 3);
  const lastThreeItems = navItems.slice(3, 5);
  return (
    <nav
      className="container relative flex items-center justify-between max-w-screen-xl mx-auto md:px-4"
      aria-label="Global"
    >
      <div className="w-1/3">
        <ul className="flex justify-around">
          {firstThreeItems.map((item) => (
            <li key={item.label}>
              <Link href={item.path}>{t(item.label)}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex justify-center w-1/3">
        <Link href="/">
          <Image
            src="/menu-logo.svg"
            alt={siteName}
            width={220}
            height={56}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
            priority
          />
        </Link>
      </div>
      <div className="w-1/3">
        <ul className="flex justify-around">
          {lastThreeItems.map((item) => (
            <li key={item.label}>
              <Link href={item.path}>{t(item.label)}</Link>
            </li>
          ))}
          <li>
            <a href="https://tusk.shiftcam.com/" target="_blank">
              Store
            </a>
          </li>
          <li>
            <LanguageSwitcher />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default DesktopNavigation;
