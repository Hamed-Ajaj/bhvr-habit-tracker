import { Hono } from "hono";
import db from "@server/db";

export const habits = new Hono();


habits.get("/", (c) => {
  const habits = db.query("SELECT * FROM habits").all()
  return c.json({
    success: true,
    habits
  })
})

habits.post("/", async (c) => {

  const { name, description, frequency, start_date } = await c.req.json();
  const habit = db.run(`INSERT INTO habits (name, description, frequency, start_date) VALUES (?, ?, ?, ?)`, [name, description, frequency, start_date]);

  return c.json({
    success: true,
    habit
  })

})
