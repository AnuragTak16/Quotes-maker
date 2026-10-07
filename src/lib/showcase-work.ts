export type ShowcasePiece = {
  id: string;
  templateId: string;
  quote: string;
  author: string;
  word: string;
  mood: string;
  featured?: boolean;
};

export const showcaseWork: ShowcasePiece[] = [
  {
    id: 'w1',
    templateId: 'ocean',
    quote:
      'In every silence, there lies a calm truth waiting to be discovered.',
    author: 'Maya K.',
    word: 'Silence',
    mood: 'Calm',
    featured: true,
  },
  {
    id: 'w2',
    templateId: 'neon',
    quote: 'Create before you feel ready — that is where the magic begins.',
    author: 'Alex R.',
    word: 'Create',
    mood: 'Energetic',
    featured: true,
  },
  {
    id: 'w3',
    templateId: 'warm',
    quote: 'Some journeys are measured in heartbeats, not miles.',
    author: 'Jordan L.',
    word: 'Journey',
    mood: 'Reflective',
  },
  {
    id: 'w4',
    templateId: 'rose',
    quote: 'Love is the quiet choice to stay when leaving would be easier.',
    author: 'Samira T.',
    word: 'Love',
    mood: 'Hopeful',
  },
  {
    id: 'w5',
    templateId: 'midnight',
    quote: 'The night does not hide dreams — it protects them.',
    author: 'Chris P.',
    word: 'Dream',
    mood: 'Mysterious',
  },
  {
    id: 'w6',
    templateId: 'aurora',
    quote: 'Wonder is what happens when you look twice.',
    author: 'ThinkWords',
    word: 'Wonder',
    mood: 'Happy',
  },
  {
    id: 'w7',
    templateId: 'sage',
    quote: 'Peace is not the absence of noise — it is clarity inside it.',
    author: 'Elena V.',
    word: 'Peace',
    mood: 'Calm',
  },
  {
    id: 'w8',
    templateId: 'sunset',
    quote: 'Hope is the sunrise you choose before the sky turns gold.',
    author: 'Dev N.',
    word: 'Hope',
    mood: 'Hopeful',
    featured: true,
  },
];
