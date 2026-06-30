// Minimal in-memory fixed-window rate limiter.
//
// It lives in the Node.js runtime (imported from server actions / the auth
// authorize callback) so the counter survives between requests handled by the
// same server instance. On a multi-instance / serverless deployment the limit
// is enforced per instance, not globally — for a single small site this is an
// effective brute-force speed bump. Move to a shared store (Upstash/Redis)
// if the app is scaled horizontally and a hard global limit is required.

type Entry = { count: number; resetAt: number };

const store = new Map<string, Entry>();

let lastSweep = Date.now();

// Drop expired keys at most once a minute to keep the map bounded.
function sweep(now: number): void {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, entry] of store) {
    if (now > entry.resetAt) store.delete(key);
  }
}

export type RateLimitResult = {
  /** false once the limit for the current window has been exceeded. */
  ok: boolean;
  /** Remaining attempts in the current window. */
  remaining: number;
  /** Epoch ms at which the window resets. */
  resetAt: number;
};

/**
 * Records one attempt for `key` and reports whether the caller is still under
 * `limit` attempts within `windowMs`.
 */
export function hit(key: string, limit: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  sweep(now);

  const entry = store.get(key);
  if (!entry || now > entry.resetAt) {
    const resetAt = now + windowMs;
    store.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }

  entry.count += 1;
  return {
    ok: entry.count <= limit,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
  };
}

/** Clears the counter for `key` (e.g. after a successful login). */
export function reset(key: string): void {
  store.delete(key);
}
