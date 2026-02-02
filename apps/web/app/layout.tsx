import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kleinanzeigen Finder',
  description: 'Find your next deal on Kleinanzeigen',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
