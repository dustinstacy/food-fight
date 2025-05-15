import { create } from 'zustand'

import { NotificationState } from 'features/notifications'

/**
 * Zustand store hook for managing the application's notification state.
 *
 * @remarks
 * This store is responsible for:
 * - Managing the state of global notifications (modals).
 * - Opening and closing modals with specific content and properties.
 * - Updating the content of the currently open modal.
 * - Ensuring accessibility by providing appropriate ARIA labels and descriptions.
 */
const useNotificationStore = create<NotificationState>((set) => ({
  //////////////////////////////////////////////////
  /// Initial State                              ///
  //////////////////////////////////////////////////

  isOpen: false,
  content: null,
  modalProps: {
    ariaLabel: '',
    ariaDescription: '',
  },

  //////////////////////////////////////////////////
  /// Open Modal                                 ///
  //////////////////////////////////////////////////

  /**
   * Opens the modal with the specified content and properties.
   *
   * @param content - The content to be displayed inside the modal.
   * @param props - Additional properties for the modal, including ARIA labels and descriptions.
   */
  openModal: (content, props) =>
    set({
      isOpen: true,
      content,
      modalProps: {
        ...{ ariaLabel: '', ariaDescription: '' },
        ...props,
      },
    }),

  //////////////////////////////////////////////////
  /// Update Modal Content                       ///
  //////////////////////////////////////////////////

  /**
   * Updates the content of the currently open modal.
   *
   * @param newContent - The new content to be displayed inside the modal.
   */
  updateContent: (newContent) => {
    set((state) => {
      if (state.isOpen) {
        return { content: newContent }
      }
      return {}
    })
  },

  //////////////////////////////////////////////////
  /// Close Modal                                ///
  //////////////////////////////////////////////////

  /**
   * Closes the currently open modal and resets its content and properties.
   */
  closeModal: () =>
    set({
      isOpen: false,
      content: null,
      modalProps: { ariaLabel: '', ariaDescription: '' },
    }),
}))

export default useNotificationStore
