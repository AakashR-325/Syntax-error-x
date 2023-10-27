const hre = require("hardhat");

async function main() {
  const MarketPlace = await hre.ethers.getContractFactory("MarketPlace");
  const marketPlace = await MarketPlace.deploy();
  await marketPlace.waitForDeployment();

  console.log(`MarketPlace contract deployed at : ${marketPlace.target}`);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
