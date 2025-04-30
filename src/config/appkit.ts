import { mainnet, sepolia, anvil } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { http, type Chain } from 'viem'
import { cookieStorage, createStorage } from 'wagmi'

/** @see {@link https://docs.reown.com/appkit/next/core/installation} for more information */

//////////////////////////////////////////////////
/// Constants                                  ///
//////////////////////////////////////////////////

export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

const productionChains: Chain[] = [mainnet]
const developmentChains: Chain[] = [sepolia, anvil]
export const networks: Chain[] = [
  ...productionChains,
  ...(process.env.NODE_ENV === 'development' ? developmentChains : []),
]

//////////////////////////////////////////////////
/// Wagmi Adapter                             ///
//////////////////////////////////////////////////

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [anvil.id]: http(),
  },
  projectId: projectId!,
  networks,
})

export const appkitConfig = wagmiAdapter.wagmiConfig
