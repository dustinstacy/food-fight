"use client"

import { classSet } from "utils"
import "./loadingText.scss"

/////////////////////////////////////////////
/// Types                                 ///
/////////////////////////////////////////////

/**
 * Defines the size variants for the LoadingText component.
 */
type LoadingTextSize = "small" | "medium" | "large"

/**
 * @interface
 * Defines the props for the LoadingText component.
 *
 * @property {string} text - The base text to display before the animated dots. (Required)
 * @property {LoadingTextSize} [size='medium'] - Specifies the size variant ('small', 'medium', 'large'). Defaults to 'medium'.
 * @property {string} [className] - Optional additional CSS class names for custom styling or layout.
 */
interface LoadingTextProps {
    text: string
    size?: LoadingTextSize
    className?: string
}

/////////////////////////////////////////////
/// Constants                             ///
/////////////////////////////////////////////

const DEFAULT_SIZE: LoadingTextSize = "medium"

//////////////////////////////////////////////
/// Component                              ///
//////////////////////////////////////////////

/**
 * @component
 * Renders base text followed by animated loading dots (., .., ...).
 *
 * @remarks
 * - The component uses a CSS class for the loading dots animation.
 *
 * @param {LoadingTextProps} props - Props for the LoadingText component.
 * @param {string} props.text - (Required) Base text to display.
 * @param {LoadingTextSize} [props.size='medium'] - Size variant ('small', 'medium', 'large'). Applies CSS class `loading-text--${size}`.
 * @param {string} [props.className] - Optional additional CSS classes to apply to the root element.
 *
 */
const LoadingText = ({ text, size = DEFAULT_SIZE, className }: LoadingTextProps) => {
    ////////////////////////////////////////////////
    /// Render                                   ///
    ////////////////////////////////////////////////

    const combinedClasses = classSet("loading-text", `loading-text--${size}`, className)

    return (
        <p className={combinedClasses}>
            {text}
            <span className='loading-text__dots'></span>
        </p>
    )
}

LoadingText.displayName = "LoadingText"
export default LoadingText
