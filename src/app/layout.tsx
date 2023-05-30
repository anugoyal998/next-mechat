import { HotToaster } from '@/components/ui/Toast'
import Providers from '../components/Providers'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <HotToaster position='bottom-right' />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
