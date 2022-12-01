// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {LibMeta} from "../../shared/libraries/LibMeta.sol";
import {LibAppStorage, AppStorage, Modifiers, Whitelist} from "../libraries/LibAppStorage.sol";
import {LibWhitelist} from "../libraries/LibWhitelist.sol";

contract WhitelistFacet is Modifiers {
    event WhitelistCreated(uint32 indexed whitelistId);
    event WhitelistUpdated(uint32 indexed whitelistId);
    event WhitelistOwnershipTransferred(uint32 indexed whitelistId, address indexed newOwner);

    function createWhitelist(string calldata _name, address[] calldata _whitelistAddresses) external {
        require(_whitelistAddresses.length > 0, "WhitelistFacet : Whitelist length should be larger than zero");
        require(bytes(_name).length > 0, "WhitelistFacet : Whitelist name cannot be blank");

        uint32 whitelistId = LibWhitelist._getNewWhitelistId();
        address[] memory addresses;
        Whitelist memory whitelist = Whitelist({owner: LibMeta.msgSender(), name: _name, addresses: addresses});

        s.whitelists.push(whitelist);

        LibWhitelist._addAddressesToWhitelist(whitelistId, _whitelistAddresses);

        emit WhitelistCreated(whitelistId);
    }

    function updateWhitelist(uint32 _whitelistId, address[] calldata _whitelistAddresses) external {
        require(_whitelistAddresses.length > 0, "WhitelistFacet : Whitelist length should be larger than zero");
        require(LibWhitelist._whitelistExists(_whitelistId), "WhitelistFacet : Whitelist not found");
        require(LibWhitelist._checkWhitelistOwner(_whitelistId), "WhitelistFacet : Not whitelist owner");

        LibWhitelist._addAddressesToWhitelist(_whitelistId, _whitelistAddresses);

        emit WhitelistUpdated(_whitelistId);
    }

    function removeAddressesFromWhitelist(uint32 _whitelistId, address[] calldata _whitelistAddresses) external {
        require(_whitelistAddresses.length > 0, "WhitelistFacet : Whitelist length should be larger than zero");
        require(LibWhitelist._whitelistExists(_whitelistId), "WhitelistFacet : Whitelist not found");
        require(LibWhitelist._checkWhitelistOwner(_whitelistId), "WhitelistFacet : Not whitelist owner");

        LibWhitelist._removeAddressesFromWhitelist(_whitelistId, _whitelistAddresses);

        emit WhitelistUpdated(_whitelistId);
    }

    function transferOwnershipOfWhitelist(uint32 _whitelistId, address _whitelistOwner) external {
        require(LibWhitelist._whitelistExists(_whitelistId), "WhitelistFacet : Whitelist not found");
        require(LibWhitelist._checkWhitelistOwner(_whitelistId), "WhitelistFacet : Not whitelist owner");

        Whitelist storage whitelist = LibWhitelist._getWhitelistFromWhitelistId(_whitelistId);

        whitelist.owner = _whitelistOwner;

        emit WhitelistOwnershipTransferred(_whitelistId, _whitelistOwner);
    }

    function whitelistExists(uint32 whitelistId) external view returns (bool exists) {
        exists = LibWhitelist._whitelistExists(whitelistId);
    }

    function isWhitelisted(uint32 _whitelistId, address _whitelistAddress) external view returns (uint256) {
        return s.isWhitelisted[_whitelistId][_whitelistAddress];
    }

    function getWhitelistsLength() external view returns (uint256) {
        return s.whitelists.length;
    }

    function getWhitelist(uint32 _whitelistId) external view returns (Whitelist memory) {
        require(LibWhitelist._whitelistExists(_whitelistId), "WhitelistFacet : Whitelist not found");
        return LibWhitelist._getWhitelistFromWhitelistId(_whitelistId);
    }

    function whitelistOwner(uint32 _whitelistId) external view returns (address) {
        require(LibWhitelist._whitelistExists(_whitelistId), "WhitelistFacet : Whitelist not found");
        return LibWhitelist._getWhitelistFromWhitelistId(_whitelistId).owner;
    }

    function setDonutWhiteListId(uint32 _newId) external returns(uint256) {
        return s.donutMintWhitelistId = _newId;
    }
}
