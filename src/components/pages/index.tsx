'use client';

import { useCallback, useRef, useState } from 'react';
import { useQuoteGeneration } from '@/hooks/use-quote-generation';
import { QuoteForm } from './quote-form';
import { QuoteDisplay } from './quote-display';
import { TemplatePreviewGrid } from './template-preview';
import { useQuoteActions } from '@/hooks/use-quote-action';
import { SiteNav } from '@/components/site/nav';
import { Hero } from '@/components/site/hero';
import { SiteFooter } from '@/components/site/footer';
import { WorkShowcase } from '@/components/site/work-showcase';
import { StatementPanel } from '@/components/site/statement-panel';
import { ClosingCta } from '@/components/site/closing-cta';
import { useGsapSite } from '@/components/motion/use-gsap-site';

export default function QuoteMaker() {
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLElement>(null);
  const studioRef = useRef<HTMLElement>(null);
  const templatesRef = useRef<HTMLElement>(null);
  const footerRef = useRef<HTMLElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');
  const [selectedFont, setSelectedFont] = useState('cormorant');

  const {
    word,
    setWord,
    emotion,
    setEmotion,
    authorName,
    setAuthorName,
    useEmojis,
    setUseEmojis,
    quote,
    loading,
    error,
    generateQuote,
  } = useQuoteGeneration();

  const { handleDownload, handleShareEmail } = useQuoteActions({
    quote,
    authorName,
    selectedTemplate,
    selectedFont,
    word,
    quoteCardRef,
  });

  useGsapSite({ mainRef, navRef, footerRef, studioRef });

  const handleTryTemplate = useCallback((templateId: string) => {
    setSelectedTemplate(templateId);
    document.getElementById('studio')?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <main ref={mainRef} className='min-h-screen bg-paper text-ink'>
      <SiteNav ref={navRef} />
      <Hero heroRef={heroRef} />

      <StatementPanel
        tone='sand'
        minHeight='tall'
        title={
          <>
            The art of finding words, where{' '}
            <em className='italic font-normal'>every line feels familiar</em>
          </>
        }
        copy="From a single word and a mood, something quieter arrives — a line you can keep, download, and share. It's why people return: because the right words remember you."
        cta={{ label: 'Create a quote', href: '#studio' }}
      />

      <WorkShowcase sectionRef={workRef} onTryTemplate={handleTryTemplate} />

      <StatementPanel
        tone='lagoon'
        minHeight='tall'
        title={
          <>
            More than a poster, it&apos;s the feeling of being exactly{' '}
            <em className='italic font-normal text-white/90'>
              where you&apos;re meant to be
            </em>
          </>
        }
        copy="Pick a mood. Choose a style. Watch the line appear — then take it with you."
        cta={{ label: 'Open the studio', href: '#studio' }}
      />

      <section
        ref={studioRef}
        id='studio'
        className='bg-studio-bg py-24 md:py-36'
      >
        <div className='mx-auto max-w-6xl px-5 md:px-8'>
          <div className='mx-auto mb-14 max-w-2xl text-center md:mb-16'>
            <p
              data-studio-heading
              className='text-[10px] font-medium uppercase tracking-[0.36em] text-muted'
            >
              Studio
            </p>
            <h2
              data-studio-heading
              className='font-display mt-5 text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.1] tracking-tight text-balance'
            >
              Freedom in its purest form,{' '}
              <em className='italic font-normal'>following your rhythm</em>
            </h2>
            <p
              data-studio-heading
              className='mx-auto mt-5 max-w-md text-[15px] font-light leading-relaxed text-muted'
            >
              Type a word, pick a mood, style, and font — the poster updates
              beside you.
            </p>
          </div>

          <div className='grid gap-6 md:grid-cols-2 md:gap-8'>
            <div data-studio-panel>
              <QuoteForm
                word={word}
                setWord={setWord}
                emotion={emotion}
                setEmotion={setEmotion}
                authorName={authorName}
                setAuthorName={setAuthorName}
                useEmojis={useEmojis}
                setUseEmojis={setUseEmojis}
                selectedTemplate={selectedTemplate}
                setSelectedTemplate={setSelectedTemplate}
                selectedFont={selectedFont}
                setSelectedFont={setSelectedFont}
                loading={loading}
                error={error}
                generateQuote={generateQuote}
              />
            </div>
            <div data-studio-panel>
              <QuoteDisplay
                quote={quote}
                authorName={authorName}
                selectedTemplate={selectedTemplate}
                selectedFont={selectedFont}
                quoteCardRef={quoteCardRef}
                handleDownload={handleDownload}
                handleShareEmail={handleShareEmail}
              />
            </div>
          </div>
        </div>
      </section>

      <TemplatePreviewGrid
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        selectedFont={selectedFont}
        setSelectedFont={setSelectedFont}
        sectionRef={templatesRef}
      />

      <ClosingCta />
      <SiteFooter ref={footerRef} />
    </main>
  );
}
