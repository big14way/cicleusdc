import React, { createContext, useContext, useState, useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'

// Types for our global remittance platform
interface MetaMaskCardState {
  isActive: boolean
  balance: number
  monthlySpent: number
  cashbackEarned: number
  lastReload: Date | null
}

interface SmartAccountState {
  isCreated: boolean
  address: string | null
  delegations: Delegation[]
  gaslessTxCount: number
  totalGasSaved: number
}

interface Delegation {
  id: string
  type: 'auto-reload' | 'spend-limit' | 'cross-chain' | 'emergency'
  description: string
  enabled: boolean
  limit: string
  frequency: string
  createdAt: Date
}

interface RemittanceTransaction {
  id: string
  from: string
  to: string
  amount: number
  fromChain: string
  toChain: string
  status: 'pending' | 'completed' | 'failed'
  txHash?: string
  timestamp: Date
  fees: number
  route: string[]
}

interface GlobalRemittanceState {
  // User state
  isConnected: boolean
  userAddress: string | null

  // MetaMask Card
  card: MetaMaskCardState

  // Smart Account (DTK)
  smartAccount: SmartAccountState

  // Transactions
  transactions: RemittanceTransaction[]

  // Platform stats
  totalVolumeUSD: number
  totalUsersSaved: number
  averageFee: number
}

interface GlobalRemittanceContextType {
  state: GlobalRemittanceState
  actions: {
    // Card actions
    activateCard: () => Promise<void>
    reloadCard: (amount: number) => Promise<void>

    // Smart account actions
    createSmartAccount: () => Promise<void>
    createDelegation: (type: Delegation['type']) => Promise<void>
    toggleDelegation: (id: string) => void

    // Remittance actions
    sendRemittance: (
      to: string,
      amount: number,
      fromChain: string,
      toChain: string
    ) => Promise<void>

    // Stats
    updateStats: () => void
  }
}

const GlobalRemittanceContext =
  createContext<GlobalRemittanceContextType | null>(null)

// Initial state
const initialState: GlobalRemittanceState = {
  isConnected: false,
  userAddress: null,
  card: {
    isActive: false,
    balance: 0,
    monthlySpent: 0,
    cashbackEarned: 0,
    lastReload: null,
  },
  smartAccount: {
    isCreated: false,
    address: null,
    delegations: [
      {
        id: 'emergency',
        type: 'emergency',
        description: 'Emergency delegation revocation for security',
        enabled: true,
        limit: 'All permissions',
        frequency: 'instant',
        createdAt: new Date(),
      },
    ],
    gaslessTxCount: 0,
    totalGasSaved: 0,
  },
  transactions: [],
  totalVolumeUSD: 2487350,
  totalUsersSaved: 12847,
  averageFee: 0.23,
}

export const GlobalRemittanceProvider: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { account, active } = useWeb3React()
  const [state, setState] = useState<GlobalRemittanceState>(initialState)

  // Update connection state when wallet connects/disconnects
  useEffect(() => {
    setState((prev) => ({
      ...prev,
      isConnected: active,
      userAddress: account || null,
    }))

    // Simulate loading user data when wallet connects
    if (active && account) {
      loadUserData()
    }
  }, [active, account])

  // Load user data (simulate fetching from backend/blockchain)
  const loadUserData = async () => {
    // Simulate checking if user has existing card/smart account
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Simulate some existing user data
    setState((prev) => ({
      ...prev,
      card: {
        ...prev.card,
        isActive: Math.random() > 0.5, // 50% chance user has active card
        balance: Math.random() * 500 + 50, // Random balance 50-550
        monthlySpent: Math.random() * 1000,
        cashbackEarned: Math.random() * 50,
      },
    }))
  }

  // Card actions
  const activateCard = async () => {
    setState((prev) => ({
      ...prev,
      card: { ...prev.card, isActive: true },
    }))

    // Simulate card activation process
    await new Promise((resolve) => setTimeout(resolve, 2000))
    console.log('MetaMask Card activated!')
  }

  const reloadCard = async (amount: number) => {
    setState((prev) => ({
      ...prev,
      card: {
        ...prev.card,
        balance: prev.card.balance + amount,
        lastReload: new Date(),
      },
    }))

    // If smart account exists and auto-reload delegation is enabled, make it gasless
    const autoReloadEnabled = state.smartAccount.delegations.find(
      (d) => d.type === 'auto-reload' && d.enabled
    )

    if (autoReloadEnabled && state.smartAccount.isCreated) {
      setState((prev) => ({
        ...prev,
        smartAccount: {
          ...prev.smartAccount,
          gaslessTxCount: prev.smartAccount.gaslessTxCount + 1,
          totalGasSaved: prev.smartAccount.totalGasSaved + Math.random() * 5,
        },
      }))
    }

    console.log(`Card reloaded with $${amount}`)
  }

  // Smart account actions
  const createSmartAccount = async () => {
    setState((prev) => ({
      ...prev,
      smartAccount: {
        ...prev.smartAccount,
        isCreated: false, // Set to false during creation
      },
    }))

    // Simulate smart account creation
    await new Promise((resolve) => setTimeout(resolve, 3000))

    const smartAddress = `0xSmart${account?.slice(-6)}`
    setState((prev) => ({
      ...prev,
      smartAccount: {
        ...prev.smartAccount,
        isCreated: true,
        address: smartAddress,
      },
    }))

    console.log('Smart account created:', smartAddress)
  }

  const createDelegation = async (type: Delegation['type']) => {
    const newDelegation: Delegation = {
      id: `${type}-${Date.now()}`,
      type,
      description: getDelegationDescription(type),
      enabled: true,
      limit: getDelegationLimit(type),
      frequency: getDelegationFrequency(type),
      createdAt: new Date(),
    }

    setState((prev) => ({
      ...prev,
      smartAccount: {
        ...prev.smartAccount,
        delegations: [...prev.smartAccount.delegations, newDelegation],
        gaslessTxCount: prev.smartAccount.gaslessTxCount + 1,
        totalGasSaved: prev.smartAccount.totalGasSaved + Math.random() * 3,
      },
    }))

    console.log('Delegation created:', newDelegation)
  }

  const toggleDelegation = (id: string) => {
    setState((prev) => ({
      ...prev,
      smartAccount: {
        ...prev.smartAccount,
        delegations: prev.smartAccount.delegations.map((d) =>
          d.id === id ? { ...d, enabled: !d.enabled } : d
        ),
        gaslessTxCount: prev.smartAccount.gaslessTxCount + 1,
        totalGasSaved: prev.smartAccount.totalGasSaved + Math.random() * 2,
      },
    }))
  }

  // Remittance actions
  const sendRemittance = async (
    to: string,
    amount: number,
    fromChain: string,
    toChain: string
  ) => {
    const transaction: RemittanceTransaction = {
      id: `tx-${Date.now()}`,
      from: account || '',
      to,
      amount,
      fromChain,
      toChain,
      status: 'pending',
      timestamp: new Date(),
      fees: amount * 0.002, // 0.2% fee
      route: ['LI.FI', 'Circle CCTP'],
    }

    setState((prev) => ({
      ...prev,
      transactions: [transaction, ...prev.transactions],
    }))

    // Simulate transaction processing
    setTimeout(() => {
      setState((prev) => ({
        ...prev,
        transactions: prev.transactions.map((tx) =>
          tx.id === transaction.id
            ? {
                ...tx,
                status: 'completed',
                txHash: `0x${Math.random().toString(16).slice(2, 42)}`,
              }
            : tx
        ),
      }))

      // Add cashback if card is active
      if (state.card.isActive) {
        setState((prev) => ({
          ...prev,
          card: {
            ...prev.card,
            cashbackEarned: prev.card.cashbackEarned + amount * 0.01, // 1% cashback
          },
        }))
      }

      // Check if auto-reload should trigger
      checkAutoReload()
    }, 3000)

    console.log('Remittance sent:', transaction)
  }

  // Auto-reload logic
  const checkAutoReload = () => {
    const autoReloadDelegation = state.smartAccount.delegations.find(
      (d) => d.type === 'auto-reload' && d.enabled
    )

    if (
      autoReloadDelegation &&
      state.card.balance < 50 &&
      state.smartAccount.isCreated
    ) {
      // Automatically reload card
      setTimeout(() => {
        reloadCard(200) // Reload with $200
      }, 1000)
    }
  }

  // Update stats
  const updateStats = () => {
    setState((prev) => ({
      ...prev,
      totalVolumeUSD: prev.totalVolumeUSD + Math.random() * 10000,
      totalUsersSaved: prev.totalUsersSaved + Math.floor(Math.random() * 10),
      averageFee: 0.15 + Math.random() * 0.3,
    }))
  }

  // Real-time updates
  useEffect(() => {
    if (state.smartAccount.isCreated) {
      const interval = setInterval(() => {
        setState((prev) => ({
          ...prev,
          smartAccount: {
            ...prev.smartAccount,
            gaslessTxCount:
              prev.smartAccount.gaslessTxCount + Math.floor(Math.random() * 2),
            totalGasSaved:
              prev.smartAccount.totalGasSaved + Math.random() * 1.5,
          },
        }))
      }, 20000)

      return () => clearInterval(interval)
    }
  }, [state.smartAccount.isCreated])

  const contextValue: GlobalRemittanceContextType = {
    state,
    actions: {
      activateCard,
      reloadCard,
      createSmartAccount,
      createDelegation,
      toggleDelegation,
      sendRemittance,
      updateStats,
    },
  }

  return (
    <GlobalRemittanceContext.Provider value={contextValue}>
      {children}
    </GlobalRemittanceContext.Provider>
  )
}

