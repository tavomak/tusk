import Image from 'next/image';
import Link from 'next/link';
import { getPageBySlug, getCustomers, getProjects } from '@/utils/lib/api';
import { socialMedia } from '@/utils/constants';
import { AdvancedVideo } from '@cloudinary/react';
import { Cloudinary } from '@cloudinary/url-gen';
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
  const customersResponse = await getCustomers([locale]);
  const projectsResponse = await getProjects([locale]);
  const data = response?.data?.page || [];
  const customers = customersResponse?.data?.customers || [];
  const projects = projectsResponse?.data?.projects || [];

  return {
    props: {
      data,
      customers,
      projects,
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

const cld = new Cloudinary({
  cloud: {
    cloudName: 'dztujbt99',
  },
});

const sectionVideo = cld.video('tusk_-_why-1080p_rdrser');

const Home = ({ data, customers, projects }) => {
  const { t } = useTranslation('common');
  return (
    <Layout
      title={data?.seoMetaData?.title}
      description={data?.seoMetaData?.description}
      schema={structuredData}
    >
      <section className="container mx-auto max-w-screen-2xl  mt-8 lg:-mt-[58px] xl:-mt-16 ">
        <div className="mx-4 overflow-hidden rounded-xl xl:rounded-3xl">
          <VideoIframe videoId={data?.primaryVideo} />
        </div>
      </section>

      <section className="py-6 overflow-x-hidden lg:py-10">
        <Marquee speed={200}>
          <h1 className="flex  gap-4 text-[10vw] font-bold me-20">
            <span className="text-primary-color"> Design </span>
            <span>Mobile </span>
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

      <section className="container px-4 py-10 mx-auto xl:py-20 max-w-screen-2xl">
        <div className="overflow-hidden rounded-xl xl:rounded-3xl">
          <AdvancedVideo
            cldVid={sectionVideo}
            autoPlay
            loop
            muted
            playsInline
          />
        </div>
      </section>

      <section className="container flex flex-col justify-between gap-4 px-4 mx-auto mb-10 xl:mb-20 lg:py-10 max-w-screen-2xl xl:gap-10 lg:flex-row">
        <div className="lg:w-1/3">
          <h3 className="text-4xl font-bold">{t('who_we_are_title')}</h3>
        </div>
        <div className="lg:w-2/3">
          <div className="mb-5">
            <RichContent content={data?.whoWeAreText?.[0]?.raw} />
          </div>
          <div className="mb-5">
            <RichContent content={data?.whoWeAreText?.[1]?.raw} />
          </div>
          <ul className="flex flex-wrap items-center justify-center w-full">
            {customers?.slice(0, 6)?.map((customer) => (
              <li className="w-1/3 px-6" key={customer?.title}>
                <Image
                  src={customer?.logo?.url}
                  alt={customer?.title}
                  width={280}
                  height={100}
                  className="w-full lg:p-6"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container px-4 mx-auto mb-10 max-w-screen-2xl">
        <ScrollTriggered items={projects} />
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
