import Image from 'next/image';
import Link from 'next/link';
import useTranslation from 'next-translate/useTranslation';
import Layout from '@/components/Templates/Layout';
import Marquee from 'react-fast-marquee';
import { getPageBySlug, getProjects } from '@/utils/lib/api';

export async function getStaticProps(context) {
  const { locale } = context;
  const pageResponse = await getPageBySlug('projects', [locale]);
  const projectsResponse = await getProjects([locale]);
  const data = pageResponse?.data?.page || [];
  const projects = projectsResponse?.data?.projects || [];
  return {
    props: {
      data,
      projects,
    },
    revalidate: 100,
  };
}

const Projects = ({ data, projects }) => {
  const { lang } = useTranslation();
  return (
    <Layout
      title={data?.seoMetaData?.title}
      description={data?.seoMetaData?.description}
    >
      <section className="py-6 overflow-x-hidden lg:py-10 min-h-[40vh] flex flex-col items-center justify-center">
        <Marquee speed={200}>
          <h1 className="flex gap-4 py-6 text-6xl font-bold 2xl:text-9xl me-20">
            <span> {data?.title} </span>
          </h1>
        </Marquee>
      </section>
      <section className="container px-4 mx-auto max-w-screen-2xl">
        <div className="gap-12 space-y-4 columns-2 md:columns-3">
          {projects.map((project) => (
            <Link
              key={project?.id}
              href={`${lang === 'es' ? '' : 'en'}/projects/${project?.slug}`}
              className="flex flex-col group"
            >
              <Image
                src={project?.primaryImage?.url}
                alt={project?.title}
                width={300}
                height={300}
                className="transition-all duration-300 shadow rounded-xl hover:scale-105"
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
    </Layout>
  );
};

export default Projects;
