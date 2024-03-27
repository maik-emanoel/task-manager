import NextAuth from "next-auth"

/**
 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
 */

declare module "next-auth" {
  interface User {
    id: number | string
  }
  interface Session {
    user: User & {
      id: number | string
    }
    token: {
      id: number | string
    }
  }
}