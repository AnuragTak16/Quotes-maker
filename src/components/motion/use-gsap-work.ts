'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Compact picker: section intro + preview crossfade on selection. */
export function useGsapWork(
  sectionRef: RefObject<HTMLElement | null>,
  activeId: string
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      const eyebrow = section.querySelector('[data-work-eyebrow]');
      const title = section.querySelector('[data-work-title]');
      const copy = section.querySelector('[data-work-copy]');
      const preview = section.querySelector('[data-work-preview]');
      const meta = section.querySelector('[data-work-preview-meta]');
      const list = section.querySelector('[data-work-list]');
      const glow = section.querySelector('[data-work-glow]');

      gsap.set([eyebrow, title, copy, preview, meta, list], {
        y: 24,
        opacity: 0,
      });
      if (glow) gsap.set(glow, { opacity: 0 });

      const intro = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 78%',
          once: true,
        },
      });

      intro
        .to(eyebrow, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' })
        .to(title, { y: 0, opacity: 1, duration: 0.55, ease: 'power3.out' }, 0.06)
        .to(copy, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }, 0.12)
        .to(
          preview,
          { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' },
          0.15
        )
        .to(
          [meta, list],
          { y: 0, opacity: 1, duration: 0.55, stagger: 0.08, ease: 'power3.out' },
          0.28
        );

      if (glow) intro.to(glow, { opacity: 1, duration: 0.8 }, 0.1);
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [sectionRef]);

  // Crossfade preview when selection changes
  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !activeId) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const preview = section.querySelector('[data-work-preview]');
    const meta = section.querySelector('[data-work-preview-meta]');
    if (!preview) return;

    if (reduced) return;

    gsap.fromTo(
      preview,
      { opacity: 0, y: 12, scale: 0.985 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
    );
    if (meta) {
      gsap.fromTo(
        meta,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, duration: 0.35, delay: 0.05, ease: 'power2.out' }
      );
    }
  }, [activeId, sectionRef]);
}
