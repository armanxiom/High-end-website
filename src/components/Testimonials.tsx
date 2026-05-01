import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Quote, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useRevealOnView } from '../hooks/useRevealOnView';

export function Testimonials() {
  const { ref, isVisible } = useRevealOnView<HTMLElement>();
  const testimonials = useMemo(() => siteConfig.reviews.slice(0, 6), []);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!testimonials.length) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % testimonials.length);
    }, 5200);
    return () => window.clearInterval(interval);
  }, [testimonials.length]);

  const active = testimonials[activeIndex];
  const stack = testimonials.filter((_, index) => index !== activeIndex).slice(0, 3);

  return (
    <motion.section
      ref={ref}
      className="section-shell bg-brand-light py-20 md:py-28"
      id="testimonials"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="section-marquee">
        <div className="section-marquee-track">
          <span className="pr-8">testimonials testimonials testimonials testimonials testimonials</span>
          <span className="pr-8">testimonials testimonials testimonials testimonials testimonials</span>
        </div>
      </div>

      <div className="container-boxed relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="section-kicker">
              <Sparkles size={12} />
              Client proof
            </div>
            <h2 className="section-title max-w-xl">
              Testimonials that sound like confidence.
            </h2>
          </div>
          <p className="section-copy max-w-md">
            The reviews are already strong. Here they are shaped like premium proof cards with better rhythm, contrast, and hierarchy.
          </p>
        </div>

        <div className="mt-12 grid gap-4 xl:grid-cols-[1.2fr_0.8fr]">
          <div className="premium-card p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div className="badge-pill bg-brand-orange-soft text-brand-dark">
                <Quote size={12} />
                Featured client note
              </div>
              <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                Auto-rotating
              </div>
            </div>

            <div className="mt-8 min-h-[220px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active?.name || activeIndex}
                  initial={{ opacity: 0, y: 18, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -12, scale: 0.98 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  aria-live="polite"
                >
                  <p className="max-w-3xl text-[1.35rem] leading-[1.55] tracking-[-0.03em] text-brand-dark md:text-[1.65rem]">
                    "{active?.text}"
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-sm font-black text-white">
                      {active?.name?.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-brand-dark">{active?.name}</div>
                      <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                        {active?.type}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="grid gap-4">
            {stack.map((testimonial, index) => (
              <motion.article
                key={`${testimonial.name}-${index}`}
                initial={{ opacity: 0, y: 18 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="premium-card p-5"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange-soft text-[11px] font-black text-brand-orange">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate text-sm font-bold text-brand-dark">{testimonial.name}</div>
                    <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
                      {testimonial.type}
                    </div>
                  </div>
                </div>

                <p className="mt-4 text-sm leading-7 text-brand-dark/78">
                  {testimonial.text}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
