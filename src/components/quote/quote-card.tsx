'use client';

import type { RefObject } from 'react';
import { getFontById } from '@/lib/fonts';
import { getTemplateById } from '@/lib/templates';
import { cn } from '@/lib/utils';

type QuoteCardProps = {
  quote: string;
  author?: string;
  templateId: string;
  fontId?: string;
  className?: string;
  innerRef?: RefObject<HTMLDivElement | null>;
  size?: 'sm' | 'md' | 'lg';
};

export function QuoteCard({
  quote,
  author = 'ThinkWords',
  templateId,
  fontId = 'cormorant',
  className,
  innerRef,
  size = 'md',
}: QuoteCardProps) {
  const template = getTemplateById(templateId);
  const font = getFontById(fontId);

  const quoteSize =
    size === 'sm'
      ? 'text-xs leading-snug'
      : size === 'lg'
        ? 'text-lg md:text-xl leading-relaxed'
        : 'text-sm md:text-base leading-relaxed';

  const pad = size === 'sm' ? 'p-4' : size === 'lg' ? 'p-8 md:p-10' : 'p-6 md:p-8';

  return (
    <div
      ref={innerRef}
      className={cn(
        'flex min-h-[120px] flex-col justify-center text-center',
        pad,
        className
      )}
      style={{
        background: `linear-gradient(145deg, ${template.colors.bg1}, ${template.colors.bg2})`,
        border: `1px solid ${template.colors.border}`,
        color: template.colors.text,
      }}
    >
      <p
        className={cn(quoteSize)}
        style={{
          fontFamily: font.family,
          fontStyle: font.style,
          fontWeight: font.weight,
        }}
      >
        &ldquo;{quote}&rdquo;
      </p>
      <p
        className='mt-3 text-xs opacity-80 md:text-sm'
        style={{
          color: template.colors.author,
          fontFamily: font.family,
        }}
      >
        — {author}
      </p>
    </div>
  );
}
