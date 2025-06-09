import { useCallback, useEffect, useMemo, useState } from 'react'

import EastIcon from '@mui/icons-material/East'
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { useWeb3React } from '@web3-react/core'
import { formatUnits } from 'ethers/lib/utils'

import { CHAIN_ICONS } from 'assets/chains'
import NetworkAlert from 'components/NetworkAlert/NetworkAlert'
import { Chain, CHAIN_TO_CHAIN_ID, CHAIN_TO_CHAIN_NAME } from 'constants/chains'
import { DEFAULT_DECIMALS } from 'constants/tokens'
import useTokenBalance from 'hooks/useTokenBalance'
import { getUSDCContractAddress } from 'utils/addresses'

import type { Web3Provider } from '@ethersproject/providers'
import type { TransactionInputs } from 'contexts/AppContext'

interface SelectItem {
  value: Chain
  label: string
  icon: string
}

const CHAIN_SELECT_ITEMS: SelectItem[] = [
  {
    value: Chain.ETH,
    label: CHAIN_TO_CHAIN_NAME[Chain.ETH],
    icon: CHAIN_ICONS[Chain.ETH],
  },
  {
    value: Chain.AVAX,
    label: CHAIN_TO_CHAIN_NAME[Chain.AVAX],
    icon: CHAIN_ICONS[Chain.AVAX],
  },
  {
    value: Chain.ARB,
    label: CHAIN_TO_CHAIN_NAME[Chain.ARB],
    icon: CHAIN_ICONS[Chain.ARB],
  },
  {
    value: Chain.BASE,
    label: CHAIN_TO_CHAIN_NAME[Chain.BASE],
    icon: CHAIN_ICONS[Chain.BASE],
  },
]

export const DEFAULT_FORM_INPUTS: TransactionInputs = {
  source: Chain.ETH,
  target: Chain.AVAX,
  address: '',
  amount: '',
}

interface Props {
  handleNext: () => void
  handleUpdateForm: React.Dispatch<React.SetStateAction<TransactionInputs>>
  formInputs: TransactionInputs
}

