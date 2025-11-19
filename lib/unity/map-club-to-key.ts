const CLUB_TO_KEY_MAPPING: Record<string, string> = {
  fcmetz: 'FcMetz_Config',
  metzhandball: 'MetzHandball_Config',
}

const KEY_TO_CLUB_MAPPING: Record<string, string> = {
  FcMetz_Config: 'fcmetz',
  MetzHandball_Config: 'metzhandball',
}

export function mapClubToKey(club: string): string | null {
  return CLUB_TO_KEY_MAPPING[club.toLowerCase()] || null
}

export function mapKeyToClub(configKey: string): string | null {
  return KEY_TO_CLUB_MAPPING[configKey] || null
}
