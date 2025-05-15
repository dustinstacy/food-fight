/**
 * Define the form field option structure
 */
export interface FormFieldOption {
  /** The unique identifier for the option */
  value: string

  /** The label to be displayed for the option */
  label: string
}

/**
 * Define the form field structure
 */
export interface FormField {
  /** The unique identifier for the form field */
  id: string

  /** The label to be displayed for the form field */
  label: string

  /** The type of input for the form field */
  type: 'text' | 'textarea' | 'number' | 'url' | 'file' | 'select'

  /** Indicates if the field is required */
  required: boolean

  /** The tooltip text to be displayed for the form field */
  tooltip?: string

  /** The default value for the form field */
  placeholder?: string

  /** Determines if the field is a file input */
  accept?: string

  /** The minimum value for number inputs */
  min?: number

  /** The options for select inputs */
  options?: FormFieldOption[] | string[]

  /** Indicates if the field is an attribute */
  isAttribute?: boolean

  /** The type of the field if it is an attribute */
  trait_type?: string
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

/**
 * Define the structure of the Pinata response
 */
export interface BackendPinataResponse {
  /** The status message of the upload */
  message: string

  /** The hash of the uploaded file */
  cid: string

  /** The URL of the uploaded file on Pinata */
  pinataUrl: string
}

export interface UploadedAsset {
  /** The unique identifier for the asset */
  assetId: number

  /** The price of the asset */
  price: number

  /** The uri of the asset */
  uri: string
}
