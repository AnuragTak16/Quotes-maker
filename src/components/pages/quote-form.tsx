'use client';

import { Palette } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { templates } from '@/lib/templates'; // Assuming templates are in lib/templates

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
  loading,
  error,
  generateQuote,
}: QuoteFormProps) {
  return (
    <Card className='bg-white/80 backdrop-blur-sm shadow-lg border-0'>
      <CardHeader className='text-center'>
        <CardTitle className='text-2xl font-bold text-black'>
          Create Your Quote
        </CardTitle>
        <CardDescription className='text-black'>
          Enter your inspiration and let AI craft the perfect quote
        </CardDescription>
      </CardHeader>
      <CardContent className='space-y-4'>
        <div className='space-y-2'>
          <Label htmlFor='word' className='text-sm font-medium text-black'>
            Your Word
          </Label>
          <Input
            id='word'
            type='text'
            placeholder='e.g., Journey, Dream, Silence'
            value={word}
            onChange={(e) => setWord(e.target.value)}
            maxLength={20}
            className='border-gray-300 focus:border-purple-500 focus:ring-purple-500'
          />
        </div>
        <div className='space-y-2 relative z-10'>
          <Label htmlFor='emotion' className='text-sm font-medium text-black'>
            Emotion
          </Label>
          <Select value={emotion} onValueChange={setEmotion}>
            <SelectTrigger className='border-gray-300 focus:border-purple-500 focus:ring-purple-500'>
              <SelectValue placeholder='Select an emotion' />
            </SelectTrigger>
            <SelectContent className='absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg'>
              <SelectItem value='happy'>😊 Happy</SelectItem>
              <SelectItem value='sad'>😢 Sad</SelectItem>
              <SelectItem value='hopeful'>🌟 Hopeful</SelectItem>
              <SelectItem value='calm'>🕊️ Calm</SelectItem>
              <SelectItem value='energetic'>⚡ Energetic</SelectItem>
              <SelectItem value='reflective'>🤔 Reflective</SelectItem>
              <SelectItem value='mysterious'>🌙 Mysterious</SelectItem>
              <SelectItem value='love'>❤️ Love</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='space-y-2'>
          <Label
            htmlFor='authorName'
            className='text-sm font-medium text-black'
          >
            Author Name (Optional)
          </Label>
          <Input
            id='authorName'
            type='text'
            placeholder='e.g., John Doe'
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            maxLength={50}
            className='border-gray-300 focus:border-purple-500 focus:ring-purple-500'
          />
        </div>
        <div className='space-y-2'>
          <Label htmlFor='template' className='text-sm font-medium text-black'>
            <Palette className='inline w-4 h-4 mr-1' /> Template Style
          </Label>
          <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
            <SelectTrigger className='border-gray-300 focus:border-purple-500 focus:ring-purple-500'>
              <SelectValue placeholder='Choose a template' />
            </SelectTrigger>
            <SelectContent className='absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg'>
              {templates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className='flex items-center space-x-2'>
          <Checkbox
            id='useEmojis'
            checked={useEmojis}
            onCheckedChange={(checked) => setUseEmojis(Boolean(checked))}
          />
          <Label
            htmlFor='useEmojis'
            className='text-sm font-medium text-black cursor-pointer'
          >
            Include Emojis
          </Label>
        </div>
        <Button
          onClick={generateQuote}
          className='w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200'
          disabled={loading || !word || !emotion}
        >
          {loading ? 'Generating...' : ' Generate Quote'}
        </Button>
        {error && (
          <div
            className='text-red-500 text-center text-sm bg-red-50 p-2 rounded'
            role='alert'
          >
            {error}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
