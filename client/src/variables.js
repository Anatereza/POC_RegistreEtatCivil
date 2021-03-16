// ATTENTION : npm install @truffle/hdwallet-provider

export const HDWalletProvider = require("@truffle/hdwallet-provider");

// A modifier après chaque lancement de ganache
export const mnemonicPhrase = "annual anxiety detail slide dry spawn drink weather mammal blouse club away"; // 12 word mnemonic

export const networkUrl = "http://localhost:8545"
export const provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: networkUrl
  });