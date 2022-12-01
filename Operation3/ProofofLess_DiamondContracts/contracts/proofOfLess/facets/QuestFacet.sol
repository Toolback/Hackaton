// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {LibAppStorage, AppStorage, Modifiers} from "../libraries/LibAppStorage.sol";

import {LibDonuts} from "../libraries/LibDonuts.sol";
import {LibQuest, QuestDataDetailed, UserQuestData} from "../libraries/LibQuest.sol";

import {LibERC20} from "../../shared/libraries/LibERC20.sol";
import {IERC20} from "../../shared/interfaces/IERC20.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";

contract QuestFacet is Modifiers {
    // AppStorage internal s; herited from Modifiers

    // ----- Main ----- // 


    ///@notice Subscribe user to the waiting list to be automaticallu onboarded 
    ///@dev require enought funds, but do not lock them until onboarding to next cycle
    ///@return bool, user status
    function subscribeToWaitingList(uint256 _questId) external returns (bool) {
        return LibQuest._SubscribeWaitingList(_questId);
    }

    ///@notice Delete user from waiting list array
    ///@dev require enought funds, but do not lock them until onboarding to next cycle
    ///@param _memberToUnsubscribe, user address to unsubscribe
    ///@param _userWaitingListIndex, user index in array
    ///@return bool, user status
    function unsubscribeFromWaitingList(uint256 _questId, address _memberToUnsubscribe, uint256 _userWaitingListIndex) external returns (bool) {
        return LibQuest._UnsubscribeFromWaitingList(_questId, _memberToUnsubscribe, _userWaitingListIndex);
    }

    ///@notice Register waiting list to next quest cycle
    ///@dev 
    function registerWaitingListToQuest(uint256 _questId) external onlyOracle {
        LibQuest._RegisterWaitingListToQuest(_questId);
    }

    ///@notice Update user target to succeed his quest for this cycle
    ///@dev updated by oracle 
    ///@param _user, user address to update
    ///@param _amount, user goal
    function updateUsersGoals(uint256 _questId, address[] memory _user, uint256[] memory _amount) external onlyOracle {
        LibQuest._UpdateUsersGoals(_questId, _user, _amount);
    }

    ///@notice Reset Newly Subscribed list after goal set 
    ///@dev updated by oracle 

    function deleteNewlySubscribed(uint256 _questId) external onlyOracle {
        LibQuest._DeleteNewlySubscribed(_questId);
    }

    ///@notice Update user status for this cycle
    ///@dev updated by oracle 
    ///@param _user, user address to update
    function updateUserQuestStatus(uint256 _questId, address[] memory _user) external onlyOracle {
        LibQuest._UpdateUserQuestStatus(_questId, _user);
    }

    ///@notice Start new quest cycle, by ending last one
    ///@dev    updated by oracle / require quest duration complete 
    function newCycle(uint256 _questId) external onlyOracle {
        LibQuest._NewCycle(_questId);
    }

    // ----- Getter & Setter ----- // 

    function getQuestData(uint256 _questId) external view returns (QuestDataDetailed memory questData_) {
        questData_ = LibQuest._RetrieveQuestDataDetailled(_questId);
    }

    function getUserQuestData(uint256 _questId, address _user) external view returns(UserQuestData memory data_) {
        data_ = LibQuest._RetrieveUserQuestData(_questId, _user);
    }

    function getUserTotalFundingByQuest(uint256 _questId, address _user, address _token) external view returns(uint256 bal_) {
        bal_ = s.questsData[_questId].userQuestData[_user].totalFunding[_token];
    }

    function getUserTotalGainByQuest(uint256 _questId, address _user, address _token) external view returns(uint256 bal_) {
        bal_ = s.questsData[_questId].userQuestData[_user].totalGain[_token];
    }

    function getQuestBalance(uint256 _questId, address _token) external view returns(uint256 bal_) {
        bal_ = s.questsData[_questId].questBalance[_token];
    }

    function isUserInWaitingList(uint256 _questId, address _user) external view returns(bool statuts_) {
        statuts_ = s.isUserInWaitingList[_user][_questId];
    }

    function isUserInQuest(uint256 _questId, address _user) external view returns(bool statuts_) {
        statuts_ = s.isUserInQuest[_user][_questId];
    }

    function setQuestFees(uint256 _questId, uint256 _newFees) external onlyCoreTeam returns (uint256) {
        return s.questsData[_questId].fees = _newFees;
    }

    function setQuestEntryToken(uint256 _questId, address _newToken) external onlyQuestAdmin(_questId) returns (address) {
        require(s.listedToken[_newToken], "Token Not Listed");
        return s.questsData[_questId].questEntryToken = _newToken;
    }

    function setQuestEntryCost(uint256 _questId, uint256 _newEntryCost) external onlyQuestAdmin(_questId) returns (uint256) {
        return s.questsData[_questId].questEntryCost = _newEntryCost;
    }

    function setQuestSubtitle(uint256 _questId, string memory _newSubtitle) external onlyQuestAdmin(_questId) returns (string memory) {
        return s.questsData[_questId].questSubtitle = _newSubtitle;
    }

    function setQuestDetails(uint256 _questId, string memory _newDetails) external onlyQuestAdmin(_questId) returns (string memory) {
        return s.questsData[_questId].questDetails = _newDetails;
    }

    function setQuestRules(uint256 _questId, string memory _newRules) external onlyQuestAdmin(_questId) returns (string memory) {
        return s.questsData[_questId].questRules = _newRules;
    }

    function setQuestType(uint256 _questId, string memory _newType) external onlyQuestAdmin(_questId) returns (string memory) {
        return s.questsData[_questId].questType = _newType;
    }

    function setDelayPeriod(uint256 _questId, uint256 _newDelay) external onlyQuestAdmin(_questId) returns (uint256) {
        if (_newDelay == 1)
        {
            return s.questsData[_questId].delayPeriod = 30 days;
        } 
        else 
        {
            return s.questsData[_questId].delayPeriod = _newDelay;
        }
    }

    function setQuestOwner(uint256 _questId, address _newOwner) external onlyCoreTeam returns (address) {
        return s.questsData[_questId].author = _newOwner;
    }

    function setUserQuestUserName(uint256 _questId, string calldata _newQuestHandle, address _user) external  {
        s.questsData[_questId].userQuestData[_user].userName = _newQuestHandle;
    }

    function setUserQuestTokenId(uint256 _questId, uint256 _userTokenId, address _user) external {
        s.questsData[_questId].userQuestData[_user].tokenId = _userTokenId;
    }


}
