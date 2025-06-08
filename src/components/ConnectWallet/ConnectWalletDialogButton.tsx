import ChevronRightIcon from '@mui/icons-material/ChevronRight'
import { Box, Button, Typography } from '@mui/material'

import type { SxProps } from '@mui/material'

interface Props {
  imgSrc: string
  onClick: () => void
  subtitle?: string
  sx?: SxProps
  title: string
}

const ConnectWalletDialogButton: React.FC<Props> = ({
  imgSrc,
  onClick,
  subtitle = '',
  sx = {},
  title,
}) => {
  return (
    <Button
      variant="outlined"
      onClick={onClick}
      fullWidth
      sx={{
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        ...sx,
      }}
    >
      <Box display="flex" alignItems="center">
        <Box
          sx={{
            borderRadius: '50%',
            bgcolor: 'white',
            p: 1.5,
            mr: 2,
          }}
        >
          <img src={imgSrc} alt={title} width={32} height={32} />
        </Box>
        <Box textAlign="left">
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {subtitle}
          </Typography>
        </Box>
      </Box>
      <ChevronRightIcon />
    </Button>
  )
}

export default ConnectWalletDialogButton
