import { gsap, ScrollTrigger } from '../../lib/gsap.js';

// Prep every drawable SVG element for a stroke-dashoffset reveal.
// We measure each shape and seed a dash pattern equal to its full length,
// then animate the offset to 0, same effect DrawSVGPlugin gives.
document.querySelectorAll('.tools-card').forEach((card) => {
  const strokes = card.querySelectorAll('.tools-stroke');
  const dots = card.querySelectorAll('.tools-dot');
  const label = card.querySelector('.tools-label');

  strokes.forEach((el) => {
    let length = 0;
    if (typeof el.getTotalLength === 'function') {
      try {
        length = el.getTotalLength();
      } catch (_) {
        length = 0;
      }
    }
    if (!length) {
      // fallback for elements without getTotalLength (rare)
      length = 220;
    }
    gsap.set(el, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
    });
  });

  gsap.set(dots, { scale: 0, opacity: 0 });
  gsap.set(label, { opacity: 0, y: 4 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: card,
      start: 'top 82%',
    },
    defaults: { ease: 'power2.out' },
  });

  tl.from(card, { opacity: 0, y: 24, duration: 0.6 })
    .to(strokes, {
      strokeDashoffset: 0,
      duration: 1.1,
      stagger: 0.04,
      ease: 'power2.inOut',
    }, '-=0.3')
    .to(dots, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      ease: 'back.out(2)',
      stagger: 0.08,
    }, '-=0.4')
    .to(label, {
      opacity: 1,
      y: 0,
      duration: 0.4,
    }, '-=0.2');
});
