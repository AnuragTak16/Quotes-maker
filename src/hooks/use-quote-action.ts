'use client';

import { getFontById } from '@/lib/fonts';
import { getTemplateById } from '@/lib/templates';
import { useCallback, type RefObject } from 'react';

interface UseQuoteActionsProps {
  quote: string;
  authorName: string;
  selectedTemplate: string;
  selectedFont: string;
  word: string;
  quoteCardRef: RefObject<HTMLDivElement | null>;
}

export function useQuoteActions({
  quote,
  authorName,
  selectedTemplate,
  selectedFont,
  word,
  quoteCardRef,
}: UseQuoteActionsProps) {
  const handleDownload = useCallback(async () => {
    if (quoteCardRef.current && quote) {
      try {
        if (document.fonts?.ready) {
          await document.fonts.ready;
        }

        const template = getTemplateById(selectedTemplate);
        const font = getFontById(selectedFont);
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = 800;
        canvas.height = 600;

        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, template.colors.bg1);
        gradient.addColorStop(1, template.colors.bg2);
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.strokeStyle = template.colors.border;
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

        ctx.strokeStyle = template.colors.border;
        ctx.lineWidth = 1;
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

        ctx.fillStyle = template.colors.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = font.canvasFont;

        const maxWidth = canvas.width - 120;
        const wordsArray = quote.split(' ');
        const lines: string[] = [];
        let currentLine = '';

        for (let i = 0; i < wordsArray.length; i++) {
          const testLine = currentLine + wordsArray[i] + ' ';
          const testWidth = ctx.measureText(testLine).width;
          if (testWidth > maxWidth && currentLine !== '') {
            lines.push(currentLine.trim());
            currentLine = wordsArray[i] + ' ';
          } else {
            currentLine = testLine;
          }
        }
        if (currentLine.trim()) {
          lines.push(currentLine.trim());
        }

        const lineHeight = 42;
        const totalTextHeight = lines.length * lineHeight;
        const startY = (canvas.height - totalTextHeight) / 2;

        const markFont = font.canvasFont.replace('28px', '48px');
        ctx.font = markFont;
        ctx.fillText('“', canvas.width / 2 - 200, startY - 30);
        ctx.fillText(
          '”',
          canvas.width / 2 + 200,
          startY + totalTextHeight + 10
        );

        ctx.font = font.canvasFont;
        lines.forEach((line, index) => {
          ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
        });

        ctx.font = font.canvasFont.replace('28px', '18px').replace('italic ', '');
        ctx.fillStyle = template.colors.author;
        const displayAuthor = authorName ? `— ${authorName}` : '— ThinkWords';
        ctx.fillText(displayAuthor, canvas.width / 2, canvas.height - 100);

        ctx.fillStyle = template.colors.border;
        ctx.beginPath();
        ctx.arc(100, 100, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(canvas.width - 100, 100, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(100, canvas.height - 100, 3, 0, 2 * Math.PI);
        ctx.fill();
        ctx.beginPath();
        ctx.arc(canvas.width - 100, canvas.height - 100, 3, 0, 2 * Math.PI);
        ctx.fill();

        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        const filenameAuthor = authorName
          ? `_by_${authorName.replace(/\s/g, '-')}`
          : '';
        const templateName = template.name.replace(/\s/g, '-').toLowerCase();
        link.download = `quote-${templateName}-${
          word || 'word'
        }${filenameAuthor}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error generating image:', error);
        alert('Failed to download quote. Please try again.');
      }
    } else {
      alert('Please generate a quote first.');
    }
  }, [
    word,
    quote,
    authorName,
    selectedTemplate,
    selectedFont,
    quoteCardRef,
  ]);

  const handleShareEmail = useCallback(() => {
    if (quote) {
      const subject = encodeURIComponent('Check out this quote I made!');
      const body = encodeURIComponent(
        `"${quote}"\n\n${
          authorName ? `- ${authorName}` : '- ThinkWords'
        }\n\nMade with ThinkWords.`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  }, [quote, authorName]);

  return { handleDownload, handleShareEmail };
}
