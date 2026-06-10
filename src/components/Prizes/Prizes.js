import { gsap, ScrollTrigger } from '../../lib/gsap.js';

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
