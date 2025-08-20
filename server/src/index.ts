import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { Database } from "bun:sqlite";
import { auth } from './lib/auth';
import { todos } from './routes/todo.route';
import { habits } from './routes/habits.route';
import { logger } from 'hono/logger';

const app = new Hono()

app.use(logger())

app.use(
  "*",
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);

// Group all API routes under /api
const api = new Hono();

api.on(["POST", "GET"], "/auth/**", (c) => auth.handler(c.req.raw));
api.route("/todos", todos);
api.route("/habits", habits);

app.route("/api", api);

export default app;
