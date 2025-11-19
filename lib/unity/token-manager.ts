import type { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'
import type { RequestCookies } from 'next/dist/server/web/spec-extension/cookies'
import { anonymousAuthUnity } from './client'
import { log, error } from '@/lib/utils/logger'
import { fetchAllClubs } from './fetch-clubs'

const COOKIE_NAME = process.env.UNITY_COOKIE_NAME || 'kolizeo_unity_token'
const UNITY_PROJECT_ID = process.env.UNITY_PROJECT_ID

export function getTokenFromCookies(
  cookieStore: ReadonlyRequestCookies
): string | null {
  const token = cookieStore.get(COOKIE_NAME)
  return token?.value || null
}

export async function validateToken(): Promise<boolean> {
  if (!UNITY_PROJECT_ID) {
    return false
  }

  try {
    const response = await fetchAllClubs()

    if (!response || response.length === 0) {
      return false
    }

    return true
  } catch (err) {
    error('Error validating token', err)
    return false
  }
}

function getTokenFromRequestCookies(
  cookieStore: RequestCookies
): string | null {
  const token = cookieStore.get(COOKIE_NAME)
  return token?.value || null
}

export async function getUnityAuthToken(
  requestCookies: RequestCookies
): Promise<{ token: string; isNew: boolean; expiresIn: number }> {
  const existingToken = getTokenFromRequestCookies(requestCookies)

  if (existingToken) {
    const isValid = await validateToken()
    if (isValid) {
      log('Using existing valid token from cookies')
      return { token: existingToken, isNew: false, expiresIn: 3600 }
    }
    log('Existing token is invalid, re-authenticating')
  }

  log('Authenticating with Unity')
  const authResult = await anonymousAuthUnity()
  return {
    token: authResult.token,
    isNew: true,
    expiresIn: authResult.expiresIn,
  }
}
