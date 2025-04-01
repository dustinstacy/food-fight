export interface HandleToggle {
    isOpen: boolean
    toggleIsOpen?: () => void
    setIsOpen?: (value: boolean) => void
}
