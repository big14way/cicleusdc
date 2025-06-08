import type React from 'react'
import { useState } from 'react'

import { Box, Container, Paper, Tab, Tabs, Typography } from '@mui/material'

import LiFiWidgetComponent from '../../components/LiFiWidget/LiFiWidget'
import TreasuryRebalancer from '../../components/Treasury/TreasuryRebalancer'
import Send from '../Send/Send'

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
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const EnhancedTransfer: React.FC = () => {
  const [value, setValue] = useState(0)

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue)
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h3" component="h1" gutterBottom align="center">
        Enhanced Multichain USDC Payment System
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        align="center"
        sx={{ mb: 4 }}
      >
        Transfer USDC across chains using Circle&apos;s CCTP or LI.FI&apos;s
        aggregated bridging
      </Typography>

      <Paper elevation={3} sx={{ width: '100%', mt: 3 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="transfer options"
            centered
          >
            <Tab label="Circle CCTP (Original)" {...a11yProps(0)} />
            <Tab label="LI.FI Cross-Chain (Enhanced)" {...a11yProps(1)} />
            <Tab label="Treasury Management" {...a11yProps(2)} />
          </Tabs>
        </Box>

        <TabPanel value={value} index={0}>
          <Box sx={{ maxWidth: '800px', mx: 'auto' }}>
            <Typography variant="h5" gutterBottom>
              Circle CCTP Transfer
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Use Circle&apos;s Cross-Chain Transfer Protocol for native USDC
              transfers
            </Typography>
            <Send />
          </Box>
        </TabPanel>

        <TabPanel value={value} index={1}>
          <Box sx={{ maxWidth: '500px', mx: 'auto' }}>
            <Typography variant="h5" gutterBottom align="center">
              LI.FI Cross-Chain Bridge
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ mb: 3 }}
            >
              Access multiple bridges and DEX aggregators for optimal routing
            </Typography>
            <LiFiWidgetComponent />
          </Box>
        </TabPanel>

        <TabPanel value={value} index={2}>
          <TreasuryRebalancer />
        </TabPanel>
      </Paper>
    </Container>
  )
}

export default EnhancedTransfer
