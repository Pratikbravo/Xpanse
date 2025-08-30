import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { buildThreadPrompt } from "@/lib/prompt";
import { makeRateLimiter } from "@/lib/ratelimit";

const limiter = makeRateLimiter({
  windowMs: Number(process.env.RATE_LIMIT_WINDOW_MS || 10 * 60 * 1000),
  max: Number(process.env.RATE_LIMIT_REQUESTS || 60),
});

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0] ||
             req.headers.get("x-real-ip") || "unknown";
  const limited = limiter.consume(ip as string);
  if (!limited.ok) {
    return NextResponse.json(
      { error: `Rate limit exceeded. Try again in ${limited.retryAfter}s.` },
      { status: 429 }
    );
  }

  try {
    const body = await req.json();
    const { topic, tone = "concise", audience = "general", count = 10 } = body || {};

    if (!topic || typeof topic !== "string") {
      return NextResponse.json({ error: "Missing 'topic'" }, { status: 400 });
    }

    const prompt = buildThreadPrompt({ topic, tone, audience, count });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.7,
      messages: [
        { role: "system", content: "You are a social media writing assistant." },
        { role: "user", content: prompt }
      ],
    });

    const text = completion.choices[0]?.message?.content || "";

    return NextResponse.json({ thread: text.trim() });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { error: err?.message || "Unknown error" },
      { status: 500 }
    );
  }
}