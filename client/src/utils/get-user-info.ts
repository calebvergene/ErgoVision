'use server'

import { db } from "@/lib/db"
import type { User } from "@/types/users"
import { cookies } from "next/headers"

export const getUserInfo = async () => {
  const cookieStore = cookies()
  const id = cookieStore.get('id')?.value
  const user = await db.query(`SELECT * FROM users WHERE id = '${id}'`)
  return user[0][0] as User
}
