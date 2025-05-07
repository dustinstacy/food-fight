import { useAccount, useReadContract, useWriteContract } from 'wagmi'

import { getAbiAndAddress } from 'utils'

const { address } = useAccount()
const { writeContract } = useWriteContract()
const { contractAddress, contractAbi } = getAbiAndAddress('AssetFactory')

export const mintIGC = (amount: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mintIGC',
    args: [address, amount],
  })
}

export const mintAsset = (assetNumber: number, amount: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mintAsset',
    args: [address, assetNumber, amount, ''],
  })
}

export const mintBatch = (assetIds: number[], assetNumbers: number[]) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mintBatch',
    args: [address, assetIds, assetNumbers, ''],
  })
}

export const burnAsset = (assetNumber: number, amount: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'burnAsset',
    args: [address, assetNumber, amount],
  })
}

export const burnBatch = (assetIds: number[], assetNumbers: number[]) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'burnBatch',
    args: [address, assetIds, assetNumbers],
  })
}

export const getAsset = (assetNumber: number) => {
  const { data: asset } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAsset',
    args: [assetNumber],
  })
  return asset
}

export const getNewestAssetId = () => {
  const { data: newestAssetId } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getNewestAssetId',
  })
  return newestAssetId
}

export const getIGCTokenId = () => {
  const { data: igcTokenId } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getIGCTokenId',
  })
  return igcTokenId
}

export const balanceOf = (assetNumber: number) => {
  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'balanceOf',
    args: [address, assetNumber],
  })
  return balance
}
