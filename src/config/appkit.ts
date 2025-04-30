import { mainnet, sepolia, anvil } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { http, type Chain } from 'viem'
import { cookieStorage, createStorage } from 'wagmi'

/** @see {@link https://docs.reown.com/appkit/next/core/installation} for more information */

//////////////////////////////////////////////////
/// Constants                                  ///
//////////////////////////////////////////////////

// Import the environment variables
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

// Define the production chains for the app
const productionChains: Chain[] = [mainnet]

// Define the development chains for local testing
const developmentChains: Chain[] = [sepolia, anvil]

// Define the networks/chains the app will support
export const networks: Chain[] = [
  ...productionChains,
  ...(process.env.NODE_ENV === 'development' ? developmentChains : []),
]

//////////////////////////////////////////////////
/// Wagmi Adapter                             ///
//////////////////////////////////////////////////

export const wagmiAdapter = new WagmiAdapter({
  // Configure storage using Wagmi's cookieStorage for SSR
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true, // Enable Server-Side Rendering support
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [anvil.id]: http(),
  },
  projectId: projectId!, // Use non-null assertion or handle missing ID case
  networks, // Pass the configured networks
})

export const appkitConfig = wagmiAdapter.wagmiConfig
