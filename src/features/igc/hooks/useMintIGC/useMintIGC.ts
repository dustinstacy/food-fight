import { useAccount } from 'wagmi'

import { useWriteAssetFactoryMintIgc } from 'hooks'

/**
 * Custom hook to handle the minting of IGC (In-Game Currency).
 *
 * @returns
 * - `handleMintIgc`: Function to mint IGC tokens.
 * - `isMinting`: Boolean indicating if the minting process is in progress.
 * - `isMintError`: Boolean indicating if there was an error during minting.
 * - `mintError`: Error object containing details about the minting error.
 */
function useMintIgc() {
  const { address: account } = useAccount()
  const {
    writeContractAsync: mintIgc,
    isPending: isMinting,
    isError: isMintError,
    error: mintError,
  } = useWriteAssetFactoryMintIgc()

  const handleMintIgc = async (amount: bigint) => {
    if (!account) {
      console.error('[useMintIgc] No account found')
      return
    }

    try {
      await mintIgc({
        args: [account, amount],
      })
    } catch (error) {
      console.error('[useMintIgc] Error minting IGC:', error)
      alert(`Minting IGC failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    }
  }

  return { handleMintIgc, isMinting, isMintError, mintError }
}

export default useMintIgc
