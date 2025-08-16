import db from "@server/db";
import { Hono } from "hono";

export const todos = new Hono()

todos.get("/", (c) => {
  const todos = db.query("SELECT * FROM todos").all()
  return c.json({
    success: true,
    todos
  })
})

todos.post("/", async (c) => {

  const { title, completed } = await c.req.json()

  db.run(
    'INSERT INTO todos (title, completed) VALUES (?, ?)',
    [title, completed]
  )

  return c.json({ success: true, message: "Todo created successfully" });
})

todos.put("/:id", async (c) => {
  const { id } = c.req.param();
  const { completed, title } = await c.req.json();
  db.run("UPDATE todos SET completed = ? , title= ? WHERE id = ?",
    [completed, title, id],);
  return c.json({ success: true, message: "Todo updated successfully" });
})


todos.delete("/:id", async (c) => {
  const { id } = c.req.param();
  db.run('DELETE FROM todos WHERE id = ?', [id]);
  return c.json({ success: true, message: "Todo deleted successfully" });
})
