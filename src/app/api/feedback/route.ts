import { NextResponse, type NextRequest } from 'next/server'

const RESEND_ENDPOINT = 'https://api.resend.com/emails'

function escapeHtml(s: string) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

export async function POST(req: NextRequest) {
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return new NextResponse('Invalid JSON', { status: 400 })
  }

  const name = String(body.name || '').trim().slice(0, 200)
  const email = String(body.email || '').trim().slice(0, 200)
  const petName = String(body.petName || '').trim().slice(0, 200)
  const message = String(body.message || '').trim().slice(0, 5000)

  if (!message) {
    return new NextResponse('Message is required', { status: 400 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.FEEDBACK_TO_EMAIL || 'manager@tustinvillageah.com'
  const from = process.env.FEEDBACK_FROM_EMAIL || 'feedback@tustinvillageah.com'

  if (!apiKey) {
    console.error('[feedback] RESEND_API_KEY is not set — cannot send email')
    return new NextResponse('Email is not configured on the server', { status: 500 })
  }

  const subject = `Client survey feedback${name ? ` from ${name}` : ''}`
  const lines = [
    name && `Name: ${name}`,
    email && `Email: ${email}`,
    petName && `Pet: ${petName}`,
    '',
    'Message:',
    message,
  ].filter(Boolean)
  const text = lines.join('\n')
  const html = `
    <h2 style="font-family:system-ui,sans-serif">Client survey feedback</h2>
    ${name ? `<p><strong>Name:</strong> ${escapeHtml(name)}</p>` : ''}
    ${email ? `<p><strong>Email:</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>` : ''}
    ${petName ? `<p><strong>Pet:</strong> ${escapeHtml(petName)}</p>` : ''}
    <p style="white-space:pre-wrap;font-family:system-ui,sans-serif">${escapeHtml(message)}</p>
    <hr style="border:none;border-top:1px solid #eee;margin:24px 0" />
    <p style="color:#888;font-size:12px;font-family:system-ui,sans-serif">
      Sent from tustinvillageah.com/client-survey
    </p>
  `

  const res = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to,
      subject,
      text,
      html,
      ...(email && { reply_to: email }),
    }),
  })

  if (!res.ok) {
    const detail = await res.text().catch(() => '')
    console.error('[feedback] Resend API error', res.status, detail)
    return new NextResponse('Could not send feedback right now. Please try again later.', {
      status: 502,
    })
  }

  return NextResponse.json({ ok: true })
}
