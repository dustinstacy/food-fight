import React from 'react'

import type { MessageBoxProps } from '../types'
import './message-box.scss'

/**
 * Renders a message box component.
 *
 * @remarks
 * This component is responsible for:
 * - Displaying a message box with the provided children elements.
 *
 * @param props - The props for the MessageBox component.
 * @param props.children - The children elements to be rendered inside the message box.
 */
const MessageBox = ({ children }: MessageBoxProps) => {
  return <div className='message-box'>{children}</div>
}

export default MessageBox
