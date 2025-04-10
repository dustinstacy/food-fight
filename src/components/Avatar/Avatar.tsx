import Image from "next/image"
import { useUserStore } from "stores"
import { classSet } from "utils"
import "./avatar.scss"

/////////////////////////////////////////////
/// Types                                 ///
/////////////////////////////////////////////

/**
 * Defines the size variants for the Avatar component.
 */
type AvatarSize = "small" | "medium" | "large"

/**
 * @interface
 * Defines the props for the Avatar component.
 *
 * @property {AvatarSize} [size='medium'] - Specifies the size variant ('small', 'medium', 'large'). Defaults to 'medium'.
 * @property {string} [className] - Optional additional CSS class names for custom styling or layout.
 * @property {() => void} [onClick] - Optional callback function. If provided, makes the avatar clickable and adds accessibility attributes.
 */
interface AvatarProps {
    size?: AvatarSize
    className?: string
    onClick?: () => void
}

/////////////////////////////////////////////
/// Constants                             ///
/////////////////////////////////////////////

const DEFAULT_SIZE: AvatarSize = "medium"

/////////////////////////////////////////////
/// Component                             ///
/////////////////////////////////////////////

/**
 * @component
 * Renders an Avatar component, displaying the image of the currently logged-in user.
 * It supports different size variants and can be made interactive with click handlers,
 * automatically incorporating accessibility features when clickable.
 *
 * @notice Requires `useUserStore` to access user data.
 *
 * @remarks
 * - Rendering logic:
 *   - Displays the user's image if available.
 *   - If no image is available, a placeholder is shown.
 *
 * @param {AvatarProps} props - The props for the Avatar component.
 * @param {AvatarSize} [props.size='medium'] - Specifies the size variant ('small', 'medium', 'large').
 *                                           - Applies CSS class `avatar--${size}`. Defaults to 'medium'.
 * @param {string} [props.className] - Optional additional CSS class names to apply to the root element.
 * @param {() => void} [props.onClick] - Optional callback function. If provided:
 *                                     - The avatar becomes clickable.
 *                                     - Accessibility attributes (`role="button"`, `tabIndex="0"`) are added.
 *                                     - Keyboard interaction (Enter, Space) is enabled.
 *                                     - The CSS class `avatar--clickable` is applied for styling (e.g., cursor).
 *
 * @see {@link useUserStore} - Hook to access user data, including the image URL.
 */
const Avatar = ({ size = DEFAULT_SIZE, className, onClick }: AvatarProps) => {
    ////////////////////////////////////////////////
    /// Hooks                                    ///
    ////////////////////////////////////////////////

    const image = useUserStore((state) => state.user?.image)

    ////////////////////////////////////////////////
    /// Render                                   ///
    ////////////////////////////////////////////////

    // Props to make the div interactive and accessible when onClick is provided.
    const interactiveProps = onClick
        ? {
              onClick: onClick,
              role: "button",
              tabIndex: 0,
              onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
                  if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault()
                      onClick()
                  }
              },
          }
        : {}

    const avatarClasses = classSet(
        "avatar",
        `avatar--${size}`,
        "black-border", // Theme class
        className,
        onClick && "avatar--clickable"
    )

    return (
        <div className={avatarClasses} {...interactiveProps}>
            {!image ? (
                <div className='avatar__placeholder'></div>
            ) : (
                <Image
                    className='avatar__image'
                    src={image}
                    alt=''
                    layout='fill'
                    objectFit='cover'
                />
            )}
        </div>
    )
}

Avatar.displayName = "Avatar"
export default Avatar
