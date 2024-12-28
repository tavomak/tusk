import Layout from '@/components/Templates/Layout';
import Marquee from 'react-fast-marquee';
import VideoIframe from '@/components/Atoms/VideoIframe';

import { getProjects, getProjectBySlug } from '@/utils/lib/api';

export async function getStaticProps({ params, locale }) {
  const { slug } = params;
  const response = await getProjectBySlug(slug, [locale]);
  const data = response?.data?.project || [];
  return {
    props: {
      data,
    },
    revalidate: 100,
  };
}

export async function getStaticPaths({ locales }) {
  const response = await getProjects(locales);
  const projects = response?.data?.projects || [];
  return {
    paths: projects.map((project) => ({
      params: { slug: `/projects/${project.slug}` },
    })),
    fallback: true,
  };
}

const Project = ({ data }) => (
  <Layout
    title={data?.seoMetaData?.title}
    description={data?.seoMetaData?.description}
  >
    <section className="py-6 overflow-x-hidden lg:py-10">
      <Marquee speed={200}>
        <h1 className="flex  gap-4 text-[10vw] font-bold me-20">
          <span> {data?.title} </span>
        </h1>
      </Marquee>
    </section>
    <section className="container mx-auto max-w-screen-2xl  mt-8 lg:-mt-[58px] xl:-mt-16 ">
      <div className="mx-4 overflow-hidden rounded-xl xl:rounded-3xl">
        <VideoIframe videoId={data?.viemoId} />
      </div>
    </section>
  </Layout>
);

export default Project;
