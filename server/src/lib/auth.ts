import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { Database } from "bun:sqlite";
const dbPath = process.env.NODE_ENV === "production"
  ? "/data/auth.db" // if you mount a Railway volume
  : "./auth.db";    // local dev
export const auth = betterAuth({
  database: new Database(dbPath),
  emailAndPassword: {
    enabled: true,
  },
  // baseURL: import.meta.env.BETTER_AUTH_URL,
  trustedOrigins: ["http://localhost:5173", "https://bhvr-habit-tracker.pages.dev"],
  plugins: [openAPI()],
}) as ReturnType<typeof betterAuth>
