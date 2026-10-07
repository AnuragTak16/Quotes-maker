'use client';

import { useMemo, useState, type RefObject } from 'react';
import { QuoteCard } from '@/components/quote/quote-card';
import { useGsapTemplates } from '@/components/motion/use-gsap-templates';
import { quoteFonts } from '@/lib/fonts';
import { templates, type TemplateCategory } from '@/lib/templates';

interface TemplatePreviewGridProps {
  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;
  selectedFont: string;
  setSelectedFont: (fontId: string) => void;
  sectionRef: RefObject<HTMLElement | null>;
}

const categoryOrder: Array<TemplateCategory | 'All'> = [
  'All',
  'Light',
  'Bold',
  'Dark',
  'Minimal',
];

export function TemplatePreviewGrid({
  selectedTemplate,
  setSelectedTemplate,
  selectedFont,
  setSelectedFont,
  sectionRef,
}: TemplatePreviewGridProps) {
  const [filter, setFilter] = useState<(typeof categoryOrder)[number]>('All');

  useGsapTemplates(sectionRef, {
    filter,
    selectedTemplate,
    selectedFont,
  });

  const filtered = useMemo(
    () =>
      filter === 'All'
        ? templates
        : templates.filter((t) => t.category === filter),
    [filter]
  );

  const activeTemplate =
    templates.find((t) => t.id === selectedTemplate) ?? templates[0];
  const activeFont =
    quoteFonts.find((f) => f.id === selectedFont) ?? quoteFonts[0];

  return (
    <section
      ref={sectionRef}
      id='templates'
      className='bg-templates-bg py-24 md:py-36'
    >
      <div className='mx-auto max-w-6xl px-5 md:px-8'>
        <div className='mx-auto mb-14 max-w-2xl text-center md:mb-16'>
          <p
            data-templates-heading
            className='text-[10px] font-medium uppercase tracking-[0.36em] text-muted'
          >
            Styles
          </p>
          <h2
            data-templates-heading
            className='font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.1] tracking-tight text-ink text-balance'
          >
            A symphony of colour{' '}
            <em className='italic font-normal'>&amp; type</em>
          </h2>
          <p
            data-templates-heading
            className='mx-auto mt-5 max-w-md text-[15px] font-light leading-relaxed text-muted'
          >
            Choose a typeface and a color mood. Both update your live preview
            and download.
          </p>
        </div>

        <div
          data-templates-preview
          className='mx-auto mb-16 w-full max-w-md overflow-hidden border border-[var(--line)] bg-surface p-4'
        >
          <p className='mb-3 text-center text-[10px] font-medium uppercase tracking-[0.22em] text-muted'>
            Live · {activeTemplate.name} · {activeFont.name}
          </p>
          <div data-templates-preview-card>
            <QuoteCard
              quote={activeTemplate.sampleQuote}
              author='ThinkWords'
              templateId={activeTemplate.id}
              fontId={selectedFont}
              size='sm'
              className='min-h-[120px] rounded-none'
            />
          </div>
        </div>

        <div className='mb-16'>
          <div
            data-templates-heading
            className='mb-6 flex items-baseline justify-between gap-4'
          >
            <h3 className='font-display text-2xl font-medium text-ink'>
              Quote font
            </h3>
            <p className='text-xs font-light text-muted'>
              Applies to preview & download
            </p>
          </div>
          <div className='grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6'>
            {quoteFonts.map((font) => {
              const active = selectedFont === font.id;
              return (
                <button
                  key={font.id}
                  type='button'
                  data-font-card
                  onClick={() => setSelectedFont(font.id)}
                  className={`border p-4 text-left will-change-transform transition-colors ${
                    active
                      ? 'border-accent bg-accent-soft'
                      : 'border-[var(--line)] bg-surface hover:border-ink/25'
                  }`}
                >
                  <span
                    className='block text-3xl leading-none text-ink'
                    style={{
                      fontFamily: font.family,
                      fontStyle: font.style,
                      fontWeight: font.weight,
                    }}
                  >
                    {font.sample}
                  </span>
                  <span className='mt-3 block text-xs font-medium text-ink'>
                    {font.name}
                  </span>
                  <span className='mt-0.5 block text-[10px] uppercase tracking-[0.14em] text-muted'>
                    {font.style}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div>
          <div className='mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
            <h3 className='font-display text-2xl font-medium text-ink'>
              Color styles
            </h3>
            <div className='flex flex-wrap gap-2'>
              {categoryOrder.map((cat) => {
                const on = filter === cat;
                return (
                  <button
                    key={cat}
                    type='button'
                    data-filter-chip
                    onClick={() => setFilter(cat)}
                    className={`px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-colors ${
                      on
                        ? 'bg-ink text-paper'
                        : 'bg-surface text-muted hover:text-ink'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3'>
            {filtered.map((template) => {
              const active = selectedTemplate === template.id;
              return (
                <button
                  key={template.id}
                  type='button'
                  data-style-card
                  onClick={() => setSelectedTemplate(template.id)}
                  className={`overflow-hidden border bg-surface p-3 text-left will-change-transform transition-colors ${
                    active
                      ? 'border-accent'
                      : 'border-[var(--line)] hover:border-ink/25'
                  }`}
                >
                  <QuoteCard
                    quote={template.sampleQuote}
                    author='ThinkWords'
                    templateId={template.id}
                    fontId={selectedFont}
                    size='sm'
                    className='pointer-events-none min-h-[140px] rounded-none'
                  />
                  <div className='mt-3 flex items-start justify-between gap-2 px-1'>
                    <div>
                      <p className='font-display text-lg font-medium text-ink'>
                        {template.name}
                      </p>
                      <p className='mt-1 text-xs font-light leading-relaxed text-muted'>
                        {template.description}
                      </p>
                    </div>
                    <span className='shrink-0 text-[10px] uppercase tracking-[0.14em] text-mist'>
                      {template.category}
                    </span>
                  </div>
                  {active && (
                    <p className='mt-2 px-1 text-[10px] font-medium uppercase tracking-[0.16em] text-accent'>
                      Selected
                    </p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
