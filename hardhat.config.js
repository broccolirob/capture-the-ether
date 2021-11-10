require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("@tenderly/hardhat-tenderly");
require("hardhat-gas-reporter");
require("hardhat-deploy");
require("solidity-coverage");
require("./tasks/accounts");
require("./tasks/balance");
require("./tasks/block-number");
require("./tasks/tenderly-verify");

require("dotenv").config();

const {
  MNEMONIC,
  ALCHEMY_FORK_KEY,
  ALCHEMY_ROPSTEN_KEY,
  FORK_BLOCK,
  ETHERSCAN_KEY,
  REPORT_GAS,
  TENDERLY_PROJECT,
  TENDERLY_USERNAME,
  NETWORK,
  COINMARKETCAP_KEY,
} = process.env;

module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.21",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    ],
  },
  defaultNetwork: NETWORK,
  networks: {
    hardhat: {
      forking: {
        url: `https://eth-mainnet.alchemyapi.io/v2/${ALCHEMY_FORK_KEY}`,
        blockNumber: parseInt(FORK_BLOCK),
      },
    },
    localhost: {
      url: "http://localhost:8545",
    },
    ropsten: {
      url: `https://eth-ropsten.alchemyapi.io/v2/${ALCHEMY_ROPSTEN_KEY}`,
      accounts: {
        mnemonic: MNEMONIC,
      },
      chainId: 3,
    },
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    bob: {
      default: 1,
    },
    alice: {
      default: 2,
    },
    mallory: {
      default: 3,
    },
  },
  gasReporter: {
    enabled: REPORT_GAS !== undefined,
    coinmarketcap: COINMARKETCAP_KEY,
    currency: "USD",
  },
  etherscan: {
    apiKey: ETHERSCAN_KEY,
  },
  tenderly: {
    project: TENDERLY_PROJECT,
    username: TENDERLY_USERNAME,
  },
  mocha: {
    timeout: 100000,
  },
};
