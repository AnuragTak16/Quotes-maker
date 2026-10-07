'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/** Animates the live preview whenever a new quote is generated. */
export function useQuoteAppear(quote: string, enabled = true) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const prevQuote = useRef('');

  useEffect(() => {
    if (!enabled || !quote || quote === prevQuote.current) return;
    prevQuote.current = quote;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !wrapRef.current) return;

    const el = wrapRef.current;
    gsap.fromTo(
      el,
      { opacity: 0, y: 24, scale: 0.96, filter: 'blur(6px)' },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.7,
        ease: 'power3.out',
      }
    );
  }, [quote, enabled]);

  return wrapRef;
}
