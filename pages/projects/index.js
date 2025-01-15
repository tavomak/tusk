import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Layout from '@/components/Templates/Layout';
import Marquee from 'react-fast-marquee';
import { getPageBySlug, getProjects, getCustomers } from '@/utils/lib/api';

export async function getStaticProps(context) {
  const { locale } = context;
  const pageResponse = await getPageBySlug('projects', [locale]);
  const data = pageResponse?.data?.page || [];
  const projectsResponse = await getProjects([locale]);
  const projects = projectsResponse?.data?.projects || [];
  const customersResponse = await getCustomers([locale]);
  const customers = customersResponse?.data?.customers || [];
  return {
    props: {
      data,
      projects,
      customers,
    },
    revalidate: 100,
  };
}

const Projects = ({ data, projects, customers }) => {
  const { lang } = useTranslation();
  const { t } = useTranslation('common');
  return (
    <Layout
      title={data?.seoMetaData?.title}
      description={data?.seoMetaData?.description}
    >
      <section className="py-6 overflow-x-hidden lg:py-10 min-h-[40vh] flex flex-col items-center justify-center">
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
      <section className="container px-4 mx-auto max-w-screen-2xl">
        <div className="flex-wrap w-full md:flex">
          {projects.map((project) => (
            <Link
              key={project?.id}
              href={`${lang === 'es' ? '' : 'en'}/projects/${project?.slug}`}
              className="flex flex-col p-4 mb-5 md:w-3/6 lg:w-2/6 group"
            >
              <Image
                src={project?.primaryImage?.url}
                alt={project?.title}
                width={project?.primaryImage?.width || 300}
                height={project?.primaryImage?.height || 300}
                className="transition-all duration-300 border shadow rounded-xl hover:scale-105 border-neutral-800"
                priority
                style={{
                  height: '300px',
                  width: '100%',
                  objectFit: 'cover',
                }}
              />
              <h3 className="mt-4 text-xl font-bold transition-all duration-300 group-hover:text-primary-color">
                {project?.title}
              </h3>
            </Link>
          ))}
        </div>
      </section>
      <section className="container flex flex-col justify-between gap-4 px-4 mx-auto mt-10 xl:mt-20 lg:py-10 max-w-screen-2xl xl:gap-10 lg:flex-row">
        <div className="lg:w-1/3">
          <h2 className="font-bold lg:text-4xl">{t('our_customers')}</h2>
        </div>
        <div className="lg:w-2/3">
          <div className="mb-5" />
        </div>
      </section>
      <section className="container px-4 mx-auto my-10 max-w-screen-2xl">
        <ul className="flex flex-col flex-wrap items-center justify-center w-full lg:flex-row">
          {customers?.map((customer) => (
            <li className="p-12 lg:w-3/12" key={customer?.title}>
              <Image
                src={customer?.logo?.url}
                alt={customer?.title}
                width={customer?.logo?.width || 280}
                height={customer?.logo?.height || 100}
                priority
                className="object-contain w-full lg:p-6 max-h-40"
              />
            </li>
          ))}
        </ul>
      </section>
    </Layout>
  );
};

export default Projects;
