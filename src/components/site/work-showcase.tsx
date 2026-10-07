'use client';

import type { RefObject } from 'react';
import { QuoteCard } from '@/components/quote/quote-card';
import { getTemplateById } from '@/lib/templates';
import { showcaseWork } from '@/lib/showcase-work';
import { useGsapWork } from '@/components/motion/use-gsap-work';

interface WorkShowcaseProps {
  sectionRef: RefObject<HTMLElement | null>;
  onTryTemplate?: (templateId: string) => void;
}

export function WorkShowcase({ sectionRef, onTryTemplate }: WorkShowcaseProps) {
  useGsapWork(sectionRef);

  return (
    <section
      ref={sectionRef}
      id='work'
      className='relative overflow-hidden bg-work-bg py-24 md:py-36'
    >
      <div
        data-work-glow
        className='pointer-events-none absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/15 blur-3xl'
        aria-hidden
      />

      <div className='relative z-10 mx-auto max-w-6xl px-5 md:px-8'>
        <div className='mx-auto mb-16 max-w-2xl text-center md:mb-20'>
          <p
            data-work-eyebrow
            className='text-[10px] font-medium uppercase tracking-[0.36em] text-accent'
          >
            Our work
          </p>
          <h2
            data-work-title
            className='font-display mt-5 text-[clamp(2.35rem,5.5vw,4rem)] font-medium leading-[1.1] tracking-tight text-ink text-balance'
          >
            Words from the studio,{' '}
            <em className='italic font-normal'>kept with care</em>
          </h2>
          <p
            data-work-copy
            className='mx-auto mt-6 max-w-md text-[15px] font-light leading-relaxed text-muted'
          >
            A cascade of moods and styles. Click any poster to open it in the
            editor.
          </p>
        </div>

        <div
          data-work-grid
          className='grid gap-5 sm:grid-cols-2 lg:grid-cols-4'
        >
          {showcaseWork.map((piece, i) => {
            const template = getTemplateById(piece.templateId);
            const featured = Boolean(piece.featured);
            return (
              <button
                key={piece.id}
                type='button'
                data-work-card
                data-row={Math.floor(i / 2)}
                data-col={i % 2}
                onClick={() => onTryTemplate?.(piece.templateId)}
                className={`group text-left will-change-transform ${
                  featured ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div
                  data-work-panel
                  className='relative h-full overflow-hidden border border-[var(--line)] bg-surface/80 p-3 backdrop-blur-sm md:p-4'
                >
                  <span
                    data-work-shine
                    className='pointer-events-none absolute inset-y-0 left-0 z-20 w-1/3 skew-x-[-18deg] bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-0'
                    aria-hidden
                  />
                  <div className='mb-3 flex items-center justify-between px-0.5'>
                    <span className='text-[10px] font-medium uppercase tracking-[0.22em] text-mist'>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className='text-[10px] font-medium uppercase tracking-[0.18em] text-accent'>
                      {piece.mood}
                    </span>
                  </div>
                  <QuoteCard
                    quote={piece.quote}
                    author={piece.author}
                    templateId={piece.templateId}
                    size={featured ? 'md' : 'sm'}
                    className={`rounded-none ${
                      featured
                        ? 'min-h-[200px] md:min-h-[240px]'
                        : 'min-h-[150px]'
                    }`}
                  />
                  <div className='mt-3 flex items-center justify-between px-0.5'>
                    <p className='font-display text-base font-medium text-ink'>
                      {template.name}
                    </p>
                    <p className='text-xs font-light text-muted'>{piece.word}</p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        <div className='mt-14 text-center'>
          <a href='#studio' className='cta-link text-ink'>
            <span className='decoration-ink/30'>Step into the studio</span>
            <span aria-hidden>→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
