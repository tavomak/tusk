import Image from 'next/image';
import Layout from '@/components/Templates/Layout';
import Marquee from 'react-fast-marquee';
import { getPageBySlug } from '@/utils/lib/api';
import ContactForm from '@/components/Molecules/ContactForm';

export async function getStaticProps(context) {
  const { locale } = context;
  const response = await getPageBySlug('contact', [locale]);
  const data = response?.data?.page || [];
  return {
    props: {
      data,
    },
    revalidate: 100,
  };
}

const Contact = ({ data }) => (
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

    <section className="container flex px-4 mx-auto max-w-screen-2xl">
      <div className="w-1/3 px-6">
        {data?.primaryImage?.url && (
          <Image
            src={data?.primaryImage?.url}
            alt={data?.primaryImage?.alt}
            width={280}
            height={100}
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'contain',
            }}
          />
        )}
      </div>

      <div className="w-2/3">
        <ContactForm />
      </div>
    </section>
  </Layout>
);

export default Contact;
