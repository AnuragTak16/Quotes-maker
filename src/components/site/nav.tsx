'use client';

import { forwardRef, useEffect, useState } from 'react';

export const SiteNav = forwardRef<HTMLElement>(function SiteNav(_, ref) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const link =
    scrolled
      ? 'text-ink/70 hover:text-ink'
      : 'text-white/70 hover:text-white';

  return (
    <header
      ref={ref}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? 'border-b border-[var(--line)] bg-paper/90 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <nav className='mx-auto flex h-[4.5rem] max-w-6xl items-center justify-between px-5 md:h-[5.25rem] md:px-8'>
        <a
          href='#top'
          data-nav-brand
          className={`font-display text-[1.65rem] font-medium tracking-[0.04em] md:text-[1.85rem] ${
            scrolled ? 'text-ink' : 'text-white'
          }`}
        >
          ThinkWords
        </a>

        <div className='flex items-center gap-8 md:gap-11'>
          <a
            href='#work'
            data-nav-link
            className={`hidden text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-300 sm:inline ${link}`}
          >
            Work
          </a>
          <a
            href='#studio'
            data-nav-link
            className={`hidden text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-300 md:inline ${link}`}
          >
            Studio
          </a>
          <a
            href='#templates'
            data-nav-link
            className={`hidden text-[10px] font-medium uppercase tracking-[0.26em] transition-colors duration-300 md:inline ${link}`}
          >
            Styles
          </a>
          <a
            href='#studio'
            data-nav-link
            className={`text-[10px] font-medium uppercase tracking-[0.26em] underline decoration-1 underline-offset-[9px] transition-opacity hover:opacity-70 ${
              scrolled
                ? 'text-ink decoration-ink/25'
                : 'text-white decoration-white/35'
            }`}
          >
            Begin
          </a>
        </div>
      </nav>
    </header>
  );
});
