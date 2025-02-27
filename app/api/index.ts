import { User } from "types"
import { customFetch } from "utils"

export const updateUser = async <T extends keyof User>(property: T, value: string) => {
    await customFetch(`/api/profiles/${property}`, {
        method: "PUT",
        body: JSON.stringify({
            [property]: value,
        }),
    })
}
