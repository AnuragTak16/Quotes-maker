'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Cascade / wave reveal pattern for the work grid. */
export function useGsapWork(sectionRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector('[data-work-eyebrow]');
      const title = section.querySelector('[data-work-title]');
      const copy = section.querySelector('[data-work-copy]');
      const glow = section.querySelector('[data-work-glow]');
      const cards = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll('[data-work-card]')
      );
      const panels = gsap.utils.toArray<HTMLElement>(
        section.querySelectorAll('[data-work-panel]')
      );

      gsap.set([eyebrow, title, copy], { y: 28, opacity: 0 });
      gsap.set(cards, {
        y: 64,
        opacity: 0,
        scale: 0.92,
        rotateX: 8,
        transformPerspective: 800,
      });
      if (glow) gsap.set(glow, { opacity: 0, scale: 0.85 });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 72%',
          once: true,
        },
      });

      intro
        .to(eyebrow, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' })
        .to(title, { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, 0.08)
        .to(copy, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, 0.18);

      if (glow) {
        intro.to(glow, { opacity: 0.7, scale: 1, duration: 1 }, 0.1);
        gsap.to(glow, {
          x: 40,
          duration: 7,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      }

      // Cascade wave: stagger by diagonal (row + col)
      cards.forEach((card, i) => {
        const row = Number(card.dataset.row ?? Math.floor(i / 2));
        const col = Number(card.dataset.col ?? i % 2);
        const delay = (row + col) * 0.08;

        gsap.to(card, {
          y: 0,
          opacity: 1,
          scale: 1,
          rotateX: 0,
          duration: 0.85,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section.querySelector('[data-work-grid]'),
            start: 'top 80%',
            once: true,
          },
        });
      });

      // Soft float on panels (avoids fighting card entrance y)
      panels.forEach((panel, i) => {
        gsap.to(panel, {
          y: i % 2 === 0 ? -5 : 5,
          duration: 3 + (i % 4) * 0.4,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          delay: 1.8 + i * 0.1,
        });
      });

      // Hover lift + shine
      panels.forEach((panel) => {
        const shine = panel.querySelector('[data-work-shine]');
        const enter = () => {
          gsap.to(panel, {
            y: -10,
            scale: 1.02,
            borderColor: 'rgba(47, 111, 106, 0.45)',
            boxShadow: '0 16px 40px rgba(28, 27, 25, 0.1)',
            duration: 0.35,
            ease: 'power2.out',
            overwrite: 'auto',
          });
          if (shine) {
            gsap.fromTo(
              shine,
              { x: '-120%', opacity: 0 },
              { x: '120%', opacity: 0.55, duration: 0.65, ease: 'power2.out' }
            );
          }
        };
        const leave = () => {
          gsap.to(panel, {
            y: 0,
            scale: 1,
            borderColor: 'rgba(28, 27, 25, 0.1)',
            boxShadow: '0 1px 2px rgba(28, 27, 25, 0.04)',
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        };
        panel.addEventListener('mouseenter', enter);
        panel.addEventListener('mouseleave', leave);
      });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.clearTimeout(t);
      ctx.revert();
    };
  }, [sectionRef]);
}
