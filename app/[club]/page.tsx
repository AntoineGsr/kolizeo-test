import { notFound } from 'next/navigation'
import { LinkCardsList } from './components/LinkCard'
import type { ClubConfig } from '@/lib/unity/types'
import { fetchAllClubs } from '@/lib/unity/fetch-clubs'

async function getClubConfig(configKey: string): Promise<ClubConfig | null> {
  try {
    const response = await fetchAllClubs(configKey)
    return response.find((club) => club.id === configKey) || null
  } catch {
    return null
  }
}

interface ClubPageProps {
  params: Promise<{ club: string }>
}

export default async function ClubPage({ params }: ClubPageProps) {
  const { club } = await params
  const config = await getClubConfig(club)

  if (!config) {
    notFound()
  }

  return (
    <div className="flex min-h-screen flex-col items-center p-8 pt-24">
      <div className="w-full max-w-2xl space-y-6">
        <div className="text-center space-y-2">
          <h1
            className="text-4xl font-bold"
            style={config.color ? { color: config.color } : undefined}
          >
            {config.id}
          </h1>
        </div>

        <div className="space-y-4">
          <LinkCardsList links={config.links} />
        </div>
      </div>
    </div>
  )
}
