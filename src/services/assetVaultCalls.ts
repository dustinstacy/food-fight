import { useReadContract, useWriteContract } from 'wagmi'

import { getAbiAndAddress } from 'utils'

const { writeContract } = useWriteContract()
const { contractAddress, contractAbi } = getAbiAndAddress('AssetVault')

export const depositIGC = (amount: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'depositIGC',
    args: [amount],
  })
}

export const depositAssets = (assetIds: number[], assetAmounts: number[]) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'depositAssets',
    args: [assetIds, assetAmounts],
  })
}

export const withdrawIGC = (address: string, amount: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'withdrawIGC',
    args: [address, amount],
  })
}

export const withdrawAssets = (address: string, assetIds: number[], assetAmounts: number[]) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'withdrawAssets',
    args: [address, assetIds, assetAmounts],
  })
}

export const balanceOf = (address: string, tokenId: number) => {
  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'balanceOf',
    args: [address, tokenId],
  })

  return balance
}

export const getAssetFactoryAddress = () => {
  const { data: assetFactoryAddress } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAssetFactoryAddress',
  })

  return assetFactoryAddress
}

export const getIGCTokenId = () => {
  const { data: igcTokenId } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getIGCTokenId',
  })

  return igcTokenId
}

export const getIsApprovedCaller = (address: string) => {
  const { data: isApprovedCaller } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'isApprovedCaller',
    args: [address],
  })

  return isApprovedCaller
}
