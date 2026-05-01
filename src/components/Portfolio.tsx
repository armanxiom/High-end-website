/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Play } from 'lucide-react';
import { useMemo, useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { useRevealOnView } from '../hooks/useRevealOnView';
import { MediaLightbox } from './MediaLightbox';

const resultLines = [
  'Sharp creative framing for stronger first impressions.',
  'Built to elevate perception and hold attention longer.',
  'A cleaner visual narrative for premium launches.',
  'Tailored to make the brand look established quickly.',
  'Designed to carry trust through every scroll.',
  'Focused on clarity, conversion, and polish.'
];

export const Portfolio = () => {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const { ref, isVisible } = useRevealOnView<HTMLElement>();
  const featuredWorks = siteConfig.featuredWorks.slice(0, 6);

  const cards = useMemo(
    () =>
      featuredWorks.map((item, index) => ({
        ...item,
        resultLine: resultLines[index % resultLines.length]
      })),
    [featuredWorks]
  );

  return (
    <motion.section
      ref={ref}
      className="section-shell bg-white py-20 md:py-28"
      id="work"
      initial={{ opacity: 0, y: 18 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-boxed">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <span className="section-kicker">Featured work</span>
            <h2 className="section-title">Case-study framing for the strongest proofs.</h2>
          </div>
          <p className="section-copy max-w-md">
            Each card behaves like a miniature case study: title, category, and context line together create a more expensive feeling than a plain thumbnail grid.
          </p>
        </div>
      </div>

      <div className="container-boxed mt-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-12">
          {cards.map((item, index) => {
            const layoutClass =
              index === 0
                ? 'xl:col-span-7 xl:row-span-2 aspect-[4/5] xl:aspect-auto'
                : index === 1
                  ? 'xl:col-span-5 aspect-[4/5]'
                  : index === 2
                    ? 'xl:col-span-4 aspect-[4/5]'
                    : index === 3
                      ? 'xl:col-span-4 aspect-[4/5]'
                      : index === 4
                        ? 'xl:col-span-4 aspect-[4/5]'
                        : 'xl:col-span-4 aspect-[4/5]';

            return (
              <motion.article
                key={`${item.title}-${index}`}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.72, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                onClick={() => setSelectedMedia(item)}
                className={`premium-card group relative overflow-hidden ${layoutClass}`}
              >
                <div className="absolute inset-0">
                  {item.type === 'video' ? (
                    index === 0 ? (
                      <video
                        src={item.src}
                        poster={item.poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                      />
                    ) : (
                      <img
                        src={item.poster}
                        alt={item.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                      />
                    )
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(20,20,20,0.05)_38%,rgba(20,20,20,0.58)_100%)]" />
                <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[linear-gradient(180deg,rgba(255,106,0,0.08),rgba(20,20,20,0.18))]" />

                <div className="absolute left-4 right-4 top-4 flex items-center justify-between gap-3">
                  <span className="badge-pill bg-white/90 backdrop-blur">{item.category || 'Selected work'}</span>
                  {item.type === 'video' && (
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-105">
                      <Play size={14} className="fill-current" />
                    </span>
                  )}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
                  <div className="mb-3 inline-flex rounded-full border border-white/20 bg-white/12 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/88 backdrop-blur-sm">
                    Project {String(index + 1).padStart(2, '0')}
                  </div>
                  <h3 className="text-[1.45rem] font-black uppercase leading-[0.95] tracking-[-0.045em] text-white md:text-[1.8rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-white/78">
                    {item.resultLine}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>

      {selectedMedia && <MediaLightbox item={selectedMedia} onClose={() => setSelectedMedia(null)} />}
    </motion.section>
  );
};
