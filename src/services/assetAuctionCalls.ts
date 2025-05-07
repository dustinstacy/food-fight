import { useReadContract, useWriteContract } from 'wagmi'

import { getAbiAndAddress } from 'utils'

const { writeContract } = useWriteContract()
const { contractAddress, contractAbi } = getAbiAndAddress('AssetAuction')

export const createAuction = (assetId: number, reservePrice: number, blocksDuration: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'createAuction',
    args: [assetId, reservePrice, blocksDuration],
  })
}

export const cancelAuction = (auctionId: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'cancelAuction',
    args: [auctionId],
  })
}

export const placeBid = (auctionId: number, amount: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'placeBid',
    args: [auctionId, amount],
  })
}

export const completeAuction = (auctionId: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'completeAuction',
    args: [auctionId],
  })
}

export const getAuction = (auctionId: number) => {
  const { data: auction } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAuction',
    args: [auctionId],
  })
  return auction
}

export const getAuctionCount = () => {
  const { data: auctionCount } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAuctionCount',
  })
  return auctionCount
}

export const getAssetVaultAddress = () => {
  const { data: assetVaultAddress } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAssetVaultAddress',
  })
  return assetVaultAddress
}
