'use client'

import { anvil } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

import { wagmiAdapter, projectId, appkitConfig } from 'appkit.config'

/** @see {@link https://docs.reown.com/appkit/next/core/installation} for more information */

///////////////////////////////////////////////////
/// Variables                                   ///
///////////////////////////////////////////////////

const metadata = {
  name: 'Food Fight',
  description: 'A Web3 collectible card game',
  url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  icons: ['/icon.ico'],
}

// Variable unused. Named for clarity
const _modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId: projectId!,
  networks: [anvil],
  defaultNetwork: anvil,
  metadata: metadata,
  features: {
    analytics: true,
  },
})

//////////////////////////////////////////////////
/// Provider                            ///
//////////////////////////////////////////////////

function AppKitProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  // Get initial state for Wagmi SSR hydration from cookies
  const initialState = cookieToInitialState(appkitConfig as Config, cookies)

  return (
    <WagmiProvider config={appkitConfig as Config} initialState={initialState}>
      {children}
    </WagmiProvider>
  )
}

export default AppKitProvider
