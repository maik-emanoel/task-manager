'use server'

import { revalidatePath } from "next/cache"

export async function updateDatabase() {
  return revalidatePath('/')
}