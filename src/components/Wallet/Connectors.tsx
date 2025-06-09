import { InjectedConnector } from '@web3-react/injected-connector'

const POLLING_INTERVAL = 12000

// Supported chain IDs
const supportedChainIds = [1, 3, 4, 5, 42, 137, 80001, 43114, 43113]

export const injected = new InjectedConnector({
  supportedChainIds: supportedChainIds,
})

export const connectorsByName = {
  Injected: injected,
}

export default connectorsByName
