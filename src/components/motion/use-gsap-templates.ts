'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useGsapTemplates(
  sectionRef: RefObject<HTMLElement | null>,
  deps: { filter: string; selectedTemplate: string; selectedFont: string }
) {
  // Entrance once on mount
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const heading = section.querySelectorAll('[data-templates-heading]');
      const fontCards = section.querySelectorAll('[data-font-card]');
      const preview = section.querySelector('[data-templates-preview]');

      gsap.set(heading, { y: 32, opacity: 0 });
      gsap.set(preview, { y: 40, opacity: 0, scale: 0.96 });
      gsap.set(fontCards, { y: 48, opacity: 0, scale: 0.9 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top 75%',
          once: true,
        },
      });

      tl.to(heading, {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.08,
        ease: 'power3.out',
      })
        .to(
          preview,
          { y: 0, opacity: 1, scale: 1, duration: 0.75, ease: 'power3.out' },
          0.15
        )
        .to(
          fontCards,
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.55,
            stagger: 0.06,
            ease: 'power2.out',
          },
          0.25
        );

      // Hover on font cards
      fontCards.forEach((card) => {
        const enter = () =>
          gsap.to(card, {
            y: -6,
            scale: 1.03,
            duration: 0.28,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        const leave = () =>
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.32,
            ease: 'power2.out',
            overwrite: 'auto',
          });
        card.addEventListener('mouseenter', enter);
        card.addEventListener('mouseleave', leave);
      });
    }, section);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [sectionRef]);

  // Re-animate color style cards when filter changes
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const cards = section.querySelectorAll('[data-style-card]');
    if (!cards.length) return;

    gsap.fromTo(
      cards,
      { y: 36, opacity: 0, scale: 0.94 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        overwrite: true,
      }
    );

    const cleanups: Array<() => void> = [];
    cards.forEach((card) => {
      const enter = () =>
        gsap.to(card, {
          y: -8,
          scale: 1.02,
          duration: 0.28,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      const leave = () =>
        gsap.to(card, {
          y: 0,
          scale: 1,
          duration: 0.32,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
      cleanups.push(() => {
        card.removeEventListener('mouseenter', enter);
        card.removeEventListener('mouseleave', leave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, [sectionRef, deps.filter]);

  // Pulse live preview when template or font changes
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const preview = section.querySelector('[data-templates-preview-card]');
    if (!preview) return;

    gsap.fromTo(
      preview,
      { scale: 0.96, opacity: 0.55 },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'power2.out' }
    );
  }, [sectionRef, deps.selectedTemplate, deps.selectedFont]);
}
