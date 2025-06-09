import { useState } from 'react'

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { Alert, Box, Button, Chip, Typography } from '@mui/material'
import { useWeb3React } from '@web3-react/core'

import ConnectWalletDialog from 'components/ConnectWallet/ConnectWalletDialog'
import { useEagerConnect } from 'hooks/useEagerConnect'
import { getAddressAbbreviation } from 'utils'

import type { Web3Provider } from '@ethersproject/providers'

const ConnectWallet = (): JSX.Element => {
  const { account, active, activate, library } = useWeb3React<Web3Provider>()

  const [openDialog, setOpenDialog] = useState(false)

  // Eager connect for Web3React
  useEagerConnect()

  return (
    <Box
      sx={{
        maxWidth: 480,
        mx: 'auto',
        p: 3,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 3,
        boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
        color: 'white',
      }}
    >
      {/* Header */}
      <Box textAlign="center" mb={4}>
        <AccountBalanceWalletIcon sx={{ fontSize: 48, mb: 2, opacity: 0.9 }} />
        <Typography variant="h4" fontWeight="bold" mb={1}>
          Connect Wallet
        </Typography>
        <Typography variant="body1" sx={{ opacity: 0.8 }}>
          Connect your wallet to start trading USDC across chains
        </Typography>
      </Box>

      {active && account ? (
        /* Connected State */
        <Box
          sx={{
            p: 3,
            borderRadius: 2,
            bgcolor: 'rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255,255,255,0.2)',
          }}
        >
          <Box display="flex" alignItems="center" gap={2} mb={3}>
            <Box
              sx={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                bgcolor: '#4caf50',
                boxShadow: '0 0 0 3px rgba(76,175,80,0.2)',
              }}
            />
            <Typography variant="h6" fontWeight="bold">
              Wallet Connected
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: 'rgba(255,255,255,0.05)',
              mb: 2,
            }}
          >
            <Typography
              variant="caption"
              sx={{ opacity: 0.7, display: 'block' }}
            >
              ADDRESS
            </Typography>
            <Typography
              variant="body1"
              sx={{ fontFamily: 'monospace', fontWeight: 'bold' }}
            >
              {getAddressAbbreviation(account)}
            </Typography>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 1,
              bgcolor: 'rgba(255,255,255,0.05)',
              mb: 3,
            }}
          >
            <Typography
              variant="caption"
              sx={{ opacity: 0.7, display: 'block' }}
            >
              NETWORK
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {library?.network?.name ?? 'Ethereum'}
            </Typography>
          </Box>

          <Alert
            severity="success"
            sx={{
              bgcolor: 'rgba(76,175,80,0.1)',
              color: 'white',
              border: '1px solid rgba(76,175,80,0.3)',
              '& .MuiAlert-icon': { color: '#4caf50' },
            }}
          >
            Ready for USDC transfers! Your wallet is connected and ready to use.
          </Alert>
        </Box>
      ) : (
        /* Not Connected State */
        <Box textAlign="center">
          <Box
            sx={{
              p: 4,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              mb: 3,
            }}
          >
            <Typography variant="h6" mb={2} fontWeight="bold">
              MetaMask Wallet
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, mb: 3 }}>
              Connect your MetaMask wallet to access DeFi features and transfer
              USDC across multiple blockchains
            </Typography>

            <Button
              variant="contained"
              size="large"
              onClick={() => setOpenDialog(true)}
              startIcon={<AccountBalanceWalletIcon />}
              sx={{
                bgcolor: 'rgba(255,255,255,0.9)',
                color: '#333',
                fontWeight: 'bold',
                py: 1.5,
                px: 4,
                borderRadius: 2,
                '&:hover': {
                  bgcolor: 'white',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.2s ease',
              }}
            >
              Connect MetaMask
            </Button>
          </Box>

          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.1)',
            }}
          >
            <Typography
              variant="caption"
              sx={{ opacity: 0.7, display: 'block', mb: 1 }}
            >
              SUPPORTED FEATURES
            </Typography>
            <Box display="flex" gap={1} flexWrap="wrap" justifyContent="center">
              <Chip
                label="USDC Transfers"
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
              <Chip
                label="Cross-Chain"
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
              <Chip
                label="DeFi Ready"
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}
              />
            </Box>
          </Box>
        </Box>
      )}

      <ConnectWalletDialog
        open={openDialog}
        handleClose={() => setOpenDialog(false)}
        handleConnect={(connector) => {
          void activate(connector)
          setOpenDialog(false)
        }}
      />
    </Box>
  )
}

export default ConnectWallet
