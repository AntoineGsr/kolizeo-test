import { NextResponse } from 'next/server'
import { fetchAllClubs } from '@/lib/unity/fetch-clubs'
import { log, error } from '@/lib/utils/logger'

export async function GET(request: Request) {
  try {
    log('Fetching clubs')
    const { searchParams } = new URL(request.url)
    const configKey = searchParams.get('configKey')

    if (configKey) {
      log(`API request for config: ${configKey}`)
    }

    const clubs = await fetchAllClubs(configKey || undefined)

    if (clubs.length === 0) {
      log('No clubs found')
      const errorResponse = NextResponse.json(
        { error: 'No clubs found' },
        { status: 404 }
      )

      return errorResponse
    }

    log(`Successfully retrieved ${clubs.length} clubs`)
    const response = NextResponse.json(clubs)

    return response
  } catch (err) {
    error('Error fetching clubs', err)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
