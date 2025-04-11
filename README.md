<h1 align="center">
Food Fight 🍔⚔️
</h1>

<p align="center">
  <img alt="GitHub Issues or Pull Requests" src="https://img.shields.io/github/issues/dustinstacy/food-fight">
  <a href="./#license"><img src="https://img.shields.io/badge/License-MIT-brightgreen"/></a>
</p>

<p align="center">
  <a href="#description">Description</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#license">License</a>
</p>

---

## Description

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
* Integration of DeFi elements
* Seasonal embership
* Active participation rewards

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

## License

The MIT License (MIT)

