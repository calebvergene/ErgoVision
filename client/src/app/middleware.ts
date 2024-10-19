import { getUserInfo } from '@/utils/get-user-info'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
    const user = await getUserInfo()
    if(request.nextUrl.pathname === '/dashboard') {
        if(!user) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }

    if(request.nextUrl.pathname === '/login') {
        if(user) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    }
  return NextResponse.redirect(new URL('/home', request.url))
}