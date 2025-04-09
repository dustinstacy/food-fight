// Combines multiple class names into a single string
// and filters out any falsy values.
export const classSet = (...classes: Array<string | undefined>) => {
    return classes.filter(Boolean).join(" ")
}
