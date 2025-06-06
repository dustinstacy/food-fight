import { FormField } from 'devtools/types'

// This file contains the structure of the NFT assets
const nftAssetStructure: FormField[] = [
  {
    id: 'name',
    label: 'Name',
    type: 'text',
    required: true,
    isAttribute: false,
  },
  {
    id: 'description',
    label: 'Description',
    type: 'textarea',
    required: true,
    isAttribute: false,
  },
  {
    id: 'imageUpload',
    label: 'Image',
    type: 'file',
    required: true,
    accept: 'image/png, image/jpeg, image/gif, image/svg+xml',
    isAttribute: false,
  },
  {
    id: 'externalUrl',
    label: 'External URL',
    type: 'url',
    required: false,
    isAttribute: false,
  },
  {
    id: 'health',
    label: 'Health',
    type: 'number',
    required: true,
    min: 1,
    isAttribute: true,
    trait_type: 'Health',
    display_type: 'number',
  },
  {
    id: 'attack',
    label: 'Attack',
    type: 'number',
    required: true,
    min: 0,
    isAttribute: true,
    trait_type: 'Attack',
    display_type: 'number',
  },
  {
    id: 'rarity',
    label: 'Rarity',
    type: 'select',
    required: true,
    options: ['', 'Common', 'Uncommon'],
    isAttribute: true,
    trait_type: 'Rarity',
  },
  {
    id: 'foodGroup',
    label: 'Food Group',
    type: 'select',
    required: true,
    options: ['', 'Fruit', 'Vegetable'],
    isAttribute: true,
    trait_type: 'Food Group',
  },
]

export default nftAssetStructure
