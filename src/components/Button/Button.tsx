"use client"

import Link from "next/link"
import React, { forwardRef } from "react"

import { classSet } from "utils"

import "./button.scss"

interface ButtonProps {
    label: string
    className?: string
    path?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void // Updated event type
    disabled?: boolean
    htmlButtonType?: "button" | "submit" | "reset"
}

const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
    ({ label, className, path, onClick, disabled, htmlButtonType = "button" }, ref) => {
        const commonClasses = classSet("button", "center", className, disabled ? "disabled" : "")

        const handleClick = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
            if (disabled) {
                e.preventDefault()
                return
            }
            onClick?.(e)
        }

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

        if (path && disabled) {
            return (
                <span className={commonClasses} aria-disabled='true'>
                    {label}
                </span>
            )
        }

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
