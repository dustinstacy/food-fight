import type { Metadata } from 'next'
import { Bangers, Lilita_One, Luckiest_Guy, Tilt_Warp } from 'next/font/google'
import { headers } from 'next/headers'

import AuthManager from 'features/auth/managers/AuthManager'
import AppKitProvider from 'providers/AppKitProvider'
import QueryProvider from 'providers/QueryProvider'

import ClientLayout from './client-layout'

import 'styles/breakpoints.scss'
import 'styles/containers.scss'
import 'styles/globals.scss'
import 'styles/modules.scss'
import 'styles/theme.scss'

export const metadata: Metadata = {
  title: 'Food Fight',
  icons: {
    icon: [{ url: '/icon.ico' }],
  },
  description: 'A Web3 collectible card game',
}

const bangers = Bangers({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bangers',
  display: 'swap',
})

const lilitaOne = Lilita_One({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-lilita-one',
  display: 'swap',
})

const luckiestGuy = Luckiest_Guy({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-luckiest-guy',
  display: 'swap',
})

const tiltWarp = Tilt_Warp({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-tilt-warp',
  display: 'swap',
})

/**
 * Root Server Component layout for the application.
 *
 * @remarks
 * This layout is responsible for:
 * - Setting the HTML structure and language.
 * - Including global styles and fonts.
 * - Providing the React Query and AppKit providers.
 * - Managing authentication state with the AuthManager component.
 * - Wrapping the application with the ClientLayout component.
 *
 * @param props - The component props object.
 * @param props.children - The nested page or layout content to render.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const cookies = (await headers()).get('cookie')

  return (
    <html
      lang='en'
      className={`${bangers.variable} ${lilitaOne.variable} ${luckiestGuy.variable} ${tiltWarp.variable} `}
      suppressHydrationWarning // Suppress hydration warning due to client-side theme class injection
    >
      <body>
        <QueryProvider>
          <AppKitProvider cookies={cookies}>
            <AuthManager />
            <ClientLayout>{children}</ClientLayout>
          </AppKitProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
