'use client';

import { useState, useCallback, useRef } from 'react';
import { Download, Mail } from 'lucide-react';

export default function QuoteMaker() {
  const [word, setWord] = useState('');
  const [emotion, setEmotion] = useState('');
  const [quote, setQuote] = useState('');
  const quoteCardRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generateQuote = useCallback(async () => {
    if (!word || !emotion) {
      setQuote(
        'Please enter a word and select an emotion to generate a quote.'
      );
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    setQuote(''); // Clear previous quote

    try {
      const res = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ word, emotion }),
      });
      const data = await res.json();

      if (!res.ok || !data.quote) {
        throw new Error(
          data.error ?? 'Unknown error occurred during quote generation.'
        );
      }

      setQuote(data.quote);
    } catch (err) {
      console.error('Error generating quote:', err);
      setError(err.message || 'Failed to generate quote. Please try again.');
      setQuote('');
    } finally {
      setLoading(false);
    }
  }, [word, emotion]);

  const handleDownload = useCallback(async () => {
    if (quoteCardRef.current) {
      try {
        // Create a canvas element
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        // Set canvas size
        canvas.width = 800;
        canvas.height = 600;

        // Create gradient background
        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height
        );
        gradient.addColorStop(0, '#faf5ff');
        gradient.addColorStop(1, '#fdf2f8');

        // Fill background
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Add border
        ctx.strokeStyle = '#d8b4fe';
        ctx.lineWidth = 2;
        ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

        // Set up text styling
        ctx.fillStyle = '#1f2937';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        // Draw quote text
        const maxWidth = canvas.width - 100;
        const words = quote.split(' ');
        let line = '';
        let y = canvas.height / 2 - 40;

        ctx.font = 'italic 32px serif';

        for (let n = 0; n < words.length; n++) {
          const testLine = line + words[n] + ' ';
          const metrics = ctx.measureText(testLine);
          const testWidth = metrics.width;

          if (testWidth > maxWidth && n > 0) {
            ctx.fillText(`"${line.trim()}"`, canvas.width / 2, y);
            line = words[n] + ' ';
            y += 50;
          } else {
            line = testLine;
          }
        }

        // Draw remaining text
        if (line.trim()) {
          ctx.fillText(`"${line.trim()}"`, canvas.width / 2, y);
        }

        // Draw attribution
        ctx.font = '16px sans-serif';
        ctx.fillStyle = '#6b7280';
        ctx.fillText('- v0 Quote Maker', canvas.width / 2, canvas.height - 80);

        // Convert to image and download
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = `quote-about-${word || 'your-word'}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } catch (error) {
        console.error('Error generating image:', error);
        alert('Failed to download quote. Please try again.');
      }
    } else {
      alert('Quote card not ready.');
    }
  }, [word, quote]);

  const handleShareEmail = useCallback(() => {
    if (quote) {
      const subject = encodeURIComponent('Check out this quote I made!');
      const body = encodeURIComponent(
        `"${quote}"\n\nMade with the v0 Quote Maker.`
      );
      window.location.href = `mailto:?subject=${subject}&body=${body}`;
    }
  }, [quote]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen  bg-blue-100 p-4'>
      <div className='w-full max-w-lg bg-white rounded-lg shadow-lg border border-gray-200'>
        <div className='p-6 space-y-2 text-center border-b border-gray-200'>
          <h1 className='text-3xl font-bold text-gray-900 '>Quote-Maker</h1>
          <p className='text-gray-600'>
            &quot;Let AI turn your feelings into unforgettable quotes.&quot;
          </p>
        </div>
        <div className='p-6 space-y-6'>
          <div className='grid gap-4'>
            <div className='space-y-2'>
              <label
                htmlFor='word'
                className='text-sm font-medium text-gray-700'
              >
                Your Word
              </label>
              <input
                id='word'
                type='text'
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                placeholder='e.g., Journey, Dream, Silence'
                value={word}
                onChange={(e) => setWord(e.target.value)}
                maxLength={20}
                aria-label='Enter a single word for the quote'
              />
            </div>

            <div className='space-y-2'>
              <label
                htmlFor='emotion'
                className='text-sm font-medium text-gray-700'
              >
                Emotion
              </label>
              <select
                id='emotion'
                className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
                value={emotion}
                onChange={(e) => setEmotion(e.target.value)}
                aria-label='Select an emotion for the quote'
              >
                <option value=''>Select an emotion</option>
                <option value='happy'>Happy</option>
                <option value='sad'>Sad</option>
                <option value='hopeful'>Hopeful</option>
                <option value='calm'>Calm</option>
                <option value='energetic'>Energetic</option>
              </select>
            </div>

            <button
              onClick={generateQuote}
              className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
              disabled={loading || !word || !emotion}
            >
              {loading ? 'Generating...' : 'Generate Quote'}
            </button>
          </div>

          {error && (
            <div className='text-red-500 text-center text-sm' role='alert'>
              {error}
            </div>
          )}

          {quote && (
            <div className='space-y-4'>
              <div
                ref={quoteCardRef}
                className='p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-lg shadow-md'
              >
                <div className='flex flex-col items-center justify-center h-full'>
                  <p className='text-xl md:text-2xl font-semibold italic text-gray-800 leading-relaxed'>
                    &ldquo;{quote}&rdquo;
                  </p>
                </div>
              </div>

              <div className='flex gap-2 justify-center'>
                <button
                  onClick={handleDownload}
                  className='flex items-center gap-2 bg-transparent border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
                >
                  <Download className='h-4 w-4' />
                  Download
                </button>
                <button
                  onClick={handleShareEmail}
                  className='flex items-center gap-2 bg-transparent border border-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors'
                >
                  <Mail className='h-4 w-4' />
                  Share via Email
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
