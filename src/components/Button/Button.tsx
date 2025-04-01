"use client"

import { useRouter } from "next/navigation"
import React from "react"

import { classSet } from "utils"

import "./button.scss"

interface ButtonProps {
    label: string
    className?: string
    type?: string
    path?: string
    onClick?: (e: React.MouseEvent<HTMLButtonElement>, ...args: string[]) => void
    disabled?: boolean
    onKeyDown?: boolean
}

// Renders button component that can function as a navigation link or a custom onClick function.
// Set the prop 'type' to 'link' and provide a 'path' to navigate to a specific page.
// Set the prop 'onClick' to define a custom function to execute on button click.
const Button = ({ label, className, type, path, onClick, disabled }: ButtonProps) => {
    const router = useRouter()

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (type === "link") {
            router.push(`${path}`)
        } else {
            onClick?.(e)
        }
    }

    const buttonClasses = classSet(`${className}`, "button", "center", disabled ? "disabled" : "")

    return (
        <button className={buttonClasses} onClick={(e) => handleClick(e)}>
            <span>{label}</span>
        </button>
    )
}

export default Button
