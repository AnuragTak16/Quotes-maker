'use client';

import { Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { QuoteCard } from '@/components/quote/quote-card';
import { getFontById } from '@/lib/fonts';
import { getTemplateById } from '@/lib/templates';
import { useQuoteAppear } from '@/components/motion/use-quote-appear';
import type { RefObject } from 'react';

interface QuoteDisplayProps {
  quote: string;
  authorName: string;
  selectedTemplate: string;
  selectedFont: string;
  quoteCardRef: RefObject<HTMLDivElement | null>;
  handleDownload: () => void;
  handleShareEmail: () => void;
}

export function QuoteDisplay({
  quote,
  authorName,
  selectedTemplate,
  selectedFont,
  quoteCardRef,
  handleDownload,
  handleShareEmail,
}: QuoteDisplayProps) {
  const currentTemplate = getTemplateById(selectedTemplate);
  const currentFont = getFontById(selectedFont);
  const appearRef = useQuoteAppear(quote);

  return (
    <div className='flex flex-col border border-[var(--line)] bg-surface p-7 md:p-9'>
      <div className='mb-8'>
        <p className='text-[10px] font-medium uppercase tracking-[0.32em] text-muted'>
          Preview
        </p>
        <h3 className='font-display mt-3 text-2xl font-medium tracking-tight text-ink md:text-3xl'>
          Your poster
        </h3>
        <p className='mt-2 text-sm font-light leading-relaxed text-muted'>
          {currentTemplate.name} · {currentFont.name}
        </p>
      </div>

      {quote ? (
        <div ref={appearRef} className='flex flex-1 flex-col gap-4'>
          <QuoteCard
            innerRef={quoteCardRef}
            quote={quote}
            author={authorName || 'ThinkWords'}
            templateId={selectedTemplate}
            fontId={selectedFont}
            size='lg'
            className='min-h-[260px] flex-1 rounded-none'
          />

          <div className='flex flex-col gap-2 sm:flex-row'>
            <Button
              onClick={handleDownload}
              className='flex h-11 flex-1 items-center justify-center gap-2 rounded-none bg-ink text-[11px] font-medium uppercase tracking-[0.18em] text-paper hover:bg-ink/90'
            >
              <Download className='h-4 w-4' /> Download
            </Button>
            <Button
              onClick={handleShareEmail}
              variant='outline'
              className='flex h-11 flex-1 items-center justify-center gap-2 rounded-none border-[var(--line)] bg-transparent text-[11px] font-medium uppercase tracking-[0.18em] text-ink hover:bg-paper-2'
            >
              <Mail className='h-4 w-4' /> Email
            </Button>
          </div>
        </div>
      ) : (
        <div className='flex min-h-[260px] flex-1 flex-col items-center justify-center border border-dashed border-[var(--line)] bg-paper-2/70 px-6 py-12 text-center'>
          <p className='font-display text-xl italic text-mist'>
            Your quote will appear here
          </p>
          <p className='mt-2 max-w-[220px] text-sm font-light text-muted'>
            Fill in the form and generate when you&apos;re ready.
          </p>
        </div>
      )}
    </div>
  );
}
