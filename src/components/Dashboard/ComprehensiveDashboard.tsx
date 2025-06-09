import React, { useState, useEffect } from 'react'
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Alert,
  LinearProgress,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  useTheme,
  useMediaQuery,
} from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import CreditCardIcon from '@mui/icons-material/CreditCard'
import SendIcon from '@mui/icons-material/Send'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import SecurityIcon from '@mui/icons-material/Security'
import SpeedIcon from '@mui/icons-material/Speed'
import {
  blockchainService,
  BlockchainTransaction,
  PriceData,
  SmartAccountData,
} from '../../services/blockchainService'
import {
  AccountBalanceWallet,
  TrendingUp,
  SwapHoriz,
  Pending,
  CheckCircle,
  Error as ErrorIcon,
} from '@mui/icons-material'

interface PlatformStats {
  totalVolumeUSD: number
  totalUsers: number
  averageFee: number
  totalCashback: number
  activeCards: number
  smartAccounts: number
}

interface UserStats {
  cardBalance: number
  cashbackEarned: number
  monthlySpent: number
  totalSent: number
  gasFeeSaved: number
  creditScore: number
}

const ComprehensiveDashboard: React.FC = () => {
  const { account, active, library } = useWeb3React()
  const [platformStats, setPlatformStats] = useState<PlatformStats>({
    totalVolumeUSD: 2487350,
    totalUsers: 12847,
    averageFee: 0.23,
    totalCashback: 847290,
    activeCards: 8934,
    smartAccounts: 3421,
  })

  const [userStats, setUserStats] = useState<UserStats>({
    cardBalance: 234.56,
    cashbackEarned: 23.45,
    monthlySpent: 456.78,
    totalSent: 1234.56,
    gasFeeSaved: 45.67,
    creditScore: 742,
  })

  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [priceData, setPriceData] = useState<PriceData[]>([])
  const [accountData, setAccountData] = useState<SmartAccountData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        setIsLoading(true)

        // Load price data
        const prices = await blockchainService.getRealTimePrices()
        setPriceData(prices)

        // Load account data if connected
        if (active && account) {
          const smartAccount = await blockchainService.createSmartAccount(
            account
          )
          setAccountData(smartAccount)

          const txHistory = await blockchainService.getTransactionHistory(
            account
          )
          setTransactions(txHistory.slice(0, 3))
        }
      } catch (error) {
        console.error('Dashboard initialization error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    initializeDashboard()

    // Set up price updates
    const priceInterval = setInterval(async () => {
      try {
        const prices = await blockchainService.getRealTimePrices()
        setPriceData(prices)
      } catch (error) {
        console.error('Price update error:', error)
      }
    }, 30000)

    return () => clearInterval(priceInterval)
  }, [account, active])

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle sx={{ color: '#4caf50', fontSize: 20 }} />
      case 'pending':
        return <Pending sx={{ color: '#ff9800', fontSize: 20 }} />
      case 'failed':
        return <ErrorIcon sx={{ color: '#f44336', fontSize: 20 }} />
      default:
        return <CircularProgress size={16} />
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount)
  }

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="300px"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress size={48} sx={{ color: '#1976d2' }} />
        <Typography variant="h6" sx={{ color: '#424242', fontWeight: 600 }}>
          Loading Dashboard...
        </Typography>
      </Box>
    )
  }

  return (
    <Box sx={{ maxWidth: '100%', mx: 'auto', p: { xs: 1, sm: 2 } }}>
      {/* Connection Status */}
      <Alert
        severity={active ? 'success' : 'info'}
        sx={{
          mb: 3,
          borderRadius: 3,
          fontWeight: 600,
          fontSize: '0.95rem',
          '& .MuiAlert-icon': {
            fontSize: '1.2rem',
          },
          ...(active
            ? {
                background:
                  'linear-gradient(135deg, rgba(76, 175, 80, 0.15) 0%, rgba(69, 160, 73, 0.1) 100%)',
                border: '1px solid rgba(76, 175, 80, 0.4)',
                color: '#2e7d32',
              }
            : {
                background:
                  'linear-gradient(135deg, rgba(33, 150, 243, 0.15) 0%, rgba(30, 136, 229, 0.1) 100%)',
                border: '1px solid rgba(33, 150, 243, 0.4)',
                color: '#1976d2',
              }),
        }}
      >
        {active
          ? '🎉 Wallet Connected - Real blockchain data active'
          : '💡 Connect wallet to view real transaction data'}
      </Alert>

      <Grid container spacing={isMobile ? 2 : 3}>
        {/* Smart Account Section */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={6}
            sx={{
              height: '100%',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: '#1976d2', mr: 2 }}>
                  <AccountBalanceWallet />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#1976d2' }}
                >
                  DTK Smart Account
                </Typography>
              </Box>

              {accountData ? (
                <Box>
                  <Typography
                    variant="body1"
                    sx={{ mb: 1, color: '#424242', fontWeight: 600 }}
                  >
                    Status:
                    <Chip
                      label={accountData.isDeployed ? 'Deployed' : 'Predicted'}
                      color={accountData.isDeployed ? 'success' : 'warning'}
                      size="small"
                      sx={{ ml: 1, fontWeight: 700 }}
                    />
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      wordBreak: 'break-all',
                      color: '#666',
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      backgroundColor: '#f5f5f5',
                      p: 1,
                      borderRadius: 2,
                      border: '1px solid #e0e0e0',
                    }}
                  >
                    {accountData.address}
                  </Typography>
                </Box>
              ) : (
                <Typography
                  variant="body2"
                  sx={{ color: '#666', fontStyle: 'italic' }}
                >
                  Connect wallet to view smart account details
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Live Prices Section */}
        <Grid item xs={12} md={6}>
          <Card
            elevation={6}
            sx={{
              height: '100%',
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box display="flex" alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: '#4caf50', mr: 2 }}>
                  <TrendingUp />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#4caf50' }}
                >
                  Live Prices
                </Typography>
              </Box>

              <Grid container spacing={1}>
                {priceData.map((price) => (
                  <Grid item xs={6} key={price.symbol}>
                    <Box
                      sx={{
                        p: 1.5,
                        borderRadius: 2,
                        background:
                          'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
                        border: '1px solid #dee2e6',
                        textAlign: 'center',
                      }}
                    >
                      <Typography
                        variant="caption"
                        sx={{
                          fontWeight: 700,
                          color: '#495057',
                          textTransform: 'uppercase',
                          letterSpacing: '0.05em',
                        }}
                      >
                        {price.symbol}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          fontWeight: 700,
                          color: '#212529',
                          fontSize: '0.9rem',
                        }}
                      >
                        {formatCurrency(price.price)}
                      </Typography>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        {/* Transaction History */}
        <Grid item xs={12}>
          <Card
            elevation={6}
            sx={{
              borderRadius: 3,
              background: 'linear-gradient(135deg, #ffffff 0%, #fafafa 100%)',
              border: '1px solid rgba(0, 0, 0, 0.08)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box display="flex" alignItems="center" mb={3}>
                <Avatar sx={{ bgcolor: '#ff9800', mr: 2 }}>
                  <SwapHoriz />
                </Avatar>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 700, color: '#ff9800' }}
                >
                  Recent Transactions
                </Typography>
              </Box>

              {transactions.length > 0 ? (
                <TableContainer
                  component={Paper}
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid #e0e0e0',
                    background: '#fafafa',
                  }}
                >
                  <Table>
                    <TableHead>
                      <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: '#424242',
                            fontSize: '0.9rem',
                          }}
                        >
                          Hash
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: '#424242',
                            fontSize: '0.9rem',
                          }}
                        >
                          Type
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: '#424242',
                            fontSize: '0.9rem',
                          }}
                        >
                          Amount
                        </TableCell>
                        <TableCell
                          sx={{
                            fontWeight: 700,
                            color: '#424242',
                            fontSize: '0.9rem',
                          }}
                        >
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {transactions.map((tx, index) => (
                        <TableRow
                          key={tx.hash}
                          sx={{
                            '&:hover': { backgroundColor: '#f0f0f0' },
                            backgroundColor:
                              index % 2 === 0 ? '#ffffff' : '#fafafa',
                          }}
                        >
                          <TableCell
                            sx={{
                              fontFamily: 'monospace',
                              fontSize: '0.8rem',
                              color: '#666',
                              maxWidth: '120px',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                            }}
                          >
                            {`${tx.hash.slice(0, 10)}...`}
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={tx.type}
                              size="small"
                              variant="outlined"
                              sx={{
                                fontWeight: 600,
                                fontSize: '0.75rem',
                                color: '#1976d2',
                                borderColor: '#1976d2',
                              }}
                            />
                          </TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#424242' }}>
                            {parseFloat(tx.value).toFixed(4)} {tx.token}
                          </TableCell>
                          <TableCell>
                            <Box display="flex" alignItems="center" gap={1}>
                              {getStatusIcon(tx.status)}
                              <Typography
                                variant="caption"
                                sx={{
                                  fontWeight: 600,
                                  color:
                                    tx.status === 'success'
                                      ? '#4caf50'
                                      : tx.status === 'pending'
                                      ? '#ff9800'
                                      : '#f44336',
                                  textTransform: 'capitalize',
                                }}
                              >
                                {tx.status}
                              </Typography>
                            </Box>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              ) : (
                <Box
                  textAlign="center"
                  py={4}
                  sx={{
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2,
                    border: '1px solid #e9ecef',
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{ color: '#6c757d', fontWeight: 500 }}
                  >
                    {active
                      ? 'No recent transactions found'
                      : 'Connect your wallet to view transaction history'}
                  </Typography>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default ComprehensiveDashboard
