import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import { AppContextProvider } from 'contexts/AppContext'
import { WalletContextProvider } from 'contexts/WalletContextProvider'
import Router from 'pages/Router'
import { theme } from 'theme'

// Create a client for React Query (required by LI.FI SDK)
const queryClient = new QueryClient()

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean; error?: Error }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error boundary caught an error:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            padding: '20px',
            background: '#1e3c72',
            color: 'white',
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <h1>🔧 Application Error</h1>
          <p>Something went wrong. Please check the console for details.</p>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '10px 20px',
              background: '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              marginTop: '20px',
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }

    return this.props.children
  }
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <ThemeProvider theme={createTheme(theme)}>
            <WalletContextProvider>
              <Router />
            </WalletContextProvider>
          </ThemeProvider>
        </AppContextProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
