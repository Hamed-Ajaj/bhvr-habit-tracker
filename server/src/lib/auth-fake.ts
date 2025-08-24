// auth.config.ts (for CLI only)
import Database from "better-sqlite3";
import { betterAuth } from "better-auth";

export const auth = betterAuth({
  database: new Database("./auth.db"),
  emailAndPassword: { enabled: true },
}) as ReturnType<typeof betterAuth>
