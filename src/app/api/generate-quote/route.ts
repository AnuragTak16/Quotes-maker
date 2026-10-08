import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';

/** Model available on this Groq account (llama ids are not listed). */
const GROQ_MODEL = 'openai/gpt-oss-20b';

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'Groq API key is missing. Set GROQ_API_KEY in .env.local or Workers secrets.',
        },
        { status: 500 }
      );
    }

    const groq = createGroq({ apiKey });

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

    const prompt = `Write one original inspirational quote (maximum 20 words).
Requirements:
- Naturally include the exact word "${word}" (case can vary)
- Evoke the mood "${emotion}"
- Do not reuse common clichés; make it feel fresh for this specific word
- Return only the quote text — no quotes around it, no explanation`;

    const { text } = await generateText({
      model: groq(GROQ_MODEL),
      prompt,
      temperature: 0.95,
    });

    return NextResponse.json({ quote: text.trim() });
  } catch (err: unknown) {
    console.error('API /generate-quote error:', err);
    const message = err instanceof Error ? err.message : '';
    const lower = message.toLowerCase();

    if (lower.includes('invalid api key') || lower.includes('invalid_api_key')) {
      return NextResponse.json(
        {
          error:
            'Groq API key is invalid. Create a new key at console.groq.com and update .env.local, then restart the server.',
        },
        { status: 401 }
      );
    }
    if (lower.includes('model') && lower.includes('not')) {
      return NextResponse.json(
        {
          error: `Groq model unavailable: ${message}`,
        },
        { status: 502 }
      );
    }
    if (lower.includes('api key is missing') || lower.includes('api key is not set')) {
      return NextResponse.json(
        {
          error:
            'Groq API key is missing. Set GROQ_API_KEY in .env.local or Workers secrets.',
        },
        { status: 500 }
      );
    }

    return NextResponse.json(
      {
        error: message
          ? `Failed to generate quote: ${message}`
          : 'Failed to generate quote. Try again later.',
      },
      { status: 500 }
    );
  }
}
