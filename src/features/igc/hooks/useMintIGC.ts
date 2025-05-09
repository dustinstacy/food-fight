import { useAccount } from 'wagmi'

import { useWriteAssetFactoryMintIgc } from 'hooks'

function useMintIgc() {
  const { address: account } = useAccount()
  const { writeContractAsync: mintIgc, isPending: isMinting, error: mintError } = useWriteAssetFactoryMintIgc()

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

  return { handleMintIgc, isMinting, mintError }
}

export default useMintIgc
