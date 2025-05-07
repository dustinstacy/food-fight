import { useReadContract, useWriteContract } from 'wagmi'

import { getAbiAndAddress } from 'utils'

const { writeContract } = useWriteContract()
const { contractAddress, contractAbi } = getAbiAndAddress('AssetAuction')

export const createRental = (assetId: number, price: number, blocksDuration: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'createRental',
    args: [assetId, price, blocksDuration],
  })
}

export const unlistRental = (rentalAssetId: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'unlistRental',
    args: [rentalAssetId],
  })
}

export const updateRental = (rentalAssetId: number, price: number, blocksDuration: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'updateRental',
    args: [rentalAssetId, price, blocksDuration],
  })
}

export const rentAsset = (rentalAssetId: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'rentAsset',
    args: [rentalAssetId],
  })
}

export const checkRentalStatus = (rentalAssetId: number) => {
  const { data: rentalStatus } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'checkRentalStatus',
    args: [rentalAssetId],
  })
  return rentalStatus
}

export const getRentalAsset = (rentalAssetId: number) => {
  const { data: rentalAsset } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getRentalAsset',
    args: [rentalAssetId],
  })
  return rentalAsset
}

export const getRentedAssetBalance = (address: string, rentalAssetId: number) => {
  const { data: rentedAssetBalance } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getRentedAssetBalance',
    args: [address, rentalAssetId],
  })
  return rentedAssetBalance
}

export const getRentalAssetCount = () => {
  const { data: rentalAssetCount } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getRentalAssetCount',
  })
  return rentalAssetCount
}

export const getAssetVaultAddress = () => {
  const { data: assetVaultAddress } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAssetVaultAddress',
  })
  return assetVaultAddress
}
