'use client'

import { useCallback } from 'react'
import { Log } from 'viem'
import { useAccount } from 'wagmi'

import { Button } from 'components'
import { useContract } from 'hooks'
import { getAbiAndAddress } from 'utils'

import './shop.scss'

const Shop = () => {
  const { address: account } = useAccount()
  const { contractAbi, contractAddress } = getAbiAndAddress('AssetFactory')

  const factory = useContract({
    address: contractAddress,
    abi: contractAbi,
  })

  const { data: igcBalance, isLoading: isBalanceLoading, refetch: refetchBalance } = factory.balanceOf([account, 0n])

  const handleLogs = useCallback(
    (eventName: string, logs: Log[]) => {
      for (const log of logs) {
        for (const topic of log.topics) {
          const parsedTopic = `0x${topic.toString().slice(-40)}`
          if (parsedTopic === account?.toLowerCase()) {
            console.log(`[Shop useContract Logs] User Involved in ${eventName}: ${account}`)
            refetchBalance()
          }
        }
      }
    },
    [account, refetchBalance]
  )

  if (factory && factory.watchIGCminted) {
    factory.watchIGCminted(handleLogs)
  }

  return (
    <div className='page center'>
      <div className='shop'>
        Current Balance:
        {isBalanceLoading && ' Loading...'}
        {igcBalance !== undefined && !isBalanceLoading && (igcBalance as bigint)?.toString()}
        {igcBalance === undefined && !isBalanceLoading && ' N/A'}
        <Button onClick={() => factory.mintIGC([account, 1000n])} label='Mint IGC' />
      </div>
    </div>
  )
}

export default Shop
