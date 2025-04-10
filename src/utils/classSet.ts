/**
 * Combines multiple class names into a single string.
 * @param classes - Array of class names to be combined.
 * @returns A single string containing all the class names, separated by spaces.
 */
export const classSet = (...classes: Array<string | undefined>) => {
    return classes.filter(Boolean).join(" ")
}
