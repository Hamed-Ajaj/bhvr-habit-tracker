import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { ApiResponse } from 'shared/dist'
import { Database } from "bun:sqlite";
import { auth } from './lib/auth';
import { todos } from './routes/todo.route';
import { habits } from './routes/habits.route';
import { logger } from 'hono/logger';
const app = new Hono()
const db = new Database("habits.sqlite");

app.use(cors())
app.use(logger())

app.use(
  "/api/auth/*", // or replace with "*" to enable cors for all routes
  cors({
    origin: ["http://localhost:3000", "http://localhost::5173"], // replace with your origin
    allowHeaders: ["Content-Type", "Authorization"],
    allowMethods: ["POST", "GET", "OPTIONS"],
    exposeHeaders: ["Content-Length"],
    maxAge: 600,
    credentials: true,
  }),
);


app.on(["POST", "GET"], "/api/auth/**", (c) => auth.handler(c.req.raw));

app.route("/todos", todos)
app.route("/habits", habits)


export default app
