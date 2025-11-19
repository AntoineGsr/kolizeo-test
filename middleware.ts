import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { log } from '@/lib/utils/logger'
import { getUnityAuthToken } from './lib/unity/token-manager'

const COOKIE_NAME = process.env.UNITY_COOKIE_NAME || 'kolizeo_unity_token'

export async function middleware(request: NextRequest) {
  if (
    request.nextUrl.pathname.startsWith('/_next') ||
    request.nextUrl.pathname.startsWith('/favicon.ico')
  ) {
    return NextResponse.next()
  }

  try {
    const { token, isNew, expiresIn } = await getUnityAuthToken(request.cookies)

    const response = NextResponse.next()

    if (isNew) {
      const isProduction = process.env.NODE_ENV === 'production'
      response.cookies.set(COOKIE_NAME, token, {
        httpOnly: true,
        secure: isProduction,
        sameSite: 'lax',
        maxAge: expiresIn,
        path: '/',
      })
      log('Unity token stored in cookies by middleware')
    }

    return response
  } catch (err) {
    log('Error in middleware authentication', err)
    return NextResponse.next()
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}
