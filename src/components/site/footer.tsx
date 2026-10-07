'use client';

import { forwardRef } from 'react';

const links = [
  { n: '01', label: 'Work', href: '#work' },
  { n: '02', label: 'Studio', href: '#studio' },
  { n: '03', label: 'Styles', href: '#templates' },
  { n: '04', label: 'Top', href: '#top' },
];

export const SiteFooter = forwardRef<HTMLElement>(function SiteFooter(_, ref) {
  return (
    <footer ref={ref} className='bg-lagoon-deep text-white'>
      <div className='mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20'>
        <div
          data-footer-animate
          className='mb-16 grid gap-10 border-b border-white/10 pb-14 md:grid-cols-2 md:gap-16'
        >
          <div>
            <p className='font-display text-3xl font-medium tracking-tight md:text-4xl'>
              ThinkWords
            </p>
            <p className='mt-4 max-w-sm text-sm font-light leading-relaxed text-white/40'>
              A quiet place to turn one word into a quote you can download and
              share.
            </p>
          </div>
          <div className='md:pt-2'>
            <p className='mb-6 text-[10px] font-medium uppercase tracking-[0.32em] text-white/30'>
              Menu
            </p>
            <ul className='space-y-4'>
              {links.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className='group flex items-baseline gap-4 text-white/55 transition-colors hover:text-white'
                  >
                    <span className='text-[10px] tracking-[0.2em] text-white/25'>
                      {item.n}
                    </span>
                    <span className='font-display text-xl tracking-tight md:text-2xl'>
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          data-footer-animate
          className='flex flex-col gap-4 text-xs text-white/30 sm:flex-row sm:items-center sm:justify-between'
        >
          <p>© {new Date().getFullYear()} ThinkWords</p>
          <a href='#studio' className='transition-colors hover:text-white/60'>
            Create a quote
          </a>
        </div>
      </div>
    </footer>
  );
});
