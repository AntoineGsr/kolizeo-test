import type { UnityAuthResponse, UnityRemoteConfigResponse } from './types'
import { log, error } from '@/lib/utils/logger'

const UNITY_AUTH_URL =
  'https://player-auth.services.api.unity.com/v1/authentication/anonymous'
const UNITY_REMOTE_CONFIG_URL = 'https://config.unity3d.com/api/v1/settings'

export async function anonymousAuthUnity(): Promise<{
  token: string
  expiresIn: number
}> {
  const projectId = process.env.UNITY_PROJECT_ID

  if (!projectId) {
    throw new Error('UNITY_PROJECT_ID not configured')
  }

  const response = await fetch(UNITY_AUTH_URL, {
    method: 'POST',
    headers: {
      ProjectId: projectId,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    error('Unity authentication failed', { status: response.status, errorText })
    throw new Error(`Unity authentication failed: ${response.status}`)
  }

  const authResponse: UnityAuthResponse = await response.json()

  if (!authResponse.idToken) {
    error('Unity authentication response missing idToken', authResponse)
    throw new Error('Unity authentication response missing idToken')
  }

  log('Unity authentication successful')
  return {
    token: authResponse.idToken,
    expiresIn: authResponse.expiresIn || 3600,
  }
}

export async function fetchRemoteConfigUnity(
  token: string,
  configType?: string
): Promise<UnityRemoteConfigResponse> {
  const projectId = process.env.UNITY_PROJECT_ID

  if (!projectId) {
    throw new Error('UNITY_PROJECT_ID not configured')
  }

  let url = `${UNITY_REMOTE_CONFIG_URL}?projectId=${projectId}`

  if (configType) {
    url += `&key=${encodeURIComponent(configType)}`
  }

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorText = await response.text()
    error('Failed to fetch Unity Remote Config', {
      status: response.status,
      errorText,
    })
    throw new Error(`Failed to fetch Unity Remote Config: ${response.status}`)
  }

  return response.json()
}
