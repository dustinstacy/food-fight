"use client"

import Link from "next/link"
import React, { forwardRef } from "react"
import { classSet } from "utils"
import "./button.scss"

interface ButtonProps {
    // Text to be displayed on the button.
    label: string
    // Optional class names for custom styling.
    className?: string
    // If provided, the button will be rendered as a Next.js <Link> targeting this URL.
    path?: string
    // Optional callback function executed on click. Prevented if 'disabled' is true.
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
    // If true, disables interaction, applies disabled styles, and sets appropriate attributes. Defaults to false.
    disabled?: boolean
    // Specifies the HTML 'type' attribute *only* when rendering as a <button> element. Defaults to 'button'.
    htmlButtonType?: "button" | "submit" | "reset"
}

/**
 * Renders a versatile Button component that can act as a standard HTML `<button>`,
 * a Next.js `<Link>` (routing anchor `<a>`), or a non-interactive `<span>` (for disabled links).
 * It handles disabled states, click events, accessibility attributes, and forwards refs.
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
 * @notice Rendering Logic:
 * - If `path` is provided and `disabled` is false, renders `<Link>`.
 * - If `path` is provided and `disabled` is true, renders `<span>` with `aria-disabled="true"`.
 * - Otherwise (no `path`), renders `<button>`.
 */
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ label, className, path, onClick, disabled, htmlButtonType = "button" }, ref) => {
        const commonClasses = classSet("button", "center", className, disabled ? "disabled" : "")

        // Wrapper to prevent onClick execution when disabled
        const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            if (disabled) {
                e.preventDefault()
                return
            }
            onClick?.(e)
        }

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
