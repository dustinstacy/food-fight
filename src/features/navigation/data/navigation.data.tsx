import { FaHome } from 'react-icons/fa'
import { GiTakeMyMoney } from 'react-icons/gi'
import { IoStorefrontSharp } from 'react-icons/io5'
import { MdAccountBalance } from 'react-icons/md'
import { RiAuctionLine, RiTokenSwapLine } from 'react-icons/ri'

// An arary of page objects used to generate navigation links.
const navLinks = [
  {
    name: 'Home',
    path: '/',
    image: <FaHome />,
  },
  {
    name: 'Shop',
    path: '/shop',
    image: <IoStorefrontSharp />,
  },
  {
    name: 'Trade',
    path: '/trade',
    image: <RiTokenSwapLine />,
  },
  {
    name: 'Auctions',
    path: '/auctions',
    image: <RiAuctionLine />,
  },
  {
    name: 'Rentals',
    path: '/rentals',
    image: <GiTakeMyMoney />,
  },
  {
    name: 'Manage',
    path: '/manage',
    image: <MdAccountBalance />,
  },
]

export default navLinks
