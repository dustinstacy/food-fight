/**
 * Conditionally joins class names into a single string.
 *
 * @param classes - A list of arguments representing potential class names (strings)
 * or any falsy value (e.g., null, undefined, false, '') which will be filtered out.
 * @returns A single string containing the filtered class names separated by spaces.
 */
export const classSet = (...classes: Array<string | undefined>) => {
  return classes.filter(Boolean).join(' ')
}
