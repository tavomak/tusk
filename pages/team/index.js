import Image from 'next/image';
import Layout from '@/components/Templates/Layout';
import Marquee from 'react-fast-marquee';
import { getPageBySlug, getTeam } from '@/utils/lib/api';

export async function getStaticProps(context) {
  const { locale } = context;
  const dataResponse = await getPageBySlug('team', [locale]);
  const teamResponse = await getTeam([locale]);
  const data = dataResponse?.data?.page || [];
  const team = teamResponse?.data?.teams || [];
  return {
    props: {
      data,
      team,
    },
    revalidate: 100,
  };
}

const Team = ({ data, team }) => {
  console.log({ data, team });
  return (
    <Layout
      title={data?.seoMetaData?.title}
      description={data?.seoMetaData?.description}
    >
      <section className="py-6 overflow-x-hidden lg:py-10 min-h-[40vh] flex flex-col items-center justify-center">
        <Marquee speed={200}>
          <h1 className="flex  gap-4 text-[10vw] font-bold me-20">
            <span> {data?.title} </span>
            <span>- {data?.title} -</span>
            <span> {data?.title} -</span>
          </h1>
        </Marquee>
      </section>

      <section className="container px-4 mx-auto max-w-screen-2xl">
        <div className="gap-4 space-y-4 sm:columns-2 md:columns-3 xl:columns-4">
          {team?.length > 0 &&
            team.map((item) => (
              <div key={item.id} className="relative cursor-pointer group">
                <div className="inset-0 block transition-all duration-300 opacity-0 md:absolute bg-emerald-950 overlay group-hover:opacity-50" />
                <Image
                  src={item.image.url}
                  alt={item.name}
                  width={390}
                  height={390}
                  className="w-full shadow rounded-xl"
                />
                <div className="inset-0 p-4 text-white md:justify-end group-hover:flex-col md:hidden md:absolute group-hover:flex">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-sm font-bold">{item.position}</p>
                  <p className="text-sm">{item.email}</p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </Layout>
  );
};

export default Team;
