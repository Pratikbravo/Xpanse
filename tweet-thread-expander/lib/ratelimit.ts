// Naive in-memory limiter (fine for a tiny app). For production, use Upstash or Redis.

type Hit = { count: number; resetAt: number };
const buckets = new Map<string, Hit>();

export function makeRateLimiter({ windowMs, max }: { windowMs: number; max: number; }) {
  return {
    consume(key: string) {
      const now = Date.now();
      const hit = buckets.get(key);
      if (!hit || hit.resetAt < now) {
        buckets.set(key, { count: 1, resetAt: now + windowMs });
        return { ok: true } as const;
      }
      if (hit.count < max) {
        hit.count += 1;
        return { ok: true } as const;
      }
      const retryAfter = Math.ceil((hit.resetAt - now) / 1000);
      return { ok: false, retryAfter } as const;
    }
  };
}