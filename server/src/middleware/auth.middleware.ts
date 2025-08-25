import { createMiddleware } from 'hono/factory';
import { auth } from '../lib/auth';
import type { HonoEnv } from '@server/types';

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  console.log("=== AUTH MIDDLEWARE DEBUG ===");
  console.log("All headers:", Object.fromEntries(c.req.raw.headers.entries()));
  console.log("Cookie header specifically:", c.req.header('cookie'));
  console.log("Origin:", c.req.header('origin'));

  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  console.log("Session result:", session ? "Found session" : "No session");

  if (!session) {
    console.log("❌ Authentication failed - no session");
    return c.json({ error: 'Unauthorized' }, 401);
  }

  console.log("✅ Authentication successful");
  c.set('user', session.user);
  c.set('session', session.session);
  return next();
});
