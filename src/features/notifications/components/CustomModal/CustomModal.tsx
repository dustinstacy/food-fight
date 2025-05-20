import { Modal } from '@mui/material'

import { CustomModalProps } from 'features/notifications'

/**
 * Renders a custom modal component.
 *
 * @remarks
 * This component is responsible for:
 * - Displaying a modal with a message box.
 * - Accepting props for open state, close handler, aria labels, and children.
 *
 * @param props - Props conforming to the {@link CustomModalProps} interface.
 * @param props.isOpen - Boolean indicating if the modal is open.
 * @param props.onClose - Function to call when the modal is closed.
 * @param props.ariaLabel - Aria label for accessibility.
 * @param props.ariaDescription - Aria description for accessibility.
 * @param props.children - Content to display inside the modal.
 */
const CustomModal = ({
  isOpen,
  onClose,
  ariaLabel,
  ariaDescription,
  children,
}: CustomModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby={ariaLabel}
      aria-describedby={ariaDescription}
    >
      <div className='message-box'>{children}</div>
    </Modal>
  )
}

export default CustomModal
