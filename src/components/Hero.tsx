/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, BadgeCheck, PlayCircle } from 'lucide-react';
import { useMemo, useRef } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { useCountUp } from '../hooks/useCountUp';

function HeroMetric({
  label,
  target,
  suffix = '',
  active
}: {
  label: string;
  target: number;
  suffix?: string;
  active: boolean;
}) {
  const count = useCountUp(active, target, 1500);

  return (
    <div className="kpi-card">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-orange-soft text-brand-orange">
        <BadgeCheck size={18} />
      </div>
      <div>
        <div className="text-[1.5rem] font-black leading-none tracking-[-0.06em] text-brand-dark md:text-[2rem]">
          {count.toLocaleString()}{suffix}
        </div>
        <div className="mt-1 text-[10px] font-bold uppercase tracking-[0.24em] text-muted">
          {label}
        </div>
      </div>
    </div>
  );
}

export const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start']
  });

  const mediaY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : 48]);
  const mediaScale = useTransform(scrollYProgress, [0, 1], [1, reduceMotion ? 1 : 1.06]);
  const insetImageY = useTransform(scrollYProgress, [0, 1], [0, reduceMotion ? 0 : -24]);

  const headingLines = useMemo(() => {
    return ['We Turn', 'Content', 'Into', 'Clients'];
  }, []);

  const highlights = siteConfig.hero.headingHighlights.map((word) => word.toLowerCase());

  return (
    <motion.section
      ref={heroRef}
      id="hero"
      className="section-shell relative min-h-screen overflow-hidden bg-brand-light pt-24 pb-14 md:pt-32 md:pb-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,106,0,0.12),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.95),rgba(255,247,240,0.9))]" />
        <div className="hero-grain absolute inset-0 opacity-[0.16] mix-blend-soft-light" />
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,106,0,0.5),transparent)]" />
      </div>

      <div className="container-boxed relative z-10 grid items-center gap-10 md:gap-12 lg:grid-cols-[1fr_0.96fr] lg:gap-10">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="section-kicker"
          >
            <span className="h-2 w-2 rounded-full bg-brand-orange" />
            {siteConfig.brand.tagline}
          </motion.div>

          <div className="max-w-full sm:max-w-[30rem] xl:max-w-[34rem]">
            <motion.h1
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.12, delayChildren: 0.04 } }
              }}
              className="motion-optimised text-[clamp(3.05rem,6.9vw,6.4rem)] font-black uppercase leading-[0.95] tracking-[-0.055em] text-brand-dark"
            >
              {headingLines.map((line, lineIndex) => (
                <span key={lineIndex} className="block overflow-hidden">
                  <motion.span
                    initial={{ y: '110%', opacity: 0, filter: 'blur(10px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: lineIndex * 0.11 }}
                    className="inline-block whitespace-nowrap"
                  >
                    {line.split(' ').map((word, wordIndex, words) => {
                      const clean = word.replace(/[,.!]/g, '').toLowerCase();
                      return (
                        <span key={`${word}-${wordIndex}`} className={highlights.includes(clean) ? 'text-brand-orange' : ''}>
                          {word}
                          {wordIndex < words.length - 1 ? ' ' : ''}
                        </span>
                      );
                    })}
                  </motion.span>
                </span>
              ))}
            </motion.h1>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 max-w-xl text-[16px] leading-[1.85] text-muted md:text-[18px]"
          >
            {siteConfig.hero.subheading}
            <span className="mt-3 block text-brand-dark">
              Built for founders and creators who need their brand to feel established on day one.
            </span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.34, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#contact" className="premium-button premium-button--primary">
              Book a Call
              <ArrowRight size={14} />
            </a>
            <Link to="/portfolio" className="premium-button premium-button--secondary">
              View Work
              <PlayCircle size={14} />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.46, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 grid gap-3 sm:grid-cols-3"
          >
            <HeroMetric label="Active Clients" target={45} suffix="+" active />
            <HeroMetric label="Projects Delivered" target={100} suffix="+" active />
            <HeroMetric label="Views Generated" target={10} suffix="M+" active />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.58, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 rounded-[1.35rem] border border-brand-line bg-white/85 p-4 shadow-[0_18px_40px_rgba(20,20,20,0.06)] backdrop-blur-sm md:p-5"
          >
            <div className="flex items-center justify-between gap-4">
              <div>
                <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-orange">
                  Trusted by brands that care about perception
                </div>
                <p className="mt-2 max-w-lg text-sm leading-7 text-muted">
                  Clean delivery, sharp creative direction, and a process built to make your brand feel dependable.
                </p>
              </div>
              <div className="hidden rounded-full border border-brand-line bg-brand-orange-soft px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-dark md:block">
                Fast turnaround
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {siteConfig.logos.slice(0, 5).map((logo: any, index: number) => (
                <div key={logo.title || index} className="flex h-10 items-center justify-center rounded-full border border-brand-line bg-white px-3">
                  <img
                    src={logo.src}
                    alt={logo.title}
                    className="h-4 w-auto object-contain opacity-80 grayscale"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        <div>
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            className="media-frame group relative mx-auto max-w-[42rem] lg:ml-auto"
          >
            <motion.div style={{ y: mediaY, scale: mediaScale }} className="relative aspect-[4/3] w-full sm:aspect-[5/4] lg:aspect-[4/5]">
              <img
                src="/hero.jpeg"
                alt="Graphinex studio and production preview"
                className="absolute inset-0 h-full w-full object-cover object-center"
                loading="eager"
                decoding="async"
              />
              <motion.img
                src="/hero-image.png"
                alt="Graphinex creative workspace"
                className="absolute right-6 bottom-6 hidden w-[56%] rounded-[1.35rem] border border-white/70 object-cover shadow-[0_20px_50px_rgba(20,20,20,0.18)] md:block"
                style={{ y: insetImageY }}
                loading="lazy"
                decoding="async"
              />
              <div className="media-overlay" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,106,0,0.1)_68%,rgba(20,20,20,0.22))]" />
              <div className="absolute inset-0 hero-grain opacity-[0.12] mix-blend-overlay" />

              <motion.div
                animate={reduceMotion ? {} : { x: ['-115%', '115%'] }}
                transition={reduceMotion ? {} : { duration: 7, repeat: Infinity, ease: 'linear' }}
                className="pointer-events-none absolute inset-y-0 left-0 w-1/2 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.34),transparent)] opacity-60"
              />

              <div className="absolute left-5 top-5 flex flex-wrap gap-2">
                <span className="badge-pill bg-white/90 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-brand-orange" />
                  Creative Agency
                </span>
                <span className="badge-pill bg-white/90 backdrop-blur">
                  <span className="h-2 w-2 rounded-full bg-brand-orange" />
                  India + UAE reach
                </span>
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid gap-3 rounded-[1.35rem] border border-white/55 bg-white/82 p-4 backdrop-blur-md md:grid-cols-[1fr_auto] md:items-end">
                <div>
                  <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-brand-orange">
                    Editorial production frame
                  </div>
                  <p className="mt-2 max-w-md text-sm leading-7 text-brand-dark/80">
                    Hero visuals framed like a luxury case study, with room for motion and proof to breathe.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-dark">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-orange text-white">
                    <PlayCircle size={16} />
                  </span>
                  Premium motion system
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
