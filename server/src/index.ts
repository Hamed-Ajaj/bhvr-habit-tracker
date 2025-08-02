import { Hono } from 'hono'
import { cors } from 'hono/cors'
import type { ApiResponse } from 'shared/dist'
import { Database } from "bun:sqlite";
const app = new Hono()
const db = new Database("habits.sqlite");

app.use(cors())

// 2. ensure the table exists, and seed some dummy data
db.run(`
  create table if not exists habits (
    id integer primary key autoincrement,
    name text not null,
    description text not null
  )
`)

db.run(`
  INSERT OR IGNORE INTO habits (id, name, description) VALUES
    (1, 'Exercise',  '30 minutes of cardio'),
    (2, 'Meditation','10 minutes of mindfulness'),
    (3, 'Reading',   'Read 20 pages of a book');
`)


app.get('/', (c) => c.text('hello hono!'))

app.get('/habits', (c) => {
  const rows = [
    ...db.query<{ id: number; name: string; description: string }>(
      'SELECT id, name, description FROM habits'
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

  const [{ id }] = [
    ...db.query<{ id: number }>(
      'SELECT last_insert_rowid() AS id'
    )
  ]

  return c.json(
    { success: true, data: { id, name, description } },
    201
  )

})

export default app
