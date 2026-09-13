import { useEffect } from 'react';

/** Mirrors one existing hover state while a touch visitor scrolls through its target. */
export default function MobileScrollHover() {
  useEffect(() => {
    const touchViewport = matchMedia('(hover: none), (pointer: coarse)');
    let active: HTMLElement | null = null;
    let frame = 0;

    const clear = () => {
      if (!active) return;
      active.classList.remove('is-scroll-hover');
      active = null;
    };
    const update = () => {
      frame = 0;
      if (!touchViewport.matches || document.hidden) return clear();
      const viewportCenter = window.innerHeight * 0.52;
      const candidate = [...document.querySelectorAll<HTMLElement>('[data-scroll-hover]')]
        .map(element => ({ element, rect: element.getBoundingClientRect() }))
        .filter(({ rect }) => rect.bottom > window.innerHeight * 0.2 && rect.top < window.innerHeight * 0.8)
        .sort((a, b) => Math.abs((a.rect.top + a.rect.bottom) / 2 - viewportCenter) - Math.abs((b.rect.top + b.rect.bottom) / 2 - viewportCenter))[0]?.element || null;
      if (candidate === active) return;
      clear();
      if (!candidate) return;
      active = candidate;
      active.classList.add('is-scroll-hover');
    };
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    document.addEventListener('visibilitychange', schedule);
    touchViewport.addEventListener('change', schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      clear();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      document.removeEventListener('visibilitychange', schedule);
      touchViewport.removeEventListener('change', schedule);
    };
  }, []);
  return null;
}
