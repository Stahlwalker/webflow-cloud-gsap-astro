import { gsap, ScrollTrigger } from '../../lib/gsap.js';

// Scroll-in entrance
gsap.from('.prize-card', {
  opacity: 0,
  y: 28,
  duration: 0.7,
  ease: 'power2.out',
  scrollTrigger: { trigger: '.prize-card', start: 'top 82%' },
});

gsap.from('.prize-img', {
  opacity: 0,
  scale: 0.92,
  rotate: -3,
  duration: 0.9,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.prize-card', start: 'top 82%' },
});

gsap.from('.prize-loot li', {
  opacity: 0,
  x: -12,
  duration: 0.5,
  ease: 'power2.out',
  stagger: 0.1,
  scrollTrigger: { trigger: '.prize-loot', start: 'top 88%' },
});

// Animated winner count
const countNum = document.querySelector('.prize-count-num');
if (countNum) {
  const state = { val: 0 };
  ScrollTrigger.create({
    trigger: '.prize-count',
    start: 'top 90%',
    once: true,
    onEnter: () => {
      gsap.to(state, {
        val: 3,
        duration: 0.7,
        ease: 'power2.out',
        onUpdate: () => {
          countNum.textContent = '× ' + String(Math.round(state.val)).padStart(2, '0');
        },
      });
    },
  });
}

// Grand prize amount counts up to $5,000
const grandAmount = document.querySelector('.prize-grand-amount');
if (grandAmount) {
  const state = { val: 0 };
  const formatter = new Intl.NumberFormat('en-US');
  ScrollTrigger.create({
    trigger: '.prize-grand',
    start: 'top 85%',
    once: true,
    onEnter: () => {
      gsap.to(state, {
        val: 5000,
        duration: 1.2,
        ease: 'power2.out',
        onUpdate: () => {
          grandAmount.textContent = '$' + formatter.format(Math.round(state.val));
        },
      });
    },
  });
}

// Idle float + breathing glow on the keyboard
const heroImg = document.querySelector('.prize-figure .prize-img');
const heroGlow = document.querySelector('.prize-figure .prize-glow');
if (heroImg) {
  gsap.to(heroImg, {
    y: -10,
    duration: 2.6,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
  gsap.to(heroImg, {
    rotate: 0.8,
    duration: 4.2,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
}
if (heroGlow) {
  gsap.to(heroGlow, {
    scale: 1.08,
    opacity: 0.85,
    duration: 2.6,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });
}

// Mouse-tracked tilt on hover
const figureBtn = document.querySelector('.prize-figure-btn');
if (figureBtn && heroImg) {
  let raf = 0;
  const target = { rx: 0, ry: 0, scale: 1 };
  const setTransform = () => {
    gsap.to(heroImg, {
      rotationX: target.rx,
      rotationY: target.ry,
      scale: target.scale,
      duration: 0.5,
      ease: 'power3.out',
      overwrite: 'auto',
    });
  };
  figureBtn.addEventListener('mousemove', (e) => {
    const rect = figureBtn.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    target.ry = px * 10;
    target.rx = -py * 8;
    target.scale = 1.03;
    if (raf) cancelAnimationFrame(raf);
    raf = requestAnimationFrame(setTransform);
  });
  figureBtn.addEventListener('mouseleave', () => {
    target.rx = 0;
    target.ry = 0;
    target.scale = 1;
    setTransform();
  });
}

// Lightbox controller
const gallery = window.__prizeGallery || [];
const lightbox = document.getElementById('prize-lightbox');
const lbImg = lightbox?.querySelector('[data-prize-img]');
const dots = lightbox ? Array.from(lightbox.querySelectorAll('[data-prize-dot]')) : [];
let currentIdx = 0;

function show(idx) {
  if (!gallery.length || !lbImg) return;
  currentIdx = (idx + gallery.length) % gallery.length;
  const entry = gallery[currentIdx];
  gsap.to(lbImg, {
    opacity: 0,
    scale: 0.98,
    duration: 0.15,
    ease: 'power2.in',
    onComplete: () => {
      lbImg.src = entry.src;
      lbImg.alt = entry.alt;
      gsap.fromTo(
        lbImg,
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    },
  });
  dots.forEach((d, i) => d.classList.toggle('is-active', i === currentIdx));
}

function openLightbox(idx = 0) {
  if (!lightbox) return;
  lightbox.hidden = false;
  document.body.style.overflow = 'hidden';
  gsap.fromTo(
    lightbox,
    { opacity: 0 },
    { opacity: 1, duration: 0.25, ease: 'power2.out' }
  );
  gsap.fromTo(
    lbImg,
    { opacity: 0, scale: 0.94, y: 12 },
    { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' }
  );
  show(idx);
}

function closeLightbox() {
  if (!lightbox) return;
  gsap.to(lightbox, {
    opacity: 0,
    duration: 0.2,
    ease: 'power2.in',
    onComplete: () => {
      lightbox.hidden = true;
      document.body.style.overflow = '';
    },
  });
}

document.querySelectorAll('[data-prize-open]').forEach((btn) => {
  btn.addEventListener('click', () => openLightbox(0));
});
document.querySelectorAll('[data-prize-close]').forEach((btn) => {
  btn.addEventListener('click', closeLightbox);
});
document.querySelectorAll('[data-prize-prev]').forEach((btn) => {
  btn.addEventListener('click', () => show(currentIdx - 1));
});
document.querySelectorAll('[data-prize-next]').forEach((btn) => {
  btn.addEventListener('click', () => show(currentIdx + 1));
});
dots.forEach((d) => {
  d.addEventListener('click', () => show(parseInt(d.dataset.prizeDot, 10)));
});

// Backdrop click closes
lightbox?.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

// Keyboard nav
document.addEventListener('keydown', (e) => {
  if (!lightbox || lightbox.hidden) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') show(currentIdx - 1);
  if (e.key === 'ArrowRight') show(currentIdx + 1);
});
