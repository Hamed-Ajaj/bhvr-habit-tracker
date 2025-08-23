import { Hono } from "hono";
import db from "@server/db";
import { authMiddleware } from "@server/middleware/auth.middleware";

export const habits = new Hono();


// habits.use(authMiddleware).get("/", (c) => {
//   const user = c.get("user");
//   const userId = user?.id;
//   const habits = db.query("SELECT * FROM habits WHERE user_id = ?").all(userId);
//   return c.json({
//     success: true,
//     habits
//   })
// })

habits.use(authMiddleware).get("/", (c) => {
  const user = c.get("user");
  const userId = user?.id;
  const habits = db.query(`
      SELECT h.id,
       h.name,
       h.description,
       h.frequency,
       h.start_date,
hl.id as habit_log_id,
       CASE WHEN hl.id IS NOT NULL THEN 1 ELSE 0 END as completed
FROM habits h
LEFT JOIN habit_logs hl
  ON h.id = hl.habit_id
 AND hl.date = DATE('now')
WHERE h.user_id = ?;`).all(userId)
  return c.json({ success: true, habits: habits })
})


// POST /habits/:id/complete
habits.post("/:id/complete", (c) => {
  const id = c.req.param("id");
  db.run(
    "INSERT INTO habit_logs (habit_id, date, completed) VALUES (?, DATE('now'), 1)",
    [id]
  );
  return c.json({ success: true });
});

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



