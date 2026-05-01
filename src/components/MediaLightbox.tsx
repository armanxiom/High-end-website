import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Expand, X } from 'lucide-react';

type MediaItem = {
  type?: 'video' | 'image';
  src: string;
  poster?: string;
  title?: string;
};

export function MediaLightbox({
  item,
  onClose
}: {
  item: MediaItem;
  onClose: () => void;
}) {
  const frameRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  const openFullscreen = async () => {
    if (!frameRef.current?.requestFullscreen) return;

    try {
      await frameRef.current.requestFullscreen();
    } catch {
      // Ignore fullscreen failures and keep modal open.
    }
  };

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-black/92 p-3 md:p-5"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={item.title || 'Media preview'}
    >
      <motion.div
        ref={frameRef}
        initial={{ opacity: 0, scale: 0.96, y: 14 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
        className="relative flex h-[min(92vh,960px)] w-[min(96vw,1500px)] items-center justify-center overflow-hidden rounded-[1.75rem] border border-white/10 bg-black shadow-[0_28px_90px_rgba(0,0,0,0.5)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="absolute right-3 top-3 z-10 flex gap-2 md:right-4 md:top-4">
          <button
            onClick={openFullscreen}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 hover:scale-105"
            aria-label="Open fullscreen preview"
          >
            <Expand size={18} />
          </button>
          <button
            onClick={onClose}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-white/16 bg-white/10 text-white backdrop-blur-sm transition-transform duration-300 hover:scale-105"
            aria-label="Close preview"
          >
            <X size={18} />
          </button>
        </div>

        {item.type === 'video' ? (
          <video
            src={item.src}
            poster={item.poster}
            controls
            autoPlay
            playsInline
            className="h-full w-full bg-black object-contain"
            preload="metadata"
          />
        ) : (
          <img
            src={item.src}
            alt={item.title || 'Media preview'}
            className="h-full w-full bg-black object-contain"
            loading="eager"
            decoding="async"
          />
        )}
      </motion.div>
    </div>
  );
}
