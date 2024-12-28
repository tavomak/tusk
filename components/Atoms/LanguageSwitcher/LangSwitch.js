import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import i18nConfig from '@/i18n.json';

const { locales } = i18nConfig;
const flagIcons = {
  en: 'eng',
  es: 'spa',
};

export default function LanguageSwitcher() {
  const { lang } = useTranslation();

  return locales.map((lng) => {
    if (lng === lang) return null;

    return (
      <Link href="/" locale={lng} key={lng} className="z-20">
        <ul className="flex items-center gap-2">
          <li>
            <Image
              src={`/${flagIcons[lng]}.svg`}
              alt={`${lng} flag`}
              width={32}
              height={32}
            />
          </li>
          <li>
            <span className="uppercase">{lng}</span>
          </li>
        </ul>
      </Link>
    );
  });
}
