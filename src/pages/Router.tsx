import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box, Typography } from '@mui/material'

import AppLayout from 'layouts/AppLayout'
import Nav from 'components/Nav/Nav'

import EnhancedTransfer from './Enhanced/EnhancedTransfer'
import Redeem from './Redeem/Redeem'
import Transactions from './Transactions/Transactions'

export interface RouteConfig {
  path: string
  label: string
  component: React.ComponentType
  nav: boolean
  fullScreen?: boolean // Add flag for full-screen layout
}

export const routes: RouteConfig[] = [
  {
    path: '/',
    label: 'Send Money',
    component: EnhancedTransfer,
    nav: true,
    fullScreen: true, // Enable full-screen layout
  },
  {
    path: '/redeem',
    label: 'Redeem',
    component: Redeem,
    nav: false,
  },
  {
    path: '/transactions',
    label: 'Transactions',
    component: Transactions,
    nav: false,
  },
]

// Simple test component
const TestComponent = () => (
  <Box
    sx={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
    }}
  >
    <Box sx={{ textAlign: 'center', color: 'white' }}>
      <Typography variant="h2" gutterBottom>
        🌍 Global USDC Platform
      </Typography>
      <Typography variant="h5">System is loading...</Typography>
    </Box>
  </Box>
)

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {routes.map((route) => {
          const Page = route.component
          
          // For full-screen routes, only add Nav without AppLayout padding
          if (route.fullScreen) {
            return (
              <Route 
                key={route.path} 
                path={route.path} 
                element={
                  <div className="flex min-h-screen flex-col">
                    <Nav />
                    <main className="flex-1">
                      <Page />
                    </main>
                  </div>
                } 
              />
            )
          }
          
          // For regular routes, use normal AppLayout
          return (
            <Route 
              key={route.path} 
              path={route.path} 
              element={
                <AppLayout>
                  <Page />
                </AppLayout>
              } 
            />
          )
        })}
      </Routes>
    </BrowserRouter>
  )
}

export default Router
