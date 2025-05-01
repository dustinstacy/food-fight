'use client'

import type { LoadingTextProps, LoadingTextSize } from 'components/types'
import { classSet } from 'utils'
import './loadingText.scss'

const DEFAULT_SIZE: LoadingTextSize = 'medium'

/**
 * Renders base text followed by CSS-animated loading dots.
 *
 * @remarks
 * This component is responsible for:
 * - Displaying a base text with animated dots to indicate loading.
 * - Applying different styles based on the size of the loading text.
 * - Accepting additional CSS classes for customization.
 *
 * @param props - Props conforming to the {@link LoadingTextProps} interface.
 * @param props.text - The base text to display.
 * @param props.size - Size of the loading text. Defaults to 'medium'.
 * @param props.className - Additional CSS classes to apply to the loading text component.
 */
const LoadingText = ({ text, size = DEFAULT_SIZE, className }: LoadingTextProps) => {
  const combinedClasses = classSet('loading-text', `loading-text-${size}`, 'tilt-warp', className)

  return (
    <p className={combinedClasses}>
      {text}
      <span className='loading-text__dots'></span>
    </p>
  )
}

LoadingText.displayName = 'LoadingText'
export default LoadingText
