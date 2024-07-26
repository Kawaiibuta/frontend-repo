import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname == "/login") {
    const response = NextResponse.next()
    response.cookies.delete("intern-last-login")
    return response
  }
  if (request.nextUrl.pathname == "/")
    return NextResponse.redirect(new URL("/user", request.url))
  return NextResponse.next()
}

export const config = {
  matcher: ['/', '/login'],
}