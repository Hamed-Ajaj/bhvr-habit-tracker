import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { Database } from "bun:sqlite";

export const auth = betterAuth({
  database: new Database("./auth.db"),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    deleteUser: {
      enabled: true
    }
  },
  baseURL: process.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://bhvr-habit-tracker.pages.dev",
    "https://bhvr-habit-tracker-production.up.railway.app"
  ],
  advanced: {
    defaultCookieAttributes: {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    },
  },
  plugins: [openAPI()],
}) as ReturnType<typeof betterAuth>
