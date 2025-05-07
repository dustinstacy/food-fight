import { useReadContract, useWriteContract } from 'wagmi'

import { getAbiAndAddress } from 'utils'

const { writeContract } = useWriteContract()
const { contractAddress, contractAbi } = getAbiAndAddress('AssetTrade')

export const createProposal = (receiver: string, assetAId: number, assetBId: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'createProposal',
    args: [receiver, assetAId, assetBId],
  })
}

export const cancelProposal = (proposalId: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'cancelProposal',
    args: [proposalId],
  })
}

export const acceptProposal = (proposalId: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'acceptProposal',
    args: [proposalId],
  })
}

export const rejectProposal = (proposalId: number) => {
  writeContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'rejectProposal',
    args: [proposalId],
  })
}

export const getProposal = (proposalId: number) => {
  return useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getProposal',
    args: [proposalId],
  })
}

export const getProposalCount = () => {
  return useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getProposalCount',
  })
}

export function getAssetVaultAddress() {
  return useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: 'getAssetVaultAddress',
  })
}
