/////////////////////////////////////////////////////
/// Navigation Types                              ///
/////////////////////////////////////////////////////

/**
 * Defines props accepted by the Links component.
 */
export interface LinksProps {
  /** Type of menu to be displayed. */
  menu: string

  /** Optional Callback function executed when the link is clicked. */
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}
