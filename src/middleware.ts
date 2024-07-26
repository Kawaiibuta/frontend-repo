import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
export function middleware(request: NextRequest) {
  const lastLogin = JSON.parse(request.cookies.get("intern-last-login")?.value ?? "{}")
  if(!lastLogin)
    return NextResponse.redirect(new URL('/login', request.url))
  return NextResponse.redirect(new URL("/user", request.url))
}
 
export const config = {
  matcher: '/',
}