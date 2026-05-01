/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from 'react';
import { Link } from 'react-router-dom';
import { siteConfig } from '../data/siteConfig';
import { useRevealOnView } from '../hooks/useRevealOnView';

const categoryMap: Record<string, string> = {
  videoEditing: 'video-editing',
  graphicDesign: 'graphic-design',
  branding: 'branding'
};

const outcomeMap: Record<string, string> = {
  videoEditing: 'Sharper retention, stronger watch time, and better viewer trust.',
  graphicDesign: 'Clearer positioning and a visual identity that looks premium instantly.',
  branding: 'A more memorable brand system that feels consistent across touchpoints.'
};

const audienceMap: Record<string, string> = {
  videoEditing: 'For creators, founders, and brands that need faster content velocity.',
  graphicDesign: 'For businesses that want a premium look across campaigns and launches.',
  branding: 'For teams that need a refined brand presence before they scale.'
};

const previewMap = {
  videoEditing: {
    type: 'video' as const,
    src: '/assets/video-editing/v1.mp4',
    poster: '/assets/video-editing/v1.png',
    eyebrow: 'Video editing',
    caption: 'Fast, clean, retention-first motion with stronger rhythm and polish.'
  },
  graphicDesign: {
    type: 'image' as const,
    src: '/assets/graphic-design/g1.jpeg',
    eyebrow: 'Graphic design',
    caption: 'Sharper layouts, premium surfaces, and campaign-ready creative systems.'
  },
  branding: {
    type: 'image' as const,
    src: '/assets/branding/b1.jpeg',
    eyebrow: 'Branding',
    caption: 'Identity direction that makes the brand feel established from the first impression.'
  }
};

