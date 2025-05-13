import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AssetAuction
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const assetAuctionAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_assetVaultAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelAuction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'completeAuction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetId', internalType: 'uint256', type: 'uint256' },
      { name: 'reservePrice', internalType: 'uint256', type: 'uint256' },
      { name: 'blocksDuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createAuction',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAssetVaultAddress',
    outputs: [{ name: 'vaultAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'auctionId', internalType: 'uint256', type: 'uint256' }],
    name: 'getAuction',
    outputs: [
      {
        name: 'auction',
        internalType: 'struct AssetAuction.Auction',
        type: 'tuple',
        components: [
          { name: 'seller', internalType: 'address', type: 'address' },
          { name: 'highestBidder', internalType: 'address', type: 'address' },
          { name: 'winningBidder', internalType: 'address', type: 'address' },
          { name: 'assetId', internalType: 'uint256', type: 'uint256' },
          { name: 'reservePrice', internalType: 'uint256', type: 'uint256' },
          { name: 'deadlineBlock', internalType: 'uint256', type: 'uint256' },
          { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
          { name: 'winningBid', internalType: 'uint256', type: 'uint256' },
          {
            name: 'status',
            internalType: 'enum AssetAuction.AuctionStatus',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAuctionCount',
    outputs: [{ name: 'count', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: 'auctionId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'placeBid',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AuctionCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'seller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'assetId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reservePrice',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'blocksDuration',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AuctionCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'winningBidder',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'winningBid',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AuctionEnded',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'reservePrice',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'highestBid',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AuctionReserveNotMet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'bidder',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'auctionId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BidPlaced',
  },
  {
    type: 'error',
    inputs: [
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'highestBid', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'AssetAuctionBidBelowHighestBid',
  },
  {
    type: 'error',
    inputs: [
      { name: 'currentBlock', internalType: 'uint256', type: 'uint256' },
      { name: 'deadlineBlock', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'AssetAuctionDeadlineHasPassed',
  },
  {
    type: 'error',
    inputs: [
      { name: 'currentBlock', internalType: 'uint256', type: 'uint256' },
      { name: 'deadlineBlock', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'AssetAuctionDeadlineNotPassed',
  },
  {
    type: 'error',
    inputs: [
      {
        name: 'status',
        internalType: 'enum AssetAuction.AuctionStatus',
        type: 'uint8',
      },
    ],
    name: 'AssetAuctionNotOpen',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'seller', internalType: 'address', type: 'address' },
    ],
    name: 'AssetAuctionNotTheSeller',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
] as const

export const assetAuctionAddress = '0x8ce361602B935680E8DeC218b820ff5056BeB7af' as const

export const assetAuctionConfig = {
  address: assetAuctionAddress,
  abi: assetAuctionAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AssetFactory
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const assetFactoryAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_initialOwner', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'accounts', internalType: 'address[]', type: 'address[]' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'balanceOfBatch',
    outputs: [{ name: '', internalType: 'uint256[]', type: 'uint256[]' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'assetId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnAsset',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'assetIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'burnBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'assetId', internalType: 'uint256', type: 'uint256' }],
    name: 'getAsset',
    outputs: [
      {
        name: 'asset',
        internalType: 'struct AssetFactory.Asset',
        type: 'tuple',
        components: [
          { name: 'uri', internalType: 'string', type: 'string' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getIGCTokenId',
    outputs: [{ name: 'tokenId', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getNextAssetId',
    outputs: [{ name: 'assetId', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'operator', internalType: 'address', type: 'address' },
    ],
    name: 'isApprovedForAll',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'assetId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mintAsset',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'assetIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'mintBatch',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'mintIGC',
    outputs: [],
    stateMutability: 'payable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'ids', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'values', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeBatchTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'id', internalType: 'uint256', type: 'uint256' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
      { name: 'data', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'safeTransferFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'approved', internalType: 'bool', type: 'bool' },
    ],
    name: 'setApprovalForAll',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetUri', internalType: 'string', type: 'string' },
      { name: 'assetPrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setAssetData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetId', internalType: 'uint256', type: 'uint256' },
      { name: 'assetUri', internalType: 'string', type: 'string' },
      { name: 'assetPrice', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateAssetData',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    name: 'uri',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'approved', internalType: 'bool', type: 'bool', indexed: false },
    ],
    name: 'ApprovalForAll',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'uri', internalType: 'string', type: 'string', indexed: false },
      {
        name: 'assetId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'price',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AssetDataSet',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assetId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AssetMinted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assetIds',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'amounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'BurntBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'assetId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'BurntSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'IGCminted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'ids',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'values',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'TransferBatch',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'operator',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: false },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'TransferSingle',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'URI',
  },
  {
    type: 'error',
    inputs: [{ name: 'assetId', internalType: 'uint256', type: 'uint256' }],
    name: 'AssetFactoryAssetNotFound',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
      { name: 'tokenId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidApprover',
  },
  {
    type: 'error',
    inputs: [
      { name: 'idsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'valuesLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC1155InvalidArrayLength',
  },
  {
    type: 'error',
    inputs: [{ name: 'operator', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidOperator',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC1155InvalidSender',
  },
  {
    type: 'error',
    inputs: [
      { name: 'operator', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'ERC1155MissingApprovalForAll',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
] as const

export const assetFactoryAddress = '0x700b6A60ce7EaaEA56F065753d8dcB9653dbAD35' as const

export const assetFactoryConfig = {
  address: assetFactoryAddress,
  abi: assetFactoryAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AssetRental
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const assetRentalAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_assetVaultAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'rentalAssetId', internalType: 'uint256', type: 'uint256' }],
    name: 'checkRentalStatus',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetId', internalType: 'uint256', type: 'uint256' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'blocksDuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createRental',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAssetVaultAddress',
    outputs: [{ name: 'vaultAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'rentalAssetId', internalType: 'uint256', type: 'uint256' }],
    name: 'getRentalAsset',
    outputs: [
      {
        name: 'rentalAsset',
        internalType: 'struct AssetRental.RentalAsset',
        type: 'tuple',
        components: [
          { name: 'owner', internalType: 'address', type: 'address' },
          { name: 'renter', internalType: 'address', type: 'address' },
          { name: 'assetId', internalType: 'uint256', type: 'uint256' },
          { name: 'price', internalType: 'uint256', type: 'uint256' },
          { name: 'blocksDuration', internalType: 'uint256', type: 'uint256' },
          { name: 'expiration', internalType: 'uint256', type: 'uint256' },
          {
            name: 'status',
            internalType: 'enum AssetRental.RentalStatus',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getRentalAssetCount',
    outputs: [{ name: 'count', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'assetId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'getRentedAssetBalance',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'rentalAssetId', internalType: 'uint256', type: 'uint256' }],
    name: 'rentAsset',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'rentalAssetId', internalType: 'uint256', type: 'uint256' }],
    name: 'unlistRental',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'rentalAssetId', internalType: 'uint256', type: 'uint256' },
      { name: 'price', internalType: 'uint256', type: 'uint256' },
      { name: 'blocksDuration', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'updateRental',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rentalOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'rentalAssetId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RentalAssetPosted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rentalOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'rentalAssetId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RentalAssetRelisted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'renter',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'rentalAssetId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'timeRented',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RentalAssetRented',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rentalOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'rentalAssetId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RentalAssetUnlisted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'rentalOwner',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'rentalAssetId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'RentalAssetUpdated',
  },
  {
    type: 'error',
    inputs: [
      {
        name: 'status',
        internalType: 'enum AssetRental.RentalStatus',
        type: 'uint8',
      },
    ],
    name: 'AssetRentalAlreadyAvailable',
  },
  {
    type: 'error',
    inputs: [
      {
        name: 'status',
        internalType: 'enum AssetRental.RentalStatus',
        type: 'uint8',
      },
    ],
    name: 'AssetRentalNotAvailable',
  },
  {
    type: 'error',
    inputs: [{ name: 'expiration', internalType: 'uint256', type: 'uint256' }],
    name: 'AssetRentalNotExpired',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'owner', internalType: 'address', type: 'address' },
    ],
    name: 'AssetRentalNotTheOwner',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'renter', internalType: 'address', type: 'address' },
    ],
    name: 'AssetRentalNotTheRenter',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
] as const

export const assetRentalAddress = '0xe1Aa25618fA0c7A1CFDab5d6B456af611873b629' as const

export const assetRentalConfig = {
  address: assetRentalAddress,
  abi: assetRentalAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AssetTrade
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const assetTradeAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_assetVaultAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'acceptProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'cancelProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'receiver', internalType: 'address', type: 'address' },
      { name: 'assetAId', internalType: 'uint256', type: 'uint256' },
      { name: 'assetBId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'createProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAssetVaultAddress',
    outputs: [{ name: 'vaultAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'getProposal',
    outputs: [
      {
        name: 'proposal',
        internalType: 'struct AssetTrade.Proposal',
        type: 'tuple',
        components: [
          { name: 'proposer', internalType: 'address', type: 'address' },
          { name: 'receiver', internalType: 'address', type: 'address' },
          { name: 'assetAId', internalType: 'uint256', type: 'uint256' },
          { name: 'assetBId', internalType: 'uint256', type: 'uint256' },
          {
            name: 'status',
            internalType: 'enum AssetTrade.ProposalStatus',
            type: 'uint8',
          },
        ],
      },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getProposalCount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'proposalId', internalType: 'uint256', type: 'uint256' }],
    name: 'rejectProposal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProposalAccepted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProposalCanceled',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProposalCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'proposalId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ProposalRejected',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'proposer', internalType: 'address', type: 'address' },
    ],
    name: 'AssetTradeNotProposer',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'receiver', internalType: 'address', type: 'address' },
    ],
    name: 'AssetTradeNotReceiver',
  },
  {
    type: 'error',
    inputs: [
      {
        name: 'status',
        internalType: 'enum AssetTrade.ProposalStatus',
        type: 'uint8',
      },
    ],
    name: 'AssetTradeProposalNotPending',
  },
] as const

export const assetTradeAddress = '0xb19b36b1456E65E3A6D514D3F715f204BD59f431' as const

export const assetTradeConfig = {
  address: assetTradeAddress,
  abi: assetTradeAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// AssetVault
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const assetVaultAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: '_factory', internalType: 'address', type: 'address' },
      { name: '_initialOwner', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'caller', internalType: 'address', type: 'address' }],
    name: 'approveCaller',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'user', internalType: 'address', type: 'address' },
      { name: 'assetId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'balanceOf',
    outputs: [{ name: 'balance', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'assetIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'depositAssets',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'amount', internalType: 'uint256', type: 'uint256' }],
    name: 'depositIGC',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getAssetFactoryAddress',
    outputs: [{ name: 'factoryAddress', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getIGCTokenId',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'caller', internalType: 'address', type: 'address' }],
    name: 'getIsApprovedCaller',
    outputs: [{ name: 'approved', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'assetId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'lockAsset',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155BatchReceived',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'address', type: 'address' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'uint256', type: 'uint256' },
      { name: '', internalType: 'bytes', type: 'bytes' },
    ],
    name: 'onERC1155Received',
    outputs: [{ name: '', internalType: 'bytes4', type: 'bytes4' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'caller', internalType: 'address', type: 'address' }],
    name: 'revokeCaller',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'interfaceId', internalType: 'bytes4', type: 'bytes4' }],
    name: 'supportsInterface',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'pure',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'assetId', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'unlockAsset',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'assetIds', internalType: 'uint256[]', type: 'uint256[]' },
      { name: 'amounts', internalType: 'uint256[]', type: 'uint256[]' },
    ],
    name: 'withdrawAssets',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'withdrawIGC',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'ApprovedCaller',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'assetId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AssetLocked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'assetId',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'AssetUnlocked',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'from',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'assetIds',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'amounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'AssetsDeposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      {
        name: 'assetIds',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
      {
        name: 'amounts',
        internalType: 'uint256[]',
        type: 'uint256[]',
        indexed: false,
      },
    ],
    name: 'AssetsWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'from',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'IGCDeposited',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: false },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'IGCWithdrawn',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnershipTransferred',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'caller',
        internalType: 'address',
        type: 'address',
        indexed: false,
      },
    ],
    name: 'RevokedCaller',
  },
  {
    type: 'error',
    inputs: [
      { name: 'assetIdsLength', internalType: 'uint256', type: 'uint256' },
      { name: 'amountsLength', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'AssetVaultArraysLengthMismatch',
  },
  {
    type: 'error',
    inputs: [
      { name: 'caller', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'amount', internalType: 'uint256', type: 'uint256' },
      { name: 'assetId', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'AssetVaultInsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'caller', internalType: 'address', type: 'address' }],
    name: 'AssetVaultUnauthorizedCaller',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
  },
  { type: 'error', inputs: [], name: 'ReentrancyGuardReentrantCall' },
] as const

export const assetVaultAddress = '0xA15BB66138824a1c7167f5E85b957d04Dd34E468' as const

export const assetVaultConfig = {
  address: assetVaultAddress,
  abi: assetVaultAbi,
} as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetAuctionAbi}__
 */
export const useReadAssetAuction = /*#__PURE__*/ createUseReadContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"getAssetVaultAddress"`
 */
export const useReadAssetAuctionGetAssetVaultAddress = /*#__PURE__*/ createUseReadContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'getAssetVaultAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"getAuction"`
 */
export const useReadAssetAuctionGetAuction = /*#__PURE__*/ createUseReadContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'getAuction',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"getAuctionCount"`
 */
export const useReadAssetAuctionGetAuctionCount = /*#__PURE__*/ createUseReadContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'getAuctionCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useReadAssetAuctionOnErc1155BatchReceived = /*#__PURE__*/ createUseReadContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'onERC1155BatchReceived',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useReadAssetAuctionOnErc1155Received = /*#__PURE__*/ createUseReadContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'onERC1155Received',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAssetAuctionSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetAuctionAbi}__
 */
export const useWriteAssetAuction = /*#__PURE__*/ createUseWriteContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"cancelAuction"`
 */
export const useWriteAssetAuctionCancelAuction = /*#__PURE__*/ createUseWriteContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'cancelAuction',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"completeAuction"`
 */
export const useWriteAssetAuctionCompleteAuction = /*#__PURE__*/ createUseWriteContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'completeAuction',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"createAuction"`
 */
export const useWriteAssetAuctionCreateAuction = /*#__PURE__*/ createUseWriteContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'createAuction',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"placeBid"`
 */
export const useWriteAssetAuctionPlaceBid = /*#__PURE__*/ createUseWriteContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'placeBid',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetAuctionAbi}__
 */
export const useSimulateAssetAuction = /*#__PURE__*/ createUseSimulateContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"cancelAuction"`
 */
export const useSimulateAssetAuctionCancelAuction = /*#__PURE__*/ createUseSimulateContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'cancelAuction',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"completeAuction"`
 */
export const useSimulateAssetAuctionCompleteAuction = /*#__PURE__*/ createUseSimulateContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'completeAuction',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"createAuction"`
 */
export const useSimulateAssetAuctionCreateAuction = /*#__PURE__*/ createUseSimulateContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'createAuction',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetAuctionAbi}__ and `functionName` set to `"placeBid"`
 */
export const useSimulateAssetAuctionPlaceBid = /*#__PURE__*/ createUseSimulateContract({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  functionName: 'placeBid',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetAuctionAbi}__
 */
export const useWatchAssetAuctionEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetAuctionAbi}__ and `eventName` set to `"AuctionCanceled"`
 */
export const useWatchAssetAuctionAuctionCanceledEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  eventName: 'AuctionCanceled',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetAuctionAbi}__ and `eventName` set to `"AuctionCreated"`
 */
export const useWatchAssetAuctionAuctionCreatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  eventName: 'AuctionCreated',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetAuctionAbi}__ and `eventName` set to `"AuctionEnded"`
 */
export const useWatchAssetAuctionAuctionEndedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  eventName: 'AuctionEnded',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetAuctionAbi}__ and `eventName` set to `"AuctionReserveNotMet"`
 */
export const useWatchAssetAuctionAuctionReserveNotMetEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  eventName: 'AuctionReserveNotMet',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetAuctionAbi}__ and `eventName` set to `"BidPlaced"`
 */
export const useWatchAssetAuctionBidPlacedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetAuctionAbi,
  address: assetAuctionAddress,
  eventName: 'BidPlaced',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__
 */
export const useReadAssetFactory = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadAssetFactoryBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"balanceOfBatch"`
 */
export const useReadAssetFactoryBalanceOfBatch = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'balanceOfBatch',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"getAsset"`
 */
export const useReadAssetFactoryGetAsset = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'getAsset',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"getIGCTokenId"`
 */
export const useReadAssetFactoryGetIgcTokenId = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'getIGCTokenId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"getNextAssetId"`
 */
export const useReadAssetFactoryGetNextAssetId = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'getNextAssetId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"isApprovedForAll"`
 */
export const useReadAssetFactoryIsApprovedForAll = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'isApprovedForAll',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useReadAssetFactoryOnErc1155BatchReceived = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'onERC1155BatchReceived',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useReadAssetFactoryOnErc1155Received = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'onERC1155Received',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"owner"`
 */
export const useReadAssetFactoryOwner = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAssetFactorySupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"uri"`
 */
export const useReadAssetFactoryUri = /*#__PURE__*/ createUseReadContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'uri',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__
 */
export const useWriteAssetFactory = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"burnAsset"`
 */
export const useWriteAssetFactoryBurnAsset = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'burnAsset',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"burnBatch"`
 */
export const useWriteAssetFactoryBurnBatch = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'burnBatch',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"mintAsset"`
 */
export const useWriteAssetFactoryMintAsset = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'mintAsset',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"mintBatch"`
 */
export const useWriteAssetFactoryMintBatch = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'mintBatch',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"mintIGC"`
 */
export const useWriteAssetFactoryMintIgc = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'mintIGC',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteAssetFactoryRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useWriteAssetFactorySafeBatchTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useWriteAssetFactorySafeTransferFrom = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useWriteAssetFactorySetApprovalForAll = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"setAssetData"`
 */
export const useWriteAssetFactorySetAssetData = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'setAssetData',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteAssetFactoryTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"updateAssetData"`
 */
export const useWriteAssetFactoryUpdateAssetData = /*#__PURE__*/ createUseWriteContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'updateAssetData',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__
 */
export const useSimulateAssetFactory = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"burnAsset"`
 */
export const useSimulateAssetFactoryBurnAsset = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'burnAsset',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"burnBatch"`
 */
export const useSimulateAssetFactoryBurnBatch = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'burnBatch',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"mintAsset"`
 */
export const useSimulateAssetFactoryMintAsset = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'mintAsset',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"mintBatch"`
 */
export const useSimulateAssetFactoryMintBatch = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'mintBatch',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"mintIGC"`
 */
export const useSimulateAssetFactoryMintIgc = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'mintIGC',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateAssetFactoryRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"safeBatchTransferFrom"`
 */
export const useSimulateAssetFactorySafeBatchTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'safeBatchTransferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"safeTransferFrom"`
 */
export const useSimulateAssetFactorySafeTransferFrom = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'safeTransferFrom',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"setApprovalForAll"`
 */
export const useSimulateAssetFactorySetApprovalForAll = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'setApprovalForAll',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"setAssetData"`
 */
export const useSimulateAssetFactorySetAssetData = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'setAssetData',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateAssetFactoryTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetFactoryAbi}__ and `functionName` set to `"updateAssetData"`
 */
export const useSimulateAssetFactoryUpdateAssetData = /*#__PURE__*/ createUseSimulateContract({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  functionName: 'updateAssetData',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetFactoryAbi}__
 */
export const useWatchAssetFactoryEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetFactoryAbi}__ and `eventName` set to `"ApprovalForAll"`
 */
export const useWatchAssetFactoryApprovalForAllEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  eventName: 'ApprovalForAll',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetFactoryAbi}__ and `eventName` set to `"AssetDataSet"`
 */
export const useWatchAssetFactoryAssetDataSetEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  eventName: 'AssetDataSet',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetFactoryAbi}__ and `eventName` set to `"AssetMinted"`
 */
export const useWatchAssetFactoryAssetMintedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  eventName: 'AssetMinted',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetFactoryAbi}__ and `eventName` set to `"BurntBatch"`
 */
export const useWatchAssetFactoryBurntBatchEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  eventName: 'BurntBatch',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetFactoryAbi}__ and `eventName` set to `"BurntSingle"`
 */
export const useWatchAssetFactoryBurntSingleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  eventName: 'BurntSingle',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetFactoryAbi}__ and `eventName` set to `"IGCminted"`
 */
export const useWatchAssetFactoryIgCmintedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  eventName: 'IGCminted',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetFactoryAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchAssetFactoryOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  eventName: 'OwnershipTransferred',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetFactoryAbi}__ and `eventName` set to `"TransferBatch"`
 */
export const useWatchAssetFactoryTransferBatchEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  eventName: 'TransferBatch',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetFactoryAbi}__ and `eventName` set to `"TransferSingle"`
 */
export const useWatchAssetFactoryTransferSingleEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  eventName: 'TransferSingle',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetFactoryAbi}__ and `eventName` set to `"URI"`
 */
export const useWatchAssetFactoryUriEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetFactoryAbi,
  address: assetFactoryAddress,
  eventName: 'URI',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetRentalAbi}__
 */
export const useReadAssetRental = /*#__PURE__*/ createUseReadContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"getAssetVaultAddress"`
 */
export const useReadAssetRentalGetAssetVaultAddress = /*#__PURE__*/ createUseReadContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'getAssetVaultAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"getRentalAsset"`
 */
export const useReadAssetRentalGetRentalAsset = /*#__PURE__*/ createUseReadContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'getRentalAsset',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"getRentalAssetCount"`
 */
export const useReadAssetRentalGetRentalAssetCount = /*#__PURE__*/ createUseReadContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'getRentalAssetCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"getRentedAssetBalance"`
 */
export const useReadAssetRentalGetRentedAssetBalance = /*#__PURE__*/ createUseReadContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'getRentedAssetBalance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useReadAssetRentalOnErc1155BatchReceived = /*#__PURE__*/ createUseReadContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'onERC1155BatchReceived',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useReadAssetRentalOnErc1155Received = /*#__PURE__*/ createUseReadContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'onERC1155Received',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAssetRentalSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetRentalAbi}__
 */
export const useWriteAssetRental = /*#__PURE__*/ createUseWriteContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"checkRentalStatus"`
 */
export const useWriteAssetRentalCheckRentalStatus = /*#__PURE__*/ createUseWriteContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'checkRentalStatus',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"createRental"`
 */
export const useWriteAssetRentalCreateRental = /*#__PURE__*/ createUseWriteContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'createRental',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"rentAsset"`
 */
export const useWriteAssetRentalRentAsset = /*#__PURE__*/ createUseWriteContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'rentAsset',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"unlistRental"`
 */
export const useWriteAssetRentalUnlistRental = /*#__PURE__*/ createUseWriteContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'unlistRental',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"updateRental"`
 */
export const useWriteAssetRentalUpdateRental = /*#__PURE__*/ createUseWriteContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'updateRental',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetRentalAbi}__
 */
export const useSimulateAssetRental = /*#__PURE__*/ createUseSimulateContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"checkRentalStatus"`
 */
export const useSimulateAssetRentalCheckRentalStatus = /*#__PURE__*/ createUseSimulateContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'checkRentalStatus',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"createRental"`
 */
export const useSimulateAssetRentalCreateRental = /*#__PURE__*/ createUseSimulateContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'createRental',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"rentAsset"`
 */
export const useSimulateAssetRentalRentAsset = /*#__PURE__*/ createUseSimulateContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'rentAsset',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"unlistRental"`
 */
export const useSimulateAssetRentalUnlistRental = /*#__PURE__*/ createUseSimulateContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'unlistRental',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetRentalAbi}__ and `functionName` set to `"updateRental"`
 */
export const useSimulateAssetRentalUpdateRental = /*#__PURE__*/ createUseSimulateContract({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  functionName: 'updateRental',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetRentalAbi}__
 */
export const useWatchAssetRentalEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetRentalAbi,
  address: assetRentalAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetRentalAbi}__ and `eventName` set to `"RentalAssetPosted"`
 */
export const useWatchAssetRentalRentalAssetPostedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  eventName: 'RentalAssetPosted',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetRentalAbi}__ and `eventName` set to `"RentalAssetRelisted"`
 */
export const useWatchAssetRentalRentalAssetRelistedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  eventName: 'RentalAssetRelisted',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetRentalAbi}__ and `eventName` set to `"RentalAssetRented"`
 */
export const useWatchAssetRentalRentalAssetRentedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  eventName: 'RentalAssetRented',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetRentalAbi}__ and `eventName` set to `"RentalAssetUnlisted"`
 */
export const useWatchAssetRentalRentalAssetUnlistedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  eventName: 'RentalAssetUnlisted',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetRentalAbi}__ and `eventName` set to `"RentalAssetUpdated"`
 */
export const useWatchAssetRentalRentalAssetUpdatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetRentalAbi,
  address: assetRentalAddress,
  eventName: 'RentalAssetUpdated',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetTradeAbi}__
 */
export const useReadAssetTrade = /*#__PURE__*/ createUseReadContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"getAssetVaultAddress"`
 */
export const useReadAssetTradeGetAssetVaultAddress = /*#__PURE__*/ createUseReadContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'getAssetVaultAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"getProposal"`
 */
export const useReadAssetTradeGetProposal = /*#__PURE__*/ createUseReadContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'getProposal',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"getProposalCount"`
 */
export const useReadAssetTradeGetProposalCount = /*#__PURE__*/ createUseReadContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'getProposalCount',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useReadAssetTradeOnErc1155BatchReceived = /*#__PURE__*/ createUseReadContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'onERC1155BatchReceived',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useReadAssetTradeOnErc1155Received = /*#__PURE__*/ createUseReadContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'onERC1155Received',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAssetTradeSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetTradeAbi}__
 */
export const useWriteAssetTrade = /*#__PURE__*/ createUseWriteContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const useWriteAssetTradeAcceptProposal = /*#__PURE__*/ createUseWriteContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'acceptProposal',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"cancelProposal"`
 */
export const useWriteAssetTradeCancelProposal = /*#__PURE__*/ createUseWriteContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'cancelProposal',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"createProposal"`
 */
export const useWriteAssetTradeCreateProposal = /*#__PURE__*/ createUseWriteContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'createProposal',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"rejectProposal"`
 */
export const useWriteAssetTradeRejectProposal = /*#__PURE__*/ createUseWriteContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'rejectProposal',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetTradeAbi}__
 */
export const useSimulateAssetTrade = /*#__PURE__*/ createUseSimulateContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"acceptProposal"`
 */
export const useSimulateAssetTradeAcceptProposal = /*#__PURE__*/ createUseSimulateContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'acceptProposal',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"cancelProposal"`
 */
export const useSimulateAssetTradeCancelProposal = /*#__PURE__*/ createUseSimulateContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'cancelProposal',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"createProposal"`
 */
export const useSimulateAssetTradeCreateProposal = /*#__PURE__*/ createUseSimulateContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'createProposal',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetTradeAbi}__ and `functionName` set to `"rejectProposal"`
 */
export const useSimulateAssetTradeRejectProposal = /*#__PURE__*/ createUseSimulateContract({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  functionName: 'rejectProposal',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetTradeAbi}__
 */
export const useWatchAssetTradeEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetTradeAbi,
  address: assetTradeAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetTradeAbi}__ and `eventName` set to `"ProposalAccepted"`
 */
export const useWatchAssetTradeProposalAcceptedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  eventName: 'ProposalAccepted',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetTradeAbi}__ and `eventName` set to `"ProposalCanceled"`
 */
export const useWatchAssetTradeProposalCanceledEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  eventName: 'ProposalCanceled',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetTradeAbi}__ and `eventName` set to `"ProposalCreated"`
 */
export const useWatchAssetTradeProposalCreatedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  eventName: 'ProposalCreated',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetTradeAbi}__ and `eventName` set to `"ProposalRejected"`
 */
export const useWatchAssetTradeProposalRejectedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetTradeAbi,
  address: assetTradeAddress,
  eventName: 'ProposalRejected',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetVaultAbi}__
 */
export const useReadAssetVault = /*#__PURE__*/ createUseReadContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadAssetVaultBalanceOf = /*#__PURE__*/ createUseReadContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'balanceOf',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"getAssetFactoryAddress"`
 */
export const useReadAssetVaultGetAssetFactoryAddress = /*#__PURE__*/ createUseReadContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'getAssetFactoryAddress',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"getIGCTokenId"`
 */
export const useReadAssetVaultGetIgcTokenId = /*#__PURE__*/ createUseReadContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'getIGCTokenId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"getIsApprovedCaller"`
 */
export const useReadAssetVaultGetIsApprovedCaller = /*#__PURE__*/ createUseReadContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'getIsApprovedCaller',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"onERC1155BatchReceived"`
 */
export const useReadAssetVaultOnErc1155BatchReceived = /*#__PURE__*/ createUseReadContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'onERC1155BatchReceived',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"onERC1155Received"`
 */
export const useReadAssetVaultOnErc1155Received = /*#__PURE__*/ createUseReadContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'onERC1155Received',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"owner"`
 */
export const useReadAssetVaultOwner = /*#__PURE__*/ createUseReadContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"supportsInterface"`
 */
export const useReadAssetVaultSupportsInterface = /*#__PURE__*/ createUseReadContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'supportsInterface',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetVaultAbi}__
 */
