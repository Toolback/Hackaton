// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {Modifiers, AppStorage, ItemType, WearableSet, Cycle, EQUIPPED_WEARABLE_SLOTS} from "../libraries/LibAppStorage.sol";
import {LibProtocol} from "../libraries/LibProtocol.sol";
import {LibDonuts} from "../libraries/LibDonuts.sol";
import {LibWhitelist} from "../libraries/LibWhitelist.sol";
// import "hardhat/console.sol";
import {IERC20} from "../../shared/interfaces/IERC20.sol";
import {LibERC20} from "../../shared/libraries/LibERC20.sol";

import {LibERC721} from "../../shared/libraries/LibERC721.sol";
import {LibERC1155} from "../../shared/libraries/LibERC1155.sol";
import {LibItems} from "../libraries/LibItems.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";

// import {LibERC1155Marketplace} from "../libraries/LibERC1155Marketplace.sol";

contract TokenFactoryFacet is Modifiers{
        // AppStorage internal s;
    event CreateNewCycle(uint256 indexed _cycleId, uint256 _cycleMaxSize, uint256 _donutPrice);

    event MintDonutNFT(
        address indexed _from,
        address indexed _to,
        uint256 _tokenId,
        uint256 _cycleId
    );

    event AddItemType(ItemType _itemType);
    event AddNewWearableSet(WearableSet _wearableSet);
    event NewUpdateWearableSet(uint256 _setId, WearableSet _wearableSet);
    event NewWearableSlotPositionsSet(uint256 _wearableId, bool[EQUIPPED_WEARABLE_SLOTS] _slotPositions);
    event NewItemModifiersSet(uint256 _wearableId, int8[6] _traitModifiers);
    event NewItemPriceUpdate(uint256 _itemId, uint256 _priceInWei);
    event ItemTypeMaxQuantity(uint256[] _itemIds, uint256[] _maxQuanities);




    ///@notice Allow Admins to create a new Cycle
    ///@dev Will throw if the previous cycle is not full yet
    ///@param _cycleMaxSupply The maximum number of donuts in the new cycle
    ///@param _donutPrice The base price of donuts in the new cycle (in $Usdc)
    function createCycle(
        uint24 _cycleMaxSupply,
        uint96 _donutPrice
    ) external onlyCoreTeam returns (uint16 cycleId_) {
        uint16 currentCycleId = s.currentCycleId;
        // require(s.cycles[currentCycleId].totalCount == s.cycles[currentCycleId].cycleMaxSupply, 
        //     "NftFactory: Cycle must be full before creating new"
        // );
        cycleId_ = currentCycleId + 1;
        s.currentCycleId = uint16(cycleId_);
        s.cycles[cycleId_].cycleMaxSupply = _cycleMaxSupply;
        s.cycles[cycleId_].donutPrice = _donutPrice;
        s.cycles[cycleId_].startedAt = block.timestamp;



        emit CreateNewCycle(cycleId_, _cycleMaxSupply, _donutPrice);
    }

    ///@notice Check selected Cycle Id and retrieve last current cycle id 
    ///@return lastCycleId_ The latest cycle identifier
    ///@return cycle_ A struct containing the details about selected donut cycle

    function getDonutCycle(uint32 _cycleId) external view returns (uint32 lastCycleId_, Cycle memory cycle_) {
        lastCycleId_ = s.currentCycleId;
        cycle_ = s.cycles[_cycleId];
    }

    /// TODO !!! Ensure paiement is safe 
    
    ///@notice Mint new donut
    ///@dev Will throw if the max number of donuts for the current cycle has been reached
    ///@param _to The destination of the minted donut
    function mintDonut(
        address _to,
        uint256 _cycleId
    ) external  { // onlyWhiteListed(s.donutMintWhitelistId)
        address sender = LibMeta.msgSender();
        require(s.currentCycleId >= _cycleId && _cycleId != 0, "Cannot Mint :'C ");
        require(s.isActiveMember[_to] == false || s.isCoreTeam[sender], "Already Member ! (Your Donut Is Unique");
        Cycle storage cycle = s.cycles[_cycleId];
        uint256 price = cycle.donutPrice;
        // require(_usdcAmount >= price, "NftFactory : Not enough USDC to buy membership");
        uint256 cycleCount = cycle.totalCount + 1;
        require(cycleCount <= cycle.cycleMaxSupply, 
            "NftFactory: Exceeded max number of donuts for this cycle"
        );
        LibERC20.transferFrom(s.mainPayingToken, sender, address(this), price);
        // LibWhitelist._removeAddressFromWhitelist(s.donutMintWhitelistId, sender);
        s.cycles[_cycleId].totalCount = cycleCount ;
        uint32 tokenId = s.donutIdCounter;
        tokenId++;
        s.members[tokenId].userAddress = _to;
        s.members[tokenId].tokenId = tokenId;
        s.members[tokenId].cycleId = uint16(_cycleId);
        s.members[tokenId].rank = 1;
        s.members[tokenId].minimumStake = 100; // less staked to uprank
        s.members[tokenId].claimTime = uint40(block.timestamp);
        s.members[tokenId].interactionCount = 1;
        s.members[tokenId].lastInteracted = uint40(block.timestamp);
        s.members[tokenId].isActive = true;
        s.tokenIdIndexes[tokenId] = s.tokenIds.length;
        s.tokenIds.push(tokenId);
        s.isActiveMember[_to] = true;
        s.memberDonutId[_to] = tokenId;
        s.donutIdCounter = tokenId;
        emit MintDonutNFT(sender, _to, tokenId, _cycleId);
        emit LibERC721.Transfer(address(0), _to, tokenId);
    }

    ///@notice Allow Admins to create a new Item Categorie
    ///@dev 
    ///@param _itemTypes New categorie description
    function addItemTypes(ItemType[] memory _itemTypes) external onlyCoreTeam {
        uint256 itemTypesLength = s.itemTypes.length;
        for (uint256 i; i < _itemTypes.length; i++) {
            uint256 itemId = itemTypesLength++;
            s.erc1155Categories[address(this)][itemId] = _itemTypes[i].category;
            s.itemTypes.push(_itemTypes[i]);
            emit AddItemType(_itemTypes[i]);
            // emit LibERC1155.TransferSingle(LibMeta.msgSender(), address(0), address(0), itemId, 0);
        }
    }
    // TODO : FIX ITEM PRICE TRANSFER + MINT W LESS OR STABLE

    ///@notice Mint new ERC1155 items
    ///@dev Will throw if a particular item current supply has reached its maximum supply
    ///@param _to The address to mint the items to
    ///@param _itemIds An array containing the identifiers of the items to mint
    ///@param _quantities An array containing the number of items to mint
    function mintItems(
        address _to,
        uint256[] calldata _itemIds,
        uint256[] calldata _quantities
    ) external {
        require(_itemIds.length == _quantities.length, "NftFactory : Ids and quantities length must match");
        address sender = LibMeta.msgSender();
        uint256 itemTypesLength = s.itemTypes.length;
        uint256 stablePrice;
        uint256 lessPrice;
        for (uint256 i; i < _itemIds.length; i++) {
            ItemType storage itemType = s.itemTypes[_itemIds[i]];
            uint256 itemId = _itemIds[i];

            require(itemTypesLength > itemId, "NftFactory: Item type does not exist");
            if(itemType.canPurchaseWithLess == false && itemType.canPurchaseWithCoins == false) { 
                require(LibProtocol._isCoreTeam(sender), "Not Allowed to mint this item");
                }

            uint256 quantity = _quantities[i];
            uint256 totalQuantity = itemType.totalQuantity + quantity;
            require(totalQuantity <= itemType.maxQuantity, 
                "NftFactory: Total item type quantity exceeds max quantity"
            );
            if(itemType.canPurchaseWithCoins == true) {
                stablePrice += quantity * itemType.stablePrice;
            }
            if(itemType.canPurchaseWithLess == true) {
                lessPrice += quantity * itemType.lessPrice;
            }
            LibItems._addToOwner(_to, itemId, quantity);
            itemType.totalQuantity = totalQuantity;
        }
        if(stablePrice != 0) {
            uint256 stableBalance = IERC20(s.mainPayingToken).balanceOf(sender);
            require(stableBalance >= stablePrice, "ShopFacet: Not Enough Tokens to Buy !");
            LibERC20.transferFrom(s.mainPayingToken, sender, s.treasuryAddress, stablePrice);

        }
        if(lessPrice != 0) {
            uint256 lessBalance = s.ownerItemBalances[sender][s.lessItemId];
            require(lessBalance >= lessPrice, "ShopFacet: Not Enough Less to Buy !");
            LibItems._removeFromOwner(sender, s.lessItemId, lessPrice);
            LibItems._addToOwner(s.treasuryAddress, s.lessItemId, lessPrice);
            // check for less receiver 
        }
        emit LibERC1155.TransferBatch(sender, address(0), _to, _itemIds, _quantities);
        LibERC1155.onERC1155BatchReceived(sender, address(0), _to, _itemIds, _quantities, "");
    }

    ///@notice Allow an item manager to add a wearable set
    ///@param _wearableSets An array of structs, each struct containing the details about each wearableset to be added

    function addWearableSets(WearableSet[] memory _wearableSets) external {
        for (uint256 i; i < _wearableSets.length; i++) {
            s.wearableSets.push(_wearableSets[i]);
            emit AddNewWearableSet(_wearableSets[i]);
        }
    }

    ///@notice Allow an item manager to update existing wearablesets
    ///@param _setIds An array containing the identifiers of the wearablesets to be updated
    ///@param _wearableSets An array oof structs,each struct representing the updated wearableset details
    function updateWearableSets(
        uint256[] calldata _setIds, 
        WearableSet[] calldata _wearableSets
    ) external {
        require(_setIds.length == _wearableSets.length, 
            "NftFactory : _setIds not same length as _wearableSets"
        );
        for (uint256 i; i < _setIds.length; i++) {
            s.wearableSets[_setIds[i]] = _wearableSets[i];
            emit NewUpdateWearableSet(_setIds[i], _wearableSets[i]);
        }
    }

    ///@notice Allow admin to set the wearable slot position for a particular wearable
    ///@param _wearableId The identifier of the wearable to change its slot position
    ///@param _slotPositions An array of booleans pointing out where `_wearableId` is now assigned to. True if assigned to a slot, False if otherwise
    function setWearableSlotPositions(
        uint256 _wearableId, 
        bool[EQUIPPED_WEARABLE_SLOTS] calldata _slotPositions
    ) external {
        require(_wearableId < s.itemTypes.length, "NftFactory : Error");
        s.itemTypes[_wearableId].slotPositions = _slotPositions;
        emit NewWearableSlotPositionsSet(_wearableId, _slotPositions);
    }

    ///@notice Allow an item manager to set the trait and rarity modifiers of an item/wearable
    ///@dev Only valid for existing wearables
    ///@param _wearableId The identifier of the wearable to set
    ///@param _traitModifiers An array containing the new trait modifiers to be applied to a wearable with identifier `_wearableId`
    function setItemTraitModifiersAndRarityModifier(
        uint256 _wearableId, 
        int8[6] calldata _traitModifiers
    ) external {
        require(_wearableId < s.itemTypes.length, "NftFactory : Error");
        s.itemTypes[_wearableId].traitModifiers = _traitModifiers;
        emit NewItemModifiersSet(_wearableId, _traitModifiers);
    }

    ///@notice Allow an item manager to set the price of multiple items in Less
    ///@dev Only valid for existing items that can be purchased with GHST
    ///@param _itemIds The items whose price is to be changed
    ///@param _newPrices The new prices of the items
    function batchUpdateItemsPrice(
        uint256[] calldata _itemIds, 
        uint256[] calldata _newPrices
    ) public {
        require(_itemIds.length == _newPrices.length, 
            "NftFactory: Items must be the same length as prices"
        );
        for (uint256 i; i < _itemIds.length; i++) {
            uint256 itemId = _itemIds[i];
            ItemType storage item = s.itemTypes[itemId];
            item.lessPrice = _newPrices[i];
            emit NewItemPriceUpdate(itemId, _newPrices[i]);
        }
    }

    ///@notice Allow core team to increase the max quantity of an item
    ///@dev Will throw if the new maxquantity is less than the existing quantity
    ///@param _itemIds An array containing the identifiers of items whose quantites are to be increased
    ///@param _maxQuantities An array containing the new max quantity of each item
    function updateItemTypeMaxQuantity(uint256[] calldata _itemIds, uint256[] calldata _maxQuantities) external onlyCoreTeam {
        require(_itemIds.length == _maxQuantities.length, "DAOFacet: _itemIds length not the same as _newQuantities length");
        for (uint256 i; i < _itemIds.length; i++) {
            uint256 itemId = _itemIds[i];
            uint256 maxQuantity = _maxQuantities[i];
            require(maxQuantity >= s.itemTypes[itemId].totalQuantity, "DAOFacet: maxQuantity is greater than existing quantity");
            s.itemTypes[itemId].maxQuantity = maxQuantity;
        }
        emit ItemTypeMaxQuantity(_itemIds, _maxQuantities);
    }
}
