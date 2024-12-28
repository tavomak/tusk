import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import { FaLinkedin, FaInstagram } from 'react-icons/fa6';
import { siteName, siteEmail, socialMedia } from '@/utils/constants';
import { navItems } from '@/utils';
import Button from '@/components/Atoms/Button';
import BrandIcon from '@/components/Atoms/BrandIcon';

const Footer = () => {
  const { t } = useTranslation('common');
  return (
    <footer className="text-white bg-gradient-to-r from-dark-blue to-purple">
      <div className="px-4 py-16 mx-auto md:container sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-4 mb-16">
          <h2 className="text-[12vw] md:text-[80px] lg:text-[100px] font-bold">
            <span>Take you </span>
            <span className="text-primary-color">Shot</span>
          </h2>
          <p className="text-[40px] md:text-[60px] lg:text-[80px] font-bold">
            Let&apos;s | Work
          </p>
          <Link href={navItems[4].path}>
            <Button className="btn btn-primary group">
              <span className="mr-2">{siteEmail}</span>
              <span className="transition-colors duration-300 text-primary-color group-hover:text-black">
                <BrandIcon />
              </span>
            </Button>
          </Link>
        </div>
        <div className="flex justify-center">
          <Image
            src="/vertical-logo.svg"
            alt="Logo"
            width={100}
            height={100}
            style={{
              height: '160px',
              width: 'auto',
            }}
            priority
          />
        </div>
        <div className="justify-between text-center md:flex md:text-left">
          <div className="my-6 md:my-0">
            <p>Privacy Notice</p>
            <p>
              <a href={`mailto:${siteEmail}`}>{siteEmail}</a>
            </p>
          </div>
          <div>
            <ul className="flex justify-center gap-4">
              <li className="w-24">Chile</li>
              <li className="w-24">Poland</li>
              <li className="w-24">Spain</li>
            </ul>
            <ul className="flex justify-center gap-4">
              <li className="w-24">Mexico</li>
              <li className="w-24">Hong Kong</li>
              <li className="w-24">USA</li>
            </ul>
          </div>
        </div>
        <div className="pt-4">
          <div className="text-center">
            <ul className="flex justify-center gap-4 py-4 text-2xl">
              <li>
                <a
                  href={socialMedia.instagram}
                  target="_blank"
                  className="transition hover:opacity-75"
                >
                  <FaInstagram />
                </a>
              </li>
              <li>
                <a
                  href={socialMedia.linkedin}
                  target="_blank"
                  className="transition hover:opacity-75"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
            <p className="text-base text-white">
              &copy; {new Date().getFullYear()} {siteName}.{' '}
              {t('footer_copyright')}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
