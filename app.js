gsap.registerPlugin(ScrollTrigger);

// Hero entrance
gsap.to(".js-hero-item", {
  opacity: 1,
  y: 0,
  duration: 1,
  stagger: 0.12,
  ease: "power3.out",
  delay: 0.15
});

gsap.to(".js-hero-panel", {
  opacity: 1,
  y: 0,
  duration: 1.05,
  ease: "power3.out",
  delay: 0.25
});

// Floating hero panel motion
gsap.to(".hero-panel", {
  y: 10,
  duration: 3.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut"
});

// Shine effect on avatars
gsap.to(".avatar-shine", {
  x: "220%",
  duration: 2.2,
  repeat: -1,
  repeatDelay: 1.2,
  ease: "power2.inOut"
});

// Scroll reveal
gsap.utils.toArray(".js-reveal").forEach((el) => {
  gsap.to(el, {
    opacity: 1,
    y: 0,
    duration: 0.9,
    ease: "power3.out",
    scrollTrigger: {
      trigger: el,
      start: "top 86%",
      toggleActions: "play none none none"
    }
  });
});

// Counters
document.querySelectorAll(".counter").forEach((counter) => {
  const target = parseInt(counter.dataset.target, 10);
  const state = { value: 0 };

  gsap.to(state, {
    value: target,
    duration: 1.8,
    ease: "power2.out",
    scrollTrigger: {
      trigger: counter,
      start: "top 90%",
      toggleActions: "play none none none"
    },
    onUpdate: () => {
      counter.textContent = Math.round(state.value);
    }
  });
});

// FAQ accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-btn");
  const content = item.querySelector(".faq-content");

  btn.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    document.querySelectorAll(".faq-item.open").forEach((openItem) => {
      if (openItem !== item) {
        openItem.classList.remove("open");
        openItem.querySelector(".faq-content").style.maxHeight = null;
      }
    });

    if (isOpen) {
      item.classList.remove("open");
      content.style.maxHeight = null;
    } else {
      item.classList.add("open");
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});

// Smooth cursor-ish hover lift for cards
const hoverCards = document.querySelectorAll(".glass-card, .project-card, .stat-card");
hoverCards.forEach((card) => {
  card.addEventListener("mousemove", (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mx", `${x}px`);
    card.style.setProperty("--my", `${y}px`);
  });

  card.addEventListener("mouseleave", () => {
    card.style.setProperty("--mx", `-1000px`);
    card.style.setProperty("--my", `-1000px`);
  });
});