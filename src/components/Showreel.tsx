import { motion } from 'motion/react';
import { siteConfig } from '../data/siteConfig';
import { useRevealOnView } from '../hooks/useRevealOnView';

export const Showreel = () => {
  const { ref, isVisible } = useRevealOnView<HTMLElement>();
  const proofItems = [
    siteConfig.results[0],
    siteConfig.results[2],
    { label: 'Market Reach', value: 'India + UAE' }
  ];

  return (
    <motion.section
      ref={ref}
      className="section-shell bg-brand-dark py-20 text-white md:py-28"
      id="showreel"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-marquee">
        <div className="section-marquee-track text-white/[0.05]">
          <span className="pr-8">showreel showreel showreel showreel showreel</span>
          <span className="pr-8">showreel showreel showreel showreel showreel</span>
        </div>
      </div>

      <div className="container-boxed relative z-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div className="max-w-2xl">
            <span className="section-kicker text-brand-orange">
              Creative proof
            </span>
            <h2 className="max-w-3xl text-[clamp(2rem,4vw,4.8rem)] font-black uppercase leading-[0.97] tracking-[-0.055em] text-white">
              {siteConfig.showreel.title}
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-8 text-white/72 md:text-[17px]">
              {siteConfig.showreel.caption}
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {proofItems.map((item) => (
              <div
                key={item.label}
                className="rounded-[1.25rem] border border-white/10 bg-white/[0.06] p-4 shadow-[0_16px_36px_rgba(0,0,0,0.18)] backdrop-blur-sm"
              >
                <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-orange">
                  {item.label}
                </div>
                <div className="mt-3 text-[1.35rem] font-black leading-none tracking-[-0.05em] text-white">
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 18 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="relative mx-auto mt-10 max-w-6xl overflow-hidden rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-3 shadow-[0_32px_90px_rgba(0,0,0,0.32)] md:p-4"
        >
          <div className="pointer-events-none absolute inset-x-10 top-0 h-24 rounded-full bg-brand-orange/16 blur-3xl" />
          <div className="relative z-10 flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/[0.04] px-4 py-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-brand-orange" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/35" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/18" />
            </div>
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-white/68">
              Graphinex editorial reel
            </div>
          </div>

          <div className="relative z-10 mt-3 overflow-hidden rounded-[1.5rem] border border-white/8 bg-black">
            <iframe
              src={`https://www.youtube.com/embed/${siteConfig.showreel.youtubeId}?autoplay=0&controls=1&rel=0`}
              className="aspect-video w-full"
              title="Agency Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(20,20,20,0.24))]" />
          </div>

          <div className="relative z-10 mt-4 grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <p className="text-sm leading-7 text-white/72">
              Device-framed presentation, stronger elevation, and a darker stage help the reel feel deliberate instead of dropped into the page.
            </p>
            <div className="inline-flex w-fit rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-white/72">
              Motion-led delivery
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
