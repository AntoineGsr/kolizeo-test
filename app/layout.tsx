import type { Metadata } from 'next'
import '@/styles/globals.css'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Kolizeo - Test',
  description: 'Test technique Kolizeo',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
