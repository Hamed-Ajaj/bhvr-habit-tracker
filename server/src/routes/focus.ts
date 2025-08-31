import db from "@server/db";
import { Hono } from "hono";

export const focus = new Hono();

focus.get("/", (c) => {
  const focusSessions = db.query("SELECT * FROM sessions").all();
  return c.json({ success: true, focusSessions })
})

focus.post("/", async (c) => {
  const { duration } = await c.req.json();
  const addedSession = db.run(`
INSERT INTO sessions duration=?;
`, [duration]);
  return c.json({
    success: true, addedSession
  })
})
