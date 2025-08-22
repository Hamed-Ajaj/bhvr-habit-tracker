import { betterAuth } from "better-auth";
import { openAPI } from "better-auth/plugins";

import { Database } from "bun:sqlite";

export const auth = betterAuth({
  database: new Database("./auth.db"),
  emailAndPassword: {
    enabled: true,
  },
  trustedOrigins: ["http://localhost:5173"],
  plugins: [openAPI()],
})
