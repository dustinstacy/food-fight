import { anvil } from '@reown/appkit/networks'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import { webSocket, type Chain } from 'viem'
import { cookieStorage, createStorage } from 'wagmi'

/** @see {@link https://docs.reown.com/appkit/next/core/installation} for more information */

//////////////////////////////////////////////////
/// Variables                                  ///
//////////////////////////////////////////////////

export const projectId = process.env.NEXT_PUBLIC_REOWN_PROJECT_ID

const productionChains: Chain[] = []
const developmentChains: Chain[] = [anvil]
export const networks: Chain[] = [
  ...productionChains,
  ...(process.env.NODE_ENV === 'development' ? developmentChains : []),
]

//////////////////////////////////////////////////
/// Adapter                                    ///
//////////////////////////////////////////////////

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  transports: {
    [anvil.id]: webSocket('ws://127.0.0.1:8545'),
  },
  projectId: projectId!,
  networks,
})

export const appkitConfig = wagmiAdapter.wagmiConfig
