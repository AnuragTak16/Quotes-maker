/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server';
import { generateText } from 'ai'; // AI SDK core [^1]
import { groq } from '@ai-sdk/groq'; // Groq integration

export async function POST(request: Request) {
  try {
    // --- ADD THESE TWO LINES FOR DIAGNOSIS ---
    console.log('--- DIAGNOSIS START ---');
    console.log('GROQ_API_KEY value:', process.env.GROQ_API_KEY);
    console.log('--- DIAGNOSIS END ---');
    // -----------------------------------------

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

    const { text } = await generateText({
      model: groq('llama3-8b-8192', {
        apiKey: process.env.GROQ_API_KEY,
      }),
      prompt,
    });

    return NextResponse.json({ quote: text.trim() });
  } catch (err: any) {
    console.error('API /generate-quote error:', err);
    // Check for specific error messages related to Groq API key
    if (
      err.message &&
      err.message.toLowerCase().includes('api key is missing')
    ) {
      return NextResponse.json(
        {
          error:
            'Groq API key is missing. Please set the GROQ_API_KEY environment variable.',
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
