# 💰 How to Get USDC in MetaMask for Testing

## 🎯 **Quick Overview**

MetaMask **DOES support USDC**! You just need to:
1. Add testnet networks to MetaMask
2. Get free ETH/AVAX for gas fees
3. Get free USDC from Circle's faucet
4. Add USDC token to see your balance

---

## 🔧 **Step 1: Add Testnet Networks to MetaMask**

### **Option A: Let Your App Add Networks (Easiest)**
1. Go to `http://localhost:3000`
2. Click "Connect MetaMask" 
3. Try to select a different network in your app
4. MetaMask will automatically prompt you to add the network
5. Click "Add Network" when prompted

### **Option B: Add Networks Manually**

#### **1. Ethereum Sepolia (Easiest to start with)**
1. Open MetaMask
2. Click the network dropdown (top center)
3. Click "Add Network" → "Add a network manually"
4. Enter these details:
   - **Network Name**: `Sepolia Test Network`
   - **RPC URL**: `https://sepolia.infura.io/v3/`
   - **Chain ID**: `11155111`
   - **Currency Symbol**: `ETH`
   - **Block Explorer**: `https://sepolia.etherscan.io`
5. Click "Save"

#### **2. Base Sepolia (Popular L2)**
- **Network Name**: `Base Sepolia Testnet`
- **RPC URL**: `https://sepolia.base.org`
- **Chain ID**: `84532`
- **Currency Symbol**: `ETH`
- **Block Explorer**: `https://sepolia.basescan.org`

#### **3. Arbitrum Sepolia**
- **Network Name**: `Arbitrum Sepolia Testnet`
- **RPC URL**: `https://arb-sepolia.g.alchemy.com/v2/demo`
- **Chain ID**: `421614`
- **Currency Symbol**: `ETH`
- **Block Explorer**: `https://sepolia.arbiscan.io`

#### **4. Avalanche Fuji**
- **Network Name**: `Avalanche FUJI C-Chain`
- **RPC URL**: `https://api.avax-test.network/ext/bc/C/rpc`
- **Chain ID**: `43113`
- **Currency Symbol**: `AVAX`
- **Block Explorer**: `https://testnet.snowtrace.io`

---

## 💰 **Step 2: Get Gas Tokens (ETH/AVAX)**

**You need gas tokens BEFORE getting USDC!**

### **For Ethereum Sepolia (Start Here)**
1. Switch to "Sepolia Test Network" in MetaMask
2. Copy your wallet address
3. Go to: https://faucet.sepolia.dev/
4. Paste your address and get free ETH
5. Wait 1-2 minutes for ETH to appear

### **For Base Sepolia**
- Go to: https://faucet.quicknode.com/base/sepolia

### **For Arbitrum Sepolia**
- Go to: https://faucet.arbitrum.io/

### **For Avalanche Fuji**
- Go to: https://faucet.avax.network/

---

## 🎯 **Step 3: Get USDC from Circle's Faucet**

### **Get 10 Free USDC**
1. **Stay on the testnet** you got gas for (e.g., Sepolia)
2. Go to: **https://faucet.circle.com/**
3. **Select your network**: Sepolia, Base Sepolia, Arbitrum Sepolia, or Fuji
4. **Paste your wallet address**
5. Click "Request USDC"
6. Wait 1-2 minutes for USDC to arrive

---

## 👀 **Step 4: Add USDC Token to MetaMask**

**Important: You won't see USDC until you add the token!**

### **Add USDC Token:**
1. In MetaMask, scroll down to "Import tokens"
2. Click "Import tokens"
3. Select "Custom token"
4. Enter the **USDC contract address** for your network:

| Network | USDC Contract Address |
|---------|----------------------|
| **Ethereum Sepolia** | `0x1c7d4b196cb0c7b01d743fbc6116a902379c7238` |
| **Base Sepolia** | `0x036CbD53842c5426634e7929541eC2318f3dCF7e` |
| **Arbitrum Sepolia** | `0x75faf114eafb1bdbe2f0316df893fd58ce46aa4d` |
| **Avalanche Fuji** | `0x5425890298aed601595a70AB815c96711a31Bc65` |

5. **Symbol**: `USDC`
6. **Decimals**: `6`
7. Click "Add Custom Token"
8. Click "Import Tokens"

**🎉 You should now see your 10 USDC balance!**

---

## 🚀 **Step 5: Test Cross-Chain Transfer**

### **Example: Sepolia → Base Transfer**
1. **Start on Ethereum Sepolia** (where you have USDC)
2. **Open your app**: `http://localhost:3000`
3. **Connect MetaMask**
4. **Go to Send/Transfer page**
5. **Configure transfer**:
   - Source: Ethereum Sepolia
   - Destination: Base Sepolia
   - Address: Your same wallet address
   - Amount: 5 USDC (save some for gas)
6. **Execute transfer**
7. **Switch to Base Sepolia** in MetaMask
8. **Complete the redemption** in your app

---

## 🔍 **Troubleshooting**

### **"I don't see USDC in MetaMask"**
- Did you add the USDC token contract? (Step 4)
- Are you on the correct network?
- Check the transaction on the block explorer

### **"Transaction failed"**
- Do you have enough ETH/AVAX for gas?
- Are you on the correct network?
- Try with a smaller amount (1 USDC)

### **"Faucet says address already used"**
- Circle's faucet: 1 request per day per address
- Try a different faucet or wait 24 hours
- Use a different wallet address

---

## ⚡ **Quick Start Recipe**

**Fastest way to start testing:**

1. **Add Ethereum Sepolia** to MetaMask
2. **Get ETH**: https://faucet.sepolia.dev/
3. **Get USDC**: https://faucet.circle.com/ (select Sepolia)
4. **Add USDC token**: `0x1c7d4b196cb0c7b01d743fbc6116a902379c7238`
5. **Test transfer** in your app!

---

## 🎯 **Summary**

- ✅ **MetaMask supports USDC** (it's just an ERC-20 token)
- ✅ **Use testnets** (Sepolia, Base, Arbitrum, Fuji) for free testing
- ✅ **Get free gas tokens** first, then USDC
- ✅ **Add USDC token contract** to see balance
- ✅ **Your app handles** all the complex cross-chain stuff

**Ready to test cross-chain USDC transfers!** 🚀 