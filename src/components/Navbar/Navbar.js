import { gsap } from '../../lib/gsap.js';

const toggle = document.querySelector('[data-nav-toggle]');
const panel = document.querySelector('[data-nav-mobile]');
const links = panel ? panel.querySelectorAll('[data-nav-link]') : [];

if (toggle && panel) {
  const open = () => {
    panel.hidden = false;
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    toggle.classList.add('is-open');
    document.body.style.overflow = 'hidden';

    gsap.fromTo(
      panel,
      { autoAlpha: 0, y: -8 },
      { autoAlpha: 1, y: 0, duration: 0.25, ease: 'power2.out' }
    );
    gsap.fromTo(
      links,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.4, ease: 'power3.out', stagger: 0.05, delay: 0.1 }
    );
  };

  const close = () => {
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    toggle.classList.remove('is-open');
    document.body.style.overflow = '';

    gsap.to(panel, {
      autoAlpha: 0,
      y: -8,
      duration: 0.2,
      ease: 'power2.in',
      onComplete: () => {
        panel.hidden = true;
      },
    });
  };

  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    isOpen ? close() : open();
  });

  links.forEach((link) => {
    link.addEventListener('click', close);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      close();
    }
  });

  // Close if viewport grows past mobile breakpoint
  const mq = window.matchMedia('(min-width: 721px)');
  mq.addEventListener('change', (e) => {
    if (e.matches && toggle.getAttribute('aria-expanded') === 'true') close();
  });
}
