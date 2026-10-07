'use client';

import { type RefObject } from 'react';
import { useGsapHero } from '@/components/motion/use-gsap-hero';

interface HeroProps {
  heroRef: RefObject<HTMLElement | null>;
}

export function Hero({ heroRef }: HeroProps) {
  useGsapHero(heroRef);

  return (
    <section
      ref={heroRef}
      id='top'
      className='relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden'
    >
      <div
        data-hero-curtain
        className='pointer-events-none absolute inset-0 z-50 bg-[#060d0e]'
        aria-hidden
      />

      <div data-hero-sky className='hero-vela absolute inset-0' aria-hidden />
      <div
        className='absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/55'
        aria-hidden
      />

      <div className='pointer-events-none absolute inset-0' aria-hidden>
        <div
          data-hero-orb
          className='absolute left-[8%] top-[18%] h-80 w-80 rounded-full bg-[rgba(184,160,120,0.14)] blur-3xl'
        />
        <div
          data-hero-orb
          className='absolute bottom-[12%] right-[6%] h-[28rem] w-[28rem] rounded-full bg-[rgba(55,130,128,0.28)] blur-3xl'
        />
        <div
          data-hero-orb
          className='absolute left-[40%] top-[55%] h-48 w-48 rounded-full bg-[rgba(255,255,255,0.06)] blur-2xl'
        />
      </div>

      <div
        data-hero-content
        className='relative z-10 mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-28 pt-32 text-center md:px-8'
      >
        <p
          data-hero-eyebrow
          className='mb-10 text-[10px] font-medium uppercase tracking-[0.4em] text-white/40'
        >
          ThinkWords
        </p>

        <h1
          data-hero-title
          className='font-display text-[clamp(2.85rem,9vw,6.25rem)] font-medium leading-[1.05] tracking-tight text-white text-balance'
        >
          ThinkWords is a world of{' '}
          <em className='italic font-normal text-white/90'>its own.</em>
        </h1>

        <p
          data-hero-copy
          className='mt-10 max-w-md text-[15px] font-light leading-[1.8] text-white/50 md:text-base'
        >
          From the moment you arrive, the noise outside fades. Give us a word
          and a feeling — we craft a line worth keeping.
        </p>

        <a
          data-hero-cta
          href='#studio'
          className='cta-link mt-14 text-white'
        >
          <span className='decoration-white/35'>Find your words</span>
          <span aria-hidden>→</span>
        </a>
      </div>

      <div
        data-hero-scroll
        className='absolute bottom-10 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-3'
      >
        <span className='text-[9px] font-medium uppercase tracking-[0.32em] text-white/30'>
          Scroll
        </span>
        <span className='relative h-14 w-px overflow-hidden bg-white/12'>
          <span
            data-hero-scroll-line
            className='absolute inset-x-0 top-0 h-1/3 bg-white/65'
          />
        </span>
      </div>
    </section>
  );
}
