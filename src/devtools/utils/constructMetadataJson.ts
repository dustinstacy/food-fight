import { nftAssetStructure } from 'src/devtools/data'
import { NftMetadata, NftAttribute } from 'src/devtools/types'

/**
 * Constructs the metadata JSON for an NFT based on the provided form data and generated image IPFS URI.
 *
 * @param formData - The form data containing NFT attributes.
 * @param generatedImageIpfsUri - The IPFS URI of the generated image.
 * @returns The metadata JSON string.
 */
export const constructMetadataJson = (
  formData: Record<string, unknown>,
  generatedImageIpfsUri: string
) => {
  const attributes: NftAttribute[] = []

  nftAssetStructure.forEach((field) => {
    if (field.isAttribute && formData[field.id] !== null && formData[field.id] !== '') {
      attributes.push({
        trait_type: field.trait_type || field.label,
        value:
          field.type === 'number'
            ? parseInt(formData[field.id] as string)
            : (formData[field.id] as string),
        ...(field.display_type && { display_type: field.display_type }),
      })
    }
  })

  const metadata: NftMetadata = {
    name: formData['name'] as string,
    description: formData['description'] as string,
    image: generatedImageIpfsUri,
    attributes: attributes,
  }
  if (formData['externalUrl']) {
    metadata.external_url = formData['externalUrl'] as string
  }

  return JSON.stringify(metadata, null, 2)
}
