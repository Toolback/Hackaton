import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
    
  const tusdc = await ethers.getContractFactory("TUsdc");
  const Tusdc = await tusdc.deploy();
  console.log("Tusdc contract deployed at address :", Tusdc.address);

  const accessCard = await ethers.getContractFactory("AccessCard");
  const AccessCard = await accessCard.deploy();
  console.log("AccessCard contract deployed at address :", AccessCard.address);

  // const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
  // const CF = await CampaignFactory.deploy(AccessCard.address, Tusdc.address, 100); //access card contract address / paying token / campaign price
  // console.log("CF contract deployed at address :", CF.address);

}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});

