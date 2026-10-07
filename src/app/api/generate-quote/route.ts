import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { groq } from '@ai-sdk/groq';

export async function POST(request: Request) {
  try {
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          error:
            'Groq API key is missing. Set GROQ_API_KEY in Workers secrets or .dev.vars.',
        },
        { status: 500 }
      );
    }

    const { word, emotion } = (await request.json()) as {
      word?: string;
      emotion?: string;
    };

    if (!word || !emotion) {
      return NextResponse.json(
        { error: 'Both word and emotion are required.' },
        { status: 400 }
      );
    }

    const prompt = `Generate a short, inspirational quote (max 20 words) that includes the word '${word}' \
and evokes a feeling of '${emotion}'. Only return the quote text.`;

    // groq() reads GROQ_API_KEY from the environment automatically
    const { text } = await generateText({
      model: groq('llama3-8b-8192'),
      prompt,
    });

    return NextResponse.json({ quote: text.trim() });
  } catch (err: unknown) {
    console.error('API /generate-quote error:', err);
    const message = err instanceof Error ? err.message : '';
    if (message.toLowerCase().includes('api key')) {
      return NextResponse.json(
        {
          error:
            'Groq API key is missing. Set GROQ_API_KEY in Workers secrets or .dev.vars.',
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: 'Failed to generate quote. Try again later.' },
      { status: 500 }
    );
  }
}
