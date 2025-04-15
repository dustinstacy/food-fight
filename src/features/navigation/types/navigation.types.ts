export interface LinksProps {
  // Identifier for the menu context (e.g., 'navbar', 'burger-menu'), used for styling. (Required)
  menu: string
  // Optional click handler passed down to each individual link element.
  onClick?: (e: React.MouseEvent<HTMLAnchorElement>) => void
}
