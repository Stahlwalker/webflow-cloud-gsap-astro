import { gsap, ScrollTrigger, SplitText } from '../../lib/gsap.js';

// Title: characters tumble up when the title is well into view
const titleEl = document.querySelector('.challenge .section-title');
if (titleEl) {
  const split = new SplitText(titleEl, { type: 'chars,words' });
  // Pre-hide chars so they don't flash before the scroll trigger fires
  gsap.set(split.chars, { yPercent: 110, opacity: 0, rotate: 5 });
  ScrollTrigger.create({
    trigger: titleEl,
    start: 'top 70%',
    once: true,
    onEnter: () => {
      gsap.to(split.chars, {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: 0.016,
      });
    },
  });
}

// Lede: soft fade-up after the title lands
gsap.set('.challenge .section-lede', { opacity: 0, y: 16 });
ScrollTrigger.create({
  trigger: '.challenge .section-lede',
  start: 'top 78%',
  once: true,
  onEnter: () => {
    gsap.to('.challenge .section-lede', {
      opacity: 1,
      y: 0,
      duration: 0.7,
      ease: 'power2.out',
    });
  },
});

// Each path card and its steps animate in together
gsap.utils.toArray('.challenge-path').forEach((path) => {
  const tl = gsap.timeline({
    scrollTrigger: { trigger: path, start: 'top 82%' },
    defaults: { ease: 'power2.out' },
  });

  tl.from(path, { opacity: 0, y: 28, duration: 0.7 })
    .from(
      path.querySelectorAll('.challenge-list li'),
      { opacity: 0, y: 16, duration: 0.5, stagger: 0.09 },
      '-=0.35'
    );

  // Bonus flourish for the deploy button when its step is in view
  const deployBtn = path.querySelector('.challenge-deploy');
  if (deployBtn) {
    tl.from(deployBtn, { scale: 0.85, opacity: 0, duration: 0.5, ease: 'back.out(2)' }, '-=0.2');
  }
});

// Terminal: typewriter the git clone command on first view
const codeContent = document.querySelector('.code-terminal .code-content');
if (codeContent) {
  const command = 'git clone https://github.com/Webflow-Examples/astro-gsap.git';
  const renderTyped = (n) => {
    codeContent.innerHTML =
      '<span class="code-prompt">$</span> ' + command.slice(0, n) + (n < command.length ? '<span class="code-caret">▌</span>' : '');
  };

  ScrollTrigger.create({
    trigger: codeContent,
    start: 'top 85%',
    once: true,
    onEnter: () => {
      renderTyped(0);
      const state = { i: 0 };
      gsap.to(state, {
        i: command.length,
        duration: 1.3,
        ease: 'none',
        onUpdate: () => renderTyped(Math.round(state.i)),
      });
    },
  });
}

// Copy-to-clipboard for terminal blocks
document.querySelectorAll('.code-terminal-copy').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const text = btn.getAttribute('data-copy') || '';
    try {
      await navigator.clipboard.writeText(text);
      btn.setAttribute('data-copied', 'true');
      setTimeout(() => btn.removeAttribute('data-copied'), 1400);
    } catch (_) {
      // clipboard blocked — fall back silently
    }
  });
});
