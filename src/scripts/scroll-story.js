// Shared scroll-driven reveal logic for the landing page sections below the
// hero (stats, Who We Are, events, CTA). Vanilla JS, no dependencies — this
// follows the same rAF/scroll-position approach the hero already uses in
// DotField.astro / ProjectCardCluster.astro, so the page doesn't end up with
// two different animation systems.
//
// Every section here is progressively enhanced: without this script (or with
// prefers-reduced-motion), the markup is fully visible and usable as plain
// HTML/CSS — see the `.js-anim` gating in index.astro's <style> block.

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function clamp01(n) {
  return Math.min(1, Math.max(0, n));
}

// 0..1 progress for how far `el` has travelled through the viewport between
// `startVH` (fraction of viewport height where progress begins, measured
// from the top) and `endVH` (where it completes).
function sectionProgress(el, startVH, endVH) {
  const r = el.getBoundingClientRect();
  const vh = window.innerHeight;
  const start = vh * startVH;
  const end = vh * endVH;
  return clamp01((start - r.top) / (start - end));
}

// Runs `cb` immediately, then again on scroll/resize, throttled to one call
// per animation frame.
function onScrollRaf(cb) {
  let ticking = false;
  function run() {
    cb();
    ticking = false;
  }
  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(run);
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  run();
}

/* ---------- Stats: staggered reveal + count-up, fires once ---------- */
function initStats() {
  const grid = document.querySelector('[data-stats]');
  if (!grid || reduceMotion) return;
  grid.classList.add('js-anim');

  const stats = Array.from(grid.querySelectorAll('.stat'));

  function animateCount(el) {
    const target = parseInt(el.dataset.count || '0', 10);
    const suffix = el.dataset.suffix || '';
    const dur = 900;
    const start = performance.now();
    el.textContent = '0' + suffix;
    function tick(now) {
      const p = clamp01((now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        grid.classList.add('in-view');
        stats.forEach((stat, i) => {
          const num = stat.querySelector('[data-count]');
          if (!num) return;
          setTimeout(() => animateCount(num), i * 110);
        });
        io.disconnect();
      });
    },
    { threshold: 0.35 }
  );
  io.observe(grid);
}

/* ---------- Who We Are: staged scroll-progress reveal ---------- */
function initWhoWeAre() {
  const section = document.querySelector('[data-who]');
  if (!section || reduceMotion) return;
  const lines = Array.from(section.querySelectorAll('[data-who-line]'));
  if (!lines.length) return;
  section.classList.add('js-anim');

  onScrollRaf(() => {
    const p = sectionProgress(section, 0.92, 0.32);
    lines.forEach((line, i) => {
      const stepStart = i / (lines.length + 0.5);
      const stepEnd = stepStart + 0.55 / lines.length + 0.2;
      const local = clamp01((p - stepStart) / (stepEnd - stepStart));
      line.style.opacity = String(local);
      line.style.transform = `translateY(${(1 - local) * 22}px)`;
    });
  });
}

/* ---------- Events: sticky stack — outgoing card eases back/fades ------- */
function initEvents() {
  const items = Array.from(document.querySelectorAll('[data-event-item]'));
  if (!items.length || reduceMotion) return;

  const stickyTop = 110; // keep in sync with .event-stage-item { top }
  const range = 220; // px over which the "cover" transition happens

  onScrollRaf(() => {
    items.forEach((item, i) => {
      const next = items[i + 1];
      if (!next) {
        item.style.transform = '';
        item.style.opacity = '1';
        return;
      }
      const nextTop = next.getBoundingClientRect().top;
      const p = clamp01((stickyTop + range - nextTop) / range);
      item.style.transform = `translateY(${-p * 10}px) scale(${1 - p * 0.05})`;
      item.style.opacity = String(1 - p * 0.5);
    });
  });
}

/* ---------- CTA: simple reveal on entry ---------- */
function initCta() {
  const el = document.querySelector('[data-cta-reveal]');
  if (!el || reduceMotion) return;
  el.classList.add('js-anim');

  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        el.classList.add('is-in');
        io.disconnect();
      });
    },
    { threshold: 0.25 }
  );
  io.observe(el);
}

initStats();
initWhoWeAre();
initEvents();
initCta();