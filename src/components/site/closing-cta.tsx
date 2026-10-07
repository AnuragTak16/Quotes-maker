'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ClosingCta() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const parts = el.querySelectorAll('[data-close]');
      gsap.set(parts, { y: 40, opacity: 0 });
      gsap.to(parts, {
        y: 0,
        opacity: 1,
        duration: 1.15,
        stagger: 0.16,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 75%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className='panel-dusk relative flex min-h-[70svh] flex-col items-center justify-center overflow-hidden px-6 py-28 text-center md:px-8'
    >
      <div
        className='pointer-events-none absolute inset-0 opacity-40'
        aria-hidden
      >
        <div className='absolute left-1/2 top-1/3 h-64 w-64 -translate-x-1/2 rounded-full bg-[rgba(184,160,120,0.15)] blur-3xl' />
      </div>

      <p
        data-close
        className='font-display text-[clamp(2rem,5.5vw,3.75rem)] font-medium leading-[1.15] tracking-tight text-white text-balance'
      >
        A line held for you.
      </p>
      <p
        data-close
        className='font-display mt-3 text-[clamp(2rem,5.5vw,3.75rem)] font-medium italic leading-[1.15] tracking-tight text-white/85 text-balance'
      >
        Your quote is waiting.
      </p>

      <a
        data-close
        href='#studio'
        className='cta-link mt-14 text-white'
      >
        <span className='decoration-white/35'>Create your quote</span>
        <span aria-hidden>→</span>
      </a>
    </section>
  );
}
