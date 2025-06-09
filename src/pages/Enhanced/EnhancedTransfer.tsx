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
      style={{ 
        height: '100%', 
        overflow: 'auto',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {value === index && (
        <Slide direction="up" in={value === index} mountOnEnter unmountOnExit>
          <Box sx={{ 
            flex: 1, 
            p: { xs: 1, md: 2 },
            minHeight: 'min-content',
            width: '100%'
          }}>
            {children}
          </Box>
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
        height: 'calc(100vh - 96px)', // Account for nav height (~96px)
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
          flexShrink: 0,
          py: { xs: 1.5, md: 2 },
          px: { xs: 2, md: 4 },
          textAlign: 'center',
          background: 'rgba(0, 0, 0, 0.2)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
        }}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
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
          variant={isMobile ? 'body2' : 'body1'}
          sx={{
            color: 'rgba(255, 255, 255, 0.95)',
            mb: 1.5,
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
              fontSize: '0.75rem',
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
              fontSize: '0.75rem',
            }}
          />
        </Box>
      </Box>

      {/* Main Content Area */}
      <Box
        sx={{ flex: 1, display: 'flex', flexDirection: 'column', minHeight: 0 }}
      >
        <Paper
          elevation={12}
          sx={{
            flex: 1,
            mx: { xs: 1, md: 2 },
            my: { xs: 0.5, md: 1 },
            borderRadius: 4,
            overflow: 'hidden',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow:
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            minHeight: 0,
          }}
        >
          <Box
            sx={{
              flexShrink: 0,
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
                minHeight: isMobile ? 48 : 56,
                '& .MuiTab-root': {
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  fontWeight: 700,
                  textTransform: 'none',
                  fontSize: isMobile ? '0.75rem' : '0.85rem',
                  minHeight: isMobile ? 48 : 56,
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
                  height: 3,
                  borderRadius: '3px 3px 0 0',
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
              overflow: 'auto',
              position: 'relative',
              background: 'rgba(255, 255, 255, 0.95)',
              minHeight: 0,
              maxHeight: 'calc(100vh - 250px)', // Ensure content doesn't exceed viewport
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
              <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                <Typography
                  variant="h5"
                  sx={{ color: '#1976d2', fontWeight: 'bold', mb: 1 }}
                >
                  💸 Send USDC Remittance
                </Typography>
                
                <Alert
                  severity="success"
                  sx={{
                    mb: 2,
                    py: 1,
                    background: 'rgba(76, 175, 80, 0.1)',
                    border: '1px solid rgba(76, 175, 80, 0.3)',
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                      color: '#4caf50',
                    },
                  }}
                >
                  <Typography variant="body2" sx={{ fontWeight: 600, color: '#2e7d32' }}>
                    💳 MetaMask Card: 1% USDC cashback • Global Mastercard acceptance
                  </Typography>
                </Alert>

                <Box sx={{ flex: 1 }}>
                  <Send />
                </Box>
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
