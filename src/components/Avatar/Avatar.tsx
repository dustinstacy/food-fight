import Image from 'next/image'
import React from 'react'

import { classSet } from 'utils'

import type { AvatarProps, AvatarSize } from '../types'
import './avatar.scss'

const DEFAULT_SIZE: AvatarSize = 'medium'

/**
 * Renders a user avatar component.
 *
 * @remarks
 * This component is responsible for:
 * - Displaying the user's avatar image.
 * - Providing a placeholder if the image is not available.
 * - Making the avatar clickable if an `onClick` handler is provided.
 * - Applying different styles based on the size of the avatar.
 *
 * @param props - Props conforming to the {@link AvatarProps} interface.
 * @param props.user - The user object containing the avatar image URL.
 * @param props.size - Size of the avatar. Defaults to 'medium'.
 * @param props.className - Additional CSS classes to apply to the avatar component.
 * @param props.onClick - Optional click handler for the avatar component.
 * @param props.isLoading - Flag indicating if the avatar is in a loading state.
 */
const AvatarComponent = ({
  user,
  size = DEFAULT_SIZE,
  className,
  onClick,
  isLoading,
}: AvatarProps) => {
  const image = user?.image

  // Props to make the div interactive and accessible when onClick is provided
  const interactiveProps = onClick
    ? {
        onClick: onClick,
        role: 'button' as React.ButtonHTMLAttributes<HTMLDivElement>['role'],
        tabIndex: 0,
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        },
      }
    : {}

  const avatarClasses = classSet(
    'avatar',
    `avatar-${size}`,
    'black-border',
    className,
    onClick && 'avatar-clickable'
  )

  return (
    <div className={avatarClasses} {...interactiveProps}>
      {!image || isLoading ? (
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
