require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config();
//import { PRIVATE_KEY } from "../env";
//import { INFURA_ENDPOINT } from "../env";
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.20",
  networks: {
    testnet: {
      url: "https://polygon-mumbai.infura.io/v3/0faf246c4dde4496ab2d4727068330ba",
      accounts: ["f4ded818e12218c2f26d30b171b560a378d8126c6e7440f9658e854e60eace6d"],
    }
  }
};
