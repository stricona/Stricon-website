/**
 * In-memory sliding-window rate limiter.
 *
 * NOTE: Serverless/edge instances (e.g., Vercel / AWS Lambda) do not share
 * process memory across concurrent invocations or cold starts. For strict distributed
 * rate limiting across multi-region serverless clusters, an external key-value store
 * (e.g. Upstash Redis / Cloudflare KV) should be used. This in-memory implementation
 * provides fast, dependency-free local and single-instance protection against abuse.
 */

interface RateLimitRecord {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitRecord>();

// Clean up stale entries every 5 minutes to prevent memory leaks
if (typeof setInterval !== "undefined") {
  setInterval(() => {
    const now = Date.now();
    for (const [key, record] of store.entries()) {
      if (now > record.resetAt) {
        store.delete(key);
      }
    }
  }, 5 * 60 * 1000).unref?.();
}

export interface RateLimitOptions {
  limit?: number; // max requests allowed in the window
  windowMs?: number; // window duration in ms
  bucket?: string; // separate namespaces for different routes
}

export function checkRateLimit(
  ip: string,
  options: RateLimitOptions = {}
): { allowed: boolean; remaining: number; resetAt: number } {
  const limit = options.limit ?? 5;
  const windowMs = options.windowMs ?? 10 * 60 * 1000; // 10 minutes default
  const bucket = options.bucket ? `bucket:${options.bucket}:` : "default:";
  const key = `${bucket}${ip}`;
  const now = Date.now();

  const record = store.get(key);

  if (!record || now > record.resetAt) {
    const newRecord: RateLimitRecord = {
      count: 1,
      resetAt: now + windowMs,
    };
    store.set(key, newRecord);
    return {
      allowed: true,
      remaining: limit - 1,
      resetAt: newRecord.resetAt,
    };
  }

  if (record.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: record.resetAt,
    };
  }

  record.count += 1;
  return {
    allowed: true,
    remaining: limit - record.count,
    resetAt: record.resetAt,
  };
}

export function checkCareerRateLimit(ip: string) {
  return checkRateLimit(ip, {
    limit: 5,
    windowMs: 10 * 60 * 1000,
    bucket: "careers",
  });
}
