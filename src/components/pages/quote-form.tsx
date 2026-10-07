'use client';

import { Palette } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { quoteFonts } from '@/lib/fonts';
import { templates } from '@/lib/templates';

interface QuoteFormProps {
  word: string;
  setWord: (word: string) => void;
  emotion: string;
  setEmotion: (emotion: string) => void;
  authorName: string;
  setAuthorName: (name: string) => void;
  useEmojis: boolean;
  setUseEmojis: (checked: boolean) => void;
  selectedTemplate: string;
  setSelectedTemplate: (templateId: string) => void;
  selectedFont: string;
  setSelectedFont: (fontId: string) => void;
  loading: boolean;
  error: string | null;
  generateQuote: () => void;
}

export function QuoteForm({
  word,
  setWord,
  emotion,
  setEmotion,
  authorName,
  setAuthorName,
  useEmojis,
  setUseEmojis,
  selectedTemplate,
  setSelectedTemplate,
  selectedFont,
  setSelectedFont,
  loading,
  error,
  generateQuote,
}: QuoteFormProps) {
  return (
    <div className='border border-[var(--line)] bg-surface p-7 md:p-9'>
      <div className='mb-8'>
        <p className='text-[10px] font-medium uppercase tracking-[0.32em] text-muted'>
          Compose
        </p>
        <h3 className='font-display mt-3 text-2xl font-medium tracking-tight text-ink md:text-3xl'>
          Write your prompt
        </h3>
        <p className='mt-2 text-sm font-light leading-relaxed text-muted'>
          A word and a mood is all you need.
        </p>
      </div>

      <div className='space-y-4'>
        <div data-studio-field className='space-y-2'>
          <Label htmlFor='word' className='text-sm font-medium text-ink'>
            Word
          </Label>
          <Input
            id='word'
            type='text'
            placeholder='Journey, dream, silence…'
            value={word}
            onChange={(e) => setWord(e.target.value)}
            maxLength={20}
            className='h-11 rounded-none border-[var(--line)] bg-paper text-ink placeholder:text-mist focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent/30'
          />
        </div>

        <div data-studio-field className='relative z-10 space-y-2'>
          <Label htmlFor='emotion' className='text-sm font-medium text-ink'>
            Mood
          </Label>
          <Select value={emotion} onValueChange={setEmotion}>
            <SelectTrigger className='h-11 w-full rounded-none border-[var(--line)] bg-paper text-ink focus:ring-1 focus:ring-accent/30'>
              <SelectValue placeholder='How should it feel?' />
            </SelectTrigger>
            <SelectContent className='rounded-none border-[var(--line)] bg-surface text-ink'>
              <SelectItem value='happy'>Happy</SelectItem>
              <SelectItem value='sad'>Sad</SelectItem>
              <SelectItem value='hopeful'>Hopeful</SelectItem>
              <SelectItem value='calm'>Calm</SelectItem>
              <SelectItem value='energetic'>Energetic</SelectItem>
              <SelectItem value='reflective'>Reflective</SelectItem>
              <SelectItem value='mysterious'>Mysterious</SelectItem>
              <SelectItem value='love'>Love</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div data-studio-field className='space-y-2'>
          <Label htmlFor='authorName' className='text-sm font-medium text-ink'>
            Author <span className='font-normal text-muted'>(optional)</span>
          </Label>
          <Input
            id='authorName'
            type='text'
            placeholder='Your name'
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            maxLength={50}
            className='h-11 rounded-none border-[var(--line)] bg-paper text-ink placeholder:text-mist focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent/30'
          />
        </div>

        <div data-studio-field className='grid gap-4 sm:grid-cols-2'>
          <div className='space-y-2'>
            <Label htmlFor='template' className='text-sm font-medium text-ink'>
              <Palette className='mr-1 inline h-3.5 w-3.5 text-muted' />
              Style
            </Label>
            <Select
              value={selectedTemplate}
              onValueChange={setSelectedTemplate}
            >
              <SelectTrigger className='h-11 w-full rounded-none border-[var(--line)] bg-paper text-ink focus:ring-1 focus:ring-accent/30'>
                <SelectValue placeholder='Choose a look' />
              </SelectTrigger>
              <SelectContent className='rounded-none border-[var(--line)] bg-surface text-ink'>
                {templates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className='space-y-2'>
            <Label htmlFor='font' className='text-sm font-medium text-ink'>
              Font
            </Label>
            <Select value={selectedFont} onValueChange={setSelectedFont}>
              <SelectTrigger className='h-11 w-full rounded-none border-[var(--line)] bg-paper text-ink focus:ring-1 focus:ring-accent/30'>
                <SelectValue placeholder='Choose a font' />
              </SelectTrigger>
              <SelectContent className='rounded-none border-[var(--line)] bg-surface text-ink'>
                {quoteFonts.map((font) => (
                  <SelectItem key={font.id} value={font.id}>
                    {font.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div data-studio-field className='flex items-center space-x-2 pt-1'>
          <Checkbox
            id='useEmojis'
            checked={useEmojis}
            onCheckedChange={(checked) => setUseEmojis(Boolean(checked))}
            className='rounded-sm border-ink/25 data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white'
          />
          <Label htmlFor='useEmojis' className='cursor-pointer text-sm text-ink'>
            Add an emoji
          </Label>
        </div>

        <Button
          data-studio-field
          onClick={generateQuote}
          className='mt-2 h-12 w-full rounded-none bg-accent text-[11px] font-medium uppercase tracking-[0.22em] text-white hover:bg-accent/90 disabled:opacity-40'
          disabled={loading || !word || !emotion}
        >
          {loading ? 'Writing…' : 'Generate quote'}
        </Button>

        {error && (
          <div
            className='border border-red-200 bg-red-50 px-3 py-2 text-center text-sm text-red-700'
            role='alert'
          >
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
