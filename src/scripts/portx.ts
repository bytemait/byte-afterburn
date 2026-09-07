import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const menuButton = document.querySelector<HTMLButtonElement>('.menu-toggle')!;
const navigation = document.querySelector<HTMLElement>('#navigation')!;
function closeMenu() { navigation.hidden = true; menuButton.setAttribute('aria-expanded', 'false'); menuButton.setAttribute('aria-label', 'Open navigation'); }
menuButton.addEventListener('click', () => {
 const open = menuButton.getAttribute('aria-expanded') !== 'true';
 menuButton.setAttribute('aria-expanded', String(open));
 menuButton.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
 navigation.hidden = !open;
});
navigation.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('click', e => { if (!(e.target instanceof Element) || !e.target.closest('.nav')) closeMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
const clock = document.querySelector('#local-time');
function updateTime() { if (clock) clock.textContent = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', hour: 'numeric', minute: '2-digit' }).format(new Date()); }
updateTime(); setInterval(updateTime, 60000);

const services = Array.from(document.querySelectorAll<HTMLButtonElement>('.service-word'));
function activateService(index: number) { services.forEach((el, i) => { el.classList.toggle('is-active', i === index); el.setAttribute('aria-pressed', String(i === index)); }); }
services.forEach((el, i) => { el.addEventListener('pointerenter', () => activateService(i)); el.addEventListener('focus', () => activateService(i)); el.addEventListener('click', () => activateService(i)); });
activateService(1);

document.querySelectorAll<HTMLButtonElement>('[data-billing]').forEach(button => button.addEventListener('click', () => {
 const yearly = button.dataset.billing === 'yearly';
 document.querySelectorAll('[data-billing]').forEach(el => el.setAttribute('aria-pressed', String(el === button)));
 document.querySelectorAll<HTMLElement>('[data-yearly]').forEach(el => { const base = Number(el.dataset.yearly); el.textContent = '$' + (yearly ? base : Math.round(base / .9)).toLocaleString('en-US'); });
}));

const dialog = document.querySelector<HTMLDialogElement>('.project-dialog')!;
const dialogImage = document.querySelector<HTMLImageElement>('#dialog-image')!;
const dialogTitle = document.querySelector('#dialog-title')!;
const dialogDescription = document.querySelector('#dialog-description')!;
dialog.setAttribute('aria-labelledby', 'dialog-title');
document.querySelectorAll<HTMLButtonElement>('[data-project]').forEach(button => button.addEventListener('click', () => {
 dialogTitle.textContent = button.dataset.project ?? '';
 dialogDescription.textContent = button.dataset.description ?? '';
 dialogImage.src = `/portx/original/${button.dataset.image}.webp`;
 dialogImage.alt = `${button.dataset.project} project preview`;
 dialog.showModal();
 document.body.style.overflow = 'hidden';
}));
dialog.querySelector('.dialog-close')?.addEventListener('click', () => dialog.close());
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if(e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
dialog.addEventListener('close', () => { document.body.style.overflow = ''; });

const media = gsap.matchMedia();
media.add('(prefers-reduced-motion: no-preference)', () => {
 gsap.from('.hero h1 span', { yPercent: 22, opacity: .35, duration: 1.15, stagger: .12, ease: 'expo.out', clearProps: 'all' });
 gsap.from('.hero-intro', { opacity: .2, y: 20, duration: 1.2, delay: .25, ease: 'power3.out', clearProps: 'all' });
 gsap.utils.toArray<HTMLElement>('.service-img').forEach((image, i) => {
  gsap.fromTo(image, { y: i % 2 ? 28 : -28 }, { y: i % 2 ? -28 : 28, ease: 'none', scrollTrigger: { trigger: '.service-stage', start: 'top bottom', end: 'bottom top', scrub: 1 } });
 });
 ScrollTrigger.create({ trigger: '.service-stage', start: 'top 45%', end: 'bottom 45%', onUpdate: self => activateService(Math.min(3, Math.floor(self.progress * 4))) });
 gsap.utils.toArray<HTMLElement>('[data-count]').forEach(el => {
  const target = Number(el.dataset.count); const state = { value: 0 };
  gsap.to(state, { value: target, duration: 1.6, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%', once: true }, onUpdate: () => { el.textContent = Math.round(state.value) + (el.dataset.suffix ?? ''); } });
 });
 gsap.to('.sun-scene', { y: -35, ease: 'none', scrollTrigger: { trigger: '.contact', start: 'top bottom', end: 'bottom bottom', scrub: 1 } });
 gsap.utils.toArray<HTMLElement>('.testimonial').forEach((el, i) => gsap.fromTo(el, { y: 20 + i * 7 }, { y: -10, ease: 'none', scrollTrigger: { trigger: '.testimonial-stage', start: 'top bottom', end: 'bottom top', scrub: 1 } }));
 return () => { document.querySelectorAll<HTMLElement>('[data-count]').forEach(el => { el.textContent = el.dataset.count! + (el.dataset.suffix ?? ''); }); };
});
