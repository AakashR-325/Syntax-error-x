const hre = require("hardhat");

async function main() {
  const MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
  const marketPlace = await MarketPlace.deploy();

  const NFTFactory = await hre.ethers.getContractFactory("NFTFactory");
  const nftFactory = await NFTFactory.deploy();

  await marketPlace.waitForDeployment();
  await nftFactory.waitForDeployment();

  console.log(`MarketPlace contract deployed at : ${marketPlace.target}`);
  console.log(`NFTFactory contract deployed at : ${nftFactory.target}`);
}


main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });