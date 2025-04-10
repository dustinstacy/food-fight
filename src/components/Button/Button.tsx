"use client"

import Link from "next/link"
import React, { forwardRef } from "react"
import { classSet } from "utils"
import "./button.scss"

/////////////////////////////////////////////
/// Types                                 ///
/////////////////////////////////////////////

/**
 * @interface
 * Defines the props for the Button component.
 *
 * @property {string} label - The text displayed on the button. (Required)
 * @property {string} [className] - Optional additional CSS class names for custom styling.
 * @property {string} [path] - If provided, the button will be rendered as a Next.js <Link> targeting this URL.
 * @property {(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void} [onClick] - Callback function executed on click. Prevented if 'disabled' is true.
 * @property {boolean} [disabled=false] - If true, disables interaction, applies disabled styles, and sets appropriate attributes. Defaults to false.
 * @property {'button' | 'submit' | 'reset'} [htmlButtonType='button'] - Specifies the HTML 'type' attribute only when rendering as a <button> element. Defaults to 'button'.
 */
interface ButtonProps {
    label: string
    className?: string
    path?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
    disabled?: boolean
    htmlButtonType?: "button" | "submit" | "reset"
}

/////////////////////////////////////////////
/// Constants                             ///
/////////////////////////////////////////////

const DEFAULT_HTML_BUTTON_TYPE = "button"

/////////////////////////////////////////////
/// Component                             ///
/////////////////////////////////////////////

/**
 * @component
 * Renders a versatile Button component that can act as a standard HTML `<button>`,
 * a Next.js `<Link>` (routing anchor `<a>`), or a non-interactive `<span>` (for disabled links).
 * It handles disabled states, click events, accessibility attributes, and forwards refs.
 *
 * @remarks
 * - Rendering logic:
 *   - If `path` is provided and `disabled` is false, it renders a Next.js `<Link>`.
 *   - If `path` is provided and `disabled` is true, it renders a `<span>`.
 *   - If `path` is omitted, it defaults to rendering a `<button>`.
 *
 * @param {ButtonProps} props - The props for the Button component.
 * @param {string} props.label - (Required) The text content displayed within the button.
 * @param {string} [props.className] - Optional CSS classes for custom styling. Applied to the root element rendered.
 * @param {string} [props.path] - If provided, renders a Next.js `<Link>`. If omitted, renders a `<button>`.
 * @param {(e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void} [props.onClick] - Callback for click events. Not triggered if `disabled`.
 * @param {boolean} [props.disabled=false] - Disables the button/link. Applies `.disabled` class and relevant attributes (`disabled`, `aria-disabled`). See rendering logic notice.
 * @param {'button' | 'submit' | 'reset'} [props.htmlButtonType='button'] - Sets the `type` attribute only when rendering as a `<button>`.
 * @param {React.ForwardedRef<HTMLButtonElement | HTMLAnchorElement>} ref - Forwarded ref to the underlying interactive element (`<button>` or `<a>` rendered by `Link`).
 *
 */
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    (
        { label, className, path, onClick, disabled, htmlButtonType = DEFAULT_HTML_BUTTON_TYPE },
        ref
    ) => {
        ////////////////////////////////////////////////
        /// Handlers                                 ///
        ////////////////////////////////////////////////

        const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            if (disabled) {
                e.preventDefault()
                return
            }
            onClick?.(e)
        }

        ////////////////////////////////////////////////
        /// Render                                   ///
        ////////////////////////////////////////////////

        const commonClasses = classSet(
            "button",
            "center", // Module class
            className,
            disabled ? "disabled" : ""
        )

        // Render as a <Link> if path is provided and not disabled
        if (path && !disabled) {
            return (
                <Link
                    href={path}
                    className={commonClasses}
                    onClick={handleClick}
                    ref={ref as React.ForwardedRef<HTMLAnchorElement>}
                    aria-disabled={disabled}
                >
                    {label}
                </Link>
            )
        }

        // Render as a span if path is provided AND disabled
        if (path && disabled) {
            return (
                <span className={commonClasses} aria-disabled='true'>
                    {label}
                </span>
            )
        }

        // Default render as a <button>
        return (
            <button
                className={commonClasses}
                onClick={handleClick}
                disabled={disabled}
                type={htmlButtonType}
                ref={ref as React.ForwardedRef<HTMLButtonElement>}
            >
                {label}
            </button>
        )
    }
)

Button.displayName = "Button"
export default Button
