import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { auth } from './lib/auth';
import { todos } from './routes/todo.route';
import { habits } from './routes/habits.route';
import { logger } from 'hono/logger';
import { authMiddleware } from './middleware/auth.middleware';

const app = new Hono()



app.use(logger())

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "https://bhvr-habit-tracker.pages.dev", "http://localhost:3000", "https://bhvr-habit-tracker-production.up.railway.app"],
    allowHeaders: ["Content-Type", "Authorization", "Cookie"],
    allowMethods: ["POST", "GET", "OPTIONS", "DELETE", "PUT"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Group all API routes under /api
const api = new Hono();
api.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));
// api.use('*', async (c, next) => {
//   console.log('Request headers:', Object.fromEntries(c.req.raw.headers.entries()))
//   console.log('Cookie header:', c.req.header('cookie'))
//   await next()
// })

api.use(authMiddleware).route("/todos", todos);
api.use(authMiddleware).route("/habits", habits);

app.route("/api", api);

export default {
  port: Number(process.env.PORT) || 3000,
  hostname: '0.0.0.0',
  fetch: app.fetch,
};
