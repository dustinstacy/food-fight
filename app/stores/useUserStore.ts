import { create } from "zustand"

import { User } from "types"
import { customFetch } from "utils"

interface UserState {
    user: User | null
    checkingForUser: boolean
    checkForUser: (address: string) => void
}

const useUserStore = create<UserState>((set) => ({
    user: null,
    checkingForUser: false,
    checkForUser: async (address: string) => {
        set({ checkingForUser: true })

        if (!address) {
            set({ user: null })
            return
        }

        try {
            const user = await fetchUserFromAccount(address)
            if (user) {
                set({ user, checkingForUser: false })
            } else {
                const newUser = await createNewUser(address)
                set({ user: newUser, checkingForUser: false })
            }
        } catch (error) {
            console.error("Error checking for user:", error)
            set({ user: null, checkingForUser: false })
        }
    },
}))

const fetchUserFromAccount = async (address: string) => {
    try {
        console.log("Fetching user")
        const res = await customFetch(`/api/users?address=${address}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })

        if (res) {
            return res
        }
        return null
    } catch (error) {
        console.error("Error fetching user:", error)
        return null
    }
}

const createNewUser = async (address: string) => {
    try {
        console.log("Creating new user")
        const res = await customFetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ address }),
        })

        if (res) {
            return res
        }
        return null
    } catch (error) {
        console.error("Error creating new user:", error)
        return null
    }
}

export default useUserStore
