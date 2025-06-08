import type React from 'react'
import { useState } from 'react'

import CloseIcon from '@mui/icons-material/Close'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import TrendingUpIcon from '@mui/icons-material/TrendingUp'
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material'

const LiFiWidgetComponent: React.FC = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleOpenLiFi = () => {
    // Open LI.FI in a new tab with our integrator code
    window.open(
      'https://jumper.exchange/?integrator=multichain-usdc-hackathon&fromChain=1&fromToken=0xA0b86a33E6c67cAa00B50b6E1E0Bb6D85B34cE68&fee=0.005',
      '_blank'
    )
  }

  const handleOpenEmbedded = () => {
    setIsDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setIsDialogOpen(false)
  }

  return (
    <Box>
      <Alert severity="success" sx={{ mb: 3 }}>
        <Typography variant="body2">
          <strong>LI.FI Integration Active!</strong> This integration provides
          access to 20+ bridges and DEX aggregators for optimal cross-chain
          routing. Integration fee: 0.5%
        </Typography>
      </Alert>

      <Card elevation={3} sx={{ maxWidth: 500, mx: 'auto' }}>
        <CardContent sx={{ p: 4 }}>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={3}
          >
            <SwapHorizIcon
              sx={{ fontSize: 48, color: 'primary.main', mr: 2 }}
            />
            <Typography variant="h4" color="primary.main">
              LI.FI Bridge
            </Typography>
          </Box>

          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Access the best routes across 20+ bridges and DEX aggregators for
            optimal cross-chain transfers
          </Typography>

          <Box
            display="flex"
            flexWrap="wrap"
            gap={1}
            justifyContent="center"
            mb={3}
          >
            <Chip label="Stargate" variant="outlined" />
            <Chip label="Across" variant="outlined" />
            <Chip label="CCTP" variant="outlined" />
            <Chip label="Hop" variant="outlined" />
            <Chip label="Celer" variant="outlined" />
            <Chip label="Multichain" variant="outlined" />
          </Box>

          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            mb={3}
          >
            <TrendingUpIcon sx={{ color: 'success.main', mr: 1 }} />
            <Typography variant="body2" color="success.main">
              Integrated with 0.5% fee collection for bonus points
            </Typography>
          </Box>

          <Box display="flex" gap={2} flexDirection="column">
            <Button
              variant="contained"
              size="large"
              fullWidth
              onClick={handleOpenEmbedded}
              startIcon={<SwapHorizIcon />}
              sx={{ py: 2 }}
            >
              Open LI.FI Bridge (Embedded)
            </Button>

            <Button
              variant="outlined"
              size="large"
              fullWidth
              onClick={handleOpenLiFi}
              startIcon={<OpenInNewIcon />}
              sx={{ py: 2 }}
            >
              Open in New Tab
            </Button>
          </Box>

          <Typography
            variant="caption"
            display="block"
            align="center"
            mt={2}
            color="text.secondary"
          >
            Both options include our integrator code for fee collection
          </Typography>
        </CardContent>
      </Card>

      {/* Embedded LI.FI Dialog */}
      <Dialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: { height: '80vh' },
        }}
      >
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="between">
            <Typography variant="h6">LI.FI Cross-Chain Bridge</Typography>
            <IconButton onClick={handleCloseDialog} sx={{ ml: 'auto' }}>
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{ p: 0 }}>
          <iframe
            src="https://jumper.exchange/?integrator=multichain-usdc-hackathon&fromChain=1&fromToken=0xA0b86a33E6c67cAa00B50b6E1E0Bb6D85B34cE68&fee=0.005&variant=wide"
            width="100%"
            height="100%"
            style={{ border: 'none', minHeight: '600px' }}
            title="LI.FI Bridge"
          />
        </DialogContent>
      </Dialog>
    </Box>
  )
}

export default LiFiWidgetComponent
