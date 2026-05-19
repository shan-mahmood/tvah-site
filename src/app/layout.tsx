import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.tustinvillageah.com'),
  title: {
    default: 'Veterinarian in Tustin | Tustin Village Animal Hospital',
    template: '%s | Tustin Village Animal Hospital',
  },
  description:
    'Walk-in veterinary care in Tustin. Wellness exams, surgery, dental, diagnostics, and emergency care for dogs and cats.',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    siteName: 'Tustin Village Animal Hospital',
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>{children}</body>
    </html>
  )
}
