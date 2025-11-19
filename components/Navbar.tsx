'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Navbar() {
  return (
    <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 px-4 py-3 bg-background border border-border rounded-lg shadow-lg">
      <Link href="/" className="flex items-center">
        <Image
          src="/logo.webp"
          alt="Kolizeo Logo"
          width={30}
          height={30}
          className="object-contain"
        />
      </Link>
      <Link
        href="/"
        className="text-foreground text-base cursor-pointer relative overflow-hidden whitespace-nowrap h-6"
      >
        <motion.div
          initial={{ y: 0 }}
          whileHover={{ y: '-50%' }}
          transition={{ duration: 0.3 }}
          className="flex flex-col"
        >
          <span>Accueil</span>
          <span className="text-kolizeo-orange">Accueil</span>
        </motion.div>
      </Link>
    </nav>
  )
}
