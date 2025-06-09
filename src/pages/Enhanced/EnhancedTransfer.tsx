import type React from 'react'
import { useState } from 'react'

import {
  Alert,
  Box,
  Chip,
  Paper,
  Tab,
  Tabs,
  Typography,
  useTheme,
  useMediaQuery,
  Slide,
} from '@mui/material'

import ComprehensiveDashboard from '../../components/Dashboard/ComprehensiveDashboard'
import Send from '../Send/Send'
import MetaMaskCardWidget from '../../components/MetaMaskCard/MetaMaskCardWidget'
import LiFiWidgetComponent from '../../components/LiFiWidget/LiFiWidget'
import DelegationIntegration from '../../components/DelegationToolkit/DelegationIntegration'
import TreasuryRebalancer from '../../components/Treasury/TreasuryRebalancer'

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`enhanced-tabpanel-${index}`}
      aria-labelledby={`enhanced-tab-${index}`}
      {...other}
      style={{ height: '100%', overflow: 'auto' }}
    >
      {value === index && (
        <Slide direction="up" in={value === index} mountOnEnter unmountOnExit>
          <Box sx={{ height: '100%', p: { xs: 2, md: 3 } }}>{children}</Box>
        </Slide>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `enhanced-tab-${index}`,
    'aria-controls': `enhanced-tabpanel-${index}`,
  }
}

