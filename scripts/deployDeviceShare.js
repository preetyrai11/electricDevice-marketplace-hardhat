// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with the account:", deployer.address);
  const deviceContract=await hre.ethers.getContractFactory("DeviceShare");
  const tokenAddress = "0x30233906DF257f6E712094C4961E9f375ea9FCbD";
  const fixedStake = ethers.utils.parseUnits("0.5");
    const StakingContract_Address = "0x31aC7297ffaDc6cc8014697d0762eB2E6d6CE0B4";
  const contract = await deviceContract.deploy(tokenAddress,fixedStake,StakingContract_Address);
  await contract.deployed();
    console.log("Contract Address",contract.address);//0xD43D3BddC564645B8C51542873ca19307A090d75
    console.log("Sleeping.....");
  // Wait for etherscan to notice that the contract has been deployed
  await sleep(40000);

  // Verify the contract after deploying
  await hre.run("verify:verify", {
    address: contract.address,
      constructorArguments: [tokenAddress,fixedStake,StakingContract_Address],
    contract: "contracts/DeviceShare.sol:DeviceShare"
  });
}
function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});