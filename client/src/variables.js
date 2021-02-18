// ATTENTION : npm install @truffle/hdwallet-provider

export const HDWalletProvider = require("@truffle/hdwallet-provider");

// A modifier après chaque lancement de ganache
export const mnemonicPhrase = "health able wonder approve stove dynamic infant throw reveal net oil trash"; // 12 word mnemonic

export const networkUrl = "http://localhost:8545"
export const provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: networkUrl
  });