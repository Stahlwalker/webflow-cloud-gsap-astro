import { gsap, ScrollTrigger } from '../../lib/gsap.js';

gsap.from('.prize-showcase-img', {
  opacity: 0,
  y: 40,
  scale: 0.95,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.prize-showcase',
    start: 'top 85%',
  },
});

gsap.to('.prize-showcase-img', {
  yPercent: -8,
  ease: 'none',
  scrollTrigger: {
    trigger: '.prize-showcase',
    start: 'top bottom',
    end: 'bottom top',
    scrub: true,
  },
});

gsap.from('.prize-card', {
  opacity: 0,
  y: 40,
  scale: 0.96,
  duration: 0.7,
  ease: 'back.out(1.4)',
  stagger: 0.12,
  scrollTrigger: {
    trigger: '.prizes-grid',
    start: 'top 78%',
  },
});

gsap.from('.rank-num', {
  textContent: 0,
  duration: 1.2,
  ease: 'power2.out',
  snap: { textContent: 1 },
  stagger: 0.12,
  scrollTrigger: {
    trigger: '.prizes-grid',
    start: 'top 78%',
  },
});