const EnhancedTransfer: React.FC = () => {
  const [value, setValue] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <Box
        sx={{
          zIndex: 2,
          py: { xs: 2, md: 3 },
          px: { xs: 2, md: 4 },
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <Typography
          variant={isMobile ? 'h4' : 'h3'}
          component="h1"
          gutterBottom
          fontWeight="bold"
          sx={{
            color: 'white',
            textShadow: '0 2px 4px rgba(0,0,0,0.5)',
            mb: 1,
          }}
        >
          🌍 Global USDC Remittance Platform
        </Typography>
        <Typography
          variant={isMobile ? 'body1' : 'h6'}
          sx={{
            color: 'rgba(255, 255, 255, 0.95)',
            mb: 2,
            fontWeight: 500,
          }}
        >
          Send money globally with MetaMask Card rewards and instant cross-chain
          transfers
        </Typography>

        {/* Features Badge */}
        <Box>
          <Chip
            label="💳 MetaMask Card Integration"
            sx={{
              mr: 1,
              mb: 1,
              fontWeight: 700,
              background: 'linear-gradient(135deg, #4caf50 0%, #45a049 100%)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.85rem',
            }}
          />
          <Chip
            label="⚡ Cross-Chain Transfers"
            sx={{
              fontWeight: 700,
              mb: 1,
              background: 'linear-gradient(135deg, #ff9800 0%, #f57c00 100%)',
              color: 'white',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              fontSize: '0.85rem',
            }}
          />
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', zIndex: 2 }}
      >
        <Paper
          elevation={12}
          sx={{
            flex: 1,
            mx: { xs: 1, md: 2 },
            mb: { xs: 1, md: 2 },
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow:
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(5px)',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              variant={isMobile ? 'scrollable' : 'fullWidth'}
              scrollButtons="auto"
              sx={{
                minHeight: isMobile ? 56 : 64,
                '& .MuiTab-root': {
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: isMobile ? '0.85rem' : '0.95rem',
                  minHeight: isMobile ? 56 : 64,
                  color: '#424242',
                  letterSpacing: '0.02em',
                  '&:hover': {
                    backgroundColor: 'rgba(25, 118, 210, 0.15)',
                    transform: 'translateY(-1px)',
                    color: '#1976d2',
                    backdropFilter: 'blur(10px)',
                  },
                  '&.Mui-selected': {
                    background: 'rgba(25, 118, 210, 0.2)',
                    color: '#1976d2',
                    fontWeight: 800,
                    backdropFilter: 'blur(15px)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.4)',
                  },
                },
                '& .MuiTabs-indicator': {
                  height: 4,
                  borderRadius: '4px 4px 0 0',
                  background:
                    'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
                  boxShadow: '0 2px 4px rgba(25, 118, 210, 0.3)',
                },
              }}
            >
              <Tab label="📊 Dashboard" {...a11yProps(0)} />
              <Tab label="💳 MetaMask Card" {...a11yProps(1)} />
              <Tab label="🤖 Smart Account" {...a11yProps(2)} />
              <Tab label="💸 Send USDC" {...a11yProps(3)} />
              <Tab label="🔄 Bridge" {...a11yProps(4)} />
              <Tab label="💼 Treasury" {...a11yProps(5)} />
            </Tabs>
          </Box>

          {/* Tab Content Area */}
          <Box
            sx={{
              flex: 1,
              overflow: 'hidden',
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.95)',
            }}
          >
            <TabPanel value={value} index={0}>
              <ComprehensiveDashboard />
            </TabPanel>

            <TabPanel value={value} index={1}>
              <MetaMaskCardWidget />
            </TabPanel>

            <TabPanel value={value} index={2}>
              <DelegationIntegration />
            </TabPanel>

            <TabPanel value={value} index={3}>
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}
                >
                  Send USDC Remittance
                </Typography>
                <Typography
                  variant="body1"
                  color="#666"
                  mb={3}
                  sx={{ lineHeight: 1.6 }}
                >
                  Send USDC globally using Circle's CCTP for native cross-chain
                  transfers. Earn MetaMask Card rewards on everyday spending.
                </Typography>

                <Alert
                  severity="success"
                  sx={{
                    mb: 3,
                    background:
                      'linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(69, 160, 73, 0.1) 100%)',
                    border: '1px solid rgba(76, 175, 80, 0.4)',
                    borderRadius: 3,
                    '& .MuiAlert-icon': {
                      color: '#4caf50',
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 1, color: '#2e7d32' }}
                  >
                    💳 MetaMask Card Benefits Active
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#388e3c', lineHeight: 1.5 }}
                  >
                    • Earn 1% USDC cashback on all card purchases
                    <br />
                    • Build onchain credit history for DeFi access
                    <br />• Spend globally with Mastercard acceptance
                  </Typography>
                </Alert>

                <Send />
              </Box>
            </TabPanel>

            <TabPanel value={value} index={4}>
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}
                >
                  LI.FI Cross-Chain Bridge
                </Typography>
                <Typography
                  variant="body1"
                  color="#666"
                  mb={3}
                  sx={{ lineHeight: 1.6 }}
                >
                  Advanced cross-chain USDC transfers powered by LI.FI's routing
                  engine and Circle CCTP V2.
                </Typography>

                <Alert
                  severity="info"
                  sx={{
                    mb: 3,
                    background:
                      'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(30, 136, 229, 0.1) 100%)',
                    border: '1px solid rgba(33, 150, 243, 0.4)',
                    borderRadius: 3,
                    '& .MuiAlert-icon': {
                      color: '#2196f3',
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 1, color: '#1976d2' }}
                  >
                    ⚡ Circle CCTP V2 Integration
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#1976d2', lineHeight: 1.5 }}
                  >
                    • Native burn/mint mechanism - no wrapped tokens
                    <br />
                    • Sub-minute transfers with faster settlement
                    <br />• Zero slippage on USDC transfers across chains
                  </Typography>
                </Alert>

                <LiFiWidgetComponent />
              </Box>
            </TabPanel>

            <TabPanel value={value} index={5}>
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}
                >
                  Smart Treasury Management
                </Typography>
                <Typography
                  variant="body1"
                  color="#666"
                  mb={3}
                  sx={{ lineHeight: 1.6 }}
                >
                  Optimize your USDC distribution across chains for remittances,
                  yield farming, and MetaMask Card top-ups.
                </Typography>

                <Alert
                  severity="warning"
                  sx={{
                    mb: 3,
                    background:
                      'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(245, 124, 0, 0.1) 100%)',
                    border: '1px solid rgba(255, 152, 0, 0.4)',
                    borderRadius: 3,
                    '& .MuiAlert-icon': {
                      color: '#ff9800',
                    },
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 1, color: '#f57c00' }}
                  >
                    🏦 Advanced Treasury Features
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{ color: '#f57c00', lineHeight: 1.5 }}
                  >
                    • Auto-rebalance USDC across chains for optimal fees
                    <br />
                    • Smart contract automation for recurring remittances
                    <br />• Integration with MetaMask Card spending analytics
                  </Typography>
                </Alert>

                <TreasuryRebalancer />
              </Box>
            </TabPanel>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default EnhancedTransfer
