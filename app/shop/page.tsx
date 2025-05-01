'use client'
import { useMemo } from 'react'
import { Abi } from 'viem'
import { useAccount, useReadContract, useWriteContract } from 'wagmi'

import { Button } from 'components'

import deployedContractsData from '../../../food-fight-contracts/deployments/deployedContracts'

import './shop.scss'

type DeployedContractsType = {
  [chainId: string]: {
    [contractName: string]: {
      address: `0x${string}`
      abi: Abi
    }
  }
}

const deployedContracts = deployedContractsData as DeployedContractsType

export default function Shop() {
  const { address, isConnected, chainId } = useAccount()
  const { writeContract } = useWriteContract()

  const IGC_TOKEN_ID = BigInt(0)

  const contract = deployedContracts[chainId as number]?.['AssetFactory']
  const contractAddress = contract?.address
  const contractAbi = contract?.abi

  const numberOfAssets = Array.from({ length: 3 }, (_, i) => i + 1)

  const { data: igcBalanceBigInt } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'balanceOf',
    args: address ? [address, IGC_TOKEN_ID] : undefined,
    query: {
      enabled: isConnected && !!address && !!contractAddress && !!contractAbi,
    },
  })

  const formattedBalance = useMemo(() => {
    if (typeof igcBalanceBigInt === 'bigint') {
      return igcBalanceBigInt.toString()
    }
    return '0'
  }, [igcBalanceBigInt])

  function purchaseIGC(amount: number) {
    if (!contractAddress || !contractAbi) {
      console.error('Contract info not found for chain ID:', chainId)
      alert(`Contract not deployed or configured for chain ${chainId}`)
      return
    }
    console.log(`Purchase IGC clicked. Target: ${contractAddress}`)

    const igcAmountToMint = BigInt(amount)

    // --- Call the mintIGC function ---
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'mintIGC',
      args: [address, igcAmountToMint],
    })
  }

  function mintAsset(assetNumber: number) {
    if (!contractAddress || !contractAbi) {
      console.error('Contract info not found for chain ID:', chainId)
      alert(`Contract not deployed or configured for chain ${chainId}`)
      return
    }
    console.log(`Mint Asset ${assetNumber} clicked. Target: ${contractAddress}`)

    // --- Call the mintAsset function ---
    writeContract({
      address: contractAddress,
      abi: contractAbi,
      functionName: 'mintAsset',
      args: [address, assetNumber, 1, ''],
    })
  }

  return (
    <div className='shop-wrapper page center'>
      <div className='shop'>
        Your IGC Balance: {formattedBalance}
        <Button onClick={() => purchaseIGC(10000)} className='shop-button' label='Purchase IGC' />
        {numberOfAssets.map((assetNumber) => (
          <Button
            key={assetNumber}
            onClick={() => mintAsset(assetNumber)}
            className='shop-button'
            label={`Mint Asset ${assetNumber}`}
          />
        ))}
      </div>
    </div>
  )
}
