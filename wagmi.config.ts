import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'
import { Abi } from 'viem'

import { deployedContracts } from 'contracts/data'

const contractsToGenerate = []

// Loop through the deployed contracts data and extract the necessary information
for (const [chainId, contracts] of Object.entries(deployedContracts)) {
  for (const [contractName, contract] of Object.entries(contracts)) {
    if (contract.abi && contract.address) {
      contractsToGenerate.push({
        name: contractName,
        abi: contract.abi as Abi,
        address: contract.address,
        chainId: Number(chainId),
      })
    }
  }
}

export default defineConfig({
  out: 'src/contracts/hooks/useGenerated.ts',
  contracts: contractsToGenerate,
  plugins: [react()],
})
