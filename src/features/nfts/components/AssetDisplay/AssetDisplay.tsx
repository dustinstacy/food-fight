'use client'

import { useEffect, useState } from 'react'

import { NftMetadata } from 'devtools/types'
import { AssetDisplayCardProps } from 'features/nfts'
import { useReadAssetFactoryGetAsset } from 'hooks'

import './asset-display.scss'

/**
 * Renders a card displaying asset information.
 *
 * @param props - The component props.
 * @param props.assetId - The ID of the asset to display.
 */
const AssetDisplayCard = ({ assetId }: AssetDisplayCardProps) => {
  const {
    data: assetData,
    isLoading,
    isError,
    error,
  } = useReadAssetFactoryGetAsset({
    args: [assetId],
    query: { enabled: assetId !== undefined && assetId !== null },
  })

  const [metadata, setMetadata] = useState<NftMetadata | null>(null)
  const ipfsGatewayUrl =
    process.env.NEXT_PUBLIC_IPFS_GATEWAY_URL || 'https://your-ipfs-gateway.com/ipfs/'

  // Effect 1. Fetch asset data
  useEffect(() => {
    if (assetData?.uri) {
      fetch(assetData.uri.replace('ipfs://', `https://${ipfsGatewayUrl}/ipfs/`))
        .then((res) => res.json())
        .then((data) => setMetadata(data))
        .catch((err) => console.error('Failed to fetch metadata:', err))
    } else {
      setMetadata(null)
    }
  }, [assetData?.uri])

  if (!assetData) {
    return (
      <div className='asset-card asset-card__nodata'>
        <p>No data found for Asset ID: {assetId.toString()}</p>
      </div>
    )
  }

  if (isLoading) {
    return (
      <div className='asset-card asset-card__loading'>
        <p>Loading Asset ID: {assetId.toString()}...</p>
      </div>
    )
  }

  if (isError) {
    console.error(`Error fetching asset ID ${assetId.toString()}:`, error)
    return (
      <div className='asset-card asset-card__error'>
        <p>Error loading Asset ID: {assetId.toString()}</p>
        {error && <p className='error-message'>{(error as any).shortMessage || error.message}</p>}
      </div>
    )
  }

  return (
    <div className='asset-card center tilt-warp'>
      {metadata && (
        <div className='asset-card__metadata center-column'>
          <p>
            <strong>Name:</strong> {metadata.name}
          </p>
          <img
            src={`https://${metadata.image}`}
            alt={metadata.name}
            className='asset-card__metadata-image'
          />
          <p>
            <strong>Asset ID:</strong> {assetId.toString()}
          </p>
          <p>
            <strong>Description:</strong> {metadata.description}
          </p>
          <p>
            <strong>Price:</strong> {assetData.price.toString()} IGC
          </p>
          {'attributes' in metadata && (
            <div className='asset-card__metadata-attributes center-column'>
              <strong>Attributes:</strong>
              <ul className='asset-card__metadata-attributes-list left-column'>
                {metadata.attributes.map((attr: any, index: number) => (
                  <li key={index}>
                    {attr.trait_type}: {attr.value}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p>
            <a href={assetData.uri} target='_blank' rel='noopener noreferrer'>
              URI
            </a>
          </p>
        </div>
      )}
    </div>
  )
}

export default AssetDisplayCard
