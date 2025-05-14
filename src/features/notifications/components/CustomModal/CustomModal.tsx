import { Modal } from '@mui/material'

import MessageBox from 'components/MessageBox/MessageBox'
import { CustomModalProps } from 'features/notifications'

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
      <MessageBox>{children}</MessageBox>
    </Modal>
  )
}

export default CustomModal
