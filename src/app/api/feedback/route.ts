import { NextResponse, type NextRequest } from 'next/server'
import { createClient } from '@sanity/client'

const writeClient = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_WRITE_TOKEN!,
  useCdn: false,
})

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, petName, message } = body

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    await writeClient.create({
      _type: 'feedback',
      submittedAt: new Date().toISOString(),
      name: typeof name === 'string' ? name.trim() : '',
      email: typeof email === 'string' ? email.trim() : '',
      petName: typeof petName === 'string' ? petName.trim() : '',
      message: message.trim(),
      status: 'new',
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Feedback submission error:', err)
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 })
  }
}
