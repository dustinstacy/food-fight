import Image from 'next/image'
import React from 'react'

import { useUserStore } from 'stores'
import type { AvatarProps, AvatarSize } from 'types'
import { classSet } from 'utils'
import './avatar.scss'

const DEFAULT_SIZE: AvatarSize = 'medium'

/**
 * Renders an avatar component displaying the current user's image.
 *
 * @remarks
 * - Displays the user's image (`state.user.image`) using the Next.js <Image> component.
 * - Shows a placeholder element while the image is loading.
 * - If an `onClick` handler is provided via props, accessibility attributes are automatically added to the wrapper `div`.
 * - Uses the `classSet` utility to conditionally apply CSS classes based on props.
 *
 * @param props - Props conforming to the {@link AvatarProps} interface.
 * @param props.size - Size of the avatar, can be 'small', 'medium', or 'large'. Defaults to 'medium'.
 * @param props.className - Additional CSS classes to apply to the avatar component.
 * @param props.onClick - Optional click handler for the avatar component.
 * @returns The Avatar component JSX element (a `<div>` containing an image or placeholder).
 */
const AvatarComponent = ({ size = DEFAULT_SIZE, className, onClick }: AvatarProps) => {
  const image = useUserStore((state) => state.user?.image)

  // Props to make the div interactive and accessible when onClick is provided
  const interactiveProps = onClick
    ? {
        onClick: onClick,
        role: 'button' as React.ButtonHTMLAttributes<HTMLDivElement>['role'], // Type assertion
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick() // Call the passed onClick handler
          }
        },
      }
    : {}

  const avatarClasses = classSet('avatar', `avatar--${size}`, 'black-border', className, onClick && 'avatar--clickable')

  return (
    <div className={avatarClasses} {...interactiveProps}>
      {!image ? (
        <div className='avatar__placeholder'></div>
      ) : (
        <Image
          className='avatar__image'
          src={image}
          alt='User avatar'
          fill={true}
          sizes='(max-width: 768px) 64px, 96px'
        />
      )}
    </div>
  )
}

const Avatar = React.memo(AvatarComponent)
Avatar.displayName = 'Avatar'
export default Avatar
