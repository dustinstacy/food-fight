// src/components/IGC/IGCBalanceDisplay.tsx
'use client'

import { useCallback } from 'react'
import { Log } from 'viem'
import { useAccount } from 'wagmi'

import { LoadingText } from 'components'
import { useReadAssetFactoryBalanceOf, useWatchAssetFactoryIgCmintedEvent } from 'hooks'

interface IGCBalanceDisplayProps {
  // You can add props for custom styling or text variants
  className?: string
  loadingText?: string
  notConnectedText?: string
  zeroBalanceText?: string // Text for when balance is 0 or undefined but user is connected
  prefixText?: string
}

const IGCBalanceDisplay = ({
  className,
  loadingText = 'Fetching',
  notConnectedText = '(Connect Wallet)',
  zeroBalanceText = '0',
  prefixText = 'IGC Balance:',
}: IGCBalanceDisplayProps) => {
  const { isConnected, address: account } = useAccount()

  const {
    data: igcBalance,
    isLoading: isBalanceLoading,
    refetch: refetchBalance,
    error: readError,
  } = useReadAssetFactoryBalanceOf({
    args: account ? [account, 0n] : undefined,
    query: {
      enabled: !!account,
    },
  })

  // Event handling logic
  const handleLogs = useCallback(
    (logs: Log[]) => {
      if (!account) return // Use wagmi's account

      let userInvolved = false
      for (const log of logs) {
        for (let i = 1; i < log.topics.length; i++) {
          const topic = log.topics[i]
          if (topic) {
            const potentialAddress = `0x${topic.slice(-40)}`.toLowerCase()
            if (potentialAddress === account.toLowerCase()) {
              userInvolved = true
              break
            }
          }
        }
        if (userInvolved) break
      }

      if (userInvolved) {
        console.log(`[Manager - IGC] User ${account} involved in IGCMinted. Requesting refetch.`)
        refetchBalance()
      }
    },
    [account, refetchBalance]
  )

  useWatchAssetFactoryIgCmintedEvent({
    onLogs: handleLogs,
    enabled: !!account,
  })

  const renderBalance = () => {
    if (isBalanceLoading) {
      return <LoadingText text={loadingText} />
    }
    if (readError) {
      console.error('[IGCBalanceDisplay] Error fetching balance:', readError)
      return <span>Error fetching balance</span>
    }
    if (!isConnected) {
      return <span>{notConnectedText}</span>
    }
    if (igcBalance === undefined || igcBalance === 0n) {
      return <span>{zeroBalanceText}</span>
    }
    if (igcBalance) {
      return <span>{igcBalance.toString()}</span>
    }

    return <span>{zeroBalanceText}</span>
  }

  return (
    <div className={className || ''}>
      {prefixText && <span style={{ marginRight: '0.5em' }}>{prefixText}</span>}
      {renderBalance()}
    </div>
  )
}

export default IGCBalanceDisplay
