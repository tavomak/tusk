import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
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
          width={1280}
          height={500}
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
    {items.map(({ title, primaryImage }) => (
      <Item title={title} primaryImage={primaryImage} key={title} />
    ))}
  </section>
);

export default ScrollTriggered;
