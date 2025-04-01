import { FaHome } from "react-icons/fa"
import { IoStorefrontSharp } from "react-icons/io5"
import { RiAuctionLine, RiTokenSwapLine } from "react-icons/ri"
import { GiTakeMyMoney } from "react-icons/gi"
import { MdAccountBalance } from "react-icons/md"

// An arary of page objects used to generate navigation links.
export const navLinks = [
    {
        name: "Home",
        path: "/",
        image: <FaHome />,
    },
    {
        name: "Shop",
        path: "/shop",
        image: <IoStorefrontSharp />,
    },
    {
        name: "Trade",
        path: "/trade",
        image: <RiTokenSwapLine />,
    },
    {
        name: "Auctions",
        path: "/auctions",
        image: <RiAuctionLine />,
    },
    {
        name: "Rentals",
        path: "/rentals",
        image: <GiTakeMyMoney />,
    },
    {
        name: "Manage",
        path: "/manage",
        image: <MdAccountBalance />,
    },
]
