import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  sepolia,
  optimism,
  optimismSepolia,
  polygon,
  polygonAmoy,
  polygonZkEvm,
  polygonZkEvmCardona,
  zksync,
  zksyncSepoliaTestnet,
} from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { type Chain } from 'viem'
import { cookieStorage, createStorage } from 'wagmi'

//////////////////////////////////////////////////
/// Constants                                  ///
//////////////////////////////////////////////////

// Import the environment variables
export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

// Define the production chains for the app
const productionChains: Chain[] = [mainnet, arbitrum, base, optimism, polygon, polygonZkEvm, zksync]

// Define the development chains for local testing
const developmentChains: Chain[] = [
  sepolia,
  arbitrumSepolia,
  baseSepolia,
  optimismSepolia,
  polygonAmoy,
  polygonZkEvmCardona,
  zksyncSepoliaTestnet,
]

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
  projectId: projectId!, // Use non-null assertion or handle missing ID case
  networks, // Pass the configured networks
})

export const appkitConfig = wagmiAdapter.wagmiConfig
