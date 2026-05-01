/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { siteConfig } from '../data/siteConfig';
import { useCountUp } from '../hooks/useCountUp';

type StatValueKind = 'count' | 'text';

function parseStatValue(value: string) {
  const trimmed = value.trim();

  if (trimmed.toUpperCase().endsWith('X')) {
    return { kind: 'text' as const, label: trimmed };
  }

  const match = trimmed.match(/^(\d+(?:\.\d+)?)([KM])?(\+)?$/i);

  if (!match) {
    return { kind: 'text' as const, label: trimmed };
  }

  const numeric = Number(match[1]);
  const unit = (match[2] || '').toUpperCase();
  const hasPlus = Boolean(match[3]);

  const target = unit === 'M' ? numeric * 1_000_000 : unit === 'K' ? numeric * 1_000 : numeric;

  return {
    kind: 'count' as const,
    target,
    raw: trimmed,
    hasPlus
  };
}

function formatAnimatedValue(current: number, target: number, raw: string) {
  const hasPlus = raw.endsWith('+');

  if (target >= 1_000_000) {
    if (current >= target) return raw;
    const millions = current / 1_000_000;
    const value = millions >= 10 ? Math.floor(millions) : Math.floor(millions * 10) / 10;
    return `${value.toFixed(millions >= 10 ? 0 : 1)}M${hasPlus ? '+' : ''}`;
  }

  if (target >= 1_000) {
    if (current >= target) return raw;
    const thousands = current / 1_000;
    const value = thousands >= 10 ? Math.floor(thousands) : Math.floor(thousands * 10) / 10;
    return `${value.toFixed(thousands >= 10 ? 0 : 1)}K${hasPlus ? '+' : ''}`;
  }

  const safeValue = Math.min(target, Math.floor(current));
  return `${safeValue}${hasPlus ? '+' : ''}`;
}

function StatValue({ result, active }: { result: string; active: boolean }) {
  const parsed = parseStatValue(result);
  const current = useCountUp(active && parsed.kind === 'count', parsed.kind === 'count' ? parsed.target : 0, 1500);

  if (parsed.kind === 'text') {
    return <div className="text-[clamp(2rem,4vw,4.5rem)] font-black leading-none text-brand-orange">{parsed.label}</div>;
  }

  return <div className="text-[clamp(2rem,4vw,4.5rem)] font-black leading-none text-brand-orange tabular-nums">{formatAnimatedValue(current, parsed.target, parsed.raw)}</div>;
}

export const Results = () => {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [hasEntered, setHasEntered] = useState(false);
  const [playId, setPlayId] = useState(0);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || hasEntered) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
          setPlayId((current) => current + 1);
          observer.disconnect();
        }
      },
      {
        threshold: 0.28,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [hasEntered]);

  return (
    <motion.section
      ref={sectionRef}
      id="about"
      className="section-shell bg-brand-dark py-20 text-white md:py-28"
      initial={{ opacity: 0, y: 20 }}
      animate={hasEntered ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="section-marquee">
        <div className="section-marquee-track text-white/[0.05]">
          <span className="pr-8">our impact our impact our impact our impact our impact</span>
          <span className="pr-8">our impact our impact our impact our impact our impact</span>
        </div>
      </div>

      <div className="container-boxed relative z-10">
        <div className="grid gap-10 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <div>
            <span className="section-kicker text-brand-orange">
              What the work has done
            </span>
            <h2 className="max-w-md text-[clamp(2rem,4vw,4.5rem)] font-black uppercase leading-[0.97] tracking-[-0.05em] text-white">
              Impact that reads like proof.
            </h2>
          </div>

          <p className="max-w-2xl text-[15px] leading-8 text-white/78 md:text-[17px]">
            The numbers matter because they tell the trust story quickly: more reach, more projects, more active clients, and results that help the brand feel established the moment people land on the site.
          </p>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {siteConfig.results.map((result, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={hasEntered ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 18, scale: 0.98 }}
              transition={{ duration: 0.65, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="rounded-[1.5rem] border border-white/12 bg-white/[0.08] p-5 shadow-[0_18px_40px_rgba(0,0,0,0.16)] backdrop-blur-md"
            >
              <div className="mb-5 h-1 w-14 rounded-full bg-brand-orange" />
              <StatValue key={`${index}-${playId}`} result={result.value} active={hasEntered} />
              <div className="mt-4 text-[10px] font-bold uppercase tracking-[0.24em] text-white/68">
                {result.label}
              </div>
              <div className="mt-2 h-px w-full bg-[linear-gradient(90deg,rgba(255,106,0,0.9),transparent)]" />
              <p className="mt-3 text-sm leading-7 text-white/78">
                A trust marker that helps visitors understand the scale and seriousness of the studio.
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};
