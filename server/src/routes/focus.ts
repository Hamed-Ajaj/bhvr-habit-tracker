import { Hono } from "hono";

export const focus = new Hono();

focus.get("/", (c) => {
  return c.json({ success: true, message: "Focus route is working!" })
})
