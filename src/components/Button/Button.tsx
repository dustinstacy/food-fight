'use client'

import Link from 'next/link'
import React, { forwardRef } from 'react'

import type { ButtonProps } from 'types'
import { classSet } from 'utils'
import './button.scss'

const DEFAULT_HTML_BUTTON_TYPE = 'button'

/**
 * Renders a versatile button that can act as a link or a standard button.
 *
 * @remarks
 * - Renders as `<button>`, `next/link`, or `<span>` based on `path` and `disabled` props.
 * - Click handlers are automatically prevented when `disabled`.
 * - Uses the `classSet` utility to conditionally apply CSS classes based on props.
 *
 * @param props - Props conforming to the {@link ButtonProps} interface.
 * @param props.label - Text label for the button.
 * @param props.className - Additional CSS classes to apply to the button.
 * @param props.path - Optional path for navigation; if provided, renders as a link.
 * @param props.onClick - Optional click handler for the button.
 * @param props.disabled - Boolean indicating whether the button is disabled.
 * @param props.htmlButtonType - HTML button type (e.g., 'button', 'submit', 'reset'); defaults to 'button'.
 * @param ref - Forwarded ref applied to the underlying interactive element (`<button>` or `<a>`).
 * @returns The Button component JSX element (a `<button>`, `<a>`, or `<span>`).
 */
const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ label, className, path, onClick, disabled, htmlButtonType = DEFAULT_HTML_BUTTON_TYPE }, ref) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
      if (disabled) {
        e.preventDefault()
        return
      }
      onClick?.(e)
    }

    const commonClasses = classSet('button', 'center', className, disabled ? 'disabled' : '')

    // Render as a <Link> if path is provided and not disabled
    if (path && !disabled) {
      return (
        <Link
          href={path}
          className={commonClasses}
          onClick={handleClick}
          ref={ref as React.ForwardedRef<HTMLAnchorElement>}
          aria-disabled={disabled} // Note: aria-disabled="false" is valid, though maybe redundant
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

Button.displayName = 'Button'
export default Button
