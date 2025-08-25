import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";
import { Database } from "bun:sqlite";

export const auth = betterAuth({
  database: new Database("./auth.db"),
  emailAndPassword: {
    enabled: true,
  },
  baseURL: import.meta.env.BETTER_AUTH_URL,
  trustedOrigins: [
    "http://localhost:5173",
    "http://localhost:3000",
    "https://bhvr-habit-tracker.pages.dev",
    "https://bhvr-habit-tracker-production.up.railway.app"
  ],
  cookies: {
    sessionToken: {
      name: "__Secure-better-auth.session_token",
      options: {
        httpOnly: true,
        secure: true,
        sameSite: "none", // Allow cross-site cookies
        path: "/",
        maxAge: 60 * 60 * 24 * 7, // 7 days
      }
    },
    plugins: [openAPI()],
  }) as ReturnType<typeof betterAuth>
