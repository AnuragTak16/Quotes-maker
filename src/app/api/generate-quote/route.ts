import { NextResponse } from 'next/server';
import { generateText } from 'ai';
import { createGroq } from '@ai-sdk/groq';
import { getCloudflareContext } from '@opennextjs/cloudflare';

/** Model available on this Groq account. */
const GROQ_MODEL = 'openai/gpt-oss-20b';

/**
 * On Cloudflare Workers, secrets live on `getCloudflareContext().env`.
 * Locally (`next dev`), they come from `.env.local` via `process.env`.
 */
async function getGroqApiKey(): Promise<string | undefined> {
  // 1) Cloudflare Workers / OpenNext runtime (preferred)
  try {
    const { env } = await getCloudflareContext({ async: true });
    const fromCf = env.GROQ_API_KEY?.trim();
    if (fromCf) return fromCf;
  } catch {
    // Plain Node / next start without Cloudflare proxy
  }

  // 2) Local Next.js (.env.local) fallback
  return process.env.GROQ_API_KEY?.trim() || undefined;
}

export async function POST(request: Request) {
  try {
    const apiKey = await getGroqApiKey();
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'GROQ_API_KEY is not set on the Worker. Add it as a Secret in Cloudflare → Workers → Settings → Variables and Secrets, then redeploy (keep-vars). Locally use .env.local.',
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
            'Groq API key is invalid. Create a new key at console.groq.com and update the Cloudflare secret GROQ_API_KEY.',
        },
        { status: 401 }
      );
    }
    if (lower.includes('model') && lower.includes('not')) {
      return NextResponse.json(
        { error: `Groq model unavailable: ${message}` },
        { status: 502 }
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
