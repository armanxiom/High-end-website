/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { siteConfig } from '../data/siteConfig';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

const activityItems = [
  'New brand project signed',
  'Portfolio refresh in progress',
  'Trusted by growth-minded founders',
  'High-conversion creative systems',
  'Fast turnaround with premium polish'
];

function HoverNavItem({ to, label }: { to: string; label: string }) {
  return (
    <Link
      to={to}
      className="group relative rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-[0.24em] text-brand-dark/70 transition-colors duration-300 hover:bg-brand-orange-soft hover:text-brand-dark"
    >
      <span className="relative block overflow-hidden">
        <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
          {label}
        </span>
        <span className="absolute left-0 top-0 block translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0">
          {label}
        </span>
      </span>
    </Link>
  );
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <header className="fixed top-0 left-0 z-[70] w-full">
      <div className="border-b border-brand-line bg-white/90 text-[10px] uppercase tracking-[0.3em] text-brand-dark backdrop-blur-xl">
        <div className="mx-auto flex h-9 max-w-[1200px] items-center overflow-hidden px-5 sm:px-6 lg:px-8">
          <div className="flex animate-scroll whitespace-nowrap">
            {[...activityItems, ...activityItems].map((item, index) => (
              <span key={index} className="flex items-center gap-3 pr-10">
                <span className="h-1 w-1 rounded-full bg-brand-orange" />
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      <nav className="pt-3">
        <div className="hidden md:flex">
          <div className="mx-auto flex w-[min(94vw,1180px)] items-center justify-between gap-4 rounded-full border border-brand-line bg-white/88 px-4 py-3 shadow-[0_18px_50px_rgba(20,20,20,0.08)] backdrop-blur-2xl">
            <Link to="/" className="flex items-center gap-2">
              <img
                src={siteConfig.brand.logo}
                alt={siteConfig.brand.name}
                className="h-8 w-auto"
                loading="eager"
                decoding="async"
              />
              <span className="text-sm font-black uppercase tracking-[0.16em] text-brand-dark">
                {siteConfig.brand.name}
              </span>
            </Link>

            <div className="flex items-center gap-1 rounded-full border border-brand-line bg-brand-light px-2 py-1">
              {siteConfig.navigation.map((item) => (
                <HoverNavItem key={item.href} to={item.href} label={item.name} />
              ))}
            </div>

            <a
              href={siteConfig.contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="premium-button premium-button--primary"
            >
              Get in touch
            </a>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 md:hidden">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={siteConfig.brand.logo}
              alt={siteConfig.brand.name}
              className="h-8 w-auto"
              loading="eager"
              decoding="async"
            />
            <span className="text-sm font-black uppercase tracking-[0.16em] text-brand-dark">
              {siteConfig.brand.name}
            </span>
          </Link>

          <button
            onClick={() => setIsOpen((value) => !value)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-white text-brand-dark shadow-[0_10px_24px_rgba(20,20,20,0.06)]"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsOpen(false)}
                className="fixed inset-0 z-[90] bg-black/30 backdrop-blur-[2px]"
              />

              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                className="fixed top-0 right-0 z-[100] flex h-full w-[82%] max-w-[320px] flex-col border-l border-brand-line bg-white shadow-[0_30px_70px_rgba(20,20,20,0.16)]"
              >
                <div className="flex items-center justify-between border-b border-brand-line px-6 py-5">
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-brand-dark">Menu</span>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-brand-line bg-brand-light text-brand-dark"
                    aria-label="Close menu"
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="flex flex-col gap-5 px-6 py-8">
                  {siteConfig.navigation.map((item) => (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setIsOpen(false)}
                      className="text-[1.05rem] font-bold uppercase tracking-[-0.03em] text-brand-dark"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-auto border-t border-brand-line px-6 py-6">
                  <a
                    href={siteConfig.contact.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="premium-button premium-button--primary w-full"
                  >
                    Get in touch
                  </a>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
};
