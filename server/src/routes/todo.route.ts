import db from "@server/db";
import { authMiddleware } from "@server/middleware/auth.middleware";
import { Hono } from "hono";

export const todos = new Hono()

todos.use(authMiddleware).get("/", (c) => {
  const user = c.get("user");
  const userid = user?.id;
  const todos = db.query("select * from todos where user_id = ?").all(userid)
  return c.json({
    success: true,
    todos,
  })
})

todos.use(authMiddleware).get("/completed", (c) => {
  const user = c.get("user");
  const userid = user?.id;
  try {
    const completed = db.query("select * from todos where user_id = ? AND completed = 1").all(userid)
    return c.json({
      success: true,
      completed,
    }, 201)
  } catch (err) {
    console.error("Error fetching todos:", err);
    return c.json({ success: false, error: String(err) }, 500);
  }
})

todos.use(authMiddleware).post("/", async (c) => {

  try {
    const user = c.get("user");
    const { title, completed } = await c.req.json();

    const addedTodo = db.run(
      "INSERT INTO todos (user_id, title, completed) VALUES (?, ?, ?)",
      [user.id, title, completed ?? 0]
    );

    return c.json({ success: true, addedTodo }, 201);
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

todos.put("/:id/edit", async (c) => {
  const { id } = c.req.param();
  const { title } = await c.req.json();
  db.run("UPDATE todos SET title= ? WHERE id = ?",
    [title, id],);
  return c.json({ success: true, message: "Todo updated successfully" });
})


todos.delete("/:id", async (c) => {
  const { id } = c.req.param();
  db.run('DELETE FROM todos WHERE id = ?', [id]);
  return c.json({ success: true, message: "Todo deleted successfully" });
})
