import { HardhatUserConfig } from "hardhat/config";
import "@typechain/hardhat";
import "@nomicfoundation/hardhat-toolbox";
// require('@openzeppelin/hardhat-upgrades');

require("dotenv").config();

// BSC Setup

const config: HardhatUserConfig = {
  solidity: "0.8.17",
  defaultNetwork: "hardhat",
  networks: {
    hardhat: {
      forking: {
        url: process.env.MATIC_URL,
        timeout: 12000000,
        // blockNumber: 12552123,
        // blockNumber: 20024371,
      },
      blockGasLimit: 20000000,
      timeout: 120000,
      gas: "auto",
    },
    localhost: {
      timeout: 16000000,
    },
    testnet: {
      // url: "https://data-seed-prebsc-1-s1.binance.org:8545",
      url: "https://bsc-testnet.nodereal.io/v1/4cfcf4b758214e13a3ea8f7be79940e6",
      chainId: 97,
      gasPrice: 20000000000,
      accounts: [process.env.SECRET_KEY]
    },
    mumbai: {
      url: process.env.MATIC_URL,
      // url: 'https://rpc-mainnet.maticvigil.com/',
      accounts: [process.env.SECRET_KEY],
      // blockGasLimit: 20000000,
      // gasPrice: 1000000000,
      timeout: 90000,
      gas: "auto",
    },
  },
};

export default config;