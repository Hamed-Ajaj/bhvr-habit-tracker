import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { ApiResponse } from 'shared/dist'
import { Database } from "bun:sqlite";
const app = new Hono()
const db = new Database("habits.sqlite");

app.use(cors())


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
  const rows = [
    ...db.query<{ id: number; name: string; description: string }>(
      'SELECT id, name, description, completed FROM habits'
    )
  ]
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
