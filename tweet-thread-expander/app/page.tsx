"use client";
import { useState } from "react";
import Form from "@/components/Form";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState("");

  async function onGenerate(values: { topic: string; tone: string; audience: string; count: number }) {
    setLoading(true);
    setOutput("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed");
      setOutput(data.thread);
    } catch (e: any) {
      setOutput(`Error: ${e.message}`);
    } finally {
      setLoading(false);
    }
  }

  function copyAll() {
    if (!output) return;
    navigator.clipboard.writeText(output);
  }

  return (
    <main className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold">AI Tweet Thread Expander</h1>
      <p className="text-gray-600 mt-2">Turn a topic into a ready-to-post thread.</p>
      <div className="mt-6">
        <Form onGenerate={onGenerate} />
      </div>
      <div className="mt-6">
        <button
          onClick={copyAll}
          disabled={!output}
          className="px-3 py-2 rounded bg-black text-white disabled:opacity-40"
        >
          Copy All
        </button>
      </div>
      <pre className="mt-4 whitespace-pre-wrap bg-gray-50 p-4 rounded border">
        {loading ? "Generating…" : output}
      </pre>
      <footer className="mt-10 text-xs text-gray-500">
        <span>Built by Marina • © {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}