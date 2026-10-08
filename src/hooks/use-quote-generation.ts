'use client';

import { useState, useCallback } from 'react';

const emotionEmojis: Record<string, string> = {
  happy: '😊',
  sad: '😢',
  hopeful: '🌟',
  calm: '🕊️',
  energetic: '⚡',
  reflective: '🤔',
  mysterious: '🌙',
  love: '❤️',
};

export function useQuoteGeneration() {
  const [word, setWord] = useState('');
  const [emotion, setEmotion] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [useEmojis, setUseEmojis] = useState(true);
  const [quote, setQuote] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuote = useCallback(async () => {
    if (!word.trim() || !emotion) {
      setError('Please enter a word and select a mood.');
      return;
    }

    setLoading(true);
    setError(null);
    setQuote('');

    try {
      const res = await fetch('/api/generate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          word: word.trim(),
          emotion,
        }),
      });

      const data = (await res.json()) as { quote?: string; error?: string };

      if (!res.ok || !data.quote) {
        throw new Error(data.error || 'Failed to generate quote.');
      }

      const text = data.quote.trim().replace(/^["']|["']$/g, '');
      const emoji = useEmojis ? emotionEmojis[emotion] : undefined;
      setQuote(emoji ? `${text} ${emoji}` : text);
    } catch (err) {
      console.error('Error generating quote:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'Failed to generate quote. Please try again.'
      );
      setQuote('');
    } finally {
      setLoading(false);
    }
  }, [word, emotion, useEmojis]);

  return {
    word,
    setWord,
    emotion,
    setEmotion,
    authorName,
    setAuthorName,
    useEmojis,
    setUseEmojis,
    quote,
    setQuote,
    loading,
    error,
    generateQuote,
  };
}
