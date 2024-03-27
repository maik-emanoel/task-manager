'use client'

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
     <button onClick={() => signOut()} className="flex-1 text-left cursor-default">Log out</button>
  )
}