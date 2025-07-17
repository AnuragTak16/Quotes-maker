'use client';

import { useRef, useState } from 'react';
import { useQuoteGeneration } from '@/hooks/use-quote-generation';
import { QuoteForm } from './quote-form';
import { QuoteDisplay } from './quote-display';
import { TemplatePreviewGrid } from './template-preview';
import { useQuoteActions } from '@/hooks/use-quote-action';

export default function QuoteMaker() {
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const [selectedTemplate, setSelectedTemplate] = useState('classic');

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
    word,
    quoteCardRef,
  });

  return (
    <main className='min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-8'>
          <h1 className='text-4xl md:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 mb-6 text-center animate-fade-in'>
            ThinkWords{' '}
          </h1>
          <p className='text-lg text-black max-w-2xl mx-auto'>
            Transform your words and emotions into beautiful, shareable quotes
            with customizable templates
          </p>
        </div>

        <div className='grid md:grid-cols-2 gap-6'>
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
            loading={loading}
            error={error}
            generateQuote={generateQuote}
          />
          <QuoteDisplay
            quote={quote}
            authorName={authorName}
            selectedTemplate={selectedTemplate}
            quoteCardRef={quoteCardRef}
            handleDownload={handleDownload}
            handleShareEmail={handleShareEmail}
          />
        </div>

        <TemplatePreviewGrid
          selectedTemplate={selectedTemplate}
          setSelectedTemplate={setSelectedTemplate}
        />
      </div>
    </main>
  );
}
