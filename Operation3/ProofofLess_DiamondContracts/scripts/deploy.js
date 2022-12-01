/* global ethers */
// const hre = require("hardhat");
const { ethers } = require('hardhat')
const diamond = require('../js/diamond-util/src/index.js')

function addCommas (nStr) {
  nStr += ''
  const x = nStr.split('.')
  let x1 = x[0]
  const x2 = x.length > 1 ? '.' + x[1] : ''
  var rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, '$1' + ',' + '$2')
  }
  return x1 + x2
}

function strDisplay (str) {
  return addCommas(str.toString())
}

async function deployDiamond () {
  
  const accounts = await ethers.getSigners()
  const contractOwner = accounts[0]
  console.log('Account: ' + contractOwner)
  console.log('---')
  let stablePayingAddress;

  if (hre.network.name === 'matic' || hre.network.name === 'hardhat') {
    // Polygon Mainnet Usdc Address
    stablePayingAddress = "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174" 
  } else if (hre.network.name === 'mumbai') {
    // Mumbai Proof Of Less Test PUsdc
    stablePayingAddress = '0xb17ddD9426d3BCA925C48b24D9179B3B77162e51'
  }

  let tx
  let totalGasUsed = ethers.BigNumber.from('0')
  let receipt

  async function deployFacets (...facets) {
    const instances = []
    for (let facet of facets) {
      let constructorArgs = []
      if (Array.isArray(facet)) {
        ;[facet, constructorArgs] = facet
      }
      const factory = await ethers.getContractFactory(facet)
      const facetInstance = await factory.deploy(...constructorArgs)
      await facetInstance.deployed()
      const tx = facetInstance.deployTransaction
      const receipt = await tx.wait()
      // console.log(`${facet} deploy gas used:` + strDisplay(receipt.gasUsed))
      totalGasUsed = totalGasUsed.add(receipt.gasUsed)
      instances.push(facetInstance)
    }
    return instances
  }

  let [
    donutFacet,
    itemsFacet,
    itemsTransferFacet,
    tokenFactoryFacet,
    protocolFacet,
    questFactoryFacet,
    questFacet,
    vaultFacet,
    whitelistFacet
  ] = await deployFacets(
    'contracts/proofOfLess/facets/DonutFacet.sol:DonutFacet',
    'contracts/proofOfLess/facets/ItemsFacet.sol:ItemsFacet',
    'contracts/proofOfLess/facets/ItemsTransferFacet.sol:ItemsTransferFacet',
    'contracts/proofOfLess/facets/TokenFactoryFacet.sol:TokenFactoryFacet',
    'contracts/proofOfLess/facets/ProtocolFacet.sol:ProtocolFacet',
    'contracts/proofOfLess/facets/QuestFactoryFacet.sol:QuestFactoryFacet',
    'contracts/proofOfLess/facets/QuestFacet.sol:QuestFacet',
    'contracts/proofOfLess/facets/VaultFacet.sol:VaultFacet',
    'contracts/proofOfLess/facets/WhitelistFacet.sol:WhitelistFacet',
  )

  const proofOfLessDiamond = await diamond.deploy({
    diamondName: 'ProofOfLessDiamond',
    initDiamond: 'contracts/proofOfLess/InitDiamond.sol:InitDiamond',
    facets: [
      ['DonutFacet', donutFacet],
      ['ItemsFacet', itemsFacet],
      ['ItemsTransferFacet', itemsTransferFacet],
      ['TokenFactoryFacet', tokenFactoryFacet],
      ['ProtocolFacet', protocolFacet],
      ['QuestFactoryFacet', questFactoryFacet],
      ['QuestFacet', questFacet],
      ['VaultFacet', vaultFacet],
      ['WhitelistFacet', whitelistFacet]
    ],
    owner: contractOwner.address,
    args: [[name= "ProofOfLessDiamond", symbol= "PoL", treasuryAddress="0xbd77C8acfbEb46Dbb2fD69FDEb80AE642c107fB6", oracleAddress = "0xbd77C8acfbEb46Dbb2fD69FDEb80AE642c107fB6", adminAddress = contractOwner.address, mainToken = stablePayingAddress]]
  })

  tx = proofOfLessDiamond.deployTransaction
  receipt = await tx.wait()
  // console.log('ProofOfLess diamond deploy gas used:' + strDisplay(receipt.gasUsed))
  totalGasUsed = totalGasUsed.add(receipt.gasUsed)

  // create first cycle
  tokenFactoryFacet = await ethers.getContractAt('TokenFactoryFacet', proofOfLessDiamond.address)
  tx = await tokenFactoryFacet.createCycle(158, 0) // (maxSupply, donutPrice)
  receipt = await tx.wait()
  // console.log('Cycle created:' + strDisplay(receipt.gasUsed))
  totalGasUsed = totalGasUsed.add(receipt.gasUsed)

  // receipt = await tx.wait()
  // // console.log('ProofOfLess diamond deploy gas used:' + strDisplay(receipt.gasUsed))
  // totalGasUsed = totalGasUsed.add(receipt.gasUsed)

    // -- create Less Token --
    let _itemType = {
      name: "Less",
      description: "Less Token",
      author: "Proof Of Less",
      traitModifiers: [0, 0, 0, 0, 0, 0],
      slotPositions: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
      lessPrice: 0,
      stablePrice: 0,
      maxQuantity: 10000000,
      totalQuantity: 0,
      canPurchaseWithLess: false,
      canPurchaseWithCoins: false,
      minLevel: 0,
      canBeTransferred: false,
      category: 10, // 10 = tokenLess
      // kinshipBonus: 0,
      experienceBonus: 0

    }
    tx = await tokenFactoryFacet.addItemTypes([_itemType])
    receipt = await tx.wait()
    // console.log('Less Token Item Created:' + strDisplay(receipt.gasUsed))
    totalGasUsed = totalGasUsed.add(receipt.gasUsed)

    // -- create less Token Id to global ref for later onchain ref --
    protocolFacet = await ethers.getContractAt('ProtocolFacet', proofOfLessDiamond.address)
    tx = await protocolFacet.setLessItemId(0)
    receipt = await tx.wait()
    // console.log('Less Token Id Added to Global State :' + strDisplay(receipt.gasUsed))
    totalGasUsed = totalGasUsed.add(receipt.gasUsed)
  

  // -- create twitter quest --
  questFactoryFacet = await ethers.getContractAt('QuestFactoryFacet', proofOfLessDiamond.address)
  // let questEntry = (10).toFixed(6);
  tx = await questFactoryFacet.createNewQuestData(
    "Twitter Quest", 
    contractOwner.address, 
    "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174", 
    0, // quest entry cost
    0, //less reward
    0, // fees
    1, // start period
    1, // end period
    "Focus on value, not quantity !", 
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.", 
    "Tweet less than your 6 month weekly average for 4 consecutive week.", 
    "Social Media"
    )
  receipt = await tx.wait()
  // console.log('Quest created:' + strDisplay(receipt.gasUsed))
  totalGasUsed = totalGasUsed.add(receipt.gasUsed)

    // -- create donut whitelist --
    whitelistFacet = await ethers.getContractAt('contracts/proofOfLess/facets/WhitelistFacet.sol:WhitelistFacet', proofOfLessDiamond.address)
    tx = await whitelistFacet.createWhitelist("Donut WhiteList", ["0x4a8cF400cd00D54C784D910571Da49a4e4F3c866"]) // white list name + address to whitelist
    receipt = await tx.wait()
    // console.log('Donut Whitelist Created:' + strDisplay(receipt.gasUsed))
    totalGasUsed = totalGasUsed.add(receipt.gasUsed)

    // -- add donut whitelist id to global state --
    tx = await whitelistFacet.setDonutWhiteListId(1) // white list name + address to whitelist
    receipt = await tx.wait()
    // console.log('Donut Whitelist Id Added to Global States:' + strDisplay(receipt.gasUsed))
    totalGasUsed = totalGasUsed.add(receipt.gasUsed)

    // // /!\ Token initialized in diamond init in regard of hardhat network
    // // -- add usdc paying address to global state --
    // vaultFacet = await ethers.getContractAt('contracts/proofOfLess/facets/VaultFacet.sol:VaultFacet', proofOfLessDiamond.address)
    // tx = await vaultFacet.setNewMainPayingToken(1) // white list name + address to whitelist
    // receipt = await tx.wait()
    // // console.log('Donut Whitelist Id Added to Global States:' + strDisplay(receipt.gasUsed))
    // totalGasUsed = totalGasUsed.add(receipt.gasUsed)


  // receipt = await tx.wait()
  // // console.log('ProofOfLess diamond deploy gas used:' + strDisplay(receipt.gasUsed))
  // totalGasUsed = totalGasUsed.add(receipt.gasUsed)

  const diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', proofOfLessDiamond.address)
  donutFacet = await ethers.getContractAt('contracts/proofOfLess/facets/DonutFacet.sol:DonutFacet', proofOfLessDiamond.address)
  itemsFacet = await ethers.getContractAt('contracts/proofOfLess/facets/ItemsFacet.sol:ItemsFacet', proofOfLessDiamond.address)
  itemsTransferFacet = await ethers.getContractAt('contracts/proofOfLess/facets/ItemsTransferFacet.sol:ItemsTransferFacet', proofOfLessDiamond.address)
  // tokenFactoryFacet = await ethers.getContractAt('contracts/proofOfLess/facets/TokenFactoryFacet.sol:TokenFactoryFacet', proofOfLessDiamond.address)
  // protocolFacet = await ethers.getContractAt('contracts/proofOfLess/facets/ProtocolFacet.sol:ProtocolFacet', proofOfLessDiamond.address)
  // questFactoryFacet = await ethers.getContractAt('contracts/proofOfLess/facets/QuestFactoryFacet.sol:QuestFactoryFacet', proofOfLessDiamond.address)
  questFacet = await ethers.getContractAt('contracts/proofOfLess/facets/QuestFacet.sol:QuestFacet', proofOfLessDiamond.address)
  vaultFacet = await ethers.getContractAt('contracts/proofOfLess/facets/VaultFacet.sol:VaultFacet', proofOfLessDiamond.address)
  // whitelistFacet = await ethers.getContractAt('contracts/proofOfLess/facets/WhitelistFacet.sol:WhitelistFacet', proofOfLessDiamond.address)
  
  console.log('ProofOfLess diamond address:' + proofOfLessDiamond.address)
  console.log('ProofOfLess diamond owner:' + contractOwner)
  console.log('Total gas used: ' + strDisplay(totalGasUsed))
  return {
    contractOwner: contractOwner,
    proofOfLessDiamond: proofOfLessDiamond,
    diamondLoupeFacet: diamondLoupeFacet,

    donutFacet: donutFacet,
    itemsFacet: itemsFacet,
    itemsTransferFacet: itemsTransferFacet,
    tokenFactoryFacet: tokenFactoryFacet,
    protocolFacet : protocolFacet,
    questFactoryFacet: questFactoryFacet,
    questFacet: questFacet,
    vaultFacet: vaultFacet,
    whitelistFacet: whitelistFacet

  }

}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
if (require.main === module) {
  deployDiamond()
    .then(() => process.exit(0))
    .catch(error => {
      console.error(error)
      process.exit(1)
    })
}

exports.deployDiamond = deployDiamond
// exports.deployProject = deployDiamond
