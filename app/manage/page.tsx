'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useAccount } from 'wagmi'

import { Button, LoadingText } from 'components'
import {
  useReadAssetFactoryGetNextAssetId,
  useWatchAssetFactoryAssetDataSetEvent,
  useWriteAssetFactorySetAssetData,
} from 'hooks'
import { NFTUploader } from 'devtools/components'
import { useNotificationStore } from 'features/notifications'
import { AssetDisplayCard } from 'features/nfts'
import { uploadedAssets } from 'devtools/data/uploadedAssets'
import { useAuthStore } from 'features/auth'

import './manage.scss'

const Manage = () => {
  const { address: account } = useAccount()
  const {
    data: nextTokenId,
    refetch: refetchNextTokenId,
    isLoading: isNextTokenIdLoading,
    isError: isNextTokenIdError,
    error: nextTokenIdError,
  } = useReadAssetFactoryGetNextAssetId()
  const {
    writeContractAsync: setAssetData,
    isPending: isSettingAssetData,
    isError: isSettingAssetDataError,
    error: setAssetDataError,
  } = useWriteAssetFactorySetAssetData()
  const {
    openModal: openGlobalModal,
    closeModal: closeGlobalModal,
    isOpen: isGlobalModalOpen,
  } = useNotificationStore()
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  const isAttemptingAuth = useAuthStore((state) => state.isAttemptingAuth)
  {
    isNextTokenIdLoading && <LoadingText text='Loading assets' />
  }
  {
    isNextTokenIdError && (
      <p className='manage__error-message'>
        Error loading assets: {(nextTokenIdError as any).shortMessage || nextTokenIdError.message}
      </p>
    )
  }

  useEffect(() => {
    if (isNextTokenIdLoading) {
      openGlobalModal(<LoadingText text='Loading assets' />, {
        ariaLabel: 'Loading assets',
        ariaDescription: 'Loading assets',
      })
    } else if (isNextTokenIdError) {
      openGlobalModal(
        <p className='manage__error-message'>
          Error loading assets: {nextTokenIdError?.message || 'Unknown error'}
        </p>,
        {
          ariaLabel: 'Error loading assets',
          ariaDescription: 'Error loading assets',
        }
      )
    } else {
      closeGlobalModal()
    }
  }, [
    isNextTokenIdLoading,
    isNextTokenIdError,
    nextTokenIdError,
    openGlobalModal,
    closeGlobalModal,
  ])

  useEffect(() => {
    const handleSetAssetData = async (i: BigInt) => {
      const asset = uploadedAssets[Number(i)]
      const priceBigInt = BigInt(asset.price)
      const contractArgs: [string, bigint] = [asset.uri, priceBigInt]
      await setAssetData({ args: contractArgs })
    }

    if (nextTokenId && account && isAuthenticated && !isAttemptingAuth) {
      const currentTokenId = nextTokenId - BigInt(1)
      if (currentTokenId !== BigInt(uploadedAssets.length)) {
        for (let i = currentTokenId; i < uploadedAssets.length; i++) {
          openGlobalModal(<LoadingText text={`Setting asset data for Asset ID: ${i}`} />, {
            ariaLabel: `Setting asset data for Asset ID: ${i}`,
            ariaDescription: `Setting asset data for Asset ID: ${i}`,
          })
          handleSetAssetData(i)
          closeGlobalModal()
        }
      }
    }
  }, [
    nextTokenId,
    uploadedAssets,
    setAssetData,
    openGlobalModal,
    closeGlobalModal,
    account,
    isAuthenticated,
    isAttemptingAuth,
  ])

  const assetIdsToDisplay = useMemo(() => {
    if (nextTokenId === undefined || nextTokenId === null || nextTokenId === 0n) {
      return []
    }
    const ids: bigint[] = []
    for (let i = 1n; i < nextTokenId; i++) {
      ids.push(i)
    }
    return ids
  }, [nextTokenId])

  const handleNewAssetButtonClick = () => {
    openGlobalModal(<NFTUploader tokenId={nextTokenId?.toString() || '1'} />, {
      ariaLabel: 'NFT Uploader',
      ariaDescription: 'Upload your NFT data',
    })
  }

  const handleAssetDataSetLogs = useCallback(() => {
    console.log('AssetDataSet event detected, refetching nextTokenId...')
    refetchNextTokenId()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useWatchAssetFactoryAssetDataSetEvent({
    onLogs: handleAssetDataSetLogs,
    enabled: !!account,
  })

  return (
    <div className='page center'>
      <div className='manage'>
        <Button
          className='manage__new-asset-button'
          label='Create New Asset (+)'
          onClick={handleNewAssetButtonClick}
          disabled={isNextTokenIdLoading}
        />
        {assetIdsToDisplay.length > 0 ? (
          <div className='manage__assets center'>
            {assetIdsToDisplay.map((id) => (
              <AssetDisplayCard key={id.toString()} assetId={id} />
            ))}
          </div>
        ) : (
          !isNextTokenIdLoading &&
          assetIdsToDisplay.length === 0 && <p>No assets found. Create one!</p>
        )}
      </div>
    </div>
  )
}

export default Manage
