import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    title: "Brand Identity",
    desc: "Graphinex Original",
    video: "/short videos/vid1.mp4"
  },
  {
    title: "Motion Graphics",
    desc: "Video Editing Magic",
    video: "/short videos/vid2.mp4"
  },
  {
    title: "Web Development",
    desc: "Interactive Experiences",
    video: "/short videos/vid3.mp4"
  },
  {
    title: "Digital Marketing",
    desc: "Scaling Brands",
    video: "/short videos/vid4.mp4"
  }
];

const App = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const heroPanelRef = useRef<HTMLDivElement>(null);
  const revealsRef = useRef<Array<HTMLElement | null>>([]);
  const countersRef = useRef<Array<HTMLHeadingElement | null>>([]);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);

  // Mouse hover spot effect ref handler (Portavia style spotlight)
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty('--mx', `${x}px`);
    card.style.setProperty('--my', `${y}px`);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty('--mx', `-1000px`);
    card.style.setProperty('--my', `-1000px`);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Portavia-style Clipping Text Stagger
      gsap.to('.clip-text span', {
        y: '0%',
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power4.out',
        delay: 0.2
      });

      // 2. Fade Up Details
      gsap.fromTo('.fade-up-item', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.1, ease: 'power3.out', delay: 0.8 }
      );

      // 3. Hero Panel Entrance & Continuous Floating
      gsap.fromTo(heroPanelRef.current,
        { opacity: 0, scale: 0.9, y: 40 },
        { opacity: 1, scale: 1, y: 0, duration: 1.5, ease: 'power4.out', delay: 0.5,
          onComplete: () => {
            gsap.to(heroPanelRef.current, {
              y: -15,
              duration: 3.5,
              repeat: -1,
              yoyo: true,
              ease: "sine.inOut"
            });
          }
        }
      );

      // 4. Avatar Glass Shine Loop
      gsap.to(".avatar-shine", {
        x: "220%",
        duration: 2.2,
        repeat: -1,
        repeatDelay: 1.5,
        ease: "power2.inOut"
      });

      // 5. Scroll Reveals
      revealsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(el, 
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: el,
              start: "top 95%", // Triggers instantly when it enters the viewport
              toggleActions: "play none none none"
            }
          }
        );
      });

      // 6. Number Counting Stats
      countersRef.current.forEach((counter) => {
        if (!counter) return;
        const target = parseInt(counter.getAttribute('data-target') || '0', 10);
        const state = { value: 0 };
        gsap.to(state, {
          value: target,
          duration: 2.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: counter,
            start: "top 95%", // Triggers instantly
            toggleActions: "play none none none"
          },
          onUpdate: () => {
            counter.textContent = Math.round(state.value).toString() + "+";
          }
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const addToRefs = (el: HTMLElement | null, refArray: React.MutableRefObject<Array<any>>) => {
    if (el && !refArray.current.includes(el)) {
      refArray.current.push(el);
    }
  };

  const toggleFaq = (index: number) => {
    setFaqOpen(faqOpen === index ? null : index);
  };

  return (
    <div className="dark-theme">
      {/* Hero Section */}
      <header className="hero" ref={heroRef}>
        <div className="hero-content">
          <h1 className="clip-text"><span>Graphinex</span><br/><span>Creative</span><br/><span>Agency</span></h1>
          <p className="fade-up-item">Results-driven video editing, graphic design, and branding.<br/>We turn your content into clients.</p>
          <div className="fade-up-item" style={{ marginTop: '30px' }}>
            <button className="btn">Get in Touch <span>↗</span></button>
          </div>
        </div>
        <div className="js-hero-panel fade-up-item">
          <div 
            className="hero-panel glass-card" 
            ref={heroPanelRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <div className="avatar">
              <div className="avatar-shine"></div>
            </div>
            <h3>Creative Excellence</h3>
            <p>Elevating brands globally</p>
          </div>
        </div>
      </header>

      {/* Stats Section */}
      <section className="stats">
        {[ { count: "250", label: "Projects Delivered" }, { count: "15", label: "Design Awards" }, { count: "100", label: "Happy Clients" } ].map((stat, i) => (
          <div 
            key={i}
            className="stat-card glass-card" 
            ref={(el) => addToRefs(el, revealsRef)}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <h2 ref={(el) => addToRefs(el, countersRef)} data-target={stat.count}>0</h2>
            <p>{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Projects Section */}
      <section className="projects">
        <h2 ref={(el) => addToRefs(el, revealsRef)} className="clip-text" style={{ display: 'block' }}><span>Selected Work</span></h2>
        <div className="project-grid">
          {projectsData.map((proj, i) => (
            <div 
              key={i}
              className="project-card glass-card" 
              ref={(el) => addToRefs(el, revealsRef)}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <video src={proj.video} autoPlay loop muted playsInline className="project-video"></video>
              <div className="project-content">
                <h3>{proj.title}</h3>
                <p>{proj.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq">
        <h2 ref={(el) => addToRefs(el, revealsRef)} className="clip-text" style={{ display: 'block' }}><span>Frequently Asked</span></h2>
        <div ref={(el) => addToRefs(el, revealsRef)}>
          {[
            { q: "What services do you offer?", a: "We specialize in high-end video editing, bespoke graphic design, and full-scale brand identity development." },
            { q: "How do we start a project?", a: "Simply reach out via our contact form. We'll set up a discovery call to understand your vision and goals." }
          ].map((faq, i) => (
            <div key={i} className={`faq-item ${faqOpen === i ? 'open' : ''}`}>
              <button className="faq-btn" onClick={() => toggleFaq(i)}>
                {faq.q} <span className="icon">+</span>
              </button>
              <div 
                className="faq-content" 
                style={{ height: faqOpen === i ? 'auto' : 0, paddingBottom: faqOpen === i ? '20px' : 0 }}
              >
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;