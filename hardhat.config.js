require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const POLYGON_RPC_URL = process.env.POLYGON_RPC_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: "0.8.20",
  defaultNetwork: "polygon_mumbai",
  networks: {
    polygon_mumbai: {
      url: POLYGON_RPC_URL,
      accounts: [PRIVATE_KEY],
    }
  }
};
