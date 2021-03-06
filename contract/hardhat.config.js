require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");
require("@nomiclabs/hardhat-ethers");
require("hardhat-deploy-ethers");
require("./tasks/whitelistTokens");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    version: "0.8.4",
    settings: {
      optimizer: {
        enabled: true,
        runs: 300,
      },
    },
  },
  networks: {
    hardhat: {
      accounts: {
        mnemonic: process.env.TEST_WALLET_MNEMONIC,
        count: 10,
        initialIndex: 0,
      },
    },
    localhost: {
      accounts: {
        mnemonic: process.env.TEST_WALLET_MNEMONIC,
        count: 10,
        initialIndex: 0,
      },
      chainId: 31337,
      url: process.env.LOCALHOST_URL,
    },
    goerli: {
      chainId: 5,
      url: process.env.GOERLI_URL,
      accounts: {
        mnemonic: process.env.TEST_WALLET_MNEMONIC,
        count: 10,
        initialIndex: 0,
      },
    },
  },
  spdxLicenseIdentifier: {
    overwrite: true,
    runOnCompile: true,
  },
  namedAccounts: {
    deployer: {
      default: 0, // here this will by default take the first account as deployer
      1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
    },
    feeCollector: {
      default: 1,
    },
    beneficiary: {
      default: 2,
    },
  },
};
