import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const privatePaths = ['/manage']
const unAuthPaths = ['/login']

// *** MIDDLEWARE CHẠY Ở MÔI TRƯỜNG NEXT SERVER ***

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAuth = Boolean(request.cookies.get('accessToken')?.value)

  // Chưa đăng nhập thì không cho vào các paths được bảo về
  if (privatePaths.some(path => pathname.startsWith(path)) && !isAuth) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  // Đăng nhập rồi thì không cho vào trang login
  if (unAuthPaths.some(path => pathname.startsWith(path)) && isAuth) {
    return NextResponse.redirect(new URL('/', request.url))
  }
  return NextResponse.next()
}
 
export const config = {
  matcher: [
    '/manage/:path*', // tất cả các paths bắt đầu với /manage đều match, /manage không thôi cũng được
    '/login'
  ]
}