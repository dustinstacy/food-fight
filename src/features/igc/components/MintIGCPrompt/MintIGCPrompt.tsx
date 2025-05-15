import { FormEvent, useEffect, useState } from 'react'

import { Button, TextInput } from 'components'
import { useMintIGC } from 'features/igc'

/**
 * Renders the MintIGCPrompt component.
 *
 * @remarks
 * This component is responsible for:
 * - Handling the minting process of IGC tokens.
 * - Displaying the mint amount input field.
 * - Handling the loading state and error state.
 * - Validating the mint amount input.
 */
const MintIGCPrompt = () => {
  const { handleMintIgc, isMinting, isMintError, mintError } = useMintIGC()

  const [mintAmount, setMintAmount] = useState<string>('')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    if (isMintError && mintError) {
      setErrorMessage(mintError.message || 'Failed to update mintAmount.')
    } else {
      setErrorMessage(null)
    }
  }, [isMintError, mintError])

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    handleMintIgc(BigInt(mintAmount))
  }

  return (
    <div className='mintAmount-prompt'>
      <h2 className='mintAmount-prompt__title lilita-one center-column'>How Much To Mint?</h2>

      <form onSubmit={handleSubmit}>
        <TextInput
          label='Amount'
          name='mintAmount'
          value={mintAmount}
          onChange={(e) => setMintAmount(e.target.value)}
          error={errorMessage || undefined}
          loading={isMinting}
          autoComplete='off'
        />

        <div className='modal__form-actions center-column'>
          <Button
            label={isMinting ? 'Minting...' : 'Mint'}
            htmlButtonType='submit'
            disabled={isMinting}
            className='modal__button'
          />
        </div>
      </form>
    </div>
  )
}

export default MintIGCPrompt
