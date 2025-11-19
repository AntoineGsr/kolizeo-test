export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-bold mb-4">Club non trouvé</h1>
      <p className="text-muted-foreground">
        Le club demandé n&apos;existe pas ou n&apos;a pas pu être trouvé.
      </p>
    </div>
  )
}
