# Enhanced Multichain USDC Payment System

A comprehensive multichain USDC payment solution built for the **Track 4: Multichain USDC Payment System** hackathon. This application combines the power of Circle's Cross-Chain Transfer Protocol (CCTP), LI.FI's aggregated bridging, MetaMask SDK integration, and automated treasury management features.

![Enhanced USDC Payment System](./docs/screenshot.png)

## 🚀 Features

### 1. **Circle CCTP Integration (Original)**

- Native USDC transfers across supported chains without wrapped tokens
- Direct integration with Circle's Cross-Chain Transfer Protocol
- Supports Ethereum Sepolia, Avalanche Fuji, and Arbitrum Sepolia testnets
- Permissionless and executed on-chain

### 2. **LI.FI Cross-Chain Bridge (Enhanced)**

- Access to 20+ bridges and DEX aggregators
- Optimal routing for best prices and lowest fees
- Support for multiple chains and tokens
- Integrated fee collection (0.5% for our integration)
- Advanced bridging options beyond just USDC

### 3. **MetaMask SDK Integration**

- Seamless wallet connectivity for desktop and mobile
- One-click connection with MetaMask browser extension
- QR code support for MetaMask Mobile
- Real-time wallet status and network information

### 4. **Treasury Management & Rebalancing**

- Visual dashboard for multichain treasury overview
- Real-time balance monitoring across chains
- Automated rebalancing algorithms (demo)
- Gas fee optimization strategies
- Health status monitoring with alerts

## 🏆 Hackathon Track Compliance

**Track 4: Multichain USDC Payment System** requirements:

- ✅ **Multichain USDC payments and payouts**: Implemented via both CCTP and LI.FI
- ✅ **Treasury rebalancing**: Smart rebalancing dashboard with automated features
- ✅ **Swaps**: Integrated through LI.FI's DEX aggregators
- ✅ **Seamless USDC purchases**: Available through LI.FI widget

**Bonus Integrations** ($2,000 each):

- ✅ **MetaMask SDK**: Full integration with wallet management
- ✅ **LI.FI SDK**: Integration with fee collection and custom routing
- 🔄 **Circle Wallets**: _Can be added for additional bonus_

## 🛠 Technology Stack

- **Frontend**: React 18 + TypeScript
- **UI Framework**: Material-UI (MUI)
- **Blockchain Integration**:
  - Circle CCTP for native USDC transfers
  - LI.FI Widget for aggregated bridging
  - MetaMask SDK for wallet connectivity
- **State Management**: React Context + React Query
- **Cross-Chain**: ethers.js for blockchain interactions

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (project uses Node 16 as specified in `.nvmrc`)
- Yarn package manager
- MetaMask browser extension or mobile app

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd hackerthon
```

2. **Install dependencies**

```bash
# Use the correct Node version
nvm use

# Install packages
yarn install
```

3. **Start the development server**

```bash
yarn start
```

The application will be available at `http://localhost:3000`.

## 🎮 Usage Guide

### 1. **Connect Your Wallet**

- Open the application
- Click "Connect MetaMask" in the wallet widget
- Approve the connection in your MetaMask wallet

### 2. **Transfer USDC (Multiple Options)**

#### Option A: Circle CCTP (Tab 1)

- Select source and destination chains
- Enter USDC amount to transfer
- Confirm transaction in MetaMask
- Wait for cross-chain confirmation

#### Option B: LI.FI Bridge (Tab 2)

- Access aggregated bridging options
- Compare routes from multiple bridges
- Execute optimal transfers
- Monitor transaction progress

### 3. **Treasury Management (Tab 3)**

- View multichain balance distribution
- Monitor rebalancing opportunities
- Execute automated rebalancing
- Track gas costs and optimization

## 🔧 Configuration

### LI.FI Widget Settings

```typescript
const widgetConfig: WidgetConfig = {
  integrator: 'multichain-usdc-hackathon',
  fee: 0.005, // 0.5% integration fee
  chains: {
    allow: [1, 10, 137, 42161, 43114], // Main chains
  },
  bridges: {
    allow: ['cctp', 'across', 'stargate', 'hop'],
  },
}
```

### MetaMask SDK Settings

```typescript
<MetaMaskProvider
  sdkOptions={{
    dappMetadata: {
      name: "Multichain USDC Payment System",
      url: window.location.host,
    },
  }}
>
```

## 🌐 Supported Networks

### Mainnet (Configuration Ready)

- Ethereum
- Polygon
- Arbitrum
- Optimism
- Avalanche

### Testnet (Currently Active)

- Ethereum Sepolia
- Avalanche Fuji
- Arbitrum Sepolia

## 🏗 Architecture

```
src/
├── pages/
│   ├── Enhanced/           # Main enhanced transfer page
│   ├── Send/              # Original CCTP transfer
│   └── ...
├── components/
│   ├── MetaMaskWallet/    # MetaMask SDK integration
│   ├── Treasury/          # Treasury management
│   └── ...
├── contexts/              # React contexts for state
└── hooks/                # Custom React hooks
```

## 🔮 Future Enhancements

### Planned Features

- **Real Treasury Integration**: Connect to actual treasury wallets
- **Advanced Analytics**: Transaction cost analysis and reporting
- **Automated Strategies**: Smart rebalancing based on gas prices and liquidity
- **Multi-Token Support**: Extend beyond USDC to other stablecoins
- **API Integration**: RESTful API for programmatic access

### Additional Integrations

