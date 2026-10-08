'use client';

import { useCallback, useState, type RefObject } from 'react';
import { QuoteCard } from '@/components/quote/quote-card';
import { getTemplateById } from '@/lib/templates';
import { showcaseWork } from '@/lib/showcase-work';
import { useGsapWork } from '@/components/motion/use-gsap-work';

interface WorkShowcaseProps {
  sectionRef: RefObject<HTMLElement | null>;
  onTryTemplate?: (templateId: string) => void;
}

export function WorkShowcase({ sectionRef, onTryTemplate }: WorkShowcaseProps) {
  const [activeId, setActiveId] = useState(showcaseWork[0]?.id ?? '');
  const active =
    showcaseWork.find((p) => p.id === activeId) ?? showcaseWork[0];
  const template = getTemplateById(active.templateId);

  useGsapWork(sectionRef, activeId);

  const select = useCallback((id: string) => {
    setActiveId(id);
  }, []);

  return (
    <section
      ref={sectionRef}
      id='work'
      className='relative overflow-hidden bg-work-bg py-16 md:py-20'
    >
      <div
        data-work-glow
        className='pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl'
        aria-hidden
      />

      <div className='relative z-10 mx-auto max-w-6xl px-5 md:px-8'>
        <div className='mb-8 flex items-end justify-between gap-6 md:mb-10'>
          <div>
            <p
              data-work-eyebrow
              className='text-[10px] font-medium uppercase tracking-[0.32em] text-accent'
            >
              Our work
            </p>
            <h2
              data-work-title
              className='font-display mt-2 text-[clamp(1.85rem,4vw,2.75rem)] font-medium leading-[1.1] tracking-tight text-ink'
            >
              Pick a mood,{' '}
              <em className='italic font-normal'>make it yours</em>
            </h2>
          </div>
          <a
            data-work-copy
            href='#studio'
            className='cta-link hidden shrink-0 text-ink sm:inline-flex'
          >
            <span className='decoration-ink/30'>Studio</span>
            <span aria-hidden>→</span>
          </a>
        </div>

        <div className='grid items-stretch gap-6 md:grid-cols-12 md:gap-8'>
          {/* Live preview */}
          <div className='md:col-span-7'>
            <div
              data-work-preview
              className='relative overflow-hidden'
              key={active.id}
            >
              <QuoteCard
                quote={active.quote}
                author={active.author}
                templateId={active.templateId}
                size='lg'
                className='min-h-[220px] rounded-none md:min-h-[280px]'
              />
            </div>
            <div
              data-work-preview-meta
              className='mt-4 flex flex-wrap items-center justify-between gap-3'
            >
              <div>
                <p className='font-display text-xl font-medium text-ink md:text-2xl'>
                  {template.name}
                </p>
                <p className='mt-1 text-xs font-light text-muted'>
                  {active.word} · {active.mood} · {active.author}
                </p>
              </div>
              <button
                type='button'
                onClick={() => onTryTemplate?.(active.templateId)}
                className='cta-link text-ink'
              >
                <span className='decoration-ink/30'>Use this style</span>
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>

          {/* Compact picker list */}
          <div
            data-work-list
            className='flex flex-col justify-between md:col-span-5'
          >
            <ul className='divide-y divide-[var(--line)] border-y border-[var(--line)]'>
              {showcaseWork.map((piece, i) => {
                const t = getTemplateById(piece.templateId);
                const on = piece.id === active.id;
                return (
                  <li key={piece.id}>
                    <button
                      type='button'
                      data-work-card
                      onClick={() => select(piece.id)}
                      onMouseEnter={() => select(piece.id)}
                      className={`group flex w-full items-center gap-3 py-3 text-left transition-colors ${
                        on ? 'bg-surface/80' : 'hover:bg-surface/50'
                      }`}
                    >
                      <span
                        className={`w-7 shrink-0 text-[10px] font-medium tracking-[0.14em] ${
                          on ? 'text-accent' : 'text-mist'
                        }`}
                      >
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span
                        data-work-swatch
                        className='h-9 w-9 shrink-0'
                        style={{
                          background: `linear-gradient(145deg, ${t.colors.bg1}, ${t.colors.bg2})`,
                          border: `1px solid ${t.colors.border}`,
                        }}
                        aria-hidden
                      />
                      <span className='min-w-0 flex-1'>
                        <span
                          className={`font-display block text-base leading-tight ${
                            on ? 'text-ink' : 'text-ink/80'
                          }`}
                        >
                          {t.name}
                        </span>
                        <span className='mt-0.5 block truncate text-[11px] font-light text-muted'>
                          {piece.mood} · {piece.word}
                        </span>
                      </span>
                      <span
                        className={`shrink-0 pr-2 text-[10px] uppercase tracking-[0.16em] transition-opacity ${
                          on
                            ? 'text-accent opacity-100'
                            : 'text-mist opacity-0 group-hover:opacity-60'
                        }`}
                      >
                        View
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <button
              type='button'
              data-work-cta
              onClick={() => onTryTemplate?.(active.templateId)}
              className='mt-5 flex h-11 w-full items-center justify-center bg-ink text-[11px] font-medium uppercase tracking-[0.22em] text-paper transition-opacity hover:opacity-90 md:hidden'
            >
              Use this style
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
