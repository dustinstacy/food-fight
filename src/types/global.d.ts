/**
 * Augments the global Window interface to include type definitions for the
 * EIP-1193 compatible Ethereum provider (like MetaMask) injected by browser wallets.
 * This provides type safety when interacting with `window.ethereum`.
 * It uses the base `Eip1193Provider` type from ethers.js and adds specific
 * definitions for commonly used event listeners (`accountsChanged`, `chainChanged`).
 */

import { Eip1193Provider } from 'ethers'

declare global {
  interface Window {
    ethereum?: Eip1193Provider & {
      on: (event: 'accountsChanged' | 'chainChanged', handler: (accounts: string[]) => void) => void
      removeListener: (event: 'accountsChanged' | 'chainChanged', handler: (accounts: string[]) => void) => void
    }
  }
}

export {}
