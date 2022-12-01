// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {LibAppStorage, AppStorage, Modifiers, NUMERIC_TRAITS_NUM} from "../libraries/LibAppStorage.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";
import {LibDiamond} from "../../shared/libraries/LibDiamond.sol";
import {LibStrings} from "../../shared/libraries/LibStrings.sol";

import {LibERC20} from "../../shared/libraries/LibERC20.sol";
import {IERC20} from "../../shared/interfaces/IERC20.sol";
import {LibERC721} from "../../shared/libraries/LibERC721.sol";
import {LibDonuts, DonutInfoDetailed} from "../libraries/LibDonuts.sol";

contract DonutFacet is Modifiers {
    // AppStorage internal s;
    event SetDonutName(uint256 indexed _tokenId, string _oldName, string _newName);
    event SpendSkillpoints(uint256 indexed _tokenId, int16[4] _values);

    ///@notice Query the totalSupply of all NFTs(Donut) ever minted on this diamond
    ///@return totalSupply_ the number of all NFTs that have been minted
    function totalSupply() external view returns (uint256 totalSupply_) {
        totalSupply_ = s.tokenIds.length;
    }

    /// @notice Count 1 if address is member, throw for 0 address
    function balanceOf(address _owner) external view returns (uint256 balance_) {
        require(_owner != address(0), "DonutFacet: _owner can't be address(0)");
        
        if (s.isActiveMember[_owner] == true) {
            balance_ = 1;
        } else {
            balance_ = 0;
        }
    }

    function retrieveMemberDonutId(address _user) external view returns(uint256 tokenId_) {
        tokenId_ = s.memberDonutId[_user];
    }

    ///@notice Query all details relating to an NFT
    ///@param _tokenId the identifier of the NFT to query
    ///@return donutInfos_ a struct containing all details about
    function getDonutInfos(uint256 _tokenId) external view returns (DonutInfoDetailed memory donutInfos_) {
        donutInfos_ = LibDonuts._getDonut(_tokenId);
    }

    ///@notice Query the numeric traits of an NFT
    ///@param _tokenId The identifier of the NFT to query
    ///@return numericTraits_ A six-element array containing integers,each representing the traits of the NFT with identifier `_tokenId`
    function getNumericTraits(uint256 _tokenId) external view returns (int16[NUMERIC_TRAITS_NUM] memory numericTraits_) {
        numericTraits_ = LibDonuts._getNumericTraits(_tokenId);
    }

    ///@notice Check the modified traits of an NFT(as a result of equipped wearables)
    ///@param _tokenId Identifier of the NFT to query
    ///@return numericTraits_ An array of six integers each representing a numeric trait(modified) of an NFT with identifier `_tokenId`
    ///@return rarityScore_ The modified rarity score of an NFT with identifier `_tokenId`
    function modifiedTraitsAndRarityScore(uint256 _tokenId)
        external
        view
        returns (int16[NUMERIC_TRAITS_NUM] memory numericTraits_, uint256 rarityScore_)
    {
        (numericTraits_, rarityScore_) = LibDonuts._modifiedTraitsAndRarityScore(_tokenId);
    }

    ///@notice Calculate level given the XP(experience points)
    ///@param _experience the current XP gathered by an NFT
    ///@return level_ The level of an NFT with experience `_experience`
    function donutLevel(uint256 _experience) external pure returns (uint256 level_) {
        level_ = LibDonuts._donutLevel(_experience);
    }

    ///@notice Calculate the XP needed for an NFT to advance to the next level
    ///@param _experience The current XP points gathered by an NFT
    ///@return requiredXp_ The XP required for the NFT to move to the next level
    function xpUntilNextLevel(uint256 _experience) external pure returns (uint256 requiredXp_) {
        requiredXp_ = LibDonuts._xpUntilNextLevel(_experience);
    }
    /// @notice Retrieve the owner of a donut
    /// @dev 0 address nft's owner throw an error 
    /// @param _tokenId The identifier for an NFT
    /// @return owner_ The address of the owner of the NFT
    function ownerOf(uint256 _tokenId) external view returns (address owner_) {
        owner_ = s.members[_tokenId].userAddress;
        require(owner_ != address(0), "DonutFacet: invalid _tokenId");
    }
    

    ///@notice returns the time an NFT was claimed
    ///@param _tokenId the identifier of the NFT
    ///@return claimTime_ the time the NFT was claimed
    function donutClaimTime(uint256 _tokenId) external view returns (uint256 claimTime_) {
        claimTime_ = s.members[_tokenId].claimTime;
    }

    // /// @notice find valid nft by index
    // /// @dev Throws if `_index` >= `totalSupply()`.
    // /// @param _index A counter less than `totalSupply()`
    // /// @return The token identifier for current index
    function tokenByIndex(uint256 _index) external view returns (uint256 tokenId_) {
        require(_index < s.tokenIds.length, "DonutFacet: index beyond supply");
        tokenId_ = s.tokenIds[_index];
    }


    /// @notice Get list of owner from tokenId
    /// @param _tokenIds NFTs Id to Checks
    /// @return owners_ list of owners
    function batchOwnerOf(uint256[] calldata _tokenIds) external view returns (address[] memory owners_) {
        owners_ = new address[](_tokenIds.length);
        for (uint256 i = 0; i < _tokenIds.length; i++) {
            owners_[i] = s.members[_tokenIds[i]].userAddress;
            require(owners_[i] != address(0), "DonutFacet: invalid _tokenId");
        }
    }


    /// @notice Get the approved address for a donut
    /// @dev Throws if `_tokenId` is not a valid NFT.
    /// @param _tokenId The NFT to find the approved address for
    /// @return approved_ The approved address for this NFT, or the zero address if there is none
    function getApproved(uint256 _tokenId) external view returns (address approved_) {
        require(_tokenId < s.tokenIds.length, "DonutFacet : tokenId is invalid");
        approved_ = s.approved[_tokenId];
    }

    /// @notice Query if an address is an authorized operator for another address
    /// @param _owner The address that owns the NFTs
    /// @param _operator The address that acts on behalf of the owner
    /// @return approved_ True if `_operator` is an approved operator for `_owner`, false otherwise
    function isApprovedForAll(address _owner, address _operator) external view returns (bool approved_) {
        approved_ = s.operators[_owner][_operator];
    }

    // // ///@notice Check if an address `_operator` is an authorized pet operator for another address `_owner`
    // // ///@param _owner address of the lender of the NFTs
    // // ///@param _operator address that acts pets the gotchis on behalf of the owner
    // // ///@return approved_ true if `operator` is an approved pet operator, False if otherwise
    // // function isPetOperatorForAll(address _owner, address _operator) external view returns (bool approved_) {
    // //     approved_ = s.petOperators[_owner][_operator];
    // // }

    ///@notice Check if a string `_name` has been assigned to another NFT
    ///@param _name Name to check
    ///@return available_ True if the name has already been taken, False otherwise
    function isDonutNameTaken(string calldata _name) external view returns (bool available_) {
        available_ = s.donutsNamesUsed[LibDonuts._validateAndLowerName(_name)];
    }


    ///@notice Allows the owner of a NFT to set a name for it
    ///@dev Will throw if the name has been used for another donut
    ///@param _tokenId the identifier if the NFT to name
    ///@param _name Preferred name

    function setDonutName(uint256 _tokenId, string calldata _name) external onlyDonutOwner(_tokenId) returns (string memory name_) {
        require(s.members[_tokenId].isActive == true, "ProtocolFacet: Donut must be Active !");
        string memory lowerName = LibDonuts._validateAndLowerName(_name);
        string memory existingName = s.members[_tokenId].userName;
        if (bytes(existingName).length > 0) {
            delete s.donutsNamesUsed[LibDonuts._validateAndLowerName(existingName)];
        }
        require(!s.donutsNamesUsed[lowerName], "ProtocolFacet: Donut name already used");
        s.donutsNamesUsed[lowerName] = true;
        s.members[_tokenId].userName = _name;
        emit SetDonutName(_tokenId, existingName, _name);
        name_ = _name;
    }

    function setDonutBio(uint256 _tokenId, string memory _newBio) external onlyDonutOwner(_tokenId) returns (string memory bio_) {
        require(s.members[_tokenId].isActive == true, "ProtocolFacet: Donut must be Active !");
        s.members[_tokenId].userBio = _newBio;
        bio_ = s.members[_tokenId].userBio;
    }



    /// @notice Change or reaffirm the approved address for an NFT
    /// @dev The zero address indicates there is no approved address.
    ///  Throws unless `LibMeta.msgSender()` is the current NFT owner, or an authorized
    ///  operator of the current owner.
    /// @param _approved The new approved NFT controller
    /// @param _tokenId The NFT to approve
    function approve(address _approved, uint256 _tokenId) external onlyDonutOwner(_tokenId) {
        address owner = s.members[_tokenId].userAddress;
        require(owner == LibMeta.msgSender() || s.operators[owner][LibMeta.msgSender()], "DonutFacet : Not owner or operator of token.");
        s.approved[_tokenId] = _approved;
        emit LibERC721.Approval(owner, _approved, _tokenId);
    }

    /// @notice Enable or disable approval for a third party ("operator") to manage
    ///  all of `LibMeta.msgSender()`'s assets
    /// @dev Emits the ApprovalForAll event. The contract MUST allow
    ///  multiple operators per owner.
    /// @param _operator Address to add to the set of authorized operators
    /// @param _approved True if the operator is approved, false to revoke approval
    function setApprovalForAll(address _operator, bool _approved, uint256 _tokenId) external onlyDonutOwner(_tokenId) {
        s.operators[LibMeta.msgSender()][_operator] = _approved;
        emit LibERC721.ApprovalForAll(LibMeta.msgSender(), _operator, _approved);
    }

    // /// @notice Enable or disable approval for a third party("operator") to help pet LibMeta.msgSender()'s gotchis
    // ///@dev Emits the PetOperatorApprovalForAll event
    // ///@param _operator Address to disable/enable as a pet operator
    // ///@param _approved True if operator is approved,False if approval is revoked

    // function setPetOperatorForAll(address _operator, bool _approved) external {
    //     s.petOperators[LibMeta.msgSender()][_operator] = _approved;
    //     // emit PetOperatorApprovalForAll(LibMeta.msgSender(), _operator, _approved);
    // }

    function name() external view returns (string memory) {
        // return "Proof Of Donut (?)";
        return s.name;
    }

    /// @notice An abbreviated name for NFTs in this contract

    function symbol() external view returns (string memory) {
        //return "DONUT";
        return s.symbol;
    }

    /// @notice A distinct Uniform Resource Identifier (URI) for a given asset.
    function tokenURI(uint256 _tokenId) external pure returns (string memory) {
        return LibStrings.strWithUint("https://proofOfLess.com/metadata/donuts/", _tokenId); 
    }

    function addInterfaces() external onlyCoreTeam {
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        ds.supportedInterfaces[0xd9b67a26] = true; //erc1155
        ds.supportedInterfaces[0x80ac58cd] = true; //erc721
    }

    ///@notice Allow the owner of an NFT to spend skill points for it(basically to boost the numeric traits of that NFT)
    ///@param _tokenId The identifier of the NFT to spend the skill points on
    ///@param _values An array of four integers that represent the values of the skill points
    function spendSkillPoints(uint256 _tokenId, int16[4] calldata _values) external onlyDonutOwner(_tokenId) {
        uint256 totalUsed;
        for (uint256 index; index < _values.length; index++) {
            totalUsed += LibAppStorage.abs(_values[index]);

            s.members[_tokenId].numericTraits[index] += _values[index];
        }
        // handles underflow
        require(availableSkillPoints(_tokenId) >= totalUsed, "DonutFacet: Not enough skill points");
        //Increment used skill points
        s.members[_tokenId].usedSkillPoints += totalUsed;
        emit SpendSkillpoints(_tokenId, _values);
    }

    ///@notice Query the available skill points that can be used for an NFT
    ///@dev Will throw if the amount of skill points available is greater than or equal to the amount of skill points which have been used
    ///@param _tokenId The identifier of the NFT to query
    ///@return   An unsigned integer which represents the available skill points of an NFT with identifier `_tokenId`
    function availableSkillPoints(uint256 _tokenId) public view returns (uint256) {
        uint256 skillPoints = _calculateSkillPoints(_tokenId);
        uint256 usedSkillPoints = s.members[_tokenId].usedSkillPoints;
        require(skillPoints >= usedSkillPoints, "DonutFacet: Used skill points is greater than skill points");
        return skillPoints - usedSkillPoints;
    }

    function _calculateSkillPoints(uint256 _tokenId) internal view returns (uint256) {
        uint256 level = LibDonuts._donutLevel(s.members[_tokenId].experience);
        uint256 skillPoints = (level / 3);

        uint256 claimTime = s.members[_tokenId].claimTime;
        uint256 ageDifference = block.timestamp - claimTime;
        return skillPoints + _skillPointsByAge(ageDifference);
    }

    function _skillPointsByAge(uint256 _age) internal pure returns (uint256) {
        uint256 skillPointsByAge = 0;
        uint256[10] memory fibSequence = [uint256(1), 2, 3, 5, 8, 13, 21, 34, 55, 89];
        for (uint256 i = 0; i < fibSequence.length; i++) {
            if (_age > fibSequence[i] * 2300000) {
                skillPointsByAge++;
            } else {
                break;
            }
        }
        return skillPointsByAge;
    }


    // /// @notice Transfers the ownership of an NFT from one address to another address
    // /// @dev Throws unless `LibMeta.msgSender()` is the current owner, an authorized
    // ///  operator, or the approved address for this NFT. Throws if `_from` is
    // ///  not the current owner. Throws if `_to` is the zero address. Throws if
    // ///  `_tokenId` is not a valid NFT. When transfer is complete, this function
    // ///  checks if `_to` is a smart contract (code size > 0). If so, it calls
    // ///  `onERC721Received` on `_to` and throws if the return value is not
    // ///  `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    // /// @param _from The current owner of the NFT
    // /// @param _to The new owner
    // /// @param _tokenId The NFT to transfer
    // /// @param _data Additional data with no specified format, sent in call to `_to`
    // function safeTransferFrom(
    //     address _from,
    //     address _to,
    //     uint256 _tokenId,
    //     bytes calldata _data
    // ) external {
    //     address sender = LibMeta.msgSender();
    //     internalTransferFrom(sender, _from, _to, _tokenId);
    //     LibERC721.checkOnERC721Received(sender, _from, _to, _tokenId, _data);
    // }

    // // @notice Transfers the ownership of multiple  NFTs from one address to another at once
    // /// @dev Throws unless `LibMeta.msgSender()` is the current owner, an authorized
    // ///  operator, or the approved address of each of the NFTs in `_tokenIds`. Throws if `_from` is
    // ///  not the current owner. Throws if `_to` is the zero address. Throws if one of the NFTs in
    // ///  `_tokenIds` is not a valid NFT. When transfer is complete, this function
    // ///  checks if `_to` is a smart contract (code size > 0). If so, it calls
    // ///  `onERC721Received` on `_to` and throws if the return value is not
    // ///  `bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"))`.
    // /// @param _from The current owner of the NFTs
    // /// @param _to The new owner
    // /// @param _tokenIds An array containing the identifiers of the NFTs to transfer
    // /// @param _data Additional data with no specified format, sent in call to `_to`

    // function safeBatchTransferFrom(
    //     address _from,
    //     address _to,
    //     uint256[] calldata _tokenIds,
    //     bytes calldata _data
    // ) external {
    //     address sender = LibMeta.msgSender();
    //     for (uint256 index = 0; index < _tokenIds.length; index++) {
    //         uint256 _tokenId = _tokenIds[index];
    //         internalTransferFrom(sender, _from, _to, _tokenId);
    //         LibERC721.checkOnERC721Received(sender, _from, _to, _tokenId, _data);
    //     }
    // }

    // /// @notice Transfers the ownership of an NFT from one address to another address
    // /// @dev This works identically to the other function with an extra data parameter,
    // ///  except this function just sets data to "".
    // /// @param _from The current owner of the NFT
    // /// @param _to The new owner
    // /// @param _tokenId The NFT to transfer
    // function safeTransferFrom(
    //     address _from,
    //     address _to,
    //     uint256 _tokenId
    // ) external {
    //     address sender = LibMeta.msgSender();
    //     internalTransferFrom(sender, _from, _to, _tokenId);
    //     LibERC721.checkOnERC721Received(sender, _from, _to, _tokenId, "");
    // }

    // /// @notice Transfer ownership of an NFT -- THE CALLER IS RESPONSIBLE
    // ///  TO CONFIRM THAT `_to` IS CAPABLE OF RECEIVING NFTS OR ELSE
    // ///  THEY MAY BE PERMANENTLY LOST
    // /// @dev Throws unless `LibMeta.msgSender()` is the current owner, an authorized
    // ///  operator, or the approved address for this NFT. Throws if `_from` is
    // ///  not the current owner. Throws if `_to` is the zero address. Throws if
    // ///  `_tokenId` is not a valid NFT.
    // /// @param _from The current owner of the NFT
    // /// @param _to The new owner
    // /// @param _tokenId The NFT to transfer
    // function transferFrom(
    //     address _from,
    //     address _to,
    //     uint256 _tokenId
    // ) external {
    //     internalTransferFrom(LibMeta.msgSender(), _from, _to, _tokenId);
    // }

}
