// /* global describe it before ethers */
// const erc20Abi = require("./ERC20abi2.json");

// const {
//   getSelectors,
//   FacetCutAction,
//   removeSelectors,
//   findAddressPositionInFacets
// } = require('../scripts/libraries/diamond.js')

// const { deployDiamond } = require('../scripts/deploy.js')

// const { assert } = require('chai');
// const { ethers } = require("hardhat");

// let Pol = {  
//     diamondAddress,
//     diamondCutFacet,
//     diamondLoupeFacet,
//     ownershipFacet,
//     usdcAddress:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
//     usdcContract,
//     impersonatedSigner,
//     // tx,
//     // receipt,
//     // result,
//     // addresses : [],
//     vaultFacet,
//     nftFactoryFacet,
//   }

// describe('DiamondTest', async function () {
// //   let diamondAddress
// //   let diamondCutFacet
// //   let diamondLoupeFacet
// //   let ownershipFacet
// //   let usdcContract
// //   let impersonatedSigner;
//   let tx
//   let receipt
//   let result
//   const addresses = []
// //   let vaultFacet
// //   let nftFactoryFacet

//   before(async function () {
//     // console.log("ERC20 abi res", erc20Abi);
//     Pol.diamondAddress = await deployDiamond()
    
//     Pol.diamondCutFacet = await ethers.getContractAt('DiamondCutFacet', Pol.diamondAddress)
//     Pol.diamondLoupeFacet = await ethers.getContractAt('DiamondLoupeFacet', Pol.diamondAddress)
//     Pol.ownershipFacet = await ethers.getContractAt('OwnershipFacet', Pol.diamondAddress)
//     Pol.usdcContract = await ethers.getContractAt(erc20Abi, Pol.usdcAddress )
//     // await usdcContract.deployed();
//     Pol.impersonatedSigner = await ethers.getImpersonatedSigner('0xfff983c7ed459e69590e28e5fd43c275eba0e403')
//     // vaultFacet = await ethers.getContractAt('Vault', diamondAddress)
//     // nftFactoryFacet = await ethers.getContractAt('NftFactory', diamondAddress)
//   })

//   it('should have three facets -- call to facetAddresses function', async () => {
//     for (const address of await Pol.diamondLoupeFacet.facetAddresses()) {
//         Pol.addresses.push(address)
//     }

//     assert.equal(Pol.addresses.length, 3)
//   })

//   it('facets should have the right function selectors -- call to facetFunctionSelectors function', async () => {
//     let selectors = getSelectors(Pol.diamondCutFacet)
//     result = await diamondLoupeFacet.facetFunctionSelectors(Pol.addresses[0])
//     assert.sameMembers(result, selectors)
//     selectors = getSelectors(diamondLoupeFacet)
//     result = await diamondLoupeFacet.facetFunctionSelectors(Pol.addresses[1])
//     assert.sameMembers(result, selectors)
//     selectors = getSelectors(ownershipFacet)
//     result = await diamondLoupeFacet.facetFunctionSelectors(Pol.addresses[2])
//     assert.sameMembers(result, selectors)
//   })

//   it('selectors should be associated to facets correctly -- multiple calls to facetAddress function', async () => {
//     assert.equal(
//       addresses[0],
//       await diamondLoupeFacet.facetAddress('0x1f931c1c')
//     )
//     assert.equal(
//       addresses[1],
//       await diamondLoupeFacet.facetAddress('0xcdffacc6')
//     )
//     assert.equal(
//       addresses[1],
//       await diamondLoupeFacet.facetAddress('0x01ffc9a7')
//     )
//     assert.equal(
//       addresses[2],
//       await diamondLoupeFacet.facetAddress('0xf2fde38b')
//     )
//   })

// })
