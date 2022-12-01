// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import {LibAppStorage, AppStorage, DonutProfil, UserData, NUMERIC_TRAITS_NUM, EQUIPPED_WEARABLE_SLOTS, ItemType} from "./LibAppStorage.sol";
import {IERC20} from "../../shared/interfaces/IERC20.sol";
import {LibERC20} from "../../shared/libraries/LibERC20.sol";

import {IERC721} from "../../shared/interfaces/IERC721.sol";
import {LibERC721} from "../../shared/libraries/LibERC721.sol";

import {LibItems, ItemTypeIO} from "../libraries/LibItems.sol";

struct DonutInfoDetailed {
        address userAddress;
        string userName;
        string userBio;
        // string email;
        uint32 tokenId;
        uint16 cycleId;
        // address[] friendsAddress;

        // mapping(uint256 => QuestData) questDatas;
        uint256 level;
        uint256 rank; // gain with $Less staking 
            uint256 toNextLevel;
        uint256 experience; // gain with quest
        uint256 minimumStake; // increasing amount with higher rank
        uint256 stakedAmount;
        uint256 usedSkillPoints; // skills points used by this donut
        uint40 claimTime; // token minted at 
        uint256 questAccepted;
        uint256 questCompleted;
        uint256 daoProposalCreated;
        uint256 daoProposalCreatedAccepted;
        uint256 daoProposalVoted;
        uint256 challengeReceived;
        uint256 friendChallenged;

        uint16[EQUIPPED_WEARABLE_SLOTS] equippedWearables; //The currently equipped wearables of the Donut
        int8[NUMERIC_TRAITS_NUM] temporaryTraitBoosts; // Bonus Gain With Specials Items
        //
        uint256 interactionCount; //How many times the owner of this donut has interacted with the protocol.
        uint40 lastInteracted; // Last member action
        bool isActive;

            ItemTypeIO[] items;
}

