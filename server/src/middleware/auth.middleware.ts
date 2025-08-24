import { createMiddleware } from 'hono/factory';
import { auth } from '../lib/auth';
import type { HonoEnv } from '@server/types';

export const authMiddleware = createMiddleware(async (c, next) => {
  if (c.req.method === "OPTIONS") return c.text("ok");
  const session = await auth.api.getSession({ headers: c.req.raw.headers });
  if (!session) return c.json({ error: "Unauthorized" }, 401);
  c.set("user", session.user);
  return next();
});
