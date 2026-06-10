import { gsap, ScrollTrigger } from '../../lib/gsap.js';

gsap.from('.tool-card', {
  opacity: 0,
  y: 30,
  duration: 0.7,
  ease: 'power3.out',
  stagger: 0.08,
  scrollTrigger: {
    trigger: '.tools-grid',
    start: 'top 80%',
  },
});
