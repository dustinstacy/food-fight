////////////////////////////////////////////
/// Asset Display Types             ///
////////////////////////////////////////////

/**
 * Defines the structure of the asset data.
 */
export interface AssetInfo {
  uri: string
  price: bigint
}

/**
 * Defines the props accepted by the AssetDisplay component.
 */
export interface AssetDisplayCardProps {
  assetId: bigint
}
