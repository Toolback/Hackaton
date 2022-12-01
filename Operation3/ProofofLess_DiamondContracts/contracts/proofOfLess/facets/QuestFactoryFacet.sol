// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {LibAppStorage, AppStorage, QuestData, Modifiers} from "../libraries/LibAppStorage.sol";


// import {LibERC20} from "../../shared/libraries/LibERC20.sol";
// import {IERC20} from "../../shared/interfaces/IERC20.sol";
// import {LibMeta} from "../../shared/libraries/LibMeta.sol";

contract QuestFactoryFacet is Modifiers {
    // AppStorage internal s;

    function createNewQuestData(
        string memory _questName,
        address _author,
        address _questEntryToken,
        uint256 _questEntryCost,
        uint256 _lessReward,
        uint256 _fees,
        uint256 _startPeriod,
        uint256 _endPeriod,
        // uint256 _delayPeriod,
        string memory _questSubtitle,
        string memory _questDetails,
        string memory _questRules,
        string memory _questType
    ) external onlyCoreTeam returns(uint256 questId_){
        uint256 questsIds = s.totalQuestCounter;
        questId_ = questsIds + 1;
        s.totalQuestCounter = questId_;
        s.activeQuests.push(questId_);
        s.questsData[questId_].questName = _questName;
        s.questsData[questId_].questSubtitle = _questSubtitle;
        s.questsData[questId_].questDetails = _questDetails;
        s.questsData[questId_].questRules = _questRules;
        s.questsData[questId_].questType = _questType;
        s.questsData[questId_].questId = questId_;
        s.questsData[questId_].author = _author;
        s.questsData[questId_].questEntryToken = _questEntryToken;
        s.questsData[questId_].questEntryCost = _questEntryCost;
        s.questsData[questId_].lessReward = _lessReward;
        s.questsData[questId_].fees = _fees;
        
        s.questsData[questId_].startPeriod = _startPeriod;
        // s.questsData[questId_].startPeriod = _startPeriod;
        (s.questsData[questId_].endPeriod = _endPeriod);
        // s.questsData[questId_].endPeriod = _endPeriod;
        // _delayPeriod == 1 ? (s.questsData[questId_].delayPeriod = 30 days) : (s.questsData[questId_].delayPeriod = _delayPeriod);
        // s.questsData[questId_].delayPeriod = _delayPeriod;
        s.questsData[questId_].isActive = true;
    }

    function disableActiveQuest(uint256 _questId, uint256 _activeQuestIndex) external onlyCoreTeam {
        s.questsData[_questId].isActive = false;
        if(_activeQuestIndex != s.activeQuests.length) {
        s.activeQuests[_activeQuestIndex] = s.activeQuests[s.activeQuests.length - 1];
        }
        s.activeQuests.pop();
    }

    function getAllActiveQuests() external view returns (uint256[] memory activeQuests_) {
        activeQuests_ = s.activeQuests;
    }

    function getTotalListedQuestCount() external view returns (uint256 totalQuestCounter_) {
        totalQuestCounter_ = s.totalQuestCounter;
    }


}
