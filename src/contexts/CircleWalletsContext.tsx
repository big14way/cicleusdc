import type { ReactNode } from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

// Circle SDK types
interface W3SSdkInstance {
  setAppSettings: (settings: { appId: string }) => void
  setAuthentication: (auth: {
    userToken: string
    encryptionKey: string
  }) => void
  execute: (
    challengeId: string,
    callback: (error: Error | null, result: unknown) => void
  ) => void
}

type W3SSdkConstructor = new () => W3SSdkInstance

// Optional import for Circle SDK - will be undefined if not available
let W3SSdk: W3SSdkConstructor | null = null
try {
  // eslint-disable-next-line @typescript-eslint/no-var-requires, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
  W3SSdk = require('@circle-fin/w3s-pw-web-sdk').W3SSdk as W3SSdkConstructor
} catch {
  // Circle SDK not available, will use mock implementation
  W3SSdk = null
}

interface CircleWallet {
  id: string
  address: string
  accountType: string
  blockchain: string
  custodyType: string
  refId?: string
  state: string
  walletSetId: string
  createDate: string
  updateDate: string
}

interface CircleWalletsContextType {
  isConnected: boolean
  isConnecting: boolean
  wallets: CircleWallet[]
  userToken: string | null
  encryptionKey: string | null
  connect: () => Promise<void>
  disconnect: () => void
  createWallet: () => Promise<void>
  executeChallenge: (challengeId: string) => Promise<unknown>
  initializeUser: () => Promise<void>
  setPinCode: () => Promise<void>
  isInitialized: boolean
  hasPinSet: boolean
}

const CircleWalletsContext = createContext<
  CircleWalletsContextType | undefined
>(undefined)

export const useCircleWallets = (): CircleWalletsContextType => {
  const context = useContext(CircleWalletsContext)
  if (context === undefined) {
    throw new Error(
      'useCircleWallets must be used within a CircleWalletsProvider'
    )
  }
  return context
}

interface CircleWalletsProviderProps {
  children: ReactNode
}

// Replace with your actual APP ID from Circle Developer Console
const CIRCLE_APP_ID = process.env.REACT_APP_CIRCLE_APP_ID ?? 'your-app-id-here'

export const CircleWalletsProvider = ({
  children,
}: CircleWalletsProviderProps): JSX.Element => {
  const [sdk, setSdk] = useState<W3SSdkInstance | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isConnecting, setIsConnecting] = useState(false)
  const [wallets, setWallets] = useState<CircleWallet[]>([])
  const [userToken, setUserToken] = useState<string | null>(null)
  const [encryptionKey, setEncryptionKey] = useState<string | null>(null)
  const [isInitialized, setIsInitialized] = useState(false)
  const [hasPinSet, setHasPinSet] = useState(false)

  // Initialize SDK on component mount
  useEffect(() => {
    if (W3SSdk === null || W3SSdk === undefined) {
      // Circle SDK not available, skipping initialization
      return
    }

    try {
      const sdkInstance = new W3SSdk()
      setSdk(sdkInstance)

      // Set app settings
      sdkInstance.setAppSettings({
        appId: CIRCLE_APP_ID,
      })

      // Circle Programmable Wallets SDK initialized
    } catch (error) {
      // Failed to initialize Circle SDK
      throw new Error(
        `Failed to initialize Circle SDK: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }, [])

  // Set authentication when tokens are available
  useEffect(() => {
    if (sdk !== null && userToken !== null && encryptionKey !== null) {
      sdk.setAuthentication({
        userToken,
        encryptionKey,
      })
      setIsConnected(true)
      // Circle SDK authentication set
    }
  }, [sdk, userToken, encryptionKey])

  const connect = async (): Promise<void> => {
    if (sdk === null) {
      throw new Error('SDK not initialized')
    }

    setIsConnecting(true)
    try {
      // For demo purposes, we'll generate mock tokens
      // In a real app, these would come from your backend after user authentication
      const mockUserToken = `demo-user-token-${Date.now()}`
      const mockEncryptionKey = `demo-encryption-key-${Date.now()}`

      await Promise.resolve() // Add await to satisfy linter
      setUserToken(mockUserToken)
      setEncryptionKey(mockEncryptionKey)

      // Circle Wallets connected successfully!
      // Note: In a real implementation, you'd authenticate the user first
      // and receive actual tokens from your backend
    } catch (error) {
      throw new Error(
        `Failed to connect Circle Wallets: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    } finally {
      setIsConnecting(false)
    }
  }

  const disconnect = (): void => {
    setIsConnected(false)
    setUserToken(null)
    setEncryptionKey(null)
    setWallets([])
    setIsInitialized(false)
    setHasPinSet(false)
    // Circle Wallets disconnected
  }

  const executeChallenge = async (challengeId: string): Promise<unknown> => {
    if (sdk === null) {
      throw new Error('SDK not initialized')
    }

    return await new Promise((resolve, reject) => {
      sdk.execute(challengeId, (error: Error | null, result: unknown) => {
        if (error !== null && error !== undefined) {
          reject(error)
          return
        }

        resolve(result)
      })
    })
  }

  const initializeUser = async (): Promise<void> => {
    try {
      // In a real implementation, you would call your backend to initialize the user
      // and get a challenge ID, then execute it

      // Mock implementation
      await Promise.resolve()
      setIsInitialized(true)
    } catch (error) {
      throw new Error(
        `Failed to initialize user: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  const setPinCode = async (): Promise<void> => {
    if (sdk === null) {
      throw new Error('SDK not initialized')
    }

    try {
      // In a real implementation, you would:
      // 1. Call your backend to create a SET_PIN challenge
      // 2. Execute the challenge using the SDK

      // Mock implementation for demo
      await Promise.resolve()
      setHasPinSet(true)
    } catch (error) {
      throw new Error(
        `Failed to set PIN code: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  const createWallet = async (): Promise<void> => {
    if (sdk === null) {
      throw new Error('SDK not initialized')
    }

    try {
      // In a real implementation, you would:
      // 1. Call your backend to create a CREATE_WALLET challenge
      // 2. Execute the challenge using the SDK
      // 3. The wallet would be created on Circle's infrastructure

      // Mock wallet for demo
      await Promise.resolve()
      const mockWallet: CircleWallet = {
        id: `wallet-${Date.now()}`,
        address: `0x${Math.random().toString(16).substring(2, 42)}`,
        accountType: 'SCA',
        blockchain: 'POLY-AMOY',
        custodyType: 'ENDUSER',
        state: 'LIVE',
        walletSetId: `walletset-${Date.now()}`,
        createDate: new Date().toISOString(),
        updateDate: new Date().toISOString(),
      }

      setWallets([...wallets, mockWallet])
    } catch (error) {
      throw new Error(
        `Failed to create wallet: ${
          error instanceof Error ? error.message : 'Unknown error'
        }`
      )
    }
  }

  const value: CircleWalletsContextType = {
    isConnected,
    isConnecting,
    wallets,
    userToken,
    encryptionKey,
    connect,
    disconnect,
    createWallet,
    executeChallenge,
    initializeUser,
    setPinCode,
    isInitialized,
    hasPinSet,
  }

  return (
    <CircleWalletsContext.Provider value={value}>
      {children}
    </CircleWalletsContext.Provider>
  )
}
