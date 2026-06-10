import { gsap, ScrollTrigger } from '../../lib/gsap.js';

gsap.from('.challenge-list li', {
  opacity: 0,
  y: 24,
  duration: 0.6,
  ease: 'power2.out',
  stagger: 0.08,
  scrollTrigger: {
    trigger: '.challenge-list',
    start: 'top 82%',
  },
});
