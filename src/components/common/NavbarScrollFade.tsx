import { useEffect } from 'react';

/** Keeps the recreation navbar transparent at the top and adds depth on scroll. */
export default function NavbarScrollFade() {
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>('[data-byte-nav]');
    if (!nav) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance = Math.min(320, window.innerHeight * 0.34);
      const progress = Math.min(1, Math.max(0, window.scrollY / distance));
      nav.style.setProperty('--nav-progress', progress.toFixed(4));
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      nav.style.removeProperty('--nav-progress');
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
    };
  }, []);
  return null;
}