export const useWriteAssetVault = /*#__PURE__*/ createUseWriteContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"approveCaller"`
 */
export const useWriteAssetVaultApproveCaller = /*#__PURE__*/ createUseWriteContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'approveCaller',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"depositAssets"`
 */
export const useWriteAssetVaultDepositAssets = /*#__PURE__*/ createUseWriteContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'depositAssets',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"depositIGC"`
 */
export const useWriteAssetVaultDepositIgc = /*#__PURE__*/ createUseWriteContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'depositIGC',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"lockAsset"`
 */
export const useWriteAssetVaultLockAsset = /*#__PURE__*/ createUseWriteContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'lockAsset',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteAssetVaultRenounceOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"revokeCaller"`
 */
export const useWriteAssetVaultRevokeCaller = /*#__PURE__*/ createUseWriteContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'revokeCaller',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteAssetVaultTransferOwnership = /*#__PURE__*/ createUseWriteContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"unlockAsset"`
 */
export const useWriteAssetVaultUnlockAsset = /*#__PURE__*/ createUseWriteContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'unlockAsset',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"withdrawAssets"`
 */
export const useWriteAssetVaultWithdrawAssets = /*#__PURE__*/ createUseWriteContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'withdrawAssets',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"withdrawIGC"`
 */
