import { gsap, ScrollTrigger, SplitText } from '../../lib/gsap.js';

document.fonts?.ready.then(runHeroIntro).catch(runHeroIntro);

function runHeroIntro() {
  const lines = document.querySelectorAll('.hero-title .line');
  if (!lines.length) return;

  const split = SplitText.create('.hero-title .line', {
    type: 'chars,words',
    charsClass: 'char',
  });

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from(split.chars, {
    yPercent: 110,
    opacity: 0,
    duration: 0.9,
    stagger: { each: 0.012, from: 'start' },
  })
    .set(lines, { overflow: 'visible' })
    .to(
      '.hero-eyebrow',
      { opacity: 1, y: 0, duration: 0.6 },
      0.05,
    )
    .to(
      '.hero-lede',
      { opacity: 1, y: 0, duration: 0.7 },
      '-=0.45',
    )
    .to(
      '.hero-meta',
      { opacity: 1, duration: 0.6 },
      '-=0.3',
    );
}

// Grand prize amount counts up to $5,000 when scrolled into view,
// with a green flash + soft scale punch when the number lands.
const prizeAmount = document.querySelector('.hero-prize-amount');
if (prizeAmount) {
  const target = Number(prizeAmount.dataset.target) || 5000;
  const formatter = new Intl.NumberFormat('en-US');
  const state = { val: 0 };

  ScrollTrigger.create({
    trigger: prizeAmount,
    start: 'top 90%',
    once: true,
    onEnter: () => {
      const tl = gsap.timeline();
      tl.to(state, {
        val: target,
        duration: 1.4,
        ease: 'power3.out',
        onUpdate: () => {
          prizeAmount.textContent = '$' + formatter.format(Math.round(state.val));
        },
      })
        .to(
          prizeAmount,
          { scale: 1.18, duration: 0.18, ease: 'power2.out' },
          '-=0.15'
        )
        .to(prizeAmount, { scale: 1, duration: 0.3, ease: 'power2.out' });

      // Color flash on landing
      gsap.fromTo(
        prizeAmount,
        { color: 'var(--gsap-green)', textShadow: '0 0 24px rgba(10, 228, 72, 0.45)' },
        {
          color: 'var(--color-text)',
          textShadow: '0 0 0 rgba(10, 228, 72, 0)',
          duration: 0.9,
          ease: 'power2.out',
          delay: 1.25,
        }
      );
    },
  });
}
