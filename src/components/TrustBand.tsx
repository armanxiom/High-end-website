import { motion } from 'motion/react';
import { ShieldCheck, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useRevealOnView } from '../hooks/useRevealOnView';
import { useMemo } from 'react';

export function TrustBand() {
  const { ref, isVisible } = useRevealOnView<HTMLElement>();
  const logos = siteConfig.logos.slice(0, 6);
  const stats = siteConfig.results.slice(0, 4);
  const trustNotes = useMemo(
    () => [
      'Clear communication from brief to delivery',
      'Creative systems built for conversion, not decoration',
      'Registered business with documented credibility'
    ],
    []
  );

  return (
    <motion.section
      ref={ref}
      id="proof"
      className="section-shell bg-white py-16 md:py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-marquee">
        <div className="section-marquee-track">
          <span className="pr-8">trusted proof trusted proof trusted proof trusted proof</span>
          <span className="pr-8">trusted proof trusted proof trusted proof trusted proof</span>
        </div>
      </div>

      <div className="container-boxed relative z-10">
        <div className="grid gap-4 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.02, ease: [0.22, 1, 0.36, 1] }}
            className="premium-surface p-6 md:p-8"
          >
            <div className="section-kicker">
              <Sparkles size={12} />
              Immediate credibility
            </div>
            <h2 className="max-w-xl text-[clamp(1.7rem,3.5vw,3.2rem)] font-black uppercase leading-[0.95] tracking-[-0.06em] text-brand-dark">
              Proof that feels real, not decorative.
            </h2>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {stats.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
                  transition={{ duration: 0.55, delay: 0.08 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="rounded-[1rem] border border-brand-line bg-brand-orange-soft p-4"
                >
                  <div className="text-[1.6rem] font-black leading-none text-brand-dark">
                    {item.value}
                    {item.suffix}
                  </div>
                  <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.22em] text-muted">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            className="premium-surface p-6 md:p-8"
          >
            <div className="section-kicker">
              <ShieldCheck size={12} />
              Trusted signals
            </div>
            <div className="grid gap-3">
              {trustNotes.map((note, index) => (
                <motion.div
                  key={note}
                  initial={{ opacity: 0, x: -12 }}
                  animate={isVisible ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.45, delay: 0.12 + index * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-3 rounded-[1rem] border border-brand-line bg-white p-4"
                >
                  <span className="mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-orange text-[11px] font-black text-white">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-7 text-brand-dark/80">{note}</p>
                </motion.div>
              ))}
            </div>

            <div className="mt-5 rounded-[1rem] border border-brand-line bg-white p-4">
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-orange">
                Client logos
              </div>
              <div className="mt-3 flex flex-wrap gap-2">
                {logos.map((logo) => (
                  <div
                    key={logo.title}
                    className="flex h-11 min-w-24 items-center justify-center rounded-full border border-brand-line bg-brand-light px-3"
                  >
                    <img
                      src={logo.src}
                      alt={logo.title}
                      className="h-4 w-auto object-contain opacity-75 grayscale"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}
