'use client'

import type { LoadingTextProps, LoadingTextSize } from 'types'
import { classSet } from 'utils'
import './loadingText.scss'

const DEFAULT_SIZE: LoadingTextSize = 'medium'

/**
 * Renders base text followed by CSS-animated loading dots (e.g., "Loading...").
 *
 * @remarks
 * - Applies size-specific CSS classes based on the `size` prop.
 * - Uses the `classSet` utility to conditionally apply CSS classes based on props.
 *
 * @param props - Props conforming to the {@link LoadingTextProps} interface.
 * @param props.text - The base text to display (e.g., "Loading").
 * @param props.size - Size of the loading text, can be 'small', 'medium', or 'large'. Defaults to 'medium'.
 * @param props.className - Additional CSS classes to apply to the loading text component.
 * @returns The LoadingText component JSX element (a `<p>` with animated dots).
 */
const LoadingText = ({ text, size = DEFAULT_SIZE, className }: LoadingTextProps) => {
  const combinedClasses = classSet('loading-text', `loading-text--${size}`, 'tilt-warp', 'text-shadow', className)

  return (
    <p className={combinedClasses}>
      {text}
      <span className='loading-text__dots'></span>
    </p>
  )
}

LoadingText.displayName = 'LoadingText'
export default LoadingText
