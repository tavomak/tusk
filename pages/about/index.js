import Layout from '@/components/Templates/Layout';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import RichContent from '@/components/Atoms/RichContent';
import { getPageBySlug, getServices, getCustomers } from '@/utils/lib/api';
import useTranslation from 'next-translate/useTranslation';

export async function getStaticProps(context) {
  const { locale } = context;
  const pageResponse = await getPageBySlug('about', [locale]);
  const servicesResponse = await getServices([locale]);
  const customersResponse = await getCustomers([locale]);
  const data = pageResponse?.data?.page || [];
  const services = servicesResponse?.data?.services || [];
  const customers = customersResponse?.data?.customers || [];
  return {
    props: {
      data,
      customers,
      services,
    },
    revalidate: 100,
  };
}

const About = ({ data, customers, services }) => {
  const { t } = useTranslation('common');
  return (
    <Layout title="About">
      <section className="py-6 overflow-x-hidden lg:py-10 min-h-[40vh] flex flex-col items-center justify-center">
        <div className="w-1/3">
          <Image
            src={data?.primaryImage?.url}
            alt={data?.primaryImage?.alt}
            width={280}
            height={100}
          />
        </div>
        <Marquee speed={200}>
          <h1 className="flex gap-4 text-[10vw] font-bold me-20">
            <span className="text-primary-color"> Design </span>
            <span>Mobile </span>
            <span>
              <i>Filmmaking</i>
            </span>
          </h1>
        </Marquee>
      </section>

      <section className="container flex flex-col justify-between gap-4 px-4 mx-auto mb-10 xl:mb-20 lg:py-10 max-w-screen-2xl xl:gap-10 lg:flex-row">
        <div className="lg:w-1/3">
          <h2 className="font-bold lg:text-4xl">{data?.whoWeAreTitle}</h2>
        </div>
        <div className="lg:w-2/3">
          <div className="mb-5">
            {data?.whoWeAreText?.[0]?.raw ? (
              <RichContent content={data?.whoWeAreText?.[0]?.raw} />
            ) : null}
          </div>
          <div className="mb-5">
            {data?.whoWeAreText?.[1]?.raw ? (
              <RichContent content={data?.whoWeAreText?.[1]?.raw} />
            ) : null}
          </div>
        </div>
      </section>

      <section className="container flex flex-col justify-between gap-4 px-4 mx-auto mb-10 xl:mb-20 lg:py-10 max-w-screen-2xl xl:gap-10 lg:flex-row">
        <div className="lg:w-1/3">
          <h3 className="text-4xl font-bold">{t('nav_services_title')}</h3>
        </div>
        <div className="lg:w-2/3">
          <ul>
            {services?.map((service) => (
              <li key={service?.id}>
                <p className="mb-10 text-2xl font-bold">{service?.title}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container px-4 mx-auto my-10 max-w-screen-2xl">
        <ul className="flex flex-col flex-wrap justify-center w-full lg:flex-row">
          {customers?.map((customer) => (
            <li className="p-6 lg:w-1/3" key={customer?.title}>
              <Image
                unoptimized
                src={customer?.logo?.url}
                alt={customer?.title}
                width={280}
                height={100}
                style={{
                  width: 'auto',
                  height: '100px',
                  objectFit: 'contain',
                }}
              />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default About;
