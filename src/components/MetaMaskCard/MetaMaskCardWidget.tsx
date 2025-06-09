import React, { useState, useEffect } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  LinearProgress,
  Alert,
  Grid,
  Divider,
} from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import SendIcon from '@mui/icons-material/Send'

interface CardStats {
  totalSpent: number
  cashbackEarned: number
  monthlyLimit: number
  transactionsCount: number
  preferredCurrency: string
}

const MetaMaskCardWidget: React.FC = () => {
  const { account, active } = useWeb3React()
  const [cardActivated, setCardActivated] = useState(false)
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState<CardStats>({
    totalSpent: 2547.83,
    cashbackEarned: 25.48,
    monthlyLimit: 10000,
    transactionsCount: 47,
    preferredCurrency: 'USDC',
  })

  // Simulate card activation
  const handleActivateCard = async () => {
    setLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setCardActivated(true)
    setLoading(false)
  }

  // Simulate earning cashback on new transactions
  useEffect(() => {
    if (cardActivated) {
      const interval = setInterval(() => {
        setStats((prev) => ({
          ...prev,
          cashbackEarned: prev.cashbackEarned + Math.random() * 0.5,
          totalSpent: prev.totalSpent + Math.random() * 10,
        }))
      }, 10000) // Update every 10 seconds

      return () => clearInterval(interval)
    }
  }, [cardActivated])

  if (!active) {
    return (
      <Alert severity="info" sx={{ borderRadius: 2 }}>
        <Typography variant="body2">
          Connect your MetaMask wallet to access MetaMask Card features
        </Typography>
      </Alert>
    )
  }

  return (
    <Box>
      {/* Card Status Header */}
      <Box display="flex" alignItems="center" mb={3}>
        <CreditCardIcon sx={{ mr: 2, fontSize: 32, color: '#f97316' }} />
        <Box>
          <Typography variant="h5" fontWeight="bold">
            MetaMask Card
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Spend crypto anywhere Mastercard is accepted
          </Typography>
        </Box>
        <Box ml="auto">
          {cardActivated ? (
            <Chip label="Active" color="success" size="small" />
          ) : (
            <Chip label="Not Activated" color="warning" size="small" />
          )}
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Card Activation/Status */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Card Setup
              </Typography>

              {!cardActivated ? (
                <Box>
                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Activate your MetaMask Card to start earning 1% USDC
                    cashback on every purchase
                  </Typography>

                  <Button
                    variant="contained"
                    fullWidth
                    onClick={handleActivateCard}
                    disabled={loading}
                    startIcon={<CreditCardIcon />}
                    sx={{
                      background:
                        'linear-gradient(135deg, #f97316 0%, #ea580c 100%)',
                      '&:hover': {
                        background:
                          'linear-gradient(135deg, #ea580c 0%, #dc2626 100%)',
                      },
                    }}
                  >
                    {loading ? 'Activating...' : 'Activate MetaMask Card'}
                  </Button>

                  {loading && (
                    <LinearProgress sx={{ mt: 2, borderRadius: 1 }} />
                  )}
                </Box>
              ) : (
                <Box>
                  <Alert severity="success" sx={{ mb: 2 }}>
                    <Typography variant="body2">
                      🎉 MetaMask Card activated! You&apos;re earning cashback
                      on every purchase.
                    </Typography>
                  </Alert>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Available for Apple Pay and Google Pay
                  </Typography>

                  <Box display="flex" gap={1}>
                    <Button variant="outlined" size="small" fullWidth>
                      Add to Apple Pay
                    </Button>
                    <Button variant="outlined" size="small" fullWidth>
                      Add to Google Pay
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Spending Analytics */}
        <Grid item xs={12} md={6}>
          <Card elevation={2} sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Spending Analytics
              </Typography>

              <Box mb={2}>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography variant="body2" color="text.secondary">
                    Monthly Spending
                  </Typography>
                  <Typography variant="body2" fontWeight="bold">
                    ${stats.totalSpent.toFixed(2)} / ${stats.monthlyLimit}
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={(stats.totalSpent / stats.monthlyLimit) * 100}
                  sx={{ height: 8, borderRadius: 4 }}
                />
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Box textAlign="center" p={1}>
                    <Typography variant="h6" color="success.main">
                      ${stats.cashbackEarned.toFixed(2)}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Total Cashback
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box textAlign="center" p={1}>
                    <Typography variant="h6" color="primary.main">
                      {stats.transactionsCount}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Transactions
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Integration with Remittance */}
        <Grid item xs={12}>
          <Card elevation={2}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Card + Remittance Integration
              </Typography>

              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body2">
                  💡 <strong>Smart Integration:</strong> Your MetaMask Card
                  spending builds onchain credit score for better remittance
                  rates
                </Typography>
              </Alert>

              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <Box
                    display="flex"
                    alignItems="center"
                    p={2}
                    bgcolor="grey.50"
                    borderRadius={2}
                  >
                    <AccountBalanceWalletIcon
                      sx={{ mr: 2, color: 'primary.main' }}
                    />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Auto-Reload
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Card reloads from USDC balance
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box
                    display="flex"
                    alignItems="center"
                    p={2}
                    bgcolor="grey.50"
                    borderRadius={2}
                  >
                    <TrendingUpIcon sx={{ mr: 2, color: 'success.main' }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Credit Building
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Spending history builds DeFi credit
                      </Typography>
                    </Box>
                  </Box>
                </Grid>

                <Grid item xs={12} md={4}>
                  <Box
                    display="flex"
                    alignItems="center"
                    p={2}
                    bgcolor="grey.50"
                    borderRadius={2}
                  >
                    <SendIcon sx={{ mr: 2, color: 'warning.main' }} />
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">
                        Smart Remittance
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Lower fees for card users
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2 }} />

              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body2" color="text.secondary">
                  Next cashback payment:{' '}
                  <strong>
                    Monthly on{' '}
                    {new Date(
                      Date.now() + 7 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </strong>
                </Typography>
                <Button variant="outlined" size="small">
                  View Card Details
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default MetaMaskCardWidget
