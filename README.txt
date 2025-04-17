## License

The MIT License (MIT)
# Food Fight 🍔⚔️

A Web3 collectible card game built with Next.js and React. Connect your wallet, manage your profile, collect NFT cards, and engage in purchasing, trading, auctions, and rentals!

## Features

**Current:**

* **Modern Tech Stack:** Built with Next.js 15 (App Router), React 19, and TypeScript 5.
* **Wallet Connection:** Connect using various wallets via Reown AppKit (supporting MetaMask, WalletConnect, etc.).
* **User Sessions:** User state linked to connected wallet address via Zustand and a custom backend API.
* **Profile Management:** Basic user profile updates (username, image) via API calls.
* **Theming:** Light and Dark mode support, respecting OS preference with a manual override toggle. Implemented using CSS Variables and Zustand.
* **Responsive Design:** Styles adapt to different screen sizes using Sass and media queries.
* **Code Quality:** Linting with ESLint (Flat Config) and formatting with Prettier integrated.

**Planned/Upcoming:**

* Core NFT Card collecting mechanics.
* Marketplace features:
    * NFT Purchasing
    * NFT Trading (Peer-to-peer or platform)
    * NFT Auctions
    * NFT Rentals
* Core gameplay loop (card battles, strategy, etc.).
* Expanded user profiles and inventory management.

## Tech Stack

* **Framework:** [Next.js](https://nextjs.org/) 15 (App Router)
* **UI Library:** [React](https://react.dev/) 19
* **Language:** [TypeScript](https://www.typescriptlang.org/) 5
* **Wallet Connection:** [Wagmi](https://wagmi.sh/) via [@reown/appkit-adapter-wagmi](https://reown.com/) (formerly WalletConnect)
* **State Management:** [Zustand](https://github.com/pmndrs/zustand), React Context (for providers)
* **Web3:** [ethers.js](https://docs.ethers.org/v6/) v6, [viem](https://viem.sh/) (peer dep of wagmi)
* **Styling:** [Sass](https://sass-lang.com/) (.scss), CSS Variables, Utility Classes
* **UI Components:** [Material UI (MUI)](https://mui.com/) (Core components like Switch), Custom components
* **Animation:** [Framer Motion](https://www.framer.com/motion/)
* **Linting:** [ESLint](https://eslint.org/) 9 (Flat Config) with Next.js, TypeScript, JSX-A11y, Import plugins.
* **Formatting:** [Prettier](https://prettier.io/)
* **API Interaction:** Custom backend API (using `customFetch` utility)

## Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) 
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1.  **Clone the repository:**
    ```bash
    git clone <your-repo-url>
    cd food-fight
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    # or
    # yarn install
    ```
3.  **Set up Environment Variables:**
    Create a `.env.local` file in the project root (copy `.env.example` if one exists). You will need:
    * `NEXT_PUBLIC_REOWN_PROJECT_ID`: Your project ID obtained from the [Reown Cloud Dashboard](https://reown.com/). Required for WalletConnect functionality.
    * `NEXT_PUBLIC_API_BASE_URL`: The base URL for your backend API (defaults to `http://localhost:5000` if not set).

### Running the Development Server

1.  **Start the frontend:**
    ```bash
    npm run dev
    # or
    # yarn dev
    ```
2.  Open [http://localhost:3000](http://localhost:3000) (or your configured port) in your browser.

*Note: If a backend service is required, ensure it is running. The `make start:all` command might handle starting multiple services (see Makefile).*

## Available Scripts

* **`npm run dev`**: Starts the Next.js development server.
* **`npm run build`**: Creates an optimized production build.
* **`npm run start`**: Starts the production server (requires `build` first).
* **`npm run lint`**: Runs ESLint to check for code quality and style issues. Use `npm run lint -- --fix` to automatically fix issues.
* **`npm run format`**: Runs Prettier to format the codebase.
* **`make start:all`**: Custom command (defined in `Makefile`)

## Project Structure (Brief Overview)