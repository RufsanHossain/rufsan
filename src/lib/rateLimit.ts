import "server-only";

import { Redis } from "@upstash/redis";

const hasUpstash =
  !!process.env.UPSTASH_REDIS_REST_URL && !!process.env.UPSTASH_REDIS_REST_TOKEN;

const redis = hasUpstash ? Redis.fromEnv() : null;

/* In-memory fallback so local dev works without Upstash configured. */
const memory = new Map<string, { count: number; resetAt: number }>();

interface RateLimitOptions {
  limit: number;
  windowSec: number;
}

interface RateLimitResult {
  ok: boolean;
  retryAfterSec: number;
}

export async function checkRateLimit(
  key: string,
  { limit, windowSec }: RateLimitOptions,
): Promise<RateLimitResult> {
  const fullKey = `rl:${key}`;

  if (redis) {
    const count = await redis.incr(fullKey);
    if (count === 1) await redis.expire(fullKey, windowSec);
    if (count > limit) {
      const ttl = await redis.ttl(fullKey);
      return { ok: false, retryAfterSec: ttl > 0 ? ttl : windowSec };
    }
    return { ok: true, retryAfterSec: 0 };
  }

  const now = Date.now();
  const entry = memory.get(fullKey);
  if (!entry || entry.resetAt < now) {
    memory.set(fullKey, { count: 1, resetAt: now + windowSec * 1000 });
    return { ok: true, retryAfterSec: 0 };
  }
  if (entry.count >= limit) {
    return { ok: false, retryAfterSec: Math.ceil((entry.resetAt - now) / 1000) };
  }
  entry.count++;
  return { ok: true, retryAfterSec: 0 };
}
