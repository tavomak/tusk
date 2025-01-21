import Image from 'next/image';
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
  const { t, lang } = useTranslation('common');
  return (
    <Layout
      title={data?.seoMetaData?.title}
      description={data?.seoMetaData?.description}
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
            <span className="text-primary-color"> Mobile </span>
            <span>Design </span>
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
          <VideoIframe videoId={lang === 'es' ? '1047514385' : '1047513077'} />
        </div>
      </section>

      {data?.sections?.map((section) => (
        <section
          key={section?.id}
          className="container flex flex-col justify-between max-w-screen-xl gap-4 px-4 mx-auto mb-10 xl:mb-20 lg:py-10 xl:gap-10 lg:flex-row"
        >
          <div className="lg:w-1/3">
            <h2 className="font-bold lg:text-4xl">{section?.title}</h2>
          </div>
          <div className="lg:w-2/3">
            <RichContent content={section?.content?.json} />
          </div>
        </section>
      ))}

      <section className="container flex justify-end max-w-screen-xl px-4 mx-auto mb-10">
        <div className="lg:w-2/3">
          <ul className="flex flex-wrap items-center justify-center w-full">
            {data?.logos?.slice(0, 6)?.map((logo) => (
              <li className="w-1/2 px-6 mb-5 md:w-1/3" key={logo?.id}>
                <Image
                  src={logo?.logo?.url}
                  alt={logo?.title}
                  width={280}
                  height={100}
                  style={{
                    width: '100%',
                    height: '100px',
                    maxHeight: '90px',
                    objectFit: 'contain',
                  }}
                />
              </li>
            ))}
          </ul>
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
