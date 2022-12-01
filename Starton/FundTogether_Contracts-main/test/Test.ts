import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers, network } from "hardhat";
import {ERC20, Campaign, IbToken} from "../typechain-types";

let CF:any;
let AccessCard:any;
let Tusdc: any;
let s1:any;
let s2:any;
let campaign:Campaign;
let IIbToken:IbToken;

async function skipDays(d: number) {
  ethers.provider.send('evm_increaseTime', [d * 86400]);
  ethers.provider.send('evm_mine', []);
}

describe("CampaignFactory", function () {
  before(async function () {
  //   await network.provider.request({
  //     method: "hardhat_reset",
  //     params: [{
  //         forking: {
  //             enabled: true,
  //             jsonRpcUrl: "https://bsc-testnet.nodereal.io/v1/e9a36765eb8a40b9bd12e680a1fd2bc5",
  //             chainId: 56,
  //             gasPrice: 20000000000,
  //         },
  //     }, ],
  // });

    // Contracts are deployed using the first signer/account by default
    [s1, s2] = await ethers.getSigners();

    const tusdc = await ethers.getContractFactory("TUsdc");
    Tusdc = await tusdc.deploy();
    // console.log("Tusdc contract deployed at address :", Tusdc.address);

    const accessCard = await ethers.getContractFactory("AccessCard");
    AccessCard = await accessCard.deploy();
    // console.log("AccessCard contract deployed at address :", AccessCard.address);

    const CampaignFactory = await ethers.getContractFactory("CampaignFactory");
    CF = await CampaignFactory.deploy(AccessCard.address, Tusdc.address, 100, s1.address); //access card contract address / paying token / campaign price
    // console.log("CF contract deployed at address :", CF.address);
  })

  describe("Deploy & Test Campaigns", function () {
    it("should mint test token", async function () {
      await Tusdc.mint(s1.address, 10000000000000);
      await Tusdc.mint(s2.address, 10000000000000);
    })

    it("should mint access card", async function () {
      await AccessCard.safeMint(s1.address);
    })

    it("Deploy a first campaign", async function () {
      await CF.createCampaign(0, Tusdc.address); // minimumDeposit, supported Token
      const deployedCampaign = await CF.getDeployedCampaigns();
      let contractAddress = deployedCampaign[0];
      campaign = await ethers.getContractAt("Campaign", contractAddress);
    });

    it("should retrieve campaign metrics", async function () {
      const [minimumContribution_, interestRate_, totalBalance_, approversCount_, manager_, actualToken_, ibTokenAddress_, supportedTokens_] = await campaign.getSummary();
      console.log("Minimum Contribution_ ->", minimumContribution_);
      console.log("Interest Rate ->", interestRate_);
      console.log("Total Balance ->", totalBalance_);
      console.log("Approvers Count ->", approversCount_);
      console.log("Manager Address ->", manager_);
      console.log("Actual Token ->", actualToken_);
      console.log("IbToken ->", ibTokenAddress_);
      console.log("All Supported Tokens ->", supportedTokens_);
      let ibTokenAddress = await campaign.ibTokenAddress();
      IIbToken = await ethers.getContractAt("IbToken", ibTokenAddress);
      await IIbToken.deployed();
    });

    it(" User should deposit funds to campaign", async function () {
      await Tusdc.connect(s2).approve(campaign.address, 10000);
      await campaign.connect(s2).contribute(10000);
      let bal = await IIbToken.balanceOf(s2.address);
      console.log("IbToken received : ", bal);
    });

    it(" User should withdraw funds from campaign", async function () {
      await IIbToken.connect(s2).approve(campaign.address, 10000);
      await campaign.connect(s2).claim(10000);
      let bal = await IIbToken.balanceOf(s2.address);
      console.log("IbToken balance is : ", bal);
    });
  });

});
