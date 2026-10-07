'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

type Tone = 'sand' | 'lagoon' | 'dusk';

interface StatementPanelProps {
  eyebrow?: string;
  title: ReactNode;
  copy?: string;
  cta?: { label: string; href: string };
  tone?: Tone;
  minHeight?: 'screen' | 'tall' | 'compact';
  align?: 'center' | 'left';
  children?: ReactNode;
}

const toneClass: Record<Tone, string> = {
  sand: 'panel-sand text-ink',
  lagoon: 'panel-lagoon text-white',
  dusk: 'panel-dusk text-white',
};

const heightClass = {
  screen: 'min-h-[100svh]',
  tall: 'min-h-[70svh] py-28 md:py-36',
  compact: 'py-24 md:py-32',
};

export function StatementPanel({
  eyebrow,
  title,
  copy,
  cta,
  tone = 'sand',
  minHeight = 'tall',
  align = 'center',
  children,
}: StatementPanelProps) {
  const ref = useRef<HTMLElement>(null);
  const isDark = tone !== 'sand';

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const ctx = gsap.context(() => {
      const parts = el.querySelectorAll('[data-statement]');
      gsap.set(parts, { y: 48, opacity: 0 });
      gsap.to(parts, {
        y: 0,
        opacity: 1,
        duration: 1.1,
        stagger: 0.14,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 72%',
          once: true,
        },
      });
    }, el);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={ref}
      className={`relative flex flex-col justify-center overflow-hidden ${toneClass[tone]} ${heightClass[minHeight]}`}
    >
      <div
        className={`relative z-10 mx-auto w-full max-w-4xl px-6 md:px-8 ${
          align === 'center' ? 'text-center' : 'text-left'
        }`}
      >
        {eyebrow && (
          <p
            data-statement
            className={`mb-8 text-[10px] font-medium uppercase tracking-[0.38em] ${
              isDark ? 'text-white/45' : 'text-muted'
            }`}
          >
            {eyebrow}
          </p>
        )}

        <h2
          data-statement
          className='font-display text-[clamp(2.25rem,6.5vw,4.5rem)] font-medium leading-[1.12] tracking-tight text-balance'
        >
          {title}
        </h2>

        {copy && (
          <p
            data-statement
            className={`mx-auto mt-8 max-w-xl text-[15px] font-light leading-[1.75] md:text-base ${
              align === 'left' ? 'mx-0' : ''
            } ${isDark ? 'text-white/55' : 'text-muted'}`}
          >
            {copy}
          </p>
        )}

        {cta && (
          <div data-statement className={`${align === 'center' ? 'mt-12' : 'mt-10'}`}>
            <a
              href={cta.href}
              className={`cta-link ${isDark ? 'text-white' : 'text-ink'}`}
            >
              <span
                className={
                  isDark
                    ? 'decoration-white/35'
                    : 'decoration-ink/30'
                }
              >
                {cta.label}
              </span>
              <span aria-hidden>→</span>
            </a>
          </div>
        )}

        {children}
      </div>
    </section>
  );
}
