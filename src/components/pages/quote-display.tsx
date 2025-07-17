'use client';

import { Download, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { templates } from '@/lib/templates'; // Assuming templates are in lib/templates
import type { RefObject } from 'react';

interface QuoteDisplayProps {
  quote: string;
  authorName: string;
  selectedTemplate: string;
  quoteCardRef: RefObject<HTMLDivElement>;
  handleDownload: () => void;
  handleShareEmail: () => void;
}

export function QuoteDisplay({
  quote,
  authorName,
  selectedTemplate,
  quoteCardRef,
  handleDownload,
  handleShareEmail,
}: QuoteDisplayProps) {
  const currentTemplate =
    templates.find((t) => t.id === selectedTemplate) || templates[0];

  return (
    <Card className='bg-white/80 backdrop-blur-sm shadow-lg border-0'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl font-bold text-gray-800'>
          Your Quote
        </CardTitle>
        <CardDescription className='text-'>
          Preview with {currentTemplate.name} template
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        {quote ? (
          <>
            <div
              ref={quoteCardRef}
              className='p-6 text-center rounded-lg shadow-md min-h-[200px] flex flex-col justify-center'
              style={{
                background: `linear-gradient(135deg, ${currentTemplate.colors.bg1}, ${currentTemplate.colors.bg2})`,
                border: `2px solid ${currentTemplate.colors.border}`,
                color: currentTemplate.colors.text,
              }}
            >
              <p className='text-lg md:text-xl font-semibold italic leading-relaxed mb-4'>
                &quot;{quote}&quot;
              </p>
              <p className='text-sm opacity-80'>
                {authorName ? `— ${authorName}` : '— Quote Maker'}
              </p>
            </div>
            <div className='flex flex-col sm:flex-row gap-2'>
              <Button
                onClick={handleDownload}
                className='flex-1 flex items-center justify-center gap-2 bg-green-600 text-white hover:bg-green-700 transition-colors'
              >
                <Download className='h-4 w-4' /> Download PNG
              </Button>
              <Button
                onClick={handleShareEmail}
                className='flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white hover:bg-blue-700 transition-colors'
              >
                <Mail className='h-4 w-4' /> Share Email
              </Button>
            </div>
          </>
        ) : (
          <div className='text-center text-gray-500 py-12'>
            <p className='text-lg mb-2'>No quote generated yet</p>
            <p className='text-sm'>
              Fill in the form and click &quot;Generate Quote&quot; to create
              your masterpiece!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
