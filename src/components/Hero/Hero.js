import { gsap, SplitText } from '../../lib/gsap.js';

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
      '.hero-ctas',
      { opacity: 1, y: 0, duration: 0.6 },
      '-=0.45',
    )
    .to(
      '.hero-meta',
      { opacity: 1, duration: 0.6 },
      '-=0.3',
    );
}
