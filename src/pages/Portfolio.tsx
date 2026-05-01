import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useLocation } from 'react-router-dom';
import { Play, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { MediaLightbox } from '../components/MediaLightbox';

type SectionKey = 'video-editing' | 'graphic-design' | 'branding';

const categoryLabels: Record<SectionKey, string> = {
  'video-editing': 'Video Editing',
  'graphic-design': 'Graphic Design',
  branding: 'Branding'
};

const categoryOrder: SectionKey[] = ['video-editing', 'graphic-design', 'branding'];

function CollectionSection({
  id,
  title,
  items,
  active,
  registerRef,
  onSelect
}: {
  id: SectionKey;
  title: string;
  items: any[];
  active: boolean;
  registerRef: (node: HTMLElement | null) => void;
  onSelect: (item: any) => void;
}) {
  return (
    <motion.section
      ref={registerRef}
      id={id}
      className={`section-shell scroll-mt-32 py-14 sm:py-20 ${active ? 'bg-brand-orange-soft/60' : 'bg-brand-light'}`}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, margin: '-80px' }}
    >
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
            The deeper collection view keeps every existing asset but frames it in a cleaner, more premium gallery rhythm.
          </p>
        </div>

        <div className="mt-10">
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {items.map((item: any, idx: number) => (
              <motion.button
                key={`${id}-${idx}`}
                type="button"
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true, margin: '-80px' }}
                onClick={() => onSelect(item)}
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
    </motion.section>
  );
}

