'use client';

import { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, Mail } from 'lucide-react';

export default function QuoteMaker() {
  const [word, setWord] = useState('');
  const [emotion, setEmotion] = useState('');
  const [quote, setQuote] = useState('');
  const quoteCardRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

      const data = (await res.json()) as { quote?: string; error?: string };

      if (!res.ok || !data.quote) {
        throw new Error(
          data.error ?? 'Unknown error occurred during quote generation.'
        );
      }

      setQuote(data.quote);
    } catch (err: any) {
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
        const canvas = await html2canvas(quoteCardRef.current, {
          scale: 2, // Increase scale for better quality
          useCORS: true, // Important if you have images/external resources
          backgroundColor: '#ffffff', // Ensure a white background if the card itself doesn't have one
        });
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
  }, [word]);

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
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4'>
      <Card className='w-full max-w-md shadow-lg'>
        <CardHeader className='space-y-2 text-center'>
          <CardTitle className='text-3xl font-bold'>AI Quote Maker</CardTitle>
          <p className='text-muted-foreground'>
            Craft a unique quote from a single word and an emotion using AI.
          </p>
        </CardHeader>
        <CardContent className='space-y-6'>
          <div className='grid gap-4'>
            <div className='space-y-2'>
              <Label htmlFor='word'>Your Word</Label>
              <Input
                id='word'
                placeholder='e.g., Journey, Dream, Silence'
                value={word}
                onChange={(e) => setWord(e.target.value)}
                maxLength={20}
                aria-label='Enter a single word for the quote'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='emotion'>Emotion</Label>
              <Select
                value={emotion}
                onValueChange={setEmotion}
                aria-label='Select an emotion for the quote'
              >
                <SelectTrigger id='emotion'>
                  <SelectValue placeholder='Select an emotion' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='happy'>Happy</SelectItem>
                  <SelectItem value='sad'>Sad</SelectItem>
                  <SelectItem value='hopeful'>Hopeful</SelectItem>
                  <SelectItem value='calm'>Calm</SelectItem>
                  <SelectItem value='energetic'>Energetic</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={generateQuote}
              className='w-full'
              disabled={loading || !word || !emotion}
            >
              {loading ? 'Generating...' : 'Generate Quote'}
            </Button>
          </div>

          {error && (
            <div className='text-red-500 text-center text-sm' role='alert'>
              {error}
            </div>
          )}

          {quote && (
            <div className='space-y-4'>
              <Card
                ref={quoteCardRef}
                className='p-6 text-center bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200 shadow-md'
              >
                <CardContent className='flex flex-col items-center justify-center h-full'>
                  <p className='text-xl md:text-2xl font-semibold italic text-gray-800 leading-relaxed'>
                    &ldquo;{quote}&rdquo;
                  </p>
                  <p className='mt-4 text-sm text-muted-foreground'>
                    - AI Quote Maker
                  </p>
                </CardContent>
              </Card>
              <div className='flex gap-2 justify-center'>
                <Button
                  onClick={handleDownload}
                  variant='outline'
                  className='flex items-center gap-2 bg-transparent'
                >
                  <Download className='h-4 w-4' />
                  Download
                </Button>
                <Button
                  onClick={handleShareEmail}
                  variant='outline'
                  className='flex items-center gap-2 bg-transparent'
                >
                  <Mail className='h-4 w-4' />
                  Share via Email
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
