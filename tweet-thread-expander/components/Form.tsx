"use client";
import { useState } from "react";

type Props = { onGenerate: (v: { topic: string; tone: string; audience: string; count: number }) => void };

export default function Form({ onGenerate }: Props) {
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("concise");
  const [audience, setAudience] = useState("founders");
  const [count, setCount] = useState(10);

  return (
    <form
      onSubmit={(e) => { e.preventDefault(); onGenerate({ topic, tone, audience, count }); }}
      className="grid gap-3"
    >
      <label className="grid gap-1">
        <span className="text-sm">Topic</span>
        <textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="e.g., Lessons from launching an AI micro‑SaaS in a weekend"
          rows={4}
          className="border rounded p-2"
          required
        />
      </label>

      <div className="grid grid-cols-2 gap-3">
        <label className="grid gap-1">
          <span className="text-sm">Tone</span>
          <input value={tone} onChange={(e) => setTone(e.target.value)} className="border rounded p-2" />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Audience</span>
          <input value={audience} onChange={(e) => setAudience(e.target.value)} className="border rounded p-2" />
        </label>
      </div>

      <label className="grid gap-1">
        <span className="text-sm"># of tweets (5–15)</span>
        <input
          type="number" min={5} max={15}
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
          className="border rounded p-2 w-28"
        />
      </label>

      <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white">Generate</button>
    </form>
  );
}