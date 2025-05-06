import { useAccount } from 'wagmi'

import { deployedContractsData } from 'data'
import { DeployedContracts } from 'types'

/**
 * Retrieves the ABI and address of a deployed contract based on the current chain ID.
 *
 * @param contractName - The name of the contract to retrieve.
 * @returns An object containing the contract address and ABI.
 */
export const getAbiAndAddress = (contractName: string) => {
  const { chainId } = useAccount()

  const deployedContracts = deployedContractsData as DeployedContracts
  const contract = deployedContracts[chainId as number]?.[contractName]
  const contractAddress = contract?.address
  const contractAbi = contract?.abi

  if (!contractAddress || !contractAbi) {
    throw new Error(`Contract not found for chainId: ${chainId}`)
  }
  return { contractAddress, contractAbi }
}
