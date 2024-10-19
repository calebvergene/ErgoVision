import { db } from "@/lib/db"
import type { User } from "@/types/users"
import { cookies } from "next/headers"
import { NextResponse, type NextRequest } from "next/server"
import { v4 as uuidv4 } from 'uuid'

export async function POST(req: NextRequest) {
  const cookieStore = cookies()
  const { firstName, lastName, company, industry } = await req.json()
  console.log(firstName, lastName, company, industry)
  const existedUser = await db.query(`SELECT * FROM users WHERE firstName = '${firstName}' AND lastName = '${lastName}'`)
  if (existedUser[0].length > 0) {
    const user = existedUser[0][0] as User
    cookieStore.set('id', user.cookie)
    return NextResponse.json({ message: 'User already exists' }, { status: 400 })
  } else {
    const cookie = uuidv4()
    const user = await db.query(`INSERT INTO users (id, cookie, firstName, lastName, company, industry) VALUES ('${cookie}', '${cookie}', '${firstName}', '${lastName}', '${company}', '${industry}')`)
    cookieStore.set('id', cookie)
    return NextResponse.json({ message: 'User created' }, { status: 200 })
  }
}
