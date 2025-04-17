import type { Metadata } from 'next'
import { headers } from 'next/headers'

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

/**
 * Root Server Component layout for the application.
 *
 * @remarks
 * This layour is responsible for:
 * - Setting the HTML structure and language.
 * - Providing the AppKit and React Query providers.
 * - Suppressing hydration warnings.
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
  // Get cookies from headers
  const cookies = (await headers()).get('cookie')

  return (
    // Suppress hydration warning due to client-side theme class injection
    <html lang='en' suppressHydrationWarning>
      <body>
        <QueryProvider>
          <AppKitProvider cookies={cookies}>
            <ClientLayout>{children}</ClientLayout>
          </AppKitProvider>
        </QueryProvider>
      </body>
    </html>
  )
}
