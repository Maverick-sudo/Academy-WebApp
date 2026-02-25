import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Handle favicon redirect
  if (pathname === '/favicon.ico') {
    return NextResponse.redirect(new URL('/favicon-32x32.svg', request.url))
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: ['/favicon.ico'],
}
