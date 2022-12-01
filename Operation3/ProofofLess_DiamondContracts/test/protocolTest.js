/* global describe it before ethers */
const erc20Abi = require("./erc20abi2.json");

// const {
//   getSelectors,
//   FacetCutAction,
//   removeSelectors,
//   findAddressPositionInFacets
// } = require('../scripts/libraries/diamond.js')

const { deployDiamond } = require('../scripts/deploy.js')

const { assert, expect, should } = require('chai');
const { ethers } = require("hardhat");




describe('Proof Of Less Protocol Facets Test', function () {
  let diamondAddress
  let proofOfLessDiamond
  let usdcAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"
  let usdcContract
  let owner
  let impersonatedSigner

  let loupeFacet
  let vaultFacet
  let vaultFacetWithUser
  let tokenFactoryFacet
  let tokenFactoryFacetWithUser
  let protocolFacet
  let protocolFacetWithUser
  let donutFacet
  let donutFacetWithUser
  let itemsFacet
  let itemsTransferFacet
  let questFactoryFacet
  let questFacet
  let questFacetWithUser
  let whitelistFacet
  
  // let tx
  // let receipt
  // let result
  // const addresses = []


  before(async function () {
    let req = await deployDiamond()
    diamondAddress = req.proofOfLessDiamond.address
    proofOfLessDiamond = req.proofOfLessDiamond
    usdcContract = await ethers.getContractAt(erc20Abi, usdcAddress)
    owner = req.contractOwner
    impersonatedSigner = await ethers.getImpersonatedSigner('0xfff983c7ed459e69590e28e5fd43c275eba0e403')
    loupeFacet = req.diamondLoupeFacet
    vaultFacet = req.vaultFacet
    tokenFactoryFacet = req.tokenFactoryFacet
    protocolFacet = req.protocolFacet
    donutFacet = req.donutFacet
    itemsFacet = req.itemsFacet
    itemsTransferFacet = req.itemsTransferFacet
    questFactoryFacet = req.questFactoryFacet
    questFacet = req.questFacet
    whitelistFacet = req.whitelistFacet
  })
  
  describe('Test Vault Facet', () => {
    
    it("should initialize vault test settings", async() => {
      vaultFacetWithUser = vaultFacet.connect(impersonatedSigner)
      // const [owner, otherAccount] = await ethers.getSigners();

      await usdcContract.connect(impersonatedSigner).approve(diamondAddress, 200000000);
      // console.log("Initial USDC Funds of User :", await usdcContract.balanceOf(impersonatedSigner.address));
      // console.log("Initial USDC Funds of Contract :", await usdcContract.balanceOf(diamondAddress));
    })

    // /!\ TODO : Fix bug require supply listed token doesnt prevent from supplying ?
    it("should list USDC as allowed token", async () => {
      await vaultFacet.listNewToken(usdcAddress);
    })


    it("user should deposit funds to his contract wallet", async () => {
      let userBalBefore = await usdcContract.balanceOf(impersonatedSigner.address)
      let contractBalBefore = await usdcContract.balanceOf(diamondAddress)
      let userContractWalletBefore = await vaultFacet.getUserFunds(impersonatedSigner.address, usdcAddress)
      await vaultFacetWithUser.supplyFunds(usdcAddress, 100000000)
      expect(userBalBefore).to.be.above((await usdcContract.balanceOf(impersonatedSigner.address)), "User USDC Balance Should Have Decreased")
      expect(await usdcContract.balanceOf(diamondAddress)).to.be.above(contractBalBefore, "Contract Balance Should have Increased")
      expect(await vaultFacet.getUserFunds(impersonatedSigner.address, usdcAddress)).to.be.above((userContractWalletBefore), "User Contract Wallet Should Have Increased")
      // console.log("User USDC Funds After Supplying :", await usdcContract.balanceOf(impersonatedSigner.address));
      // console.log("Contract USDC Funds After User Supplied :", await usdcContract.balanceOf(diamondAddress));
      // console.log("User Funds Registered on Contract After TX :", await vaultFacet.GetUserFunds(impersonatedSigner.address, usdcAddress));
    })



    it("user should withdraw his initial deposit", async () => {
      let userBalBefore = await usdcContract.balanceOf(impersonatedSigner.address)
      let contractBalBefore = await usdcContract.balanceOf(diamondAddress)
      let userContractWalletBefore = await vaultFacet.getUserFunds(impersonatedSigner.address, usdcAddress)

      await vaultFacetWithUser.withdrawFunds(usdcAddress, 100000000)
      expect(await usdcContract.balanceOf(impersonatedSigner.address)).to.be.above(userBalBefore, "User USDC Balance Should Have Increased")
      expect(contractBalBefore).to.be.above((await usdcContract.balanceOf(diamondAddress)), "Contract Balance Should have Decreased")
      expect(userContractWalletBefore).to.be.above((await vaultFacet.getUserFunds(impersonatedSigner.address, usdcAddress)), "User Contract Wallet Should Have Decreased")

      // console.log("User USDC Funds After Withdrawing :", await usdcContract.balanceOf(impersonatedSigner.address));
      // console.log("Contract USDC Funds After User Withdrawed :", await usdcContract.balanceOf(diamondAddress));
      // console.log("User Funds Registered on Contract After TX :", await vaultFacet.GetUserFunds(impersonatedSigner.address, usdcAddress));
    })

  })

  describe('Test NftFactory Facet', () => {

    // // /!\ moved createCycle() to Deploy.js    
    // it("admin should create new donut cycle", async () => {      
    //   await nftFactoryFacet.createCycle(10000, 0)
    // })

    it("user should buy donut membership", async () => {  
      tokenFactoryFacetWithUser = tokenFactoryFacet.connect(impersonatedSigner)
      protocolFacetWithUser = protocolFacet.connect(impersonatedSigner)
      donutFacetWithUser = donutFacet.connect(impersonatedSigner)
      await tokenFactoryFacetWithUser.mintDonut(impersonatedSigner.address, 1)
      // await tokenFactoryFacet.mintDonut(impersonatedSigner.address, 1)

      // await tokenFactoryFacetWithUser.mintDonut(impersonatedSigner.address, 2)

      const testMaxDonutCount = await tokenFactoryFacet.getDonutCycle(1);
      console.log("Results Donuts Count After Minting ?", testMaxDonutCount)
      await donutFacetWithUser.setDonutName(1, "DevleDev")
      console.log("Donut Data Fetched ? ?", await donutFacet.getDonutInfos(2))
      // console.log("Contract Bal After Donut Minting (should have increase by donut's cost) :", await usdcContract.balanceOf(diamondAddress), await donutFacet.getDonutInfos(1));
      
      // let req2 = await donutFacet.isDonutNameTaken("Eyhli")
      // let req3 = await donutFacet.isDonutNameTaken("toolBack")

      // console.log("Is Name Available ?", req2, req3)
      // await tokenFactoryFacet.mintDonut(owner.address, 1)
      // await donutFacet.setDonutName(1, "Eyhli")
      // let req4 = await donutFacet.isDonutNameTaken("Eyhli")
      // let req5 = await donutFacet.isDonutNameTaken("Toolback")

      // console.log("Is Name Available ?", req4, req5)
      // expect((await donutFacet.getDonutInfos(0)).userAddress).to.be.equals(impersonatedSigner.address, "Donut's User Address Should Equal Buyer")
      
    })

    
    it("admin should create new item type", async () => {      
      let _itemType = {
        name: "Blue Topping",
        description: "Gained throught hardcore twitter contest",
        author: "Proof Of Less",
        traitModifiers: [0, 0, 0, 0, 0, 0],
        slotPositions: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        lessPrice: 0,
        stablePrice: 1,
        maxQuantity: 100000,
        totalQuantity: 0,
        canPurchaseWithLess: true,
        canPurchaseWithCoins: true,
        minLevel: 10,
        canBeTransferred: false,
        category: 0,
        // kinshipBonus: 0,
        experienceBonus: 0

      }
      await tokenFactoryFacet.addItemTypes([_itemType])
    })

    it("should mint new item type created (supposed to be admin, then resell / obtain)", async () => {  
      tokenFactoryFacetWithUser = tokenFactoryFacet.connect(impersonatedSigner)
      
      await tokenFactoryFacet.mintItems(impersonatedSigner.address, [0], [1]) // (to, itemId, qty)
      // console.log("Less Token Minted !")

      await tokenFactoryFacetWithUser.mintItems(impersonatedSigner.address, [1], [1]) // (to, itemId, qty)
      // console.log("Topping Token Minted !")

      // console.log("User Items :", await itemsFacet.itemBalances(impersonatedSigner.address))
    })

  })

  describe('Test Twitter Quest Facet', () => {

    it("retrieve all listed quest", async() => {
        let tx = await questFactoryFacet.getAllActiveQuests();
        console.log("All Listed Quest =>", tx)
      })


      it("retrieve twitter quest data", async() => {
        let tx = await questFacet.getQuestData(1);
        console.log("All Listed Quest =>", tx)
      })

    
    it("user should update twitter handle", async() => {
        questFacetWithUser = questFacet.connect(impersonatedSigner)
        await questFacetWithUser.setUserQuestUserName(1, "JulienRnlt", impersonatedSigner.address)
      })

    it("user should register to waiting list", async() => {
    //   questFacetWithUser = questFacet.connect(impersonatedSigner)
      await questFacetWithUser.subscribeToWaitingList(1)
    })

    // it("user should register again to waiting list, and fail", async() => {
    //   questFacetWithUser = questFacet.connect(impersonatedSigner)
    //   await questFacetWithUser.subscribeToWaitingList(1)
    // })

    it("user should unsubscribe from waitinglist", async() => {
      await questFacetWithUser.unsubscribeFromWaitingList(1, impersonatedSigner.address, 0)
    })

    it("user should subscribe again to waitinglist", async() => {
      await questFacetWithUser.subscribeToWaitingList(1)
    })

    // it("user(2nd) should subscribe to waitinglist", async() => {
    //   await questFacet.subscribeToWaitingList(1)
    // })

    it("admin should register waiting list to next quest cycle", async() => {
      await questFacet.registerWaitingListToQuest(1)
    })

    it("should check for new participants in twitter quest details", async() => {
      let req = await questFacet.getQuestData(1);
      // console.log("twitter quest data : ", req);
    })

    it("admin should update user quest status (attribute win)", async() => {
      await questFacet.updateUserQuestStatus(1, [impersonatedSigner.address])
    })

    it("admin should start a new cycle with onboarded waiting list", async() => {
      await questFacet.newCycle(1)
    })

    // it("should", async() => {
      
    // })

    // it("should", async() => {
      
    // })

    // it("should", async() => {
      
    // })

    // it("should", async() => {
      
    // })


  })

  // describe('Facet', () => {

  //   it("should", async() => {
      
  //   })

  //   it("should", async() => {
      
  //   })

  //   it("should", async() => {
      
  //   })


  // })

})
