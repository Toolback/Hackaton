import { ethers } from "hardhat";

async function main() {
  const [deployer] = await ethers.getSigners();
  
  console.log("Deploying contracts with the account:", deployer.address);

  console.log("Account balance:", (await deployer.getBalance()).toString());
  
  const CampaignFactory = await ethers.getContractFactory("CampaignFactory");

  //access card contract address / paying token / campaign price
  const campaignFactory = await CampaignFactory.deploy("0xAB153C57cAdBEE57C7C5792E8e10E183bE46E8F0", "0xA9b64D80254BC665CdA3bc93C3566Fe56CfF9a38", 0, deployer.address); 
  
  console.log("Campaign Factory deployed to ->", campaignFactory.address);
}

main()
.then(() => process.exit(0))
.catch((error) => {
  console.error(error);
  process.exit(1);
});