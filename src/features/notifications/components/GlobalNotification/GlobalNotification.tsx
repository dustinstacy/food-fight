'use client'

import React from 'react'

import { CustomModal, useNotificationStore } from 'features/notifications'

/**
 * Renders a global notification modal.
 *
 * @remarks
 * This component is responsible for:
 * - Displaying a modal with the content provided by the notification store.
 * - Handling the opening and closing of the modal.
 * - Ensuring accessibility by providing appropriate ARIA labels and descriptions.
 */
const GlobalNotification = () => {
  const { isOpen, content, modalProps, closeModal } = useNotificationStore()

  if (!isOpen || !content) {
    return null
  }

  return (
    <CustomModal
      isOpen={isOpen}
      onClose={closeModal}
      ariaLabel={modalProps.ariaLabel}
      ariaDescription={modalProps?.ariaDescription}
    >
      {content}
    </CustomModal>
  )
}

export default GlobalNotification
