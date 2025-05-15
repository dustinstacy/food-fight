'use client'

import { FormEvent, useState } from 'react'

import { nftAssetStructure } from 'src/devtools/data'
import { FormField, NFTUploaderProps } from 'src/devtools/types'
import { Button } from 'components'
import { useWriteAssetFactorySetAssetData } from 'hooks'
import { uploadImageToPinata, uploadMetadataToPinata } from 'devtools/api/nft'
import { constructMetadataJson } from 'devtools/utils'
import { useNotificationStore } from 'features/notifications'
import { LoadingText } from 'components'

import './nft-uploader.scss'

/**
 * Initializes the form data based on the structure provided.
 */
const initializeFormData = (structure: FormField[]) => {
  const initialData: { [key: string]: string | File | null } = {}
  structure.forEach((field) => {
    if (field.type === 'file') {
      initialData[field.id] = null
    } else {
      initialData[field.id] = ''
    }
  })
  return initialData
}

/**
 * Renders the NFT Uploader component.
 *
 * @remarks
 * This component is responsible for:
 * - Creating a form to upload NFT metadata and image.
 * - Validating form inputs.
 * - Handling file uploads to Pinata.
 * - Setting asset data on-chain.
 */
const NFTUploader = ({ tokenId, setIsOpen }: NFTUploaderProps) => {
  /////////////////////////////////////////////////////////
  ///                    STATE                          ///
  /////////////////////////////////////////////////////////

  const [isProcessing, setIsProcessing] = useState<boolean>(false)
  const [assetPrice, setAssetPrice] = useState<string>('')
  const [formData, setFormData] = useState<{ [key: string]: string | File | null }>(
    initializeFormData(nftAssetStructure)
  )

  /////////////////////////////////////////////////////////
  ///                    WAGMI HOOKS                    ///
  /////////////////////////////////////////////////////////

  const {
    writeContractAsync: setAssetData,
    isPending: isSettingAssetData,
    isError: isSettingAssetDataError,
    error: setAssetDataError,
  } = useWriteAssetFactorySetAssetData()

  const { closeModal, updateContent } = useNotificationStore()

  ////////////////////////////////////////////////////////
  ///                    HANDLERS                      ///
  ////////////////////////////////////////////////////////

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name: field, value } = e.target
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    const field = e.target.name

    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        [field]: file,
      }))
      if (field === 'imageUpload') {
        const reader = new FileReader()
        reader.readAsDataURL(file)
      } else {
        setFormData((prevData) => ({
          ...prevData,
          [field]: null,
        }))
      }
    }
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsProcessing(true)
    setIsOpen?.(false)

    if (!assetPrice || BigInt(assetPrice) < 0) {
      console.error('Invalid asset price:', assetPrice)
      setIsProcessing(false)
      return
    }

    const imageFile = formData['imageUpload'] as File
    if (!imageFile) {
      console.error('Image file is required.')
      setIsProcessing(false)
      return
    }
    for (const field of nftAssetStructure) {
      if (field.required && !formData[field.id] && field.type !== 'file') {
        return
      }
    }

    updateContent(<LoadingText text='Uploading image to Pinata' />)
    const imageUploadRespose = await uploadImageToPinata(imageFile)
    const imageUrl = imageUploadRespose.pinataUrl
    console.log('Image upload response:', imageUploadRespose)

    updateContent(<LoadingText text='Uploading metadata to Pinata' />)
    const constructedMetadata = constructMetadataJson(formData, imageUrl)
    const metadataUploadResponse = await uploadMetadataToPinata(constructedMetadata)
    console.log('Metadata upload response:', metadataUploadResponse)

    try {
      if (!setAssetData) {
        throw new Error('setAssetDataAsync is not defined. Ensure Wagmi hook is correctly set up.')
      }

      updateContent(<LoadingText text='Setting asset data on-chain' />)
      const priceBigInt = BigInt(assetPrice)
      const contractArgs: [string, bigint] = [
        `https://${metadataUploadResponse.pinataUrl}`,
        priceBigInt,
      ]
      await setAssetData({ args: contractArgs })
      setIsProcessing(false)
      closeModal()
    } catch (error: any) {
      console.error('Error during processing:', error)
      const errorMessage = error.shortMessage || error.message || 'An unknown error occurred.'
      console.log('Error message:', errorMessage)
    }
  }

  ///////////////////////////////////////////////////////////
  ///                    RENDERING                        ///
  ///////////////////////////////////////////////////////////

  const formFields = nftAssetStructure.map((field) => (
    <div key={field.id} className='nft-uploader__form-field'>
      <label htmlFor={field.id}>
        {field.label}
        {field.required && '* '}:
      </label>
      {field.type === 'textarea' ? (
        <textarea
          id={field.id}
          name={field.id}
          rows={3}
          value={(formData[field.id] as string) || ''}
          onChange={handleInputChange}
          placeholder={field.placeholder}
          required={field.required}
        />
      ) : field.type === 'select' ? (
        <select
          id={field.id}
          name={field.id}
          value={(formData[field.id] as string) || ''}
          onChange={handleInputChange}
          required={field.required}
        >
          {field.options?.map((opt) => {
            const value = typeof opt === 'string' ? opt : opt.value
            const label = typeof opt === 'string' ? opt : opt.label
            return (
              <option key={value} value={value}>
                {label}
              </option>
            )
          })}
        </select>
      ) : field.type === 'file' ? (
        <input
          type='file'
          id={field.id}
          name={field.id}
          accept={field.accept}
          onChange={handleFileChange}
          required={field.required}
        />
      ) : (
        <input
          type={field.type}
          id={field.id}
          name={field.id}
          value={(formData[field.id] as string) || ''}
          onChange={handleInputChange}
          placeholder={field.placeholder}
          required={field.required}
          min={field.min}
        />
      )}
    </div>
  ))

  return (
    <div className='nft-uploader tilt-warp'>
      <h1 className='nft-uploader__mainTitle'>Token ID {tokenId}</h1>
      <form className='nft-uploader__form' onSubmit={handleSubmit}>
        <div className='nft-uploader__form-field'>
          <label htmlFor='assetPrice'>Asset Price (IGC) :</label>
          <input
            type='number'
            id='assetPrice'
            name='assetPrice'
            value={assetPrice}
            onChange={(e) => setAssetPrice(e.target.value)}
            required
            min='0'
          />
        </div>
        <h2 className='nft-uploader__subTitle'>Metadata Fields:</h2>
        {formFields}
        <Button
          disabled={isProcessing}
          htmlButtonType='submit'
          className='nft-uploader__submitButton'
          onClick={() => handleSubmit}
          label={isProcessing ? 'Processing...' : 'Upload & Set Asset Data'}
        />
      </form>
    </div>
  )
}

export default NFTUploader
