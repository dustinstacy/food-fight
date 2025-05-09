'use client'

import { useAccount } from 'wagmi'

import { Button } from 'components'
import { IGCBalanceDisplay, useMintIGC } from 'features/igc'

import './shop.scss'

const Shop = () => {
  const { address: account } = useAccount()
  const { handleMintIgc, isMinting, mintError } = useMintIGC()

  return (
    <div className='page center'>
      <div className='shop'>
        <h2>Shop</h2>
        <IGCBalanceDisplay />
        <Button
          onClick={() => handleMintIgc(10n)}
          label={isMinting ? 'Minting...' : 'Mint IGC'}
          disabled={isMinting || !account}
        />
        {mintError && <p style={{ color: 'red' }}>Error minting: {mintError.message}</p>}
      </div>
    </div>
  )
}

export default Shop
