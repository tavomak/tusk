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
          <h2 className="text-[6vw] md:text-[40px] lg:text-[50px] font-bold">
            <span>Take your </span>
            <span className="text-primary-color">Shot</span>
          </h2>
          <p className="text-[20px] md:text-[30px] lg:text-[40px] font-bold">
            Let&apos;s | Work
          </p>
          <Link href={navItems[4].path}>
            <Button className="btn btn-primary group">
              <span className="mr-2">{t('nav_contact_title')}</span>
              <span className="transition-colors duration-300 text-primary-color group-hover:text-black">
                <BrandIcon />
              </span>
            </Button>
          </Link>
        </div>
        <div className="flex justify-center">
          <div className="w-12">
            <Image
              src="/tusk_horizontal.png"
              alt="Logo"
              width={62}
              height={150}
              style={{
                width: '100%',
                height: 'auto',
                objectFit: 'contain',
              }}
              priority
            />
          </div>
        </div>
        <div className="justify-between text-center md:flex md:text-left">
          <div className="my-6 md:my-0">
            <Link href="/terms-conditions">
              <p>{t('terms_conditions')}</p>
            </Link>
            <p>
              <a href={`mailto:${siteEmail}`}>{siteEmail}</a>
            </p>
          </div>
          <div>
            <ul className="flex justify-center gap-4 mb-2">
              <li className="flex w-32 gap-2">
                <span>
                  <Image
                    src="/cl.svg"
                    alt="Chile flag"
                    width={24}
                    height={24}
                  />
                </span>
                <span>{t('footer_locations.chile')}</span>
              </li>
              <li className="flex w-32 gap-2">
                <span>
                  <Image
                    src="/pl.svg"
                    alt="Poland flag"
                    width={24}
                    height={24}
                  />
                </span>
                <span>{t('footer_locations.poland')}</span>
              </li>
              <li className="flex w-32 gap-2">
                <span>
                  <Image
                    src="/spa.svg"
                    alt="Spanish flag"
                    width={24}
                    height={24}
                  />
                </span>
                <span>{t('footer_locations.spain')}</span>
              </li>
            </ul>
            <ul className="flex justify-center gap-4">
              <li className="flex w-32 gap-2">
                <span>
                  <Image
                    src="/mx.svg"
                    alt="Mexican flag"
                    width={24}
                    height={24}
                  />
                </span>
                <span>{t('footer_locations.mexico')}</span>
              </li>
              <li className="flex w-32 gap-2">
                <span>
                  <Image
                    src="/hk.svg"
                    alt="Hong Kong flag"
                    width={24}
                    height={24}
                  />
                </span>
                <span>{t('footer_locations.hong_kong')}</span>
              </li>
              <li className="flex w-32 gap-2">
                <span>
                  <Image src="/us.svg" alt="USA flag" width={24} height={24} />
                </span>
                <span>{t('footer_locations.usa')}</span>
              </li>
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
