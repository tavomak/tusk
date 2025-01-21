import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';

const Item = ({ title, primaryImage }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'start start'],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  return (
    <div ref={ref} className="sticky top-0 mb-10 xl:mb-20">
      <motion.div
        style={{
          scale,
          transition: 'ease-in-out',
        }}
        className="overflow-hidden border rounded-lg xl:rounded-3xl border-neutral-800"
      >
        <Image
          src={primaryImage?.url}
          alt={`Image ${title}`}
          width={primaryImage?.width || 1440}
          height={primaryImage?.height || 810}
          priority
          style={{
            width: '100%',
            height: 'auto',
          }}
        />
      </motion.div>
    </div>
  );
};

const ScrollTriggered = ({ items }) => (
  <section>
    {items.map((project) => (
      <Link href={`/projects/${project.slug}`} key={project.title}>
        <Item title={project.title} primaryImage={project.primaryImage} />
      </Link>
    ))}
  </section>
);

export default ScrollTriggered;
