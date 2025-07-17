'use client';

import { useState, useCallback } from 'react';

export function useQuoteGeneration() {
  const [word, setWord] = useState('');
  const [emotion, setEmotion] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [useEmojis, setUseEmojis] = useState(true);
  const [quote, setQuote] = useState('');
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
    setQuote('');

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call

      const emotionsMap = {
        happy: '😊',
        sad: '😢',
        hopeful: '🌟',
        calm: '🕊️',
        energetic: '⚡',
        reflective: '🤔',
        mysterious: '🌙',
        love: '❤️',
      };

      const sampleQuotes = [
        `${word} is the ${emotion} journey that shapes our destiny`,
        `In every ${word}, there lies a ${emotion} truth waiting to be discovered`,
        `The ${emotion} nature of ${word} reveals the beauty of existence`,
        `When ${word} meets ${emotion} spirit, magic happens`,
        `${word} whispers ${emotion} secrets to those who listen`,
      ];

      const randomQuote =
        sampleQuotes[Math.floor(Math.random() * sampleQuotes.length)];
      const finalQuote = useEmojis
        ? `${randomQuote} ${
            emotionsMap[emotion as keyof typeof emotionsMap] || ''
          }`
        : randomQuote;

      setQuote(finalQuote);
    } catch (err) {
      console.error('Error generating quote:', err);
      setError('Failed to generate quote. Please try again.');
      setQuote('');
    } finally {
      setLoading(false);
    }
  }, [word, emotion, useEmojis]); // authorName is not a dependency for quote generation logic itself

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
    setQuote, // Expose setQuote if you need to clear it from parent
    loading,
    error,
    generateQuote,
  };
}
