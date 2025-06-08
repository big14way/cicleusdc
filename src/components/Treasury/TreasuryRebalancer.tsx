import type React from 'react'
import { useEffect, useState } from 'react'

import AccountBalanceIcon from '@mui/icons-material/AccountBalance'
import RefreshIcon from '@mui/icons-material/Refresh'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grid,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
} from '@mui/material'

interface ChainBalance {
  chain: string
  chainId: number
  balance: number
  percentage: number
  gasEstimate: number
  targetPercentage: number
  status: 'optimal' | 'rebalance_needed' | 'low_balance'
}

const TreasuryRebalancer: React.FC = () => {
  const [balances, setBalances] = useState<ChainBalance[]>([
    {
      chain: 'Ethereum',
      chainId: 1,
      balance: 15000,
      percentage: 35,
      gasEstimate: 25,
      targetPercentage: 30,
      status: 'rebalance_needed',
    },
    {
      chain: 'Polygon',
      chainId: 137,
      balance: 8000,
      percentage: 18,
      gasEstimate: 2,
      targetPercentage: 25,
      status: 'low_balance',
    },
    {
      chain: 'Arbitrum',
      chainId: 42161,
      balance: 12000,
      percentage: 28,
      gasEstimate: 5,
      targetPercentage: 25,
      status: 'optimal',
    },
    {
      chain: 'Optimism',
      chainId: 10,
      balance: 8500,
      percentage: 19,
      gasEstimate: 3,
      targetPercentage: 20,
      status: 'optimal',
    },
  ])

  const [totalBalance, setTotalBalance] = useState(0)
  const [isRebalancing, setIsRebalancing] = useState(false)

  useEffect(() => {
    const total = balances.reduce((sum, balance) => sum + balance.balance, 0)
    setTotalBalance(total)
  }, [balances])

  const getStatusColor = (
    status: string
  ): 'success' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'optimal':
        return 'success'
      case 'rebalance_needed':
        return 'warning'
      case 'low_balance':
        return 'error'
      default:
        return 'default'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'optimal':
        return 'Optimal'
      case 'rebalance_needed':
        return 'Rebalance Needed'
      case 'low_balance':
        return 'Low Balance'
      default:
        return 'Unknown'
    }
  }

  const handleRebalance = () => {
    setIsRebalancing(true)
    // Simulate rebalancing process
    setTimeout(() => {
      setIsRebalancing(false)
      // Update balances to simulate rebalancing
      setBalances((prev) =>
        prev.map((balance) => ({
          ...balance,
          status: 'optimal' as const,
          percentage: balance.targetPercentage,
          balance: (totalBalance * balance.targetPercentage) / 100,
        }))
      )
    }, 3000)
  }

  const refreshBalances = () => {
    // Simulate refreshing balances with slight variations
    setBalances((prev) =>
      prev.map((balance) => ({
        ...balance,
        balance: balance.balance + (Math.random() - 0.5) * 100,
        gasEstimate: Math.max(
          1,
          balance.gasEstimate + Math.floor((Math.random() - 0.5) * 5)
        ),
      }))
    )
  }

  return (
    <Box>
      <Alert severity="info" sx={{ mb: 3 }}>
        <Typography variant="body2">
          This is a demo treasury management interface. In production, this
          would connect to real treasury accounts and execute actual rebalancing
          transactions.
        </Typography>
      </Alert>

      <Grid container spacing={3}>
        {/* Total Balance Card */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <AccountBalanceIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Total Treasury</Typography>
              </Box>
              <Typography variant="h4" color="primary.main">
                ${totalBalance.toLocaleString()} USDC
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Across {balances.length} chains
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Rebalancing Status */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center" mb={2}>
                <TrendingUpIcon color="secondary" sx={{ mr: 1 }} />
                <Typography variant="h6">Rebalancing</Typography>
                <Tooltip title="Refresh balances">
                  <IconButton
                    onClick={refreshBalances}
                    size="small"
                    sx={{ ml: 'auto' }}
                  >
                    <RefreshIcon />
                  </IconButton>
                </Tooltip>
              </Box>
              {isRebalancing ? (
                <Box>
                  <Typography variant="body2" sx={{ mb: 1 }}>
                    Rebalancing in progress...
                  </Typography>
                  <LinearProgress />
                </Box>
              ) : (
                <Button
                  variant="contained"
                  startIcon={<SwapHorizIcon />}
                  onClick={handleRebalance}
                  fullWidth
                  disabled={balances.every((b) => b.status === 'optimal')}
                >
                  Auto Rebalance
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Health Status */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Health Status
              </Typography>
              <Box>
                {['optimal', 'rebalance_needed', 'low_balance'].map(
                  (status) => {
                    const count = balances.filter(
                      (b) => b.status === status
                    ).length
                    return (
                      <Box
                        key={status}
                        display="flex"
                        justifyContent="space-between"
                        mb={1}
                      >
                        <Typography variant="body2">
                          {getStatusText(status)}:
                        </Typography>
                        <Chip
                          label={count}
                          size="small"
                          color={getStatusColor(status)}
                          variant="outlined"
                        />
                      </Box>
                    )
                  }
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Balance Table */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Chain Distributions
              </Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Chain</TableCell>
                      <TableCell align="right">Balance (USDC)</TableCell>
                      <TableCell align="right">Current %</TableCell>
                      <TableCell align="right">Target %</TableCell>
                      <TableCell align="right">Gas Estimate ($)</TableCell>
                      <TableCell align="center">Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {balances.map((balance) => (
                      <TableRow key={balance.chainId}>
                        <TableCell component="th" scope="row">
                          {balance.chain}
                        </TableCell>
                        <TableCell align="right">
                          ${balance.balance.toLocaleString()}
                        </TableCell>
                        <TableCell align="right">
                          {balance.percentage.toFixed(1)}%
                        </TableCell>
                        <TableCell align="right">
                          {balance.targetPercentage}%
                        </TableCell>
                        <TableCell align="right">
                          ${balance.gasEstimate}
                        </TableCell>
                        <TableCell align="center">
                          <Chip
                            label={getStatusText(balance.status)}
                            size="small"
                            color={getStatusColor(balance.status)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  )
}

export default TreasuryRebalancer
