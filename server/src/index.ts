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

db.run('DROP TABLE IF EXISTS habits')

db.run(`
  create table if not exists habits (
    id integer primary key autoincrement,
    name text not null,
    description text not null,
    completed BOOLEAN DEFAULT false
  )
`)

db.run(`
  INSERT OR IGNORE INTO habits (id, name, description, completed) VALUES
    (1, 'Exercise', '30 minutes of cardio', false),
    (2, 'Meditation', '10 minutes of mindfulness', true),
    (3, 'Reading', 'Read 15 pages', false)
`)



app.get('/habits', (c) => {
  const rows = db
    .query<
      { id: number; name: string; description: string; completed: boolean },
      []
    >('SELECT id, name, description, completed FROM habits')
    .all();
  return c.json({ success: true, data: rows })
})

app.post('/habits', async (c) => {

  const { name, description } = await c.req.json()

  if (!name || !description) {
    return c.json(
      { success: false, error: 'name and description are required' },
      400
    )
  }

  db.run(
    'INSERT INTO habits (name, description) VALUES (?, ?)',
    [name, description]
  )

  return c.json(
    { success: true, data: { name, description } },
    201
  )

})

app.put("/habits/:id", async (c) => {

  const id: number = parseInt(c.req.param("id"));
  const { completed }: { completed: boolean } = await c.req.json();

  db.run(
    `UPDATE habits SET completed = ? WHERE id = ?`,
    [completed, id]
  )

  return c.json({ success: true, message: `Habit ${id} updated` })

})

export default app
