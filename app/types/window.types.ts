import { Eip1193Provider } from "ethers"

declare global {
    interface Window {
        ethereum?: Eip1193Provider & {
            on: (event: "accountsChanged" | "chainChanged", handler: (accounts: string[]) => void) => void
            removeListener: (event: "accountsChanged" | "chainChanged", handler: (accounts: string[]) => void) => void
        }
    }
}

export {}
