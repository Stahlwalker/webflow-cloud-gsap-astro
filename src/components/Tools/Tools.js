import { gsap, ScrollTrigger } from '../../lib/gsap.js';

// One self-contained entrance pass for a single Tools card.
// Pulled into a function so the "Replay" button can call it again.
function runEntrance(card, delay = 0) {
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
    if (!length) length = 220;
    gsap.set(el, {
      strokeDasharray: length,
      strokeDashoffset: length,
      opacity: 1,
    });
  });

  gsap.set(dots, { scale: 0, opacity: 0 });
  gsap.set(label, { opacity: 0, y: 4 });
  gsap.set(card, { opacity: 1, y: 0, clearProps: 'transform' });

  const tl = gsap.timeline({
    delay,
    defaults: { ease: 'power2.out' },
  });

  tl.from(card, { opacity: 0, y: 24, duration: 0.6 })
    .to(
      strokes,
      { strokeDashoffset: 0, duration: 1.1, stagger: 0.04, ease: 'power2.inOut' },
      '-=0.3'
    )
    .to(dots, { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', stagger: 0.08 }, '-=0.4')
    .to(label, { opacity: 1, y: 0, duration: 0.4 }, '-=0.2');

  return tl;
}

const cards = document.querySelectorAll('.tools-card');

// Pre-hide strokes / dots / label so nothing flashes before its trigger fires.
cards.forEach((card) => {
  card.querySelectorAll('.tools-stroke').forEach((el) => {
    let length = 220;
    if (typeof el.getTotalLength === 'function') {
      try {
        length = el.getTotalLength() || 220;
      } catch (_) {}
    }
    gsap.set(el, { strokeDasharray: length, strokeDashoffset: length });
  });
  gsap.set(card.querySelectorAll('.tools-dot'), { scale: 0, opacity: 0 });
  gsap.set(card.querySelector('.tools-label'), { opacity: 0, y: 4 });

  ScrollTrigger.create({
    trigger: card,
    start: 'top 82%',
    once: true,
    onEnter: () => runEntrance(card),
  });
});

// "See the code" toggle — expand/collapse the panel below the cards.
const toggle = document.querySelector('[data-tools-toggle]');
const panel = document.querySelector('[data-tools-code]');
const toggleText = document.querySelector('[data-tools-toggle-text]');

if (toggle && panel) {
  let open = false;
  toggle.addEventListener('click', () => {
    open = !open;
    if (open) {
      panel.hidden = false;
      gsap.fromTo(
        panel,
        { height: 0, autoAlpha: 0, y: -8 },
        {
          height: 'auto',
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: 'power3.out',
        }
      );
      toggle.setAttribute('aria-expanded', 'true');
      if (toggleText) toggleText.textContent = 'Hide the code';
    } else {
      gsap.to(panel, {
        height: 0,
        autoAlpha: 0,
        y: -8,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          panel.hidden = true;
          gsap.set(panel, { clearProps: 'height,opacity,visibility,transform' });
        },
      });
      toggle.setAttribute('aria-expanded', 'false');
      if (toggleText) toggleText.textContent = 'See the code';
    }
  });
}

// Replay button — re-runs the entrance animation on every card, staggered.
const replay = document.querySelector('[data-tools-replay]');
if (replay) {
  replay.addEventListener('click', () => {
    cards.forEach((card, i) => {
      runEntrance(card, i * 0.15);
    });
  });
}