const SendForm = ({ handleNext, handleUpdateForm, formInputs }: Props) => {
  const { account, active, chainId } = useWeb3React<Web3Provider>()
  const USDC_ADDRESS = getUSDCContractAddress(chainId)

  const [walletUSDCBalance, setWalletUSDCBalance] = useState(0)
  const { source, target, address, amount } = formInputs
  const [isFormValid, setIsFormValid] = useState(false)
  const balance = useTokenBalance(USDC_ADDRESS, account ?? '')

  const updateFormIsValid = useCallback(() => {
    // Validate Ethereum address format (basic check)
    const isValidAddress = address.length === 42 && address.startsWith('0x')
    
    const isValid =
      source !== '' &&
      target !== '' &&
      source !== target &&
      address !== '' &&
      isValidAddress &&
      amount !== '' &&
      !isNaN(+amount) &&
      +amount > 0 &&
      +amount <= walletUSDCBalance &&
      Boolean(active) &&
      Boolean(account)
    setIsFormValid(isValid)
  }, [source, target, address, account, amount, walletUSDCBalance, active])

  useEffect(() => {
    if (account && active) {
      setWalletUSDCBalance(Number(formatUnits(balance, DEFAULT_DECIMALS)))
    } else {
      setWalletUSDCBalance(0)
    }
  }, [account, active, balance])

  useEffect(updateFormIsValid, [updateFormIsValid])

  const renderChainMenuItem = (chain: SelectItem, disabledValue = '') => (
    <MenuItem
      key={chain.value}
      value={chain.value}
      disabled={chain.value === disabledValue}
    >
      <div className="flex items-center">
        <img className="ml-2 h-8" src={chain.icon} alt={chain.label} />
        <span className="ml-4">{chain.label}</span>
      </div>
    </MenuItem>
  )

  const getAddressHelperText = useMemo(() => {
    if (!account || !active) {
      return 'Please connect your wallet first'
    }
    if (address !== '' && (address.length !== 42 || !address.startsWith('0x'))) {
      return 'Please enter a valid Ethereum address (0x...)'
    }
    if (address === account) {
      return 'Sending to your own wallet address'
    }
    return 'Enter the recipient\'s wallet address'
  }, [address, account, active])

  const getAmountHelperText = useMemo(() => {
    const balanceAvailable = `${walletUSDCBalance.toLocaleString()} available`
    if (amount !== '' && (isNaN(+amount) || +amount <= 0)) {
      return `Enter a valid amount, ${balanceAvailable}`
    }
    if (amount !== '' && +amount > walletUSDCBalance) {
      return `Cannot exceed wallet balance, ${balanceAvailable}`
    }
    return balanceAvailable
  }, [amount, walletUSDCBalance])

  const handleSourceChange = (value: string) => {
    handleUpdateForm((state) => ({
      ...state,
      source: value as Chain,
      ...(target === value
        ? {
            target:
              Object.values(Chain).find((chain) => chain !== value) ??
              Chain.AVAX,
          }
        : {}),
    }))
  }

  const handleAddMax = () => {
    handleUpdateForm((state) => ({
      ...state,
      amount: walletUSDCBalance.toString(),
    }))
  }

  const handleCopyFromWallet = () => {
    handleUpdateForm((state) => ({
      ...state,
      address: account ?? '',
    }))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault()
    handleNext()
  }

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <NetworkAlert className="-mt-20 mb-8" chain={formInputs.source} />

      <div className="-mx-6 flex items-center justify-between">
        <FormControl className="mx-6" fullWidth>
          <InputLabel id="source">Source</InputLabel>
          <Select
            id="source"
            label="Source"
            error={
              account !== null &&
              active &&
              CHAIN_TO_CHAIN_ID[source] !== chainId
            }
            value={source}
            onChange={(event) => handleSourceChange(event.target.value)}
          >
            {CHAIN_SELECT_ITEMS.map((chain) => renderChainMenuItem(chain))}
          </Select>
        </FormControl>

        <EastIcon className="text-gumdrop-200" sx={{ fontSize: 40 }} />

        <FormControl className="mx-6" fullWidth>
          <InputLabel id="target">Destination</InputLabel>
          <Select
            id="target"
            label="Destination"
            value={target}
            onChange={(event) =>
              handleUpdateForm((state) => ({
                ...state,
                target: event.target.value,
              }))
            }
          >
            {CHAIN_SELECT_ITEMS.map((chain) =>
              renderChainMenuItem(chain, source)
            )}
          </Select>
        </FormControl>
      </div>

      <FormControl className="mt-12" fullWidth>
        <TextField
          id="address"
          label="Destination Address"
          variant="outlined"
          value={address}
          error={address !== '' && (address.length !== 42 || !address.startsWith('0x'))}
          helperText={getAddressHelperText}
          onChange={(event) =>
            handleUpdateForm((state) => ({
              ...state,
              address: event.target.value,
            }))
          }
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  color="secondary"
                  onClick={handleCopyFromWallet}
                  disabled={!account || !active}
                >
                  COPY FROM WALLET
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <FormControl className="mt-6" fullWidth>
        <TextField
          id="amount"
          label="Amount"
          variant="outlined"
          type="number"
          error={
            amount !== '' &&
            (isNaN(+amount) || +amount <= 0 || +amount > walletUSDCBalance)
          }
          helperText={getAmountHelperText}
          value={amount}
          onChange={(event) =>
            handleUpdateForm((state) => ({
              ...state,
              amount: event.target.value,
            }))
          }
          InputLabelProps={{ shrink: true }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <Button
                  color="secondary"
                  onClick={handleAddMax}
                  disabled={walletUSDCBalance === 0}
                >
                  ADD MAX
                </Button>
              </InputAdornment>
            ),
          }}
        />
      </FormControl>

      <Button
        className="mt-12"
        type="submit"
        variant="contained"
        size="large"
        disabled={!isFormValid}
        sx={{
          background: 'linear-gradient(135deg, #1976d2 0%, #1565c0 100%)',
          color: 'white',
          fontWeight: 700,
          fontSize: '1.1rem',
          padding: '16px 32px',
          borderRadius: '12px',
          textTransform: 'none',
          boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
          '&:hover': {
            background: 'linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)',
            boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
            transform: 'translateY(-2px)',
          },
          '&:disabled': {
            background: '#e0e0e0',
            color: '#9e9e9e',
            boxShadow: 'none',
          },
        }}
      >
        💸 Send USDC Remittance
      </Button>
    </form>
  )
}

export default SendForm
