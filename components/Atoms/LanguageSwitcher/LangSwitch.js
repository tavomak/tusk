import Image from 'next/image';
import useTranslation from 'next-translate/useTranslation';
import i18nConfig from '@/i18n.json';
import setLanguage from 'next-translate/setLanguage';
import { flagIconsMapping, languages } from '@/utils';
import Button from '@/components/Atoms/Button';

const { locales } = i18nConfig;

const LanguageSwitcher = () => {
  const { lang } = useTranslation();

  const handleLanguageChange = async (lng) => {
    await setLanguage(lng === languages.es ? languages.en : languages.es);
  };

  return locales.map((lng) =>
    lng === lang ? (
      <Button
        onClick={() => handleLanguageChange(lng)}
        locale={lng}
        key={lng}
        className="z-20"
      >
        <ul className="flex items-center gap-2">
          <li>
            <Image
              src={`/${flagIconsMapping[lng]}.svg`}
              alt={`${lng} flag`}
              width={32}
              height={32}
            />
          </li>
          <li>
            <span className="uppercase">{lng}</span>
          </li>
        </ul>
      </Button>
    ) : null
  );
};

export default LanguageSwitcher;
