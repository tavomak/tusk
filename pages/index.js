import Link from 'next/link';
import { getPageBySlug } from '@/utils/lib/api';
import { socialMedia } from '@/utils/constants';
import useTranslation from 'next-translate/useTranslation';

import Marquee from 'react-fast-marquee';
import Layout from '@/components/Templates/Layout';
import VideoIframe from '@/components/Atoms/VideoIframe';
import RichContent from '@/components/Atoms/RichContent';
import ScrollTriggered from '@/components/Atoms/ScrollTriggered';
import Button from '@/components/Atoms/Button';
import BrandIcon from '@/components/Atoms/BrandIcon';

export async function getStaticProps(context) {
  const { locale } = context;
  const response = await getPageBySlug('home', [locale]);
  const data = response?.data?.page || [];

  return {
    props: {
      data,
    },
    revalidate: 100,
  };
}

const structuredData = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  url: 'https://www.tuskcontent.com/',
  logo: 'https://www.tuskcontent.com/horizontal-logo.jpg',
  name: 'Tuskcontent',
  legalName: 'Tuskcontent',
  sameAs: [socialMedia.linkedin, socialMedia.instagram],
};

const Home = ({ data }) => {
  const { t } = useTranslation('common');
  return (
    <Layout
      title={data?.seoMetadata?.title}
      description={data?.seoMetadata?.seoDescription}
      image={data?.seoMetadata?.seoImage?.url}
      schema={structuredData}
    >
      <section className="container mx-auto max-w-screen-2xl mt-8 lg:-mt-[58px] xl:-mt-16 ">
        <div className="mx-4 overflow-hidden border rounded-xl xl:rounded-3xl border-neutral-800">
          <VideoIframe videoId={data?.primaryVideo} />
        </div>
      </section>

      <section className="py-6 overflow-x-hidden lg:py-10">
        <Marquee speed={200}>
          <h1 className="flex gap-4 py-6 text-6xl font-bold 2xl:text-9xl me-20">
            <span> Mobile </span>
            <span className="text-primary-color">Design </span>
            <span>
              <i>Filmmaking</i>
            </span>
          </h1>
        </Marquee>
      </section>

      <section className="container flex flex-col justify-between gap-4 px-4 mx-auto xl:gap-10 lg:flex-row">
        <div className="lg:w-1/2">
          <div className="my-5">
            <RichContent content={data?.twoColumnsText?.[0]?.raw} />
          </div>
        </div>
        <div className="lg:w-1/2">
          <div className="my-5">
            <RichContent content={data?.twoColumnsText?.[1]?.raw} />
          </div>
        </div>
      </section>

      <section className="container max-w-screen-xl px-4 py-10 mx-auto xl:py-20">
        <div className="overflow-hidden border rounded-xl xl:rounded-3xl border-neutral-800">
          <VideoIframe videoId={data?.secondVideo} />
        </div>
      </section>

      {data?.sections?.map((section) => (
        <section
          key={section?.id}
          className="container flex flex-col justify-between max-w-screen-xl gap-4 px-4 mx-auto lg:py-10 xl:gap-10 lg:flex-row"
        >
          <div className="lg:w-1/3">
            <h2 className="font-bold lg:text-4xl">{section?.title}</h2>
          </div>
          <div className="lg:w-2/3">
            <RichContent content={section?.content?.json} />
          </div>
        </section>
      ))}

      <section className="container flex flex-col justify-between max-w-screen-xl gap-4 px-4 mx-auto mb-10 xl:mb-20 xl:gap-10 lg:flex-row">
        <div className="lg:w-1/3" />
        <div className="lg:w-2/3">
          <h2 className="flex gap-2 py-6 text-xl font-bold lg:gap-4 md:text-4xl lg:me-20">
            <span className="text-primary-color"> Focus </span>
            <span>for your </span>
            <span>
              <i>creativity</i>
            </span>
          </h2>
          <Link href="/team">
            <Button className="btn btn-primary group">
              <span className="mr-2">{t('nav_team_title')}</span>
              <span className="transition-colors duration-300 text-primary-color group-hover:text-black">
                <BrandIcon />
              </span>
            </Button>
          </Link>
        </div>
      </section>

      <section className="container max-w-screen-xl px-4 mx-auto mb-10">
        {data?.projects && <ScrollTriggered items={data?.projects} />}
        <div className="flex justify-center">
          <Link href="/projects">
            <Button className="btn btn-primary">
              {t('view_all_projects')}
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
};

export default Home;
