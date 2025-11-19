export function mapClubToKey(club: string): string | null {
  const mapping: Record<string, string> = {
    fcmetz: 'FcMetz_Config',
    metzhandball: 'MetzHandball_Config',
  }

  return mapping[club.toLowerCase()] || null
}
