export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="animate-pulse space-y-4 w-full max-w-md">
        <div className="h-8 bg-muted rounded w-3/4"></div>
        <div className="h-4 bg-muted rounded w-1/2"></div>
        <div className="space-y-2 mt-8">
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-16 bg-muted rounded"></div>
          <div className="h-16 bg-muted rounded"></div>
        </div>
      </div>
    </div>
  )
}
