require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();

const POLYGON_RPC_URL = "https://polygon-mumbai.infura.io/v3/0faf246c4dde4496ab2d4727068330ba";

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
