export function buildThreadPrompt({ topic, tone, audience, count }: {
  topic: string; tone: string; audience: string; count: number;
}) {
  return `Write a numbered Twitter/X thread of ${count} tweets about: "${topic}".
Audience: ${audience}. Tone: ${tone}.

Rules:
- Start with a strong hook in Tweet 1. Avoid clickbait words like "shocking".
- Each tweet must be ≤ 260 characters.
- Use clear, simple language and short lines.
- No emojis, and avoid hashtags except at most one at the end of the final tweet.
- Use (1/${count}), (2/${count})... numbering.
- If listing steps, make each tweet a self-contained idea.
- End with a soft CTA for replies or shares.

Output ONLY the tweets, each on a new line, already numbered.`;
}