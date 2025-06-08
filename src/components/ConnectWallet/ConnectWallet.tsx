import { useCallback, useEffect, useState } from 'react'

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import {
  Alert,
  Box,
  Button,
  Chip,
  Fade,
  Menu,
  MenuItem,
  Typography,
} from '@mui/material'
import { useWeb3React } from '@web3-react/core'

import ConnectWalletDialog from 'components/ConnectWallet/ConnectWalletDialog'
import { useEagerConnect } from 'hooks/useEagerConnect'
import { getAddressAbbreviation } from 'utils'

import type { Web3Provider } from '@ethersproject/providers'
import type { AbstractConnector } from '@web3-react/abstract-connector'

interface EthereumProvider {
  request: (args: {
    method: string
    params?: string[]
  }) => Promise<string[] | string>
}

declare global {
  interface Window {
    ethereum?: EthereumProvider
  }
}

const ConnectWallet = () => {
  const { activate, active, account, deactivate, error, chainId } =
    useWeb3React<Web3Provider>()
  useEagerConnect()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [isConnectWalletDialogOpen, setIsConnectWalletDialogOpen] =
    useState<boolean>(false)
  const [networkName, setNetworkName] = useState<string>('')
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (chainId != null && chainId !== 0) {
      const networks: { [key: number]: string } = {
        1: 'Ethereum',
        137: 'Polygon',
        42161: 'Arbitrum',
        10: 'Optimism',
        43114: 'Avalanche',
        11155111: 'Sepolia',
        43113: 'Fuji',
        421614: 'Arbitrum Sepolia',
      }
      setNetworkName(networks[chainId] || `Chain ${chainId}`)
    }
  }, [chainId])

  const closeConnectWalletDialog = () => {
    setIsConnectWalletDialogOpen(false)
  }

  const openConnectWalletDialog = () => {
    setIsConnectWalletDialogOpen(true)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = useCallback(() => {
    setAnchorEl(null)
  }, [])

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(account ?? '')
    handleMenuClose()
  }, [account, handleMenuClose])

  const handleConnect = async (connector: AbstractConnector) => {
    closeConnectWalletDialog()
    await activate(connector)
  }

  const handleDisconnect = useCallback(() => {
    deactivate()
    handleMenuClose()
  }, [deactivate, handleMenuClose])

  return (
    <Box sx={{ textAlign: 'center', mb: 2 }}>
      {account && active ? (
        <Box>
          <Alert severity="success" sx={{ mb: 2, maxWidth: 400, mx: 'auto' }}>
            <Box display="flex" alignItems="center">
              <AccountBalanceWalletIcon sx={{ mr: 1 }} />
              <Typography variant="body2">
                Wallet Connected Successfully!
              </Typography>
            </Box>
          </Alert>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            gap={2}
            flexWrap="wrap"
          >
            {networkName && (
              <Chip
                label={`Network: ${networkName}`}
                color="primary"
                size="small"
              />
            )}

            <Button
              id="connected-wallet-button"
              aria-controls={open ? 'connected-wallet-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleMenuClick}
              variant="outlined"
              startIcon={<AccountBalanceWalletIcon />}
            >
              {getAddressAbbreviation(account)}
            </Button>
          </Box>
        </Box>
      ) : (
        <div className="relative inline">
          <Button
            onClick={openConnectWalletDialog}
            variant="contained"
            size="large"
            startIcon={<AccountBalanceWalletIcon />}
          >
            Connect Wallet
          </Button>
          {error != null && (
            <Alert severity="error" sx={{ mt: 2, maxWidth: 400, mx: 'auto' }}>
              <Typography variant="body2">{error?.message}</Typography>
            </Alert>
          )}
        </div>
      )}
      <Menu
        id="connected-wallet-menu"
        MenuListProps={{
          'aria-labelledby': 'connected-wallet-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        TransitionComponent={Fade}
      >
        <MenuItem onClick={handleCopy}>Copy Address</MenuItem>
        <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
      </Menu>
      <ConnectWalletDialog
        handleClose={closeConnectWalletDialog}
        handleConnect={handleConnect}
        open={isConnectWalletDialogOpen}
      />
    </Box>
  )
}

export default ConnectWallet
