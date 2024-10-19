import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export async function middleware(request: NextRequest) {
    console.log('middleware')
    const cookieStore = cookies()
    const id = cookieStore.get('id')

    if(id) {
        if(request.nextUrl.pathname.includes('/login')) {
            return NextResponse.redirect(new URL('/dashboard', request.url))
        }
    } else{
        if(!request.nextUrl.pathname.includes('/dashboard')) {
            return NextResponse.redirect(new URL('/login', request.url))
        }
    }
}
