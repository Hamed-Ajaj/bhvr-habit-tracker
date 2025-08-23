import db from "@server/db";
import { authMiddleware } from "@server/middleware/auth.middleware";
import { Hono } from "hono";

export const todos = new Hono()

todos.use(authMiddleware).get("/", (c) => {
  const user = c.get("user");
  const userId = user?.id;
  const todos = db.query("SELECT * FROM todos WHERE user_id = ?").all(userId)
  return c.json({
    success: true,
    todos,
  })
})

todos.use(authMiddleware).post("/", async (c) => {

  try {
    const user = c.get("user");
    const { title, completed } = await c.req.json();

    db.run(
      "INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)",
      [user.id, title, completed ?? 0]
    );

    return c.json({ success: true, message: "Todo created successfully" }, 201);
  } catch (err) {
    console.error("Error inserting todo:", err);
    return c.json({ success: false, error: String(err) }, 500);
  }
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
