////////////////////////////////////////////
/// Asset Card Types                     ///
////////////////////////////////////////////

/**
 * Defines the props accepted by the AssetCard component.
 */
export interface AssetCardProps {
  assetId: bigint
}

/**
 * Defines the structure of the asset data.
 */
export interface AssetInfo {
  uri: string
  price: bigint
}

/**
 * Define the structure of a metadata attribute
 */
export interface NftAttribute {
  /** The unique identifier for the attribute */
  trait_type: string

  /** The value of the attribute */
  value: string | number

  /** The display type of the attribute */
  display_type?: string
}

/**
 * Define the structure of Nft metadata
 */
export interface NftMetadata {
  /** The unique identifier for the asset */
  name: string

  /** The description of the asset */
  description: string

  /** The image URL of the asset */
  image: string

  /** Optional external URL of the asset */
  external_url?: string

  /** Attributes of the asset */
  attributes: NftAttribute[]
}
