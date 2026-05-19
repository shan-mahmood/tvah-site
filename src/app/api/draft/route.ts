import { draftMode } from 'next/headers'
import { redirect } from 'next/navigation'
import { client } from '@/sanity/client'

const TOKEN = process.env.SANITY_REVALIDATE_SECRET

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const secret = searchParams.get('secret')
  const slug = searchParams.get('slug') || '/'

  if (TOKEN && secret !== TOKEN) {
    return new Response('Invalid token', { status: 401 })
  }

  const draft = await draftMode()
  draft.enable()
  redirect(slug)
}
