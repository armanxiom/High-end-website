import { motion } from 'motion/react';
import { ArrowRight, PhoneCall, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useRevealOnView } from '../hooks/useRevealOnView';

export function FinalCTA() {
  const { ref, isVisible } = useRevealOnView<HTMLElement>();

  return (
    <motion.section
      ref={ref}
      className="section-shell bg-white py-20 md:py-28"
      id="contact-cta"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-boxed">
        <motion.div
          className="premium-card relative overflow-hidden px-6 py-10 md:px-10 md:py-12"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,106,0,0.16),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.96),rgba(255,247,240,0.92))]" />
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,106,0,0.5),transparent)]" />
          <div className="absolute inset-0 hero-grain opacity-[0.13] mix-blend-soft-light" />
          <motion.div
            aria-hidden
            className="animate-light-sweep pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.38),transparent)]"
          />

          <div className="relative z-10 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <div className="section-kicker">
                <Sparkles size={12} />
                Ready when you are
              </div>
              <h2 className="max-w-2xl text-[clamp(2.2rem,5vw,4.8rem)] font-black uppercase leading-[0.97] tracking-[-0.055em] text-brand-dark">
                If the brand needs to feel premium, this is the moment to start.
              </h2>
              <p className="mt-5 max-w-xl text-[15px] leading-8 text-muted md:text-[17px]">
                One focused call is enough to map the creative direction, the deliverables, and the fastest path to a more trusted-looking brand.
              </p>
            </div>

            <div className="flex flex-col gap-3 lg:items-end">
              <a href={siteConfig.contact.whatsapp} target="_blank" rel="noopener noreferrer" className="premium-button premium-button--primary w-full sm:w-auto">
                Book a Call
                <PhoneCall size={14} />
              </a>
              <a href="/portfolio" className="premium-button premium-button--secondary w-full sm:w-auto">
                View Work
                <ArrowRight size={14} />
              </a>
              <p className="max-w-sm text-right text-[11px] font-medium uppercase tracking-[0.22em] text-muted">
                Trusted business. Cleaner execution. Stronger first impression.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}
