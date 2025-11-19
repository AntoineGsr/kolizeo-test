import { fetchRemoteConfigUnity } from './client'
import { log, error } from '@/lib/utils/logger'
import { ClubConfig } from './types'
import { cookies } from 'next/headers'
import { getTokenFromCookies } from './token-manager'
import { mapKeyToClub } from './map-club-to-key'

export async function fetchAllClubs(configKey?: string): Promise<ClubConfig[]> {
  try {
    const cookiesStore = await cookies()
    const token = getTokenFromCookies(cookiesStore)

    if (!token) {
      throw new Error('No token found')
    }

    const data = await fetchRemoteConfigUnity(token, configKey)

    if (!data || !data.configs?.settings) {
      log('No config data found')
      return []
    }

    const clubs: ClubConfig[] = []

    for (const [configKey, config] of Object.entries(data.configs.settings)) {
      try {
        const activeButtons = config.Buttons.filter((btn) => btn.active)
        const links = activeButtons.map((btn) => ({
          label: btn.title,
          url: btn.url,
          color: btn.BGColor,
        }))

        const clubUrl = mapKeyToClub(configKey) || configKey.toLowerCase()

        clubs.push({
          id: configKey,
          url: clubUrl,
          color: config.BGColor,
          links,
        })

        log(`Successfully extracted club: ${configKey}`)
      } catch (err) {
        error(`Error processing config ${configKey}`, err)
      }
    }

    return clubs
  } catch (err) {
    error('Error fetching all clubs from Unity', err)
    return []
  }
}
