// src/components/IGC/IGCBalanceDisplay.tsx
'use client'

import { useCallback } from 'react'
import { Log } from 'viem'
import { useAccount } from 'wagmi'

import { LoadingText } from 'components'
import { IGCBalanceDisplayProps } from 'features/igc'
import { useReadAssetFactoryBalanceOf, useWatchAssetFactoryIgCmintedEvent } from 'hooks'

/**
 * Renders the IGC balance display component.
 *
 * @remarks
 * This component is responsible for:
 * - Fetching and displaying the IGC balance of the connected wallet.
 * - Handling the loading state and error state.
 * - Refetching the balance when the user is involved in an IGC minting event.
 *
 * @param props - The properties for the component.
 * @param props.className - Optional class name for styling.
 * @param props.loadingText - Text to display while loading the balance.
 * @param props.notConnectedText - Text to display when the wallet is not connected.
 * @param props.zeroBalanceText - Text to display when the balance is zero.
 * @param props.prefixText - Optional prefix text to display before the balance.
 * @param props.onClick - Optional click handler for the balance display.
 */
const IGCBalanceDisplay = ({
  className,
  loadingText = 'Fetching',
  notConnectedText = '(Connect Wallet)',
  zeroBalanceText = '0',
  prefixText = 'IGC Balance:',
  onClick,
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

  const handleLogs = useCallback(
    (logs: Log[]) => {
      if (!account) return

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

    const balanceString = igcBalance?.toString() ?? zeroBalanceText
    const isZero = igcBalance === undefined || igcBalance === 0n

    if (onClick) {
      return (
        <div
          onClick={onClick}
          role='button'
          tabIndex={0}
          style={{ cursor: 'pointer' }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault()
              onClick()
            }
          }}
          aria-label={
            isZero
              ? `Mint IGC, current balance: ${zeroBalanceText}`
              : `Mint IGC, current balance: ${balanceString}`
          }
        >
          {isZero ? zeroBalanceText : balanceString}
        </div>
      )
    }

    return <span>{isZero ? zeroBalanceText : balanceString}</span>
  }

  return (
    <div className={className || ''}>
      {prefixText && <span style={{ marginRight: '0.5em' }}>{prefixText}</span>}
      {renderBalance()}
    </div>
  )
}

export default IGCBalanceDisplay
