import { createTheme, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { AppContextProvider } from 'contexts/AppContext'
import { WalletContextProvider } from 'contexts/WalletContextProvider'
import Router from 'pages/Router'
import { theme } from 'theme'

// Create a client for React Query (required by LI.FI SDK)
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContextProvider>
        <ThemeProvider theme={createTheme(theme)}>
          <WalletContextProvider>
            <Router />
          </WalletContextProvider>
        </ThemeProvider>
      </AppContextProvider>
    </QueryClientProvider>
  )
}

export default App
