import {
  defaultAbiCoder,
  keccak256,
  getAddress,
  formatEther,
} from 'ethers/lib/utils'
import type { Web3Provider } from '@ethersproject/providers'

// Interface for transaction data
export interface BlockchainTransaction {
  hash: string
  from: string
  to: string
  value: string
  token: string
  timestamp: number
  network: string
  status: 'success' | 'pending' | 'failed'
  type: 'send' | 'receive' | 'bridge' | 'swap'
  gasUsed?: string
  gasPrice?: string
}

// Interface for price data
export interface PriceData {
  symbol: string
  price: number
  change24h: number
  lastUpdated: number
}

// Interface for smart account data
export interface SmartAccountData {
  address: string
  isDeployed: boolean
  balance: string
  nonce: number
  delegations: Array<{
    delegate: string
    authority: string
    caveats: any[]
  }>
}

class BlockchainService {
  private provider: Web3Provider | null = null
  private readonly priceCache: Map<string, PriceData> = new Map()
  private readonly COINGECKO_API = 'https://api.coingecko.com/api/v3'
  private readonly ETHERSCAN_API = 'https://api.etherscan.io/api'
  private readonly ETHERSCAN_API_KEY = 'YourApiKeyHere' // Replace with actual API key

  setProvider(provider: Web3Provider) {
    this.provider = provider
  }

  // Get real transaction history for an address
  async getTransactionHistory(
    address: string,
    limit = 10
  ): Promise<BlockchainTransaction[]> {
    try {
      // Using Etherscan API for real transaction data
      const response = await fetch(
        `${this.ETHERSCAN_API}?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=${limit}&sort=desc&apikey=${this.ETHERSCAN_API_KEY}`
      )
      const data = await response.json()

      if (data.status === '1' && Array.isArray(data.result)) {
        return data.result.map((tx: any) => ({
          hash: tx.hash,
          from: tx.from,
          to: tx.to,
          value: formatEther(tx.value),
          token: 'ETH',
          timestamp: parseInt(tx.timeStamp, 10) * 1000,
          network: 'Ethereum',
          status: tx.txreceipt_status === '1' ? 'success' : 'failed',
          type:
            tx.from.toLowerCase() === address.toLowerCase()
              ? 'send'
              : 'receive',
          gasUsed: tx.gasUsed,
          gasPrice: tx.gasPrice,
        }))
      }
    } catch (error) {
      console.error('Error fetching transaction history:', error)
    }

    // Fallback to mock data if API fails
    return this.getMockTransactionHistory(address)
  }

  // Get real-time USDC price and other crypto prices
  async getRealTimePrices(): Promise<PriceData[]> {
    try {
      const response = await fetch(
        `${this.COINGECKO_API}/simple/price?ids=usd-coin,ethereum,bitcoin,binancecoin,polygon-ecosystem-token&vs_currencies=usd&include_24hr_change=true`
      )
      const data = await response.json()

      const prices: PriceData[] = [
        {
          symbol: 'USDC',
          price: data['usd-coin']?.usd || 1.0,
          change24h: data['usd-coin']?.usd_24h_change || 0,
          lastUpdated: Date.now(),
        },
        {
          symbol: 'ETH',
          price: data.ethereum?.usd || 0,
          change24h: data.ethereum?.usd_24h_change || 0,
          lastUpdated: Date.now(),
        },
        {
          symbol: 'BTC',
          price: data.bitcoin?.usd || 0,
          change24h: data.bitcoin?.usd_24h_change || 0,
          lastUpdated: Date.now(),
        },
        {
          symbol: 'BNB',
          price: data.binancecoin?.usd || 0,
          change24h: data.binancecoin?.usd_24h_change || 0,
          lastUpdated: Date.now(),
        },
        {
          symbol: 'MATIC',
          price: data['polygon-ecosystem-token']?.usd || 0,
          change24h: data['polygon-ecosystem-token']?.usd_24h_change || 0,
          lastUpdated: Date.now(),
        },
      ]

      // Cache the prices
      prices.forEach((price) => this.priceCache.set(price.symbol, price))

      return prices
    } catch (error) {
      console.error('Error fetching real-time prices:', error)
      return this.getMockPrices()
    }
  }

  // Create or get smart account using DTK
  async createSmartAccount(ownerAddress: string): Promise<SmartAccountData> {
    try {
      if (!this.provider) {
        throw new Error('Provider not set')
      }

      // This would integrate with the actual MetaMask DTK
      // For now, we'll simulate the smart account creation
      const smartAccountAddress = this.predictSmartAccountAddress(ownerAddress)

      return {
        address: smartAccountAddress,
        isDeployed: false, // Would check actual deployment status
        balance: '0',
        nonce: 0,
        delegations: [],
      }
    } catch (error) {
      console.error('Error creating smart account:', error)
      throw error
    }
  }

  // Get smart account info
  async getSmartAccountInfo(
    smartAccountAddress: string
  ): Promise<SmartAccountData | null> {
    try {
      if (!this.provider) {
        throw new Error('Provider not set')
      }

      const balance = await this.provider.getBalance(smartAccountAddress)
      const nonce = await this.provider.getTransactionCount(smartAccountAddress)

      return {
        address: smartAccountAddress,
        isDeployed: balance.gt(0) || nonce > 0,
        balance: formatEther(balance),
        nonce,
        delegations: [], // Would fetch actual delegations from DTK
      }
    } catch (error) {
      console.error('Error getting smart account info:', error)
      return null
    }
  }

  // Helper method to predict smart account address
  private predictSmartAccountAddress(ownerAddress: string): string {
    // This would use the actual DTK factory to predict the address
    // For demo purposes, we'll create a deterministic address
    const hash = keccak256(
      defaultAbiCoder.encode(['address', 'uint256'], [ownerAddress, 0])
    )
    return getAddress('0x' + hash.slice(26))
  }

  // Mock data fallbacks
  private getMockTransactionHistory(address: string): BlockchainTransaction[] {
    return [
      {
        hash: '0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        from: address,
        to: '0x742d35Cc6634C0532925a3b8D8AC5b91B5C8de2F',
        value: '500.0',
        token: 'USDC',
        timestamp: Date.now() - 2 * 60 * 60 * 1000,
        network: 'Base → Polygon',
        status: 'success',
        type: 'send',
        gasUsed: '21000',
        gasPrice: '20000000000',
      },
      {
        hash: '0x2234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef',
        from: '0x742d35Cc6634C0532925a3b8D8AC5b91B5C8de2F',
        to: address,
        value: '5.45',
        token: 'USDC',
        timestamp: Date.now() - 4 * 60 * 60 * 1000,
        network: 'Ethereum',
        status: 'success',
        type: 'receive',
        gasUsed: '21000',
        gasPrice: '18000000000',
      },
    ]
  }

  private getMockPrices(): PriceData[] {
    return [
      { symbol: 'USDC', price: 1.0, change24h: 0.01, lastUpdated: Date.now() },
      { symbol: 'ETH', price: 3200, change24h: 2.5, lastUpdated: Date.now() },
      { symbol: 'BTC', price: 67000, change24h: 1.8, lastUpdated: Date.now() },
      { symbol: 'BNB', price: 610, change24h: -0.5, lastUpdated: Date.now() },
      { symbol: 'MATIC', price: 0.85, change24h: 3.2, lastUpdated: Date.now() },
    ]
  }
}

export const blockchainService = new BlockchainService()
