'use client'

import { mainnet, sepolia } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { type ReactNode } from 'react'
import { cookieToInitialState, WagmiProvider, type Config } from 'wagmi'

import { wagmiAdapter, projectId, appkitConfig } from 'config'

/** @see {@link https://docs.reown.com/appkit/next/core/installation} for more information */

///////////////////////////////////////////////////
/// Constants                                   ///
///////////////////////////////////////////////////

const queryClient = new QueryClient()

const metadata = {
  name: 'Food Fight',
  description: 'A Web3 collectible card game',
  url: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000', // origin must match your domain & subdomain
  icons: ['/icon.ico'],
}

// Constant unused. Named for clarity
const _modal = createAppKit({
  adapters: [wagmiAdapter],
  projectId: projectId!,
  networks: [mainnet, ...(process.env.NODE_ENV === 'development' ? [sepolia] : [])],
  defaultNetwork: process.env.NODE_ENV === 'development' ? sepolia : mainnet,
  metadata: metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
  },
})

//////////////////////////////////////////////////
/// Provider                            ///
//////////////////////////////////////////////////

function AppKitProvider({ children, cookies }: { children: ReactNode; cookies: string | null }) {
  // Get initial state for Wagmi SSR hydration from cookies
  const initialState = cookieToInitialState(appkitConfig as Config, cookies) // Use config from adapter

  return (
    // Provide Wagmi state
    <WagmiProvider config={appkitConfig as Config} initialState={initialState}>
      {/* Provide React Query state */}
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}

export default AppKitProvider
