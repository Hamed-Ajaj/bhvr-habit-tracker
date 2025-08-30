import { createAuthClient } from "better-auth/react"
export const { signIn, signOut, signUp, useSession, deleteUser, listSessions, updateUser, changePassword } = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: import.meta.env.VITE_BASE_URL,
})
