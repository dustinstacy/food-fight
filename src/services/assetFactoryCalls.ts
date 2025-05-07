import { useAccount, useReadContract, useWriteContract } from 'wagmi'

import { getAbiAndAddress } from 'utils'

const { address: account } = useAccount()
const { writeContract } = useWriteContract()
const { contractAddress, contractAbi } = getAbiAndAddress('AssetFactory')

export const mintIGC = (amount: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mintIGC',
    args: [account, amount],
  })
}

export const mintAsset = (id: number, amount: number, data: string) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mintAsset',
    args: [account, id, amount, data],
  })
}

export const mintBatch = (ids: number[], amounts: number[], data: string) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'mintBatch',
    args: [account, ids, amounts, data],
  })
}

export const burnAsset = (id: number, amount: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'burnAsset',
    args: [account, id, amount],
  })
}

export const burnBatch = (ids: number[], amounts: number[]) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'burnBatch',
    args: [account, ids, amounts],
  })
}

export const getAsset = (id: number) => {
  const { data: asset } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAsset',
    args: [id],
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

export const balanceOf = (tokenId: number) => {
  const { data: balance } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'balanceOf',
    args: [account, tokenId],
  })
  return balance
}
