//////////////////////////////////////////
/// IGCBalanceDisplay Types            ///
//////////////////////////////////////////

/**
 * Defines the props accepted by the IGCBalanceDisplay component.
 */
export interface IGCBalanceDisplayProps {
  /** Optional class name for styling. */
  className?: string

  /** Optional Text to display while loading the balance. */
  loadingText?: string

  /** Optional Text to display when the wallet is not connected. */
  notConnectedText?: string

  /** Optional Text to display when the balance is zero. */
  zeroBalanceText?: string

  /** Optional prefix text to display before the balance. */
  prefixText?: string

  /** Optional click handler for the balance display. */
  onClick?: () => void
}
