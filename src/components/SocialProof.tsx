import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { siteConfig } from '../data/siteConfig';

export const SocialProof = () => {
  const [currentReview, setCurrentReview] = useState<any>(null);

  useEffect(() => {
    const reviews = siteConfig.reviews;
    if (!reviews || reviews.length === 0) return;

    const cycleReview = () => {
      const randomIndex = Math.floor(Math.random() * reviews.length);
      setCurrentReview({ ...reviews[randomIndex], id: Date.now() });
    };

    const interval = window.setInterval(cycleReview, 6000);
    cycleReview();

    return () => window.clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed bottom-4 left-4 z-40 hidden md:block">
      <AnimatePresence mode="wait">
        {currentReview && (
          <motion.div
            key={currentReview.id}
            initial={{ x: -22, opacity: 0, scale: 0.98 }}
            animate={{ x: 0, opacity: 1, scale: 1 }}
            exit={{ x: -22, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto w-[280px] rounded-[1.25rem] border border-brand-line bg-white/92 p-4 shadow-[0_16px_36px_rgba(20,20,20,0.08)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-orange text-xs font-black text-white">
                {currentReview.name.charAt(0)}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="truncate text-[11px] font-bold uppercase tracking-[0.18em] text-brand-dark">
                    {currentReview.name}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-orange">
                    live
                  </span>
                </div>
                <p className="mt-0.5 text-[10px] uppercase tracking-[0.16em] text-muted">
                  {currentReview.type}
                </p>
              </div>
            </div>

            <p className="mt-3 text-[11px] leading-6 text-brand-dark/72">
              {currentReview.text}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