- **Circle Wallets**: For embedded wallet experiences
- **Advanced DeFi**: Yield farming and liquidity provision
- **Notification System**: Real-time alerts for rebalancing opportunities

## 🏆 Hackathon Submission

### What We Built

- **Enhanced CCTP Integration**: Built upon Circle's sample app
- **LI.FI Widget Integration**: Drop-in cross-chain functionality
- **MetaMask SDK Integration**: Seamless wallet connectivity
- **Treasury Dashboard**: Visual treasury management interface
- **Modern UI/UX**: Polished interface with Material-UI

### Innovation Points

1. **Hybrid Approach**: Combines native CCTP with aggregated bridging
2. **Treasury Intelligence**: Smart rebalancing with cost optimization
3. **User Experience**: One-stop shop for all USDC payment needs
4. **Integration Depth**: Multiple bonus integrations for additional rewards

### Technical Achievements

- Zero-to-deployment in hours using existing Circle foundation
- Seamless integration of multiple complex protocols
- Production-ready UI with responsive design
- Extensible architecture for future enhancements

## 📄 License

This project builds upon Circle's CCTP Sample App and is licensed under the Apache-2.0 License.

## 🤝 Contributing

This is a hackathon submission project. For questions or collaboration opportunities, please reach out to the development team.

---

**Built for Track 4: Multichain USDC Payment System Hackathon** _Integrating Circle CCTP, LI.FI, and MetaMask for the ultimate USDC payment experience_

# CCTP Sample App

A sample app used to demonstrate CCTP step by step capabilities on testnet. The app currently supports Ethereum Sepolia, Avalanche Fuji C-Chain, and Arbitrum Sepolia testnets.

![](./docs/screenshot.png)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Setup

## Install dependencies

Install NVM

```
# Install nvm using brew
brew install nvm
# Or install it manually
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.38.0/install.sh | bash
```

Use the correct node version (version found in .nvmrc)

```
nvm use
```

Install npm dependencies

```
yarn install
```

## Running the app

Run the sample app locally:

```
yarn start
```

The sample app will now be running on: http://localhost:3000.

## Testing

Launch the test runner in interactive watch mode

```
yarn test
```

Run tests with test converage.

```
yarn test:unit:coverage
```

### Linting/Formatting/Type Checks

We use eslint, prettier and typescript to validate our code. In combination with husky and lint-staged, we run a check on every precommit on staged changes.

You can also use `yarn check-all` or `yarn fix-all` to validate or fix all lint/format/typing issues. See [package.json](./package.json) for more details.

### Continuous Integration using Github Actions

We use Github actions to run linter and all the tests. The workflow configuration can be found in [github/workflows/ci.yml](./.github/workflows/ci.yml)

### Build and deploy

Build the app into static bundle

```
yarn build
```

To deploy, install and run `serve`

```
yarn global add serve serve -s build
```

See [deployment docs](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Instructions

## Adding a new chain

We have two config files which will be need to be updated to add a new chain support.

1. Add the chain enum and definitions

- In `./src/constants/chains.ts`, we need to add some enums and details for the chain to support. Add the new chain details to `Chain`, `SupportedChainId`, `SupportedChainIdHex`, `CHAIN_TO_CHAIN_ID`, `CHAIN_TO_CHAIN_NAME`, `DestinationDomain` and `CHAIN_ID_HEXES_TO_PARAMETERS`.

2. Add the addresses for the new chain

- In `./src/constants/addresses.ts`, we need to add the contract addresses for the new chain to support. For `CHAIN_IDS_TO_USDC_ADDRESSES`, `CHAIN_IDS_TO_TOKEN_MESSENGER_ADDRESSES` and `CHAIN_IDS_TO_MESSAGE_TRANSMITTER_ADDRESSES`, add the coressponding addresses for the new chain. This will allow the hooks to interact with the relevant addresses

3. Add the logo for the new chain

- We will also need to upload a svg image for the UI to display the chain logo. In `./src/assets/chains/`, add a svg logo for the new chain and then in `index.ts`, add the new icon to the `CHAIN_ICONS` map.

4. Add the new chain to the form dropdown selector

- In `./components/Send/SendForm.tsx`, Add the new chain to `CHAIN_SELECT_ITEMS` and this should automatically update the UI dropdown.

## Configuration for Mainnet

This sample app is development for testnet use, but if we want to update this for mainnet, these are the steps needed.

1. Update the chain definitions to mainnet

- In `./src/constants/chains.ts`, update the `SupportedChainId`, `SupportedChainIdHex` and `ChainParameter` objects with mainnet values. We may want to rename the enums as well.

2. Update the addresses to mainnet

- In `./src/constants/addresses.ts`, update the addresses with mainnet addresses. The mainnet address values can be found on https://developers.circle.com/stablecoin/docs.cctp-protocol-contract.

3. Update the attestation API URL

- In `./src/constants/index.ts`, update `IRIS_ATTESTATION_API_URL` with the mainnet value. The mainnet API url can be found on https://developers.circle.com/stablecoin/docs/cctp-getting-started#attestation-service-api.

## Setup Typechain

We use Typechain in this sample app to easily integrate smart contract with generated Typescript bindings. If we want to add some functionality and update the abis, we can update the abis as necessary in `./src/abis` and then run the following command to update the generated files.

```
typechain --target=ethers-v5 --out-dir src/typechain src/abis/*.json
```

This generates `typechain` folder under `src` containing contract types to be used by our hooks
