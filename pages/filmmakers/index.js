import { useState } from 'react';
import Marquee from 'react-fast-marquee';
import { getPageBySlug } from '@/utils/lib/api';
import Layout from '@/components/Templates/Layout';
import Modal from '@/components/Templates/Modal';
import Card from '@/components/Molecules/Card';
import BioDetail from '@/components/Molecules/BioDetail';

export async function getStaticProps(context) {
  const { locale } = context;
  const dataResponse = await getPageBySlug('filmmakers', [locale]);
  const data = dataResponse?.data?.page || [];
  return {
    props: {
      data,
    },
    revalidate: 100,
  };
}

const Filmmakers = ({ data }) => {
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
            <span> Filmmakers </span>
            <span>- Filmmakers -</span>
            <span> Filmmakers </span>
          </h1>
        </Marquee>
      </section>

      <section className="container max-w-screen-xl px-4 mx-auto">
        <div className="space-x-4 space-y-8 sm:columns-2 md:columns-3 xl:columns-4">
          {data?.team?.length > 0 &&
            data?.team
              ?.slice(2, 6)
              ?.map((item) => (
                <Card key={item.id} item={item} handleClick={handleClick} />
              ))}
        </div>
      </section>

      <Modal onClick={handleClickModal} showModal={modal} size="xl">
        {selectedItem && <BioDetail item={selectedItem} />}
      </Modal>
    </Layout>
  );
};

export default Filmmakers;
