import { Abi } from 'viem'

////////////////////////////////////////////////
/// Contract Types                           ///
////////////////////////////////////////////////

/**
 * Defines the structure of the deployed contracts data.
 */
export type DeployedContracts = {
  /** The chain ID key. */
  [chainId: string]: {
    /** The contract name key. */
    [contractName: string]: {
      /** The contract address. */
      address: `0x${string}`
      /** The contract ABI. */
      abi: Abi
    }
  }
}
