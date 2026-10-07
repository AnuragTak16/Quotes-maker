'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Slow, cinematic hero motion — Velaa-inspired. */
export function useGsapHero(heroRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const curtain = hero.querySelector('[data-hero-curtain]');
    const sky = hero.querySelector('[data-hero-sky]');
    const orbs = hero.querySelectorAll('[data-hero-orb]');
    const eyebrow = hero.querySelector('[data-hero-eyebrow]');
    const title = hero.querySelector('[data-hero-title]');
    const copy = hero.querySelector('[data-hero-copy]');
    const cta = hero.querySelector('[data-hero-cta]');
    const scroll = hero.querySelector('[data-hero-scroll]');
    const scrollLine = hero.querySelector('[data-hero-scroll-line]');
    const content = hero.querySelector('[data-hero-content]');

    if (reduced) {
      gsap.set(curtain, { autoAlpha: 0 });
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(curtain, { yPercent: 0 });
      gsap.set(sky, { scale: 1.08 });
      gsap.set(orbs, { opacity: 0, scale: 0.85 });
      gsap.set([eyebrow, title, copy, cta, scroll], { opacity: 0, y: 28 });

      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      tl.to(curtain, {
        yPercent: -100,
        duration: 1.35,
        ease: 'power3.inOut',
      })
        .to(sky, { scale: 1, duration: 2.2, ease: 'power1.out' }, 0.2)
        .to(
          orbs,
          { opacity: 1, scale: 1, duration: 1.8, stagger: 0.2 },
          0.45
        )
        .to(eyebrow, { opacity: 1, y: 0, duration: 0.9 }, 0.7)
        .to(title, { opacity: 1, y: 0, duration: 1.15 }, 0.85)
        .to(copy, { opacity: 1, y: 0, duration: 1 }, 1.15)
        .to(cta, { opacity: 1, y: 0, duration: 0.85 }, 1.35)
        .to(scroll, { opacity: 1, y: 0, duration: 0.7 }, 1.55);

      if (scrollLine) {
        gsap.fromTo(
          scrollLine,
          { y: '-100%' },
          {
            y: '250%',
            duration: 1.8,
            ease: 'power1.inOut',
            repeat: -1,
            repeatDelay: 0.5,
          }
        );
      }

      orbs.forEach((orb, i) => {
        gsap.to(orb, {
          x: i % 2 === 0 ? 24 : -20,
          y: i % 2 === 0 ? -16 : 20,
          duration: 8 + i * 2,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
        });
      });

      if (content) {
        gsap.to(content, {
          y: 80,
          opacity: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: hero,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      gsap.to(sky, {
        scale: 1.12,
        ease: 'none',
        scrollTrigger: {
          trigger: hero,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, hero);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => ctx.revert();
  }, [heroRef]);
}
