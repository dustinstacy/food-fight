'use client'

import React, { useState } from 'react'
import { GoPencil } from 'react-icons/go'

import { Avatar, LoadingText } from 'components'
import { useCurrentUser } from 'features/user/hooks'

import { UserEdit } from './page-components'

import './account.scss'

/**
 * Renders the user account page.
 * Displays user information (Avatar, Username) in a view mode
 * and provides an option to switch to an editing mode using the `UserEdit` component.
 *
 * @notice Depends on `useUserStore` context being available.
 *
 * @remarks
 * - Rendering logic:
 *   - If `isEditing` is true, the `UserEdit` component is rendered.
 *   - If `user` is not available and `isEditing` is false, a loading text is displayed.
 *   - If `user` is available and `isEditing` is false, the user's avatar and username are displayed.
 *
 * @see {@link UserEdit} - The component used for editing profile details.
 * @see {@link Avatar} - Component used to display the user's avatar.
 * @see {@link useUserStore} - Hook/Store providing user data.
 */
const Account = () => {
  ////////////////////////////////////////////////
  /// Hooks                                    ///
  ////////////////////////////////////////////////

  const { data: user } = useCurrentUser()

  ////////////////////////////////////////////////
  /// State                                    ///
  ////////////////////////////////////////////////

  const [isEditing, setIsEditing] = useState(false)

  ////////////////////////////////////////////////
  /// Render                                   ///
  ////////////////////////////////////////////////

  return (
    <div className='page'>
      {isEditing && (
        <div className='account top-column secondary-gradient'>
          <UserEdit setIsEditing={setIsEditing} />
        </div>
      )}
      {!user && (
        <div className='account top-column'>
          <LoadingText text='Loading your account' size='large' />
        </div>
      )}
      {user && !isEditing && (
        <div className='account top-column secondary-gradient black-border'>
          <button type='button' className='edit' onClick={() => setIsEditing(true)} aria-label='Edit profile'>
            <GoPencil />
          </button>
          <div className='wrapper center-column'>
            <Avatar size='medium' />
            <div className='section center-column'>
              <span className='center'>
                Username:
                <p>{user.username}</p>
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Account