export default function Portfolio() {
  const [selectedMedia, setSelectedMedia] = useState<any>(null);
  const [activeSection, setActiveSection] = useState<SectionKey | null>(null);
  const sectionRefs = useRef<Partial<Record<SectionKey, HTMLElement | null>>>({});
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const category = new URLSearchParams(location.search).get('category');
    const normalized = category && categoryOrder.includes(category as SectionKey) ? (category as SectionKey) : null;

    setActiveSection(normalized);

    if (!normalized) return;

    const target = sectionRefs.current[normalized];
    if (!target) return;

    const timer = window.setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 120);

    const highlightTimer = window.setTimeout(() => {
      setActiveSection(null);
    }, 1800);

    return () => {
      window.clearTimeout(timer);
      window.clearTimeout(highlightTimer);
    };
  }, [location.search]);

  const { hero } = siteConfig.portfolioPage;
  const showreel = siteConfig.showreel;
  const works = siteConfig.featuredWorks;
  const logos = (siteConfig as any).logos || [];
  const collections = (siteConfig as any).portfolioCollections || {};

  const workCards = useMemo(
    () =>
      works.map((item: any, index: number) => ({
        ...item,
        caption:
          index === 0
            ? 'Premium positioning with a stronger first impression.'
            : index === 1
              ? 'Built to hold attention and frame the product better.'
              : index === 2
                ? 'Cleaner detail and a more credible presentation.'
                : index === 3
                  ? 'Designed to feel more elevated on first view.'
                  : index === 4
                    ? 'A more polished visual system for launch content.'
                    : 'Optimized for trust, clarity, and conversion.'
      })),
    [works]
  );

  return (
    <div className="min-h-screen bg-brand-light">
      <Navbar />

      <section className="section-shell overflow-hidden bg-brand-light pt-28 pb-16" id="portfolio-hero">
        <div className="container-boxed relative z-10 text-center">
          <motion.span
            initial={{ opacity: 0, y: 16, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="section-kicker justify-center"
          >
            Showcase
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto max-w-4xl text-[clamp(2.8rem,8vw,6.8rem)] font-black uppercase leading-[0.95] tracking-[-0.055em] text-brand-dark"
          >
            {hero.title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ delay: 0.18, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="section-copy mx-auto mt-5 max-w-2xl"
          >
            {hero.subtitle}
          </motion.p>
        </div>

        <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full bg-brand-orange/10 blur-3xl" />
      </section>

      <section className="section-shell bg-brand-dark py-20" id="showreel">
        <div className="container-boxed max-w-6xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 18 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true }}
            className="media-frame relative aspect-video overflow-hidden"
          >
            <iframe
              src={`https://www.youtube.com/embed/${showreel.youtubeId}?rel=0`}
              className="h-full w-full"
              title="Agency Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
          <p className="mt-8 text-center text-[10px] font-bold uppercase tracking-[0.22em] text-white/65 sm:text-xs">
            "{showreel.caption}"
          </p>
        </div>
      </section>

      <section className="section-shell bg-white py-14 sm:py-20" id="featured-works">
        <div className="container-boxed">
          <div className="flex flex-col gap-4">
            <div className="section-kicker">Featured work</div>
            <h2 className="section-title">Our Works</h2>
            <p className="section-copy max-w-2xl">
              A tighter gallery rhythm with captions, categories, and proof-oriented context so each preview feels more like a case study.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-3 lg:gap-6">
            {workCards.map((item: any, idx: number) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 24, scale: 0.99 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.55, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                onClick={() => item.type === 'video' && setSelectedMedia(item)}
                className="premium-card group relative aspect-[3/4] cursor-pointer overflow-hidden"
              >
                <div className="absolute inset-0">
                  {item.type === 'video' ? (
                    idx === 0 ? (
                      <video
                        src={item.src}
                        poster={item.poster}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload="metadata"
                      />
                    ) : (
                      <img
                        src={item.poster}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                        loading="lazy"
                        decoding="async"
                      />
                    )
                  ) : (
                    <img
                      src={item.src}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.045]"
                      loading="lazy"
                      decoding="async"
                    />
                  )}
                </div>

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(20,20,20,0.06)_38%,rgba(20,20,20,0.6)_100%)]" />
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
                    Project {String(item.id).padStart(2, '0')}
                  </div>
                  <h3 className="text-[1.35rem] font-black uppercase leading-[0.95] tracking-[-0.045em] text-white md:text-[1.7rem]">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-7 text-white/78">
                    {item.caption}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <CollectionSection
        id="video-editing"
        title={categoryLabels['video-editing']}
        items={collections['video-editing'] || []}
        active={activeSection === 'video-editing'}
        onSelect={(item) => setSelectedMedia(item)}
        registerRef={(node) => {
          sectionRefs.current['video-editing'] = node;
        }}
      />

      <CollectionSection
        id="graphic-design"
        title={categoryLabels['graphic-design']}
        items={collections['graphic-design'] || []}
        active={activeSection === 'graphic-design'}
        onSelect={(item) => setSelectedMedia(item)}
        registerRef={(node) => {
          sectionRefs.current['graphic-design'] = node;
        }}
      />

      <CollectionSection
        id="branding"
        title={categoryLabels.branding}
        items={collections.branding || []}
        active={activeSection === 'branding'}
        onSelect={(item) => setSelectedMedia(item)}
        registerRef={(node) => {
          sectionRefs.current.branding = node;
        }}
      />

      <section className="section-shell bg-white py-14 sm:py-20" id="logos">
        <div className="container-boxed">
          <div className="flex flex-col gap-4">
            <div className="section-kicker">Client logos</div>
            <h2 className="section-title">Logos</h2>
            <p className="section-copy max-w-2xl">
              The logo wall stays intact, but the card treatment and spacing now read closer to a high-end proof strip.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
            {logos.map((item: any, idx: number) => (
              <motion.article
                key={idx}
                initial={{ opacity: 0, y: 18, scale: 0.99 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                onClick={() => setSelectedMedia(item)}
                whileHover={{ y: -3 }}
                className="premium-card group relative aspect-[3/4] cursor-pointer overflow-hidden sm:aspect-square"
              >
                <img
                  src={item.src}
                  alt={item.title}
                  className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = siteConfig.brand.logo;
                  }}
                />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {selectedMedia && <MediaLightbox item={selectedMedia} onClose={() => setSelectedMedia(null)} />}

      <Footer />
    </div>
  );
}
