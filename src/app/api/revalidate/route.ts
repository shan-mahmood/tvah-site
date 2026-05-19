import { revalidatePath, revalidateTag } from 'next/cache'
import { parseBody } from 'next-sanity/webhook'

type WebhookPayload = { _type?: string; slug?: { current?: string } }

export async function POST(req: Request) {
  try {
    const { body, isValidSignature } = await parseBody<WebhookPayload>(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )

    if (!isValidSignature) {
      return new Response('Invalid signature', { status: 401 })
    }
    if (!body?._type) {
      return new Response('Missing _type', { status: 400 })
    }

    if (body._type === 'homePage') {
      revalidatePath('/')
    } else if (body._type === 'siteSettings') {
      revalidatePath('/', 'layout')
    } else if (body._type === 'service' && body.slug?.current) {
      revalidatePath(`/${body.slug.current}`)
    } else {
      // Default: revalidate root
      revalidatePath('/')
    }

    return Response.json({ revalidated: true, type: body._type })
  } catch (err: unknown) {
    return new Response((err as Error).message, { status: 500 })
  }
}
