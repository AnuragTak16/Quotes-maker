'use client';

import { templates } from '@/lib/templates';
import { useCallback, type RefObject } from 'react';

interface UseQuoteActionsProps {
  quote: string;
  authorName: string;
  selectedTemplate: string;
  word: string;
  quoteCardRef: RefObject<HTMLDivElement>;
}

export function useQuoteActions({
  quote,
  authorName,
  selectedTemplate,
  word,
  quoteCardRef,
}: UseQuoteActionsProps) {
  const handleDownload = useCallback(async () => {
    if (quoteCardRef.current && quote) {
      try {
        const template =
          templates.find((t) => t.id === selectedTemplate) || templates[0];
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d')!;
        canvas.width = 800;
        canvas.height = 600;

        // Background gradient
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

        // Border
        ctx.strokeStyle = template.colors.border;
        ctx.lineWidth = 3;
        ctx.strokeRect(30, 30, canvas.width - 60, canvas.height - 60);

        // Inner decorative border
        ctx.strokeStyle = template.colors.border;
        ctx.lineWidth = 1;
        ctx.strokeRect(50, 50, canvas.width - 100, canvas.height - 100);

        // Quote text
        ctx.fillStyle = template.colors.text;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = "italic 28px 'Times New Roman', serif";
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

        // Calculate starting Y position to center the text
        const lineHeight = 40;
        const totalTextHeight = lines.length * lineHeight;
        const startY = (canvas.height - totalTextHeight) / 2;

        // Draw quote marks and text
        ctx.font = "48px 'Times New Roman', serif";
        ctx.fillText('“', canvas.width / 2 - 200, startY - 30);
        ctx.fillText(
          '”',
          canvas.width / 2 + 200,
          startY + totalTextHeight + 10
        );
        ctx.font = "italic 28px 'Times New Roman', serif";
        lines.forEach((line, index) => {
          ctx.fillText(line, canvas.width / 2, startY + index * lineHeight);
        });

        // Author
        ctx.font = "18px 'Arial', sans-serif";
        ctx.fillStyle = template.colors.author;
        const displayAuthor = authorName ? `— ${authorName}` : '— Quote Maker';
        ctx.fillText(displayAuthor, canvas.width / 2, canvas.height - 100);

        // Decorative elements
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

        // Export
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
  }, [word, quote, authorName, selectedTemplate, quoteCardRef]);

  const handleShareEmail = useCallback(() => {
    if (quote) {
      const subject = encodeURIComponent('Check out this quote I made!');
      const body = encodeURIComponent(
        `"${quote}"\n\n${
          authorName ? `- ${authorName}` : '- Quote Maker'
        }\n\nMade with the Quote Maker app.`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  }, [quote, authorName]);

  return { handleDownload, handleShareEmail };
}