export const useWriteAssetVaultWithdrawIgc = /*#__PURE__*/ createUseWriteContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'withdrawIGC',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetVaultAbi}__
 */
export const useSimulateAssetVault = /*#__PURE__*/ createUseSimulateContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"approveCaller"`
 */
export const useSimulateAssetVaultApproveCaller = /*#__PURE__*/ createUseSimulateContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'approveCaller',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"depositAssets"`
 */
export const useSimulateAssetVaultDepositAssets = /*#__PURE__*/ createUseSimulateContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'depositAssets',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"depositIGC"`
 */
export const useSimulateAssetVaultDepositIgc = /*#__PURE__*/ createUseSimulateContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'depositIGC',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"lockAsset"`
 */
export const useSimulateAssetVaultLockAsset = /*#__PURE__*/ createUseSimulateContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'lockAsset',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateAssetVaultRenounceOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'renounceOwnership',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"revokeCaller"`
 */
export const useSimulateAssetVaultRevokeCaller = /*#__PURE__*/ createUseSimulateContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'revokeCaller',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateAssetVaultTransferOwnership = /*#__PURE__*/ createUseSimulateContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'transferOwnership',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"unlockAsset"`
 */
export const useSimulateAssetVaultUnlockAsset = /*#__PURE__*/ createUseSimulateContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'unlockAsset',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"withdrawAssets"`
 */
export const useSimulateAssetVaultWithdrawAssets = /*#__PURE__*/ createUseSimulateContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'withdrawAssets',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link assetVaultAbi}__ and `functionName` set to `"withdrawIGC"`
 */
export const useSimulateAssetVaultWithdrawIgc = /*#__PURE__*/ createUseSimulateContract({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  functionName: 'withdrawIGC',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetVaultAbi}__
 */
export const useWatchAssetVaultEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetVaultAbi,
  address: assetVaultAddress,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetVaultAbi}__ and `eventName` set to `"ApprovedCaller"`
 */
export const useWatchAssetVaultApprovedCallerEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  eventName: 'ApprovedCaller',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetVaultAbi}__ and `eventName` set to `"AssetLocked"`
 */
export const useWatchAssetVaultAssetLockedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  eventName: 'AssetLocked',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetVaultAbi}__ and `eventName` set to `"AssetUnlocked"`
 */
export const useWatchAssetVaultAssetUnlockedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  eventName: 'AssetUnlocked',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetVaultAbi}__ and `eventName` set to `"AssetsDeposited"`
 */
export const useWatchAssetVaultAssetsDepositedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  eventName: 'AssetsDeposited',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetVaultAbi}__ and `eventName` set to `"AssetsWithdrawn"`
 */
export const useWatchAssetVaultAssetsWithdrawnEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  eventName: 'AssetsWithdrawn',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetVaultAbi}__ and `eventName` set to `"IGCDeposited"`
 */
export const useWatchAssetVaultIgcDepositedEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  eventName: 'IGCDeposited',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetVaultAbi}__ and `eventName` set to `"IGCWithdrawn"`
 */
export const useWatchAssetVaultIgcWithdrawnEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  eventName: 'IGCWithdrawn',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetVaultAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchAssetVaultOwnershipTransferredEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  eventName: 'OwnershipTransferred',
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link assetVaultAbi}__ and `eventName` set to `"RevokedCaller"`
 */
export const useWatchAssetVaultRevokedCallerEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: assetVaultAbi,
  address: assetVaultAddress,
  eventName: 'RevokedCaller',
})
