import type { Metadata } from 'next'
import { headers } from 'next/headers'

import AppKitProvider from 'providers/AppKitProvider'

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

/**
 * Root Server Component layout for the application.
 *
 * Sets up the main HTML structure (`<html>`, `<body>`), defines global metadata,
 * imports global styles, and wraps the application content (`children`) in the
 * necessary {@link AppKitProvider}.
 *
 * @param props - The component props object.
 * @param props.children - The nested page or layout content to render.
 * @returns The root HTML structure wrapping the application.
 */
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // Get cookies from headers
  const cookies = (await headers()).get('cookie')

  return (
    // Suppress hydration warning due to client-side theme class injection
    <html lang='en' suppressHydrationWarning>
      <body>
        <AppKitProvider cookies={cookies}>
          <ClientLayout>{children}</ClientLayout>
        </AppKitProvider>
      </body>
    </html>
  )
}
