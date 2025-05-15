import { BackendPinataResponse } from 'src/devtools/types'
import { customFetch } from 'utils'

/**
 * Uploads an image file to the backend using customFetch.
 *
 * @param imageFile - The image file to be uploaded.
 * @returns A Pinata response object containing:
 * - message: A message indicating the status of the upload.
 * - cid: The hash of the uploaded image.
 * - pinataUrl: The URL of the uploaded image on Pinata.
 */
export const uploadImageToPinata = async (imageFile: File): Promise<BackendPinataResponse> => {
  const formData = new FormData()
  formData.append('nftImage', imageFile, imageFile.name)

  try {
    const result = await customFetch<BackendPinataResponse>('/api/nft/upload-image', {
      method: 'POST',
      body: formData,
      headers: undefined,
    })
    return result
  } catch (error) {
    console.error('Error in uploadImageToPinata:', error)
    throw error
  }
}

/**
 * Uploads NFT metadata JSON to the backend using the provided customFetch wrapper.
 *
 * @param metadata - The NFT metadata JSON string to be uploaded.
 * @returns A Pinata response object containing:
 * - message: A message indicating the status of the upload.
 * - cid: The hash of the uploaded metadata.
 * - pinataUrl: The URL of the uploaded metadata on Pinata.
 */
export const uploadMetadataToPinata = async (metadata: string): Promise<BackendPinataResponse> => {
  try {
    const result = await customFetch<BackendPinataResponse>('/api/nft/upload-metadata', {
      method: 'POST',
      body: metadata,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return result
  } catch (error) {
    console.error('Error in uploadMetadataToPinataViaApi:', error)
    throw error
  }
}
