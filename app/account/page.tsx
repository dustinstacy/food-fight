'use client'

import React, { useState } from 'react'
import { GoPencil } from 'react-icons/go'

import { Avatar, LoadingText } from 'components'
import { useCurrentUser } from 'features/user/hooks'

import { UserEdit } from './page-components'

import './account.scss'

/**
 * Renders the user account page.
 *
 * @remarks
 * This component is responsible for:
 * - Displaying the user's avatar and username.
 * - Allowing the user to edit their profile.
 * - Handling the loading state while fetching user data.
 */
const Account = () => {
  const { data: user } = useCurrentUser()

  const [isEditing, setIsEditing] = useState(false)

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
          <button
            type='button'
            className='edit'
            onClick={() => setIsEditing(true)}
            aria-label='Edit profile'
          >
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
