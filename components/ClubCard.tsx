'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ClubConfig } from '@/lib/unity/types'
import { AnimatePresence, motion } from 'framer-motion'
import ButtonShiny from './ButtonShiny'
import { useRouter } from 'next/navigation'

interface ClubCardProps {
  club: ClubConfig
}

export function ClubCard({ club }: ClubCardProps) {
  const router = useRouter()

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      layout
    >
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle style={{ color: club.color }}>{club.id}</CardTitle>
          <CardDescription>Découvrez le club {club.id}</CardDescription>
        </CardHeader>
        <CardContent>
          <ButtonShiny
            label="Voir les détails du club"
            onClick={() => router.push(`/${club.url}`)}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface ClubCardsListProps {
  clubs: ClubConfig[]
}

export function ClubCardsList({ clubs }: ClubCardsListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <AnimatePresence>
        {clubs.map((club) => (
          <ClubCard key={club.id} club={club} />
        ))}
      </AnimatePresence>
    </div>
  )
}
