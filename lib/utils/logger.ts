/**
 * Utilitaire de log dev/prod aware
 */

export function log(message: string, ...args: unknown[]): void {
  if (process.env.NODE_ENV === 'development') {
    console.log(`[Kolizeo] ${message}`, ...args)
  } else {
    // En production, utiliser console.log standard (Vercel gère déjà les logs)
    console.log(`[INFO] ${message}`, ...args)
  }
}

export function error(message: string, ...args: unknown[]): void {
  if (process.env.NODE_ENV === 'development') {
    console.error(`[Kolizeo] ${message}`, ...args)
  } else {
    // En production, utiliser console.error standard (Vercel gère déjà les logs)
    console.error(`[ERROR] ${message}`, ...args)
  }
}
