import { NextResponse, type NextRequest } from 'next/server'
import { isValidSignature, SIGNATURE_HEADER_NAME } from '@sanity/webhook'
import nodemailer from 'nodemailer'

export async function POST(req: NextRequest) {
  try {
    const signature = req.headers.get(SIGNATURE_HEADER_NAME)
    const rawBody = await req.text()
    const secret = process.env.SANITY_WEBHOOK_SECRET

    if (!secret) {
      console.error('SANITY_WEBHOOK_SECRET not configured')
      return NextResponse.json({ error: 'Server not configured' }, { status: 500 })
    }
    if (!signature || !(await isValidSignature(rawBody, signature, secret))) {
      return NextResponse.json({ error: 'Invalid signature' }, { status: 401 })
    }

    const payload = JSON.parse(rawBody)

    if (payload._type !== 'feedback') {
      return NextResponse.json({ ok: true, skipped: 'not a feedback doc' })
    }

    const { name, email, petName, message, submittedAt } = payload

    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: process.env.GMAIL_SMTP_USER,
        pass: process.env.GMAIL_SMTP_APP_PASSWORD,
      },
    })

    const studioUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/studio/desk/feedback;${payload._id}`

    const html = `
      <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px;">
        <h2 style="color: #234e40;">New client feedback received</h2>
        <p style="color: #5a6c64;">Submitted ${submittedAt ? new Date(submittedAt).toLocaleString('en-US', { timeZone: 'America/Los_Angeles' }) : 'just now'}</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;">
        <p><strong>Name:</strong> ${name || '(not provided)'}</p>
        <p><strong>Email:</strong> ${email || '(not provided)'}</p>
        <p><strong>Pet:</strong> ${petName || '(not provided)'}</p>
        <p><strong>Message:</strong></p>
        <p style="background: #f3ede2; padding: 12px; border-radius: 6px; white-space: pre-wrap;">${message || ''}</p>
        <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 16px 0;">
        <p><a href="${studioUrl}" style="background: #234e40; color: #fff; padding: 10px 16px; text-decoration: none; border-radius: 6px; display: inline-block;">View in Sanity Studio</a></p>
      </div>
    `

    const text = [
      'New client feedback received',
      `Submitted: ${submittedAt}`,
      '',
      `Name: ${name || '(not provided)'}`,
      `Email: ${email || '(not provided)'}`,
      `Pet: ${petName || '(not provided)'}`,
      '',
      `Message:`,
      message || '',
      '',
      `View in Studio: ${studioUrl}`,
    ].join('\n')

    await transporter.sendMail({
      from: `"Tustin Village Animal Hospital" <${process.env.GMAIL_SMTP_USER}>`,
      to: process.env.FEEDBACK_NOTIFICATION_TO || 'manager@tustinvillageah.com',
      replyTo: email || undefined,
      subject: `New feedback from ${name || 'a client'}`,
      text,
      html,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Feedback notification error:', err)
    return NextResponse.json({ error: 'Failed to send notification' }, { status: 500 })
  }
}