library LibDonuts {
    event DonutInteract(uint256 indexed _tokenId);


    function _isMember(address _user) internal view returns(bool status_) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        uint256 tokenId = s.memberDonutId[_user];
        status_ = s.members[tokenId].isActive;

    } 

    function _getDonut(uint256 _tokenId) internal view returns (DonutInfoDetailed memory donutInfos_) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        donutInfos_.userAddress = s.members[_tokenId].userAddress;
        donutInfos_.userName = s.members[_tokenId].userName;
        donutInfos_.userBio = s.members[_tokenId].userBio;
        donutInfos_.tokenId = s.members[_tokenId].tokenId;
        donutInfos_.cycleId = s.members[_tokenId].cycleId;
        // donutInfos_.friendsAddress = s.members[_tokenId].friendsAddress;

        donutInfos_.level = _donutLevel(s.members[_tokenId].experience);
        donutInfos_.rank = s.members[_tokenId].rank;
        donutInfos_.toNextLevel = _xpUntilNextLevel(s.members[_tokenId].experience);
        donutInfos_.experience = s.members[_tokenId].experience;
        donutInfos_.minimumStake = s.members[_tokenId].minimumStake;
        donutInfos_.stakedAmount = s.members[_tokenId].stakedAmount;
        donutInfos_.usedSkillPoints = s.members[_tokenId].usedSkillPoints;
        donutInfos_.claimTime = s.members[_tokenId].claimTime;
        donutInfos_.questAccepted = s.members[_tokenId].questAccepted;
        donutInfos_.questCompleted = s.members[_tokenId].questCompleted;
        donutInfos_.daoProposalCreated = s.members[_tokenId].daoProposalCreated;
        donutInfos_.daoProposalVoted = s.members[_tokenId].daoProposalVoted;
        donutInfos_.challengeReceived = s.members[_tokenId].challengeReceived;
        donutInfos_.friendChallenged = s.members[_tokenId].friendChallenged;
        donutInfos_.equippedWearables = s.members[_tokenId].equippedWearables;
        donutInfos_.temporaryTraitBoosts = s.members[_tokenId].temporaryTraitBoosts;
        donutInfos_.interactionCount = s.members[_tokenId].interactionCount;
        donutInfos_.lastInteracted = s.members[_tokenId].lastInteracted;
        donutInfos_.isActive = s.members[_tokenId].isActive;
        donutInfos_.items = LibItems._itemBalancesOfTokenWithTypes(address(this), uint256(s.members[_tokenId].tokenId));
    } 

    // ?!? Fixe this function below

    // function GetDonutQuestData(address _userAddress, uint256 _questId) external view returns(UserData storage questData_) {
    //     AppStorage storage s = LibAppStorage.diamondStorage();
    //     questData_ = s.questsData[_questId].userQuestData[_userAddress];

    // }


    function _xpUntilNextLevel(uint256 _experience) internal pure returns (uint256 requiredXp_) {
        uint256 currentLevel = _donutLevel(_experience);
        requiredXp_ = ((currentLevel**2) * 50) - _experience;
    }

    function _donutLevel(uint256 _experience) internal pure returns (uint256 level_) {
        if (_experience > 490050) {
            return 99;
        }

        level_ = (_sqrt(2 * _experience) / 10);
        return level_ + 1;
    }

    function _sqrt(uint256 x) internal pure returns (uint256 y) {
        uint256 z = (x + 1) / 2;
        y = x;
        while (z < y) {
            y = z;
            z = (x / z + z) / 2;
        }
    }

    function _validateAndLowerName(string memory _name) internal pure returns (string memory) {
        bytes memory name = abi.encodePacked(_name);
        uint256 len = name.length;
        require(len != 0, "LibDonuts: name can't be 0 chars");
        require(len < 26, "LibDonuts: name can't be greater than 25 characters");
        uint256 char = uint256(uint8(name[0]));
        require(char != 32, "LibDonuts: first char of name can't be a space");
        char = uint256(uint8(name[len - 1]));
        require(char != 32, "LibDonuts: last char of name can't be a space");
        for (uint256 i; i < len; i++) {
            char = uint256(uint8(name[i]));
            require(char > 31 && char < 127, "LibDonuts: invalid character in Donut name.");
            if (char < 91 && char > 64) {
                name[i] = bytes1(uint8(char + 32));
            }
        }
        return string(name);
    }

    function _interact(uint256 _tokenId) internal returns (bool) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        uint256 lastInteracted = s.members[_tokenId].lastInteracted;
        // if interacted less than 12 hours ago
        if (block.timestamp < lastInteracted + 12 hours) {
            return false;
        }
        s.members[_tokenId].interactionCount++;
        s.members[_tokenId].lastInteracted = uint40(block.timestamp);
        emit DonutInteract(_tokenId);
        return true;
    }

    function _modifiedTraitsAndRarityScore(uint256 _tokenId)
        internal
        view
        returns (int16[NUMERIC_TRAITS_NUM] memory numericTraits_, uint256 rarityScore_)
    {
        AppStorage storage s = LibAppStorage.diamondStorage();
        require(s.members[_tokenId].isActive == true, "ProtocolFacet: Must be Active");
        DonutProfil storage donut = s.members[_tokenId];
        numericTraits_ = _getNumericTraits(_tokenId);
        uint256 wearableBonus;
        for (uint256 slot; slot < EQUIPPED_WEARABLE_SLOTS; slot++) {
            uint256 wearableId = donut.equippedWearables[slot];
            if (wearableId == 0) {
                continue;
            }
            ItemType storage itemType = s.itemTypes[wearableId];
            //Add on trait modifiers
            for (uint256 j; j < NUMERIC_TRAITS_NUM; j++) {
                numericTraits_[j] += itemType.traitModifiers[j];
            }
            // wearableBonus += itemType.rarityScoreModifier;
        }
        // uint256 baseRarity = baseRarityScore(numericTraits_);
        // rarityScore_ = baseRarity + wearableBonus;
    }

    function _getNumericTraits(uint256 _tokenId) internal view returns (int16[NUMERIC_TRAITS_NUM] memory numericTraits_) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        //Check if trait boosts from consumables are still valid
        int256 boostDecay = int256((block.timestamp - s.members[_tokenId].lastTemporaryBoost) / 24 hours);
        for (uint256 i; i < NUMERIC_TRAITS_NUM; i++) {
            int256 number = s.members[_tokenId].numericTraits[i];
            int256 boost = s.members[_tokenId].temporaryTraitBoosts[i];

            if (boost > 0 && boost > boostDecay) {
                number += boost - boostDecay;
            } else if ((boost * -1) > boostDecay) {
                number += boost + boostDecay;
            }
            numericTraits_[i] = int16(number);
        }
    }


}