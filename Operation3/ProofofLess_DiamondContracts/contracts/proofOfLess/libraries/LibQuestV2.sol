// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {LibMeta} from "../../shared/libraries/LibMeta.sol";
import {LibAppStorage, AppStorage, MemberList} from "../libraries/LibAppStorage.sol";

// MEMBER LIST 
// -> Waiting list
// -> Participant list 
library LibQuestV2 { 
    function _getNewMemberList() internal view returns(uint32 newMemberListId_) { 
        AppStorage storage s = LibAppStorage.diamondStorage();
        newMemberListId_ = uint32(s.memberLists.length + 1); // 1 indexed : 0 doesnt exist
    }

    function _memberListExists(uint32 _memberListId) internal view returns(bool status_) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        status_ = (s.memberLists.length >= _memberListId) && (_memberListId > 0);
    }

    function _getMemberListById(uint32 _memberListId) internal view returns(MemberList storage memberList_) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        require(_memberListExists(_memberListId), "Quest Facet: MemberList not found");
        memberList_ = s.memberLists[_memberListId - 1];
    }

    function _checkMemberListOwner(uint32 _memberListId) internal view returns(bool status_) {
        // AppStorage storage s = LibAppStorage.diamondStorage();
        // address sender = LibMeta.msgSender(); 
        // status_ = s.memberLists[_memberListId - 1]

        MemberList storage mb = _getMemberListById(_memberListId);
        status_ = mb.owner == LibMeta.msgSender();
    }

    function _addUserToWaitingList(uint32 _memberListId, address _user) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();
        if(s.isInWaitingListByML[_memberListId][_user] == 0) {
            MemberList storage mb = LibQuestV2._getMemberListById(_memberListId);
            mb.waitingList.push(_user);
            s.isInWaitingListByML[_memberListId][_user] = mb.waitingList.length; // Index of the whitelist entry + 1
        }
    }

    function _addUserToParticipantList(uint32 _memberListId, address _user) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();
        if(s.isInParticipantListByML[_memberListId][_user] == 0) {
            MemberList storage mb = LibQuestV2._getMemberListById(_memberListId);
            mb.participantList.push(_user);
            s.isInParticipantListByML[_memberListId][_user] = mb.participantList.length; // Index of the whitelist entry + 1
        }
    }
    // do i need to add a isInWinnerlist to store the idx ?  
    function _addWinnerToMemberList(uint32 _memberListId, address _user) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();
        if(s.isInParticipantListByML[_memberListId][_user] > 0) {
            MemberList storage mb = LibQuestV2._getMemberListById(_memberListId);
            mb.participantList.push(_user);
            // s.isInParticipantListByML[_memberListId][_user] = mb.participantList.length; // Index of the whitelist entry + 1
        }
    }

    function _removeUserFromWaitingList(uint32 _memberListId, address _user) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();
        if(s.isInWaitingListByML[_memberListId][_user] > 0) { 
            MemberList storage mb = LibQuestV2._getMemberListById(_memberListId);
            uint256 index = s.isInWaitingListByML[_memberListId][_user] - 1;
            uint256 lastIndex = mb.waitingList.length - 1;
            // Replaces the element to be removed with the last element
            mb.waitingList[index] = mb.waitingList[lastIndex];
            // Store the last element in memory
            address lastElement = mb.waitingList[lastIndex];
            // Remove the last element from storage
            mb.waitingList.pop();
            // Update the index of the last element that was swapped. If this is the only element, updates to zero on the next line
            s.isInWaitingListByML[_memberListId][lastElement] = index + 1;
            // Update the index of the removed element
            s.isInWaitingListByML[_memberListId][_user] = 0;
        }
    }

    function _removeUserFromParticipantList(uint32 _memberListId, address _user) internal {
        AppStorage storage s = LibAppStorage.diamondStorage();
        if(s.isInParticipantListByML[_memberListId][_user] > 0) { 
            MemberList storage mb = LibQuestV2._getMemberListById(_memberListId);
            uint256 index = s.isInParticipantListByML[_memberListId][_user] - 1;
            uint256 lastIndex = mb.participantList.length - 1;
            // Replaces the element to be removed with the last element
            mb.participantList[index] = mb.participantList[lastIndex];
            // Store the last element in memory
            address lastElement = mb.participantList[lastIndex];
            // Remove the last element from storage
            mb.participantList.pop();
            // Update the index of the last element that was swapped. If this is the only element, updates to zero on the next line
            s.isInParticipantListByML[_memberListId][lastElement] = index + 1;
            // Update the index of the removed element
            s.isInParticipantListByML[_memberListId][_user] = 0;
        }
    }

    function _cleanParticipantList(uint32 _memberListId) internal {
        MemberList storage mb = LibQuestV2._getMemberListById(_memberListId);
        delete mb.participantList[_memberListId];
    }

    function _batchAddUserToWaitingList(uint32 _whitelistId, address[] calldata _users) internal {
        for (uint256 i; i < _users.length; i++) {
            _addUserToWaitingList(_whitelistId, _users[i]);
        }
    }

    function _batchRemoveUserFromWhitelist(uint32 _whitelistId, address[] calldata _users) internal {
        for (uint256 i; i < _users.length; i++) {
            _removeUserFromWaitingList(_whitelistId, _users[i]);
        }
    }
}
