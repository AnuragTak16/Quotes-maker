export type QuoteFont = {
  id: string;
  name: string;
  family: string;
  style: 'italic' | 'normal';
  weight: number;
  sample: string;
  canvasFont: string;
};

export const quoteFonts: QuoteFont[] = [
  {
    id: 'cormorant',
    name: 'Cormorant',
    family: "'Cormorant Garamond', Georgia, serif",
    style: 'italic',
    weight: 500,
    sample: 'Aa',
    canvasFont: "italic 500 28px 'Cormorant Garamond', Georgia, serif",
  },
  {
    id: 'playfair',
    name: 'Playfair',
    family: "'Playfair Display', Georgia, serif",
    style: 'italic',
    weight: 500,
    sample: 'Aa',
    canvasFont: "italic 500 28px 'Playfair Display', Georgia, serif",
  },
  {
    id: 'lora',
    name: 'Lora',
    family: "'Lora', Georgia, serif",
    style: 'italic',
    weight: 500,
    sample: 'Aa',
    canvasFont: "italic 500 28px 'Lora', Georgia, serif",
  },
  {
    id: 'dm-serif',
    name: 'DM Serif',
    family: "'DM Serif Display', Georgia, serif",
    style: 'normal',
    weight: 400,
    sample: 'Aa',
    canvasFont: "400 28px 'DM Serif Display', Georgia, serif",
  },
  {
    id: 'space',
    name: 'Space Grotesk',
    family: "'Space Grotesk', system-ui, sans-serif",
    style: 'normal',
    weight: 500,
    sample: 'Aa',
    canvasFont: "500 28px 'Space Grotesk', system-ui, sans-serif",
  },
  {
    id: 'outfit',
    name: 'Outfit',
    family: "'Outfit', system-ui, sans-serif",
    style: 'normal',
    weight: 400,
    sample: 'Aa',
    canvasFont: "400 28px 'Outfit', system-ui, sans-serif",
  },
];

export function getFontById(id: string): QuoteFont {
  return quoteFonts.find((f) => f.id === id) ?? quoteFonts[0];
}
