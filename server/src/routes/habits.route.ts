import { Hono } from "hono";
import db from "@server/db";
import { authMiddleware } from "@server/middleware/auth.middleware";

export const habits = new Hono();


habits.use(authMiddleware).get("/", (c) => {
  const user = c.get("user");
  const userId = user?.id;
  const habits = db.query("SELECT * FROM habits WHERE user_id = ?").all(userId);
  return c.json({
    success: true,
    habits
  })
})

habits.use(authMiddleware).post("/", async (c) => {

  const user = c.get("user");
  const userId = user?.id;
  const { name, description, frequency, start_date } = await c.req.json();
  const habit = db.run(`INSERT INTO habits (user_id, name, description, frequency, start_date) VALUES (?, ?, ?, ?, ?)`, [userId, name, description, frequency, start_date]);

  return c.json({
    success: true,
    habit
  })

})

habits.delete('/:id', async (c) => {

  const { id } = c.req.param();
  const deleted = db.run(`DELETE FROM habits WHERE id = ?`, [id]);

  return c.json({
    success: true,
    deleted
  })

})

habits.put("/:id", async (c) => {

  const { id } = c.req.param();
  const { completed } = await c.req.json();

  const updatedHabit = db.run(`UPDATE habits SET completed = ? WHERE id = ?`, [completed, id]);

  return c.json({ success: true, updatedHabit })

})



