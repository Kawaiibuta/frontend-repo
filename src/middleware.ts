import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname == "/login") {
    const response = NextResponse.next()
    response.cookies.delete("intern-last-login")
    return response
  }
  const lastLogin = JSON.parse(request.cookies.get("intern-last-login")?.value ?? "{}")
  if(!lastLogin)
    return NextResponse.redirect(new URL('/login', request.url))
  return NextResponse.redirect(new URL("/user", request.url))
}
 
export const config = {
  matcher: ['/', '/login'],
}