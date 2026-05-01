/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { ArrowRight, CircleDot, Sparkles } from 'lucide-react';
import { siteConfig } from '../data/siteConfig';
import { useRevealOnView } from '../hooks/useRevealOnView';

export const Process = () => {
  const { ref, isVisible } = useRevealOnView<HTMLElement>();

  return (
    <motion.section
      ref={ref}
      className="section-shell bg-white py-20 md:py-28"
      id="process"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="container-boxed">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="section-kicker">
              <Sparkles size={12} />
              Guided process
            </div>
            <h2 className="section-title max-w-xl">
              A clean process that makes the engagement feel safe.
            </h2>
          </div>
          <p className="section-copy max-w-md">
            The sequencing matters here. We want this section to read like a premium studio journey, not a checklist wall.
          </p>
        </div>

        <div className="mt-12 grid gap-4 xl:grid-cols-4">
          {siteConfig.process.map((step, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={isVisible ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ y: -4 }}
              className="premium-card group overflow-hidden p-6 md:p-7"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-orange text-[1rem] font-black text-white">
                  {step.step}
                </div>
                <CircleDot className="mt-1 text-brand-orange/60 transition-transform duration-300 group-hover:scale-110" size={20} />
              </div>

              <div className="mt-8">
                <h3 className="text-[1.4rem] font-black uppercase leading-[0.95] tracking-[-0.045em] text-brand-dark">
                  {step.name}
                </h3>
                <p className="mt-4 text-sm leading-7 text-muted">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-orange">
                <ArrowRight size={12} />
                One step flows into the next
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
