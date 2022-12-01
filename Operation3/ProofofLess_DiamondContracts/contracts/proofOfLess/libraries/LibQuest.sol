// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {LibAppStorage, AppStorage, QuestData, UserData} from "./LibAppStorage.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";
import {LibDonuts} from "./LibDonuts.sol";

struct QuestDataDetailed {
    string questName;
    string questSubtitle;
    string questDetails;
    string questRules;
    string questType;
    uint256 startPeriod;
    uint256 endPeriod;
    uint256 questId;
    address author;
    address questEntryToken;
    uint256 questEntryCost;
    uint256 lessReward;
    uint256 fees;
    uint256 delayPeriod;

    // /!\ nested mapping conflict with fetching ?
    // //user address => token address => locked amount
    // mapping(address => mapping(address => uint256)) userLockedFunds;
    // // EntryCoinAddress => bal
    // mapping(address => uint256) questBalance;
    uint256 questBalance;
    // mapping(address => UserData) userQuestData;

    // Actual Queued Players
    address[] waitingListAddress;
    address[] newlySubscribedPlayer;
    address[] participants;
    
    bool isActive;
}

struct UserQuestData {
    string userName; // ex : twitter handle
    uint256 tokenId;
    uint256 totalFunding;
    uint256 userLockedFunds;
    uint256 totalGain;
    uint256 goal; // old weeklygoalaverage
    bool hasWinThisCycle;
}

