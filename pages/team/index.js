import { useState } from 'react';
import Image from 'next/image';
import Marquee from 'react-fast-marquee';
import { getPageBySlug } from '@/utils/lib/api';
import Layout from '@/components/Templates/Layout';
import Modal from '@/components/Templates/Modal';
import RichContent from '@/components/Atoms/RichContent';

export async function getStaticProps(context) {
  const { locale } = context;
  const dataResponse = await getPageBySlug('team', [locale]);
  const data = dataResponse?.data?.page || [];
  return {
    props: {
      data,
    },
    revalidate: 100,
  };
}

const Team = ({ data }) => {
  const [modal, setModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const handleClick = (e, item) => {
    e.preventDefault();
    setSelectedItem(item);
    setModal(true);
  };
  const handleClickModal = (e) => {
    e.preventDefault();
    setModal(false);
    setSelectedItem(null);
  };
  return (
    <Layout
      title={data?.seoMetaData?.title}
      description={data?.seoMetaData?.description}
    >
      <section className="py-6 overflow-x-hidden lg:py-10 min-h-[40vh] flex flex-col items-center justify-center">
        <Marquee speed={200}>
          <h1 className="flex gap-4 py-6 text-6xl font-bold 2xl:text-9xl me-20">
            <span> {data?.title} </span>
            <span>- {data?.title} -</span>
            <span> {data?.title} </span>
          </h1>
        </Marquee>
      </section>

      <section className="container max-w-screen-xl px-4 mx-auto">
        <div className="space-x-4 space-y-8 sm:columns-2 md:columns-3 xl:columns-4">
          {data?.team?.length > 0 &&
            data?.team?.map((item) => (
              <a
                key={item.id}
                className="relative block border cursor-pointer group border-neutral-800 rounded-xl"
                onClick={(e) => handleClick(e, item)}
                href="!#"
              >
                <div className="inset-0 block transition-all duration-300 opacity-0 md:absolute bg-emerald-950 overlay group-hover:opacity-50 rounded-xl" />
                <Image
                  src={item?.image?.url}
                  alt={item?.name}
                  width={390}
                  height={390}
                  className="w-full shadow rounded-xl"
                  priority
                />
                <div className="inset-0 p-4 text-white md:justify-end group-hover:flex-col md:hidden md:absolute group-hover:flex">
                  <h3 className="text-xl font-bold">{item.name}</h3>
                  <p className="text-sm font-bold">{item.position}</p>
                  <p className="text-sm">{item.email}</p>
                </div>
              </a>
            ))}
        </div>
      </section>

      <Modal onClick={handleClickModal} showModal={modal} size="xl">
        {selectedItem && (
          <div className="relative block px-4 mb-4 sm:px-6 lg:px-8">
            {/* <span className="absolute inset-x-0 top-0 h-1 bg-primary-color" />
            <span className="absolute inset-x-0 bottom-0 h-1 bg-primary-color" /> */}

            <div className="py-4 mb-4 sm:flex sm:justify-around sm:items-center sm:gap-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 sm:text-4xl">
                  {selectedItem.name}
                </h3>

                <p className="text-gray-600 mt-1font-medium">
                  {selectedItem.position}
                </p>
              </div>

              <div className="hidden sm:block sm:shrink-0">
                <Image
                  src={selectedItem.image.url}
                  alt={selectedItem.name}
                  width={250}
                  height={250}
                  className="rounded-xl"
                  style={{
                    width: '250px',
                    height: '250px',
                    objectFit: 'cover',
                    objectPosition: 'center center',
                  }}
                />
              </div>
            </div>
            <div className="inset-x-0 h-1 bg-primary-color" />
            <div className="py-4 text-black ">
              <RichContent content={selectedItem.biography.raw} />
            </div>
          </div>
        )}
      </Modal>
    </Layout>
  );
};

export default Team;
