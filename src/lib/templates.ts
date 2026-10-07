export type TemplateCategory = 'Light' | 'Dark' | 'Bold' | 'Minimal';

export type QuoteTemplate = {
  id: string;
  name: string;
  category: TemplateCategory;
  description: string;
  sampleQuote: string;
  colors: {
    bg1: string;
    bg2: string;
    border: string;
    text: string;
    author: string;
  };
};

export const templates: QuoteTemplate[] = [
  {
    id: 'classic',
    name: 'Classic Blush',
    category: 'Light',
    description: 'Soft lavender wash for everyday inspiration.',
    sampleQuote: 'Dreams grow quietly in the spaces we protect.',
    colors: {
      bg1: '#faf5ff',
      bg2: '#fdf2f8',
      border: '#d8b4fe',
      text: '#1f2937',
      author: '#6b7280',
    },
  },
  {
    id: 'sunset',
    name: 'Golden Sunset',
    category: 'Bold',
    description: 'Warm orange tones for energetic, uplifting lines.',
    sampleQuote: 'Courage looks like showing up when the day is still new.',
    colors: {
      bg1: '#fff7ed',
      bg2: '#fed7aa',
      border: '#fb923c',
      text: '#9a3412',
      author: '#ea580c',
    },
  },
  {
    id: 'ocean',
    name: 'Ocean Drift',
    category: 'Light',
    description: 'Cool blues for calm, reflective quotes.',
    sampleQuote: 'In every silence, a calm truth waits to be heard.',
    colors: {
      bg1: '#f0f9ff',
      bg2: '#bae6fd',
      border: '#0ea5e9',
      text: '#0c4a6e',
      author: '#0369a1',
    },
  },
  {
    id: 'forest',
    name: 'Forest Path',
    category: 'Light',
    description: 'Fresh greens for grounded, hopeful messages.',
    sampleQuote: 'Growth is patience made visible.',
    colors: {
      bg1: '#f0fdf4',
      bg2: '#bbf7d0',
      border: '#22c55e',
      text: '#14532d',
      author: '#16a34a',
    },
  },
  {
    id: 'elegant',
    name: 'Midnight Ink',
    category: 'Dark',
    description: 'High-contrast dark frame for bold statements.',
    sampleQuote: 'Speak less noise. More meaning.',
    colors: {
      bg1: '#1f2937',
      bg2: '#374151',
      border: '#d1d5db',
      text: '#f9fafb',
      author: '#d1d5db',
    },
  },
  {
    id: 'warm',
    name: 'Autumn Ember',
    category: 'Dark',
    description: 'Deep amber glow for intimate, poetic quotes.',
    sampleQuote: 'Some hearts burn steady long after the spark.',
    colors: {
      bg1: '#451a03',
      bg2: '#92400e',
      border: '#f59e0b',
      text: '#fef3c7',
      author: '#fbbf24',
    },
  },
  {
    id: 'midnight',
    name: 'Deep Navy',
    category: 'Dark',
    description: 'Night-sky blues with crisp white type.',
    sampleQuote: 'The stars teach us to shine without shouting.',
    colors: {
      bg1: '#0f172a',
      bg2: '#1e3a5f',
      border: '#64748b',
      text: '#f1f5f9',
      author: '#94a3b8',
    },
  },
  {
    id: 'rose',
    name: 'Rose Quartz',
    category: 'Light',
    description: 'Gentle pink gradient for love and gratitude.',
    sampleQuote: 'Kindness is a language every heart understands.',
    colors: {
      bg1: '#fff1f2',
      bg2: '#fecdd3',
      border: '#fb7185',
      text: '#881337',
      author: '#be123c',
    },
  },
  {
    id: 'sage',
    name: 'Sage Studio',
    category: 'Minimal',
    description: 'Muted botanical tones for clean, modern posts.',
    sampleQuote: 'Stillness is not empty — it is full of answers.',
    colors: {
      bg1: '#f4f7f4',
      bg2: '#d8e2dc',
      border: '#6b9080',
      text: '#2d3a33',
      author: '#52796f',
    },
  },
  {
    id: 'sand',
    name: 'Desert Sand',
    category: 'Minimal',
    description: 'Neutral beige palette for timeless typography.',
    sampleQuote: 'Small steps cross the widest deserts.',
    colors: {
      bg1: '#faf8f5',
      bg2: '#e8e0d5',
      border: '#a89888',
      text: '#3d3429',
      author: '#786658',
    },
  },
  {
    id: 'aurora',
    name: 'Aurora',
    category: 'Bold',
    description: 'Violet-to-teal gradient for eye-catching shares.',
    sampleQuote: 'Wonder is the habit of paying attention.',
    colors: {
      bg1: '#ede9fe',
      bg2: '#99f6e4',
      border: '#7c3aed',
      text: '#312e81',
      author: '#0f766e',
    },
  },
  {
    id: 'neon',
    name: 'Neon Pulse',
    category: 'Bold',
    description: 'Electric accent on charcoal for social-ready posts.',
    sampleQuote: 'Create before you feel ready — that is the work.',
    colors: {
      bg1: '#18181b',
      bg2: '#27272a',
      border: '#22d3ee',
      text: '#fafafa',
      author: '#22d3ee',
    },
  },
];

export function getTemplateById(id: string): QuoteTemplate {
  return templates.find((t) => t.id === id) ?? templates[0];
}