library LibQuest {

    function _RetrieveQuestDataDetailled(uint256 _questId) internal view returns(QuestDataDetailed memory data_) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        data_.questName = s.questsData[_questId].questName;
        data_.questSubtitle = s.questsData[_questId].questSubtitle;
        data_.questDetails = s.questsData[_questId].questDetails;
        data_.questRules = s.questsData[_questId].questRules;
        data_.questType = s.questsData[_questId].questType;
        data_.questId = s.questsData[_questId].questId;
        data_.author = s.questsData[_questId].author;
        data_.questEntryToken = s.questsData[_questId].questEntryToken;
        data_.questEntryCost = s.questsData[_questId].questEntryCost;
        data_.lessReward = s.questsData[_questId].lessReward;
        data_.fees = s.questsData[_questId].fees;
        data_.startPeriod = s.questsData[_questId].startPeriod;
        data_.endPeriod = s.questsData[_questId].endPeriod;
        data_.delayPeriod = s.questsData[_questId].delayPeriod;
        data_.questBalance = s.questsData[_questId].questBalance[s.questsData[_questId].questEntryToken];
        data_.waitingListAddress = s.questsData[_questId].waitingListAddress;
        data_.newlySubscribedPlayer = s.questsData[_questId].newlySubscribedPlayer;
        data_.participants = s.questsData[_questId].participants;
        data_.isActive = s.questsData[_questId].isActive;
    }

    function _RetrieveUserQuestData(uint256 _questId, address _user) internal view returns(UserQuestData memory data_) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        data_.userName = s.questsData[_questId].userQuestData[_user].userName;
        
        data_.tokenId = s.questsData[_questId].userQuestData[_user].tokenId;
        data_.totalFunding = s.questsData[_questId].userQuestData[_user].totalFunding[s.questsData[_questId].questEntryToken];
        data_.userLockedFunds = s.questsData[_questId].userLockedFunds[_user][s.questsData[_questId].questEntryToken];
        data_.totalGain = s.questsData[_questId].userQuestData[_user].totalGain[s.questsData[_questId].questEntryToken];
        data_.goal = s.questsData[_questId].userQuestData[_user].goal;
        
    }
    function _SubscribeWaitingList(uint256 _questId) internal returns(bool) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        address sender = LibMeta.msgSender();
        require(LibDonuts._isMember(sender), "LibQuest :  MemberStatus Not Active");
        require(s.questsData[_questId].isActive == true, "LibQuest : Quest Not Active");
        require(s.isUserInWaitingList[sender][_questId] == false, "LibQuest : Already Subscribed To This Quest");
        address selectedQuestToken = s.questsData[_questId].questEntryToken;
        uint256 selectedQuestEntryCost = s.questsData[_questId].questEntryCost;
        uint256 userFunds = s.userFunds[sender][selectedQuestToken];
        require(userFunds >= selectedQuestEntryCost, " LibQuest : Not Enought Contest Coins In Vault Balance To Join The Waiting List");
        bytes memory tempEmptyString = bytes(s.questsData[_questId].userQuestData[sender].userName);
        require(tempEmptyString.length > 0, " LibQuest : Quest Username Empty");

        s.questsData[_questId].waitingListAddress.push(sender);
        return s.isUserInWaitingList[sender][_questId] = true;
    }

    function _UnsubscribeFromWaitingList(
        uint256 _questId,
        address _memberToUnsubscribe,
        uint256 _userWaitingListIndex
    ) internal returns (bool) {
        AppStorage storage s = LibAppStorage.diamondStorage();

        address sender = LibMeta.msgSender();

        // require(sender == _memberToUnsubscribe || sender == s.questsData[_questId].author || isAdmin(sender), "LibQuest :  Not Allowed to do this");
        // ensure user is subscribe
        if (s.isUserInWaitingList[_memberToUnsubscribe][_questId] == false) {
            return s.isUserInWaitingList[_memberToUnsubscribe][_questId];
        }

        // uint256 userWaitingListId = s.waitingListUserIndex[_user] ;
        // ensure user index is last one to pop correctly
        if (_userWaitingListIndex != s.questsData[_questId].waitingListAddress.length) {
            s.questsData[_questId].waitingListAddress[_userWaitingListIndex] = s.questsData[_questId].waitingListAddress[
                s.questsData[_questId].waitingListAddress.length - 1
            ];
        }
        s.questsData[_questId].waitingListAddress.pop();
        // s.waitingListUserIndex[_user] = 0;

        return s.isUserInWaitingList[_memberToUnsubscribe][_questId] = false;
    }

    function _RegisterWaitingListToQuest(uint256 _questId) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();

        require(s.questsData[_questId].isActive == true, "LibQuest : Quest Not Active");
        require(s.questsData[_questId].waitingListAddress.length >= 1, "LibQuest : Need More Than One User");
        for (uint256 i = 0; i < s.questsData[_questId].waitingListAddress.length; i++) {
            address entryQuestToken = s.questsData[_questId].questEntryToken;
            uint256 entryQuestCost = s.questsData[_questId].questEntryCost;
            address userAddress = s.questsData[_questId].waitingListAddress[i];
            uint256 userFunds = s.userFunds[userAddress][entryQuestToken];
            bool isMember = LibDonuts._isMember(userAddress);
            if (userFunds >= s.questsData[_questId].questEntryCost && isMember) {
                UserData storage td = s.questsData[_questId].userQuestData[userAddress];

                if (s.questsData[_questId].userQuestData[userAddress].goal < 1) {
                    s.questsData[_questId].newlySubscribedPlayer.push(userAddress);
                }
                s.userFunds[userAddress][entryQuestToken] -= entryQuestCost;
                td.totalFunding[entryQuestToken] += entryQuestCost;
                s.questsData[_questId].userLockedFunds[userAddress][entryQuestToken] += entryQuestCost;
                s.questsData[_questId].questBalance[entryQuestToken] += entryQuestCost;
                s.vaultLockedFunds[entryQuestToken] += entryQuestCost;
                s.questsData[_questId].participants.push(userAddress);
                s.isUserInQuest[userAddress][_questId] = true;
                s.members[s.memberDonutId[userAddress]].questAccepted += 1;
            } else {
                _UnsubscribeFromWaitingList(_questId, userAddress, i);
            }
        }
    }

    function _UpdateUsersGoals(
        uint256 _questId,
        address[] memory _user,
        uint256[] memory _amount
    ) internal  {
        AppStorage storage s = LibAppStorage.diamondStorage();
        require(_user.length == _amount.length, "LibQuest : Length Mismatch");
        for (uint256 i = 0; i < _user.length; i++) {
            UserData storage td = s.questsData[_questId].userQuestData[_user[i]];
            s.questsData[_questId].userQuestData[_user[i]].goal = _amount[i];
        }


    }

    function _DeleteNewlySubscribed(
        uint256 _questId
    ) internal  {
        AppStorage storage s = LibAppStorage.diamondStorage();
        delete s.questsData[_questId].newlySubscribedPlayer;
    }

    function _UpdateUserQuestStatus(
        uint256 _questId,
        address[] memory _user
        // bool[] memory _hasWin
    ) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();
        // Todo : add verif user = participants ? (still active tip or not??)
        // require(_user.length == _hasWin.length, "LibQuest : Length Mismatch");
        for (uint256 i = 0; i < _user.length; i++) {
            UserData storage td = s.questsData[_questId].userQuestData[_user[i]];
            s.questsData[_questId].userQuestData[_user[i]].hasWinThisCycle = true;
        }
        // emit NewWinnerUpdated(_user, block.timestamp);
    }

    function _NewCycle(uint256 _questId) internal  {
        AppStorage storage s = LibAppStorage.diamondStorage();
        // require(block.timestamp > endPeriod);
        uint256 totalRewards = s.questsData[_questId].questBalance[s.questsData[_questId].questEntryToken] - s.questsData[_questId].fees;
        address questToken = s.questsData[_questId].questEntryToken;

        for (uint256 i = 0; i < s.questsData[_questId].participants.length; i++) {
            UserData storage td = s.questsData[_questId].userQuestData[s.questsData[_questId].participants[i]];

            if (s.questsData[_questId].userQuestData[s.questsData[_questId].participants[i]].hasWinThisCycle) {
                s.questsData[_questId].winners.push(s.questsData[_questId].participants[i]);
            } else {
                // has lose
                s.questsData[_questId].userLockedFunds[s.questsData[_questId].winners[i]][questToken] -= s.questsData[_questId].questEntryCost;
            }
            // else { delete userQuestData[participants[i]]; } delete only losers, allow to determine winner prize before deletion
            delete s.questsData[_questId].userQuestData[s.questsData[_questId].participants[i]];
        }

        delete s.questsData[_questId].participants;
        if (s.questsData[_questId].winners.length > 0) {
            uint256 rewardAmount = totalRewards / s.questsData[_questId].winners.length;
            for (uint256 x = 0; x < s.questsData[_questId].winners.length; x++) {
                // IMemberShip mb = IMemberShip(memberShipAddress);
                s.questsData[_questId].userLockedFunds[s.questsData[_questId].winners[x]][questToken] -= s.questsData[_questId].questEntryCost;
                s.questsData[_questId].questBalance[questToken] -= rewardAmount;
                s.userFunds[s.questsData[_questId].winners[x]][s.questsData[_questId].questEntryToken] += rewardAmount;
                s.questsData[_questId].userQuestData[s.questsData[_questId].winners[x]].totalGain[questToken] += rewardAmount;
                // poolBalance[_token] = poolBalance[_token] + rewardAmount;

                s.members[s.memberDonutId[s.questsData[_questId].winners[x]]].experience += 10;
                // s.members[s.memberDonutId[winners[x]]].questAccepted += 1; // moved to registerWaitingList
                s.members[s.memberDonutId[s.questsData[_questId].winners[x]]].questCompleted += 1;

                // if(IERC20(lessAddress).balanceOf(address(this)) > s.questsData[_questId].lessReward) {
                //     IERC20(lessAddress).transfer(winners[x], s.questsData[_questId].lessReward);
                // }
            }
            delete s.questsData[_questId].winners;
        }
        s.questsData[_questId].startPeriod = block.timestamp;
        s.questsData[_questId].endPeriod = block.timestamp + s.questsData[_questId].delayPeriod;
    }
}
