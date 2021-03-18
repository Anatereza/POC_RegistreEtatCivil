// ATTENTION : npm install @truffle/hdwallet-provider

export const HDWalletProvider = require("@truffle/hdwallet-provider");

// A modifier après chaque lancement de ganache
export const mnemonicPhrase = "wall cube series pretty father tumble mandate police regret sing open summer"; // 12 word mnemonic


export const networkUrl = "http://localhost:8545"
export const provider = new HDWalletProvider({
    mnemonic: {
      phrase: mnemonicPhrase
    },
    providerOrUrl: networkUrl
});

// CI : COte d'ivoire
// GB : Gabon
export const countryLayout = "GB";

let countryColor1

switch (countryLayout){
  case "CI":
    countryColor1 = "#fbc658"
  break;
  case "GB":
    countryColor1 = "#FCD20E"
  break;
  default:
}

export const countryColors = [countryColor1];

let rien
export default rien
