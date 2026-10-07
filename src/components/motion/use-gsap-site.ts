'use client';

import { useEffect, type RefObject } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type SiteRefs = {
  mainRef: RefObject<HTMLElement | null>;
  navRef: RefObject<HTMLElement | null>;
  footerRef: RefObject<HTMLElement | null>;
  studioRef: RefObject<HTMLElement | null>;
};

/**
 * Site-wide GSAP: nav, footer, studio, progress bar, and any [data-animate] nodes.
 * Section-specific hooks (hero / work / templates) still run alongside this.
 */
export function useGsapSite({
  mainRef,
  navRef,
  footerRef,
  studioRef,
}: SiteRefs) {
  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const main = mainRef.current;
    if (!main) return;

    const ctx = gsap.context(() => {
      /* ---- Page scroll progress ---- */
      let progress = main.querySelector<HTMLElement>('[data-page-progress]');
      if (!progress) {
        progress = document.createElement('div');
        progress.setAttribute('data-page-progress', '');
        progress.style.cssText =
          'position:fixed;top:0;left:0;height:1.5px;width:100%;transform-origin:left center;transform:scaleX(0);background:var(--gold);z-index:60;pointer-events:none;';
        document.body.appendChild(progress);
      }

      gsap.to(progress, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3,
        },
      });

      /* ---- Nav entrance ---- */
      const nav = navRef.current;
      if (nav) {
        const brand = nav.querySelector('[data-nav-brand]');
        const links = nav.querySelectorAll('[data-nav-link]');
        gsap.set([brand, ...links], { y: -24, opacity: 0 });
        gsap.to([brand, ...links], {
          y: 0,
          opacity: 1,
          duration: 0.7,
          stagger: 0.06,
          ease: 'power3.out',
          delay: 0.35,
        });
      }

      /* ---- Studio ---- */
      const studio = studioRef.current;
      if (studio) {
        const heading = studio.querySelectorAll('[data-studio-heading]');
        const panels = studio.querySelectorAll('[data-studio-panel]');
        const fields = studio.querySelectorAll('[data-studio-field]');

        gsap.set(heading, { y: 40, opacity: 0 });
        gsap.set(panels, { y: 60, opacity: 0, scale: 0.97 });
        gsap.set(fields, { y: 16, opacity: 0 });

        const studioTl = gsap.timeline({
          scrollTrigger: {
            trigger: studio,
            start: 'top 78%',
            once: true,
          },
        });

        studioTl
          .to(heading, {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
          })
          .to(
            panels,
            {
              y: 0,
              opacity: 1,
              scale: 1,
              duration: 0.85,
              stagger: 0.14,
              ease: 'power3.out',
            },
            '-=0.35'
          )
          .to(
            fields,
            {
              y: 0,
              opacity: 1,
              duration: 0.45,
              stagger: 0.05,
              ease: 'power2.out',
            },
            '-=0.4'
          );
      }

      /* ---- Footer ---- */
      const footer = footerRef.current;
      if (footer) {
        const parts = footer.querySelectorAll('[data-footer-animate]');
        gsap.set(parts, { y: 36, opacity: 0 });
        gsap.to(parts, {
          y: 0,
          opacity: 1,
          duration: 0.75,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footer,
            start: 'top 88%',
            once: true,
          },
        });
      }

      /* ---- Generic [data-animate] anywhere on the page ---- */
      const nodes = gsap.utils.toArray<HTMLElement>(
        main.querySelectorAll('[data-animate]')
      );
      nodes.forEach((el) => {
        const delay = Number(el.dataset.delay ?? 0);
        gsap.set(el, { y: 32, opacity: 0 });
        gsap.to(el, {
          y: 0,
          opacity: 1,
          duration: 0.7,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 90%',
            once: true,
          },
        });
      });

    }, main);

    requestAnimationFrame(() => ScrollTrigger.refresh());
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(t);
      const bar = document.querySelector('[data-page-progress]');
      bar?.remove();
      ctx.revert();
    };
  }, [mainRef, navRef, footerRef, studioRef]);
}