// Helper functions
const getDelegationDescription = (type: Delegation['type']): string => {
  switch (type) {
    case 'auto-reload':
      return 'Auto-reload MetaMask Card when USDC balance < $50'
    case 'spend-limit':
      return 'Smart spending limits for remittance transactions'
    case 'cross-chain':
      return 'Automated cross-chain USDC rebalancing via LI.FI'
    case 'emergency':
      return 'Emergency delegation revocation for security'
  }
}

const getDelegationLimit = (type: Delegation['type']): string => {
  switch (type) {
    case 'auto-reload':
      return '$500'
    case 'spend-limit':
      return '$1000'
    case 'cross-chain':
      return 'Unlimited'
    case 'emergency':
      return 'All permissions'
  }
}

const getDelegationFrequency = (type: Delegation['type']): string => {
  switch (type) {
    case 'auto-reload':
      return 'daily'
    case 'spend-limit':
      return 'weekly'
    case 'cross-chain':
      return 'as needed'
    case 'emergency':
      return 'instant'
  }
}

// Hook to use the context
export const useGlobalRemittance = () => {
  const context = useContext(GlobalRemittanceContext)
  if (!context) {
    throw new Error(
      'useGlobalRemittance must be used within GlobalRemittanceProvider'
    )
  }
  return context
}

export default GlobalRemittanceContext
