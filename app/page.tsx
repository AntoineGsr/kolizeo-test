import type { ClubConfig } from '@/lib/unity/types'
import { fetchAllClubs } from '@/lib/unity/fetch-clubs'
import { ClubCardsList } from '@/components/ClubCard'
import { TextHoverEffect } from '@/components/ui/text-hover-effect'

async function getClubs(): Promise<ClubConfig[]> {
  try {
    const response = await fetchAllClubs()
    return response
  } catch {
    return []
  }
}

export default async function HomePage() {
  const clubs = await getClubs()

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8 pt-24">
      <div className="w-full max-w-4xl space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">
            <TextHoverEffect text="Kolizeo"></TextHoverEffect>
          </h1>
          <p className="text-muted-foreground">
            Accédez aux pages des clubs pour en savoir plus
          </p>
        </div>

        {clubs.length === 0 ? (
          <div className="text-center text-muted-foreground">
            <p>Aucun club disponible pour le moment.</p>
          </div>
        ) : (
          <ClubCardsList clubs={clubs} />
        )}
      </div>
    </div>
  )
}
