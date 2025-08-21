import { betterAuth } from "better-auth";

import { Database } from "bun:sqlite";

export const auth = betterAuth({
  database: new Database("./auth.db"),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:5173"],
})
