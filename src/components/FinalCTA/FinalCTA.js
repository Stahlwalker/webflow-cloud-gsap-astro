import { gsap, ScrollTrigger } from '../../lib/gsap.js';

gsap.from('.cta-card', {
  opacity: 0,
  y: 36,
  duration: 0.8,
  ease: 'power3.out',
  stagger: 0.12,
  scrollTrigger: {
    trigger: '.final-grid',
    start: 'top 78%',
  },
});
