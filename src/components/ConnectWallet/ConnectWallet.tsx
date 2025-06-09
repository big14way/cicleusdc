import type React from 'react'
import { useState } from 'react'
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Chip,
  Alert,
  Popover,
  Card,
  CardContent,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material'
import {
  AccountBalanceWallet,
  CheckCircle,
  Error as ErrorIcon,
  CreditCard,
  Security,
  TrendingUp,
  Close as CloseIcon,
} from '@mui/icons-material'
import { useWeb3React } from '@web3-react/core'
import { injected } from '../Wallet/Connectors'

const ConnectWallet: React.FC = () => {
  const { account, activate, deactivate, active, error } = useWeb3React()
  const [loading, setLoading] = useState(false)
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null)

  const handleConnect = async () => {
    if (active) {
      // Show wallet info popover
      return
    }

    try {
      setLoading(true)
      await activate(injected)
    } catch (err) {
      console.error('Connection failed:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleDisconnect = () => {
    deactivate()
    handleClosePopover()
  }

  const handleOpenPopover = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (active) {
      setAnchorEl(event.currentTarget)
    } else {
      void handleConnect()
    }
  }

  const handleClosePopover = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)

  const formatAddress = (address: string | null | undefined) => {
    if (!address) return 'No Address'
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  return (
    <>
      <Button
        variant={active ? 'contained' : 'outlined'}
        color="primary"
        onClick={handleOpenPopover}
        disabled={loading}
        startIcon={<AccountBalanceWallet />}
        sx={{
          minWidth: '160px',
          height: '44px',
          borderRadius: '12px',
          textTransform: 'none',
          fontWeight: 700,
          fontSize: '0.9rem',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          border: active ? 'none' : '2px solid #1976d2',
          background: active
            ? 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)'
            : 'transparent',
          color: active ? '#ffffff' : '#1976d2',
          boxShadow: active ? '0 4px 12px rgba(25, 118, 210, 0.3)' : 'none',
          '&:hover': {
            transform: 'translateY(-2px)',
            boxShadow: active
              ? '0 6px 20px rgba(25, 118, 210, 0.4)'
              : '0 4px 12px rgba(25, 118, 210, 0.2)',
            background: active
              ? 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)'
              : 'rgba(25, 118, 210, 0.08)',
            borderColor: '#1565c0',
          },
          '&:active': {
            transform: 'translateY(0px)',
          },
        }}
      >
        {loading
          ? 'Connecting...'
          : active && account
          ? `${formatAddress(account)}`
          : 'Connect Wallet'}
      </Button>

      <Popover
        open={open && active && Boolean(account)}
        anchorEl={anchorEl}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        PaperProps={{
          elevation: 16,
          sx: {
            mt: 1,
            borderRadius: 4,
            minWidth: '320px',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow:
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            overflow: 'hidden',
          },
        }}
      >
        <Box sx={{ p: 0 }}>
          {/* Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
              color: 'white',
              p: 3,
              position: 'relative',
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box display="flex" alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    mr: 2,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  <AccountBalanceWallet sx={{ color: 'white' }} />
                </Avatar>
                <Box>
                  <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: 700, mb: 0.5 }}
                  >
                    Wallet Connected
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.9,
                      fontFamily: 'monospace',
                      fontSize: '0.85rem',
                      background: 'rgba(255, 255, 255, 0.15)',
                      px: 1.5,
                      py: 0.5,
                      borderRadius: 2,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {formatAddress(account)}
                  </Typography>
                </Box>
              </Box>
              <Button
                size="small"
                onClick={handleClosePopover}
                sx={{
                  color: 'white',
                  minWidth: 'auto',
                  p: 1,
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.1)',
                  },
                }}
              >
                <CloseIcon fontSize="small" />
              </Button>
            </Box>
          </Box>

          {/* Status Cards */}
          <Box sx={{ p: 3 }}>
            <List sx={{ p: 0 }}>
              <ListItem sx={{ px: 0, pb: 2 }}>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: '#4caf50', width: 40, height: 40 }}>
                    <CreditCard />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, color: '#212529' }}
                      >
                        MetaMask Card
                      </Typography>
                      <Chip
                        label="Active"
                        color="success"
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          height: '22px',
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: '#6c757d', mt: 0.5 }}
                    >
                      Earning 1% USDC cashback on all purchases
                    </Typography>
                  }
                />
              </ListItem>

              <Divider sx={{ my: 1 }} />

              <ListItem sx={{ px: 0, py: 2 }}>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: '#ff9800', width: 40, height: 40 }}>
                    <Security />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, color: '#212529' }}
                      >
                        Smart Account
                      </Typography>
                      <Chip
                        label="Ready"
                        color="warning"
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          height: '22px',
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: '#6c757d', mt: 0.5 }}
                    >
                      DTK integration for gasless transactions
                    </Typography>
                  }
                />
              </ListItem>

              <Divider sx={{ my: 1 }} />

              <ListItem sx={{ px: 0, pt: 2 }}>
                <ListItemIcon>
                  <Avatar sx={{ bgcolor: '#2196f3', width: 40, height: 40 }}>
                    <TrendingUp />
                  </Avatar>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Box display="flex" alignItems="center" gap={1}>
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 700, color: '#212529' }}
                      >
                        Cross-Chain Bridge
                      </Typography>
                      <Chip
                        label="Live"
                        color="info"
                        size="small"
                        sx={{
                          fontWeight: 700,
                          fontSize: '0.75rem',
                          height: '22px',
                        }}
                      />
                    </Box>
                  }
                  secondary={
                    <Typography
                      variant="body2"
                      sx={{ color: '#6c757d', mt: 0.5 }}
                    >
                      Circle CCTP V2 for instant USDC transfers
                    </Typography>
                  }
                />
              </ListItem>
            </List>

            {/* Action Buttons */}
            <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid #e9ecef' }}>
              <Button
                variant="outlined"
                color="error"
                onClick={handleDisconnect}
                fullWidth
                sx={{
                  borderRadius: 3,
                  fontWeight: 700,
                  textTransform: 'none',
                  py: 1.5,
                  border: '2px solid #f44336',
                  color: '#f44336',
                  '&:hover': {
                    background: 'rgba(244, 67, 54, 0.08)',
                    borderColor: '#d32f2f',
                  },
                }}
              >
                Disconnect Wallet
              </Button>
            </Box>
          </Box>

          {error && (
            <Alert
              severity="error"
              sx={{
                m: 2,
                mt: 0,
                borderRadius: 2,
                fontWeight: 600,
              }}
            >
              Connection failed. Please try again.
            </Alert>
          )}
        </Box>
      </Popover>
    </>
  )
}

export default ConnectWallet
