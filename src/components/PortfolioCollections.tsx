import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';
import { MediaLightbox } from './MediaLightbox';

type SectionKey = 'video-editing' | 'graphic-design' | 'branding';

const categoryLabels: Record<SectionKey, string> = {
  'video-editing': 'Video Editing',
  'graphic-design': 'Graphic Design',
  branding: 'Branding'
};

function MediaSection({
  id,
  title,
  items
}: {
  id: SectionKey;
  title: string;
  items: any[];
}) {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);

  return (
    <section className="section-shell bg-brand-light py-14 sm:py-20" id={id}>
      <div className="container-boxed">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="section-kicker">
              <Sparkles size={12} />
              Category
            </div>
            <h2 className="section-title">{title}</h2>
          </div>
          <p className="section-copy max-w-md">
            A deeper section of the portfolio, kept intact but framed with better spacing and a more premium gallery rhythm.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {items.map((item: any, idx: number) => (
              <motion.button
                key={`${id}-${idx}`}
                type="button"
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: '-80px' }}
                onClick={() => setSelectedMedia(item)}
                whileHover={{ y: -3 }}
                className="premium-card group relative aspect-[3/4] cursor-pointer overflow-hidden border-0 p-0 text-left sm:aspect-square"
                aria-label={`Open ${item.title || title} preview`}
              >
                <img
                  src={item.type === 'video' ? item.poster : item.src}
                  alt={item.title || title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(20,20,20,0.02),rgba(20,20,20,0.12))] transition-opacity duration-300 group-hover:opacity-70" />
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {selectedMedia && <MediaLightbox item={selectedMedia} onClose={() => setSelectedMedia(null)} />}
    </section>
  );
}

export function PortfolioCollections({ collections }: { collections: Record<string, any[]> }) {
  const videoEditing = collections['video-editing'] || [];
  const graphicDesign = collections['graphic-design'] || [];
  const branding = collections['branding'] || [];

  return (
    <>
      <MediaSection id="video-editing" title={categoryLabels['video-editing']} items={videoEditing} />
      <MediaSection id="graphic-design" title={categoryLabels['graphic-design']} items={graphicDesign} />
      <MediaSection id="branding" title={categoryLabels.branding} items={branding} />
    </>
  );
}
