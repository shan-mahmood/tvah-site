import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Suspense } from 'react'
import { CallRailRouteHandler } from '@/components/CallRailRouteHandler'
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
    images: [
      {
        url: '/team-photo.jpg',
        width: 1200,
        height: 630,
        alt: 'The team at Tustin Village Animal Hospital',
      },
    ],
  },
  twitter: { card: 'summary_large_image' },
  robots: { index: true, follow: true },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        {/* Google Tag Manager — head equivalent (loads after interactive) */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-MQCLK47V');`}
        </Script>
        {/* Google Tag Manager — noscript fallback (must be first child of body) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MQCLK47V"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {/* CallRail dynamic number insertion */}
        <Script
          id="callrail-swap"
          strategy="afterInteractive"
          src="https://cdn.callrail.com/companies/280163618/35d659ea7d76a7fb3738/12/swap.js"
        />
        <Suspense fallback={null}>
          <CallRailRouteHandler />
        </Suspense>
        {children}
      </body>
    </html>
  )
}
