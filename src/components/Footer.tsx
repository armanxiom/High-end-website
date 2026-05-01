import { siteConfig } from '../data/siteConfig';
import { Link } from 'react-router-dom';

export const Footer = () => {
  const registrationLinks = siteConfig.trustCertificates || [];

  return (
    <footer className="section-shell bg-brand-light px-5 py-12 md:px-0 md:py-16" id="contact">
      <div className="container-boxed">
        <div className="premium-card p-6 md:p-8">
          <div className="grid gap-10 md:grid-cols-3">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={siteConfig.brand.logo}
                  alt={siteConfig.brand.name}
                  className="h-8 w-auto"
                  loading="lazy"
                  decoding="async"
                />
                <span className="text-base font-black uppercase tracking-[0.16em] text-brand-dark">
                  {siteConfig.brand.name}
                </span>
              </div>
              <p className="max-w-sm text-[14px] leading-7 text-muted">
                Transforming content into a client-acquisition machine with premium creative systems and a sharper first impression.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 md:contents">
              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-orange">
                  Navigation
                </span>
                <div className="flex flex-col gap-2">
                  {siteConfig.navigation.map((item, i) => (
                    <Link
                      key={i}
                      to={item.href}
                      className="w-fit text-sm font-medium text-brand-dark/70 transition-colors duration-300 hover:text-brand-dark"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-orange">
                  Contact
                </span>
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-medium text-brand-dark">
                    {siteConfig.contact.phone}
                  </span>
                  <span className="text-sm font-medium text-brand-dark/70">
                    {siteConfig.contact.email}
                  </span>
                </div>
                <div className="flex flex-col gap-1 text-[12px] leading-relaxed text-muted">
                  <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-orange">
                    Registered business
                  </span>
                  <span>Graphinex Enterprises</span>
                  <a
                    href={registrationLinks[0]?.pdfUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit transition-colors duration-300 hover:text-brand-dark"
                    aria-label="Open GST certificate PDF"
                  >
                    GSTIN: 09FOXPA7667R1ZI
                  </a>
                  <a
                    href={registrationLinks[1]?.pdfUrl || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-fit transition-colors duration-300 hover:text-brand-dark"
                    aria-label="Open MSME certificate PDF"
                  >
                    Udyam: UDYAM-UP-04-0049600
                  </a>
                </div>
                <div className="text-xs text-muted">
                  <p>{siteConfig.brand.location}</p>
                  <p className="mt-0.5 uppercase tracking-[0.16em]">{siteConfig.brand.reach}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-brand-orange">
                Social
              </span>
              <div className="flex flex-wrap gap-3 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-dark/65">
                {['Instagram', 'LinkedIn', 'YouTube', 'Twitter'].map((item, i) => (
                  <a key={i} href="#" className="transition-colors duration-300 hover:text-brand-dark">
                    {item}
                  </a>
                ))}
              </div>
              <p className="mt-6 max-w-xs text-sm leading-7 text-muted">
                The final step is simple: start the conversation and let the brand feel more established from the next touchpoint onward.
              </p>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-brand-line pt-5 text-[11px] text-muted md:flex-row md:items-center md:justify-between">
            <span className="text-center font-medium md:text-left">
              Copyright {new Date().getFullYear()} {siteConfig.brand.name} Agency. All rights reserved.
            </span>
            <div className="flex gap-6 font-medium uppercase tracking-[0.18em]">
              <span className="cursor-pointer transition-colors duration-300 hover:text-brand-dark">
                Privacy Policy
              </span>
              <span className="cursor-pointer transition-colors duration-300 hover:text-brand-dark">
                Terms
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
