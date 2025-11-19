'use client'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { LinkItem } from '@/lib/unity/types'
import { AnimatePresence, motion } from 'framer-motion'
import ButtonShiny from '@/components/ButtonShiny'

interface LinkCardProps {
  link: LinkItem
}

export function LinkCard({ link }: LinkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.25 }}
      layout
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle style={{ color: link.color }}>{link.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <ButtonShiny
            label="Visiter le site"
            onClick={() => window.open(link.url, '_blank')}
          />
        </CardContent>
      </Card>
    </motion.div>
  )
}

interface LinkCardsListProps {
  links: LinkItem[]
}

export function LinkCardsList({ links }: LinkCardsListProps) {
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {links.map((link: LinkItem) => (
          <LinkCard key={link.label} link={link} />
        ))}
      </AnimatePresence>
    </div>
  )
}