type ServiceRow = {
  id: string;
  title: string;
  description: string;
  audience: string;
  outcome: string;
  category: string;
  preview: (typeof previewMap)[keyof typeof previewMap];
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export const Services = () => {
  const { ref, isVisible } = useRevealOnView<HTMLElement>();
  const reduceMotion = useReducedMotion();
  const [canHover, setCanHover] = useState(false);
  const [activeServiceId, setActiveServiceId] = useState<string | null>(null);
  const [mobileOpenId, setMobileOpenId] = useState<string | null>(null);
  const floatingRef = useRef<HTMLDivElement | null>(null);
  const targetPositionRef = useRef({ x: 0, y: 0 });
  const currentPositionRef = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  const services = useMemo<ServiceRow[]>(() => {
    return siteConfig.serviceOverviews.map((service: any) => ({
      id: service.id,
      title: service.title,
      description: service.description,
      audience: audienceMap[service.id] || 'Built for brands that need premium creative execution.',
      outcome: outcomeMap[service.id] || 'Clearer positioning, stronger perception, and better response.',
      category: categoryMap[service.id] || service.id,
      preview: previewMap[service.id as keyof typeof previewMap] || previewMap.graphicDesign
    }));
  }, []);

  const activeService = services.find((service) => service.id === activeServiceId) ?? null;

  useEffect(() => {
    const media = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => {
      setCanHover(media.matches);
      if (!media.matches) {
        setActiveServiceId(null);
      }
    };

    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!canHover || !activeService) return;

    const step = () => {
      const lerp = reduceMotion ? 1 : 0.12;
      currentPositionRef.current.x += (targetPositionRef.current.x - currentPositionRef.current.x) * lerp;
      currentPositionRef.current.y += (targetPositionRef.current.y - currentPositionRef.current.y) * lerp;

      if (floatingRef.current) {
        floatingRef.current.style.transform = `translate3d(${currentPositionRef.current.x}px, ${currentPositionRef.current.y}px, 0)`;
      }

      rafRef.current = window.requestAnimationFrame(step);
    };

    rafRef.current = window.requestAnimationFrame(step);

    return () => {
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [activeService, canHover, reduceMotion]);

  const updatePreviewTarget = (clientX: number, clientY: number) => {
    const frameWidth = floatingRef.current?.offsetWidth ?? 360;
    const frameHeight = floatingRef.current?.offsetHeight ?? 440;
    const offsetX = 26;
    const offsetY = 24;

    targetPositionRef.current = {
      x: clamp(clientX + offsetX, 16, window.innerWidth - frameWidth - 16),
      y: clamp(clientY + offsetY, 16, window.innerHeight - frameHeight - 16)
    };
  };

  const handleDesktopEnter = (serviceId: string, clientX: number, clientY: number) => {
    if (!canHover) return;

    updatePreviewTarget(clientX, clientY);
    if (activeServiceId !== serviceId) {
      currentPositionRef.current = { ...targetPositionRef.current };
    }
    setActiveServiceId(serviceId);
  };

  const handleMobileToggle = (serviceId: string) => {
    if (canHover) return;
    setMobileOpenId((previous) => (previous === serviceId ? null : serviceId));
  };

  const handleKeyToggle = (serviceId: string, event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();

    if (canHover) {
      const rect = event.currentTarget.getBoundingClientRect();
      handleDesktopEnter(serviceId, rect.right, rect.top + rect.height * 0.2);
      return;
    }

    handleMobileToggle(serviceId);
  };

  return (
    <motion.section
      ref={ref}
      className="section-shell bg-brand-light py-20 md:py-28"
      id="services"
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      onMouseLeave={() => {
        if (canHover) {
          setActiveServiceId(null);
        }
      }}
    >
      <div className="section-marquee">
        <div className="section-marquee-track">
          <span className="pr-8">our services our services our services our services our services</span>
          <span className="pr-8">our services our services our services our services our services</span>
        </div>
      </div>

      <div className="container-boxed relative z-10">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="section-kicker">
              <Sparkles size={12} />
              Specializations
            </div>
            <h2 className="section-title max-w-xl">
              Premium services with a cursor-led preview system.
            </h2>
          </div>

          <p className="section-copy max-w-md">
            Hover on desktop to pull the work closer. Tap on mobile to open a focused preview without breaking the flow.
          </p>
        </div>

        <div className="relative mt-12">
          <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,106,0,0.24),transparent)]" />

          <div className="divide-y divide-brand-line/85">
            {services.map((service, index) => {
              const isActive = activeServiceId === service.id;
              const isDimmed = Boolean(canHover && activeServiceId && activeServiceId !== service.id);
              const isMobileOpen = mobileOpenId === service.id;

              return (
                <motion.article
                  key={service.id}
                  initial={{ opacity: 0, y: 22 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.65, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="py-5 md:py-7"
                >
                  <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center lg:gap-8">
                    <div
                      role="button"
                      tabIndex={0}
                      aria-expanded={!canHover ? isMobileOpen : undefined}
                      onMouseEnter={(event) => handleDesktopEnter(service.id, event.clientX, event.clientY)}
                      onMouseMove={(event) => {
                        if (canHover) {
                          updatePreviewTarget(event.clientX, event.clientY);
                        }
                      }}
                      onFocus={(event) => {
                        if (!canHover) return;
                        const rect = event.currentTarget.getBoundingClientRect();
                        handleDesktopEnter(service.id, rect.right, rect.top + rect.height * 0.2);
                      }}
                      onBlur={() => {
                        if (canHover) {
                          setActiveServiceId(null);
                        }
                      }}
                      onClick={() => handleMobileToggle(service.id)}
                      onKeyDown={(event) => handleKeyToggle(service.id, event)}
                      className={`group rounded-[1.7rem] px-1 py-1 text-left outline-none transition-[opacity,transform] duration-300 focus-visible:ring-2 focus-visible:ring-brand-orange/40 ${
                        isDimmed ? 'opacity-[0.55]' : 'opacity-100'
                      } ${isActive ? 'translate-x-1' : ''}`}
                    >
                      <div className="grid gap-5 rounded-[1.7rem] border border-transparent px-4 py-5 transition-all duration-300 md:px-6 md:py-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-8">
                        <div className="flex items-start gap-4 md:gap-6">
                          <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.28em] text-brand-orange">
                            {String(index + 1).padStart(2, '0')}
                          </span>

                          <div className="min-w-0">
                            <h3
                              className={`text-[clamp(2rem,5vw,4.25rem)] font-black uppercase leading-[0.95] tracking-[-0.055em] transition-colors duration-300 ${
                                isActive ? 'text-brand-orange' : 'text-brand-dark'
                              }`}
                            >
                              {service.title}
                            </h3>
                            <p className="mt-3 max-w-2xl text-[15px] leading-7 text-muted md:text-[16px]">
                              {service.description}
                            </p>
                          </div>
                        </div>

                        <div className="grid gap-3 lg:justify-self-end lg:text-right">
                          <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-orange">
                            Who it is for
                          </div>
                          <p className="max-w-xl text-sm leading-7 text-brand-dark/76 lg:ml-auto">
                            {service.audience}
                          </p>
                          <div className="mt-2 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-orange">
                            Why it matters
                          </div>
                          <p className="max-w-xl text-sm leading-7 text-brand-dark/76 lg:ml-auto">
                            {service.outcome}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 lg:flex-col lg:items-end lg:justify-center">
                      <span
                        className={`rounded-full border px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] transition-colors duration-300 ${
                          isActive
                            ? 'border-brand-orange/20 bg-brand-orange-soft text-brand-orange'
                            : 'border-brand-line bg-white text-brand-dark'
                        }`}
                      >
                        {canHover ? 'Hover preview' : isMobileOpen ? 'Preview open' : 'Tap preview'}
                      </span>

                      <Link
                        to={`/portfolio?category=${service.category}`}
                        className="inline-flex items-center gap-2 rounded-full border border-brand-line bg-white px-4 py-3 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-dark transition-all duration-300 hover:border-brand-orange/24 hover:bg-brand-orange-soft hover:text-brand-orange"
                      >
                        View Work
                        <ArrowUpRight size={14} />
                      </Link>
                    </div>
                  </div>

                  {!canHover && isMobileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 16, scale: 0.98 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="mt-5 overflow-hidden rounded-[1.5rem] border border-brand-line bg-white shadow-[0_22px_46px_rgba(20,20,20,0.08)]"
                    >
                      <div className="relative aspect-[4/3] overflow-hidden bg-brand-orange-soft">
                        {service.preview.type === 'video' ? (
                          <video
                            src={service.preview.src}
                            poster={service.preview.poster}
                            muted
                            autoPlay
                            loop
                            playsInline
                            className="h-full w-full object-cover"
                            preload="metadata"
                          />
                        ) : (
                          <img
                            src={service.preview.src}
                            alt={service.title}
                            className="h-full w-full object-cover"
                            loading="lazy"
                            decoding="async"
                          />
                        )}
                        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(20,20,20,0.18))]" />
                      </div>

                      <div className="grid gap-4 p-5">
                        <div>
                          <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-orange">
                            {service.preview.eyebrow}
                          </div>
                          <p className="mt-3 text-sm leading-7 text-muted">{service.preview.caption}</p>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {canHover && activeService && (
          <div ref={floatingRef} className="pointer-events-none fixed left-0 top-0 z-[80] hidden md:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.82, filter: 'blur(10px)' }}
              animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={{ opacity: 0, scale: 0.92, filter: 'blur(4px)' }}
              transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              className="w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-[1.55rem] border border-white/70 bg-white/92 shadow-[0_28px_80px_rgba(20,20,20,0.18)] backdrop-blur-xl"
            >
              <div className="relative aspect-[4/5] overflow-hidden bg-brand-orange-soft">
                {activeService.preview.type === 'video' ? (
                  <video
                    src={activeService.preview.src}
                    poster={activeService.preview.poster}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="h-full w-full object-cover"
                    preload="metadata"
                  />
                ) : (
                  <img
                    src={activeService.preview.src}
                    alt={activeService.title}
                    className="h-full w-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                )}

                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),rgba(20,20,20,0.28))]" />

                <div className="absolute left-4 top-4 rounded-full border border-white/55 bg-white/88 px-3 py-2 text-[10px] font-bold uppercase tracking-[0.24em] text-brand-dark backdrop-blur">
                  {activeService.preview.eyebrow}
                </div>

                <div className="absolute inset-x-4 bottom-4 rounded-[1.15rem] border border-white/50 bg-white/86 p-4 backdrop-blur-md">
                  <div className="flex items-end justify-between gap-3">
                    <h3 className="text-[1.2rem] font-black uppercase leading-[0.98] tracking-[-0.04em] text-brand-dark">
                      {activeService.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-orange">
                      Live preview
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-7 text-muted">{activeService.preview.caption}</p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </motion.section>
  );
};
