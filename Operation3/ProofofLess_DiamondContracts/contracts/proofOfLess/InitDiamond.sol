// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {AppStorage, QuestData} from "./libraries/LibAppStorage.sol";
import {LibMeta} from "../shared/libraries/LibMeta.sol";
import {LibDiamond} from "../shared/libraries/LibDiamond.sol";
import {IDiamondCut} from "../shared/interfaces/IDiamondCut.sol";
import {IERC165} from "../shared/interfaces/IERC165.sol";
import {IDiamondLoupe} from "../shared/interfaces/IDiamondLoupe.sol";
import {IERC173} from "../shared/interfaces/IERC173.sol";

contract InitDiamond {
    AppStorage internal s;

    struct Args {
        string name;
        string symbol;
        address treasuryAddress;
        address oracleAddress;
        address adminAddress;
        address mainToken;
        // QuestData twitterQuestData;

    }

    function init(Args memory _args) external {
        // Init Global States
        s.itemsBaseUri = "https://proofOfLess.com/metadata/items/";
        s.usdcPolygonAddress = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
        s.listedToken[_args.mainToken] = true;
        s.mainPayingToken = _args.mainToken;
        s.name = _args.name;
        s.symbol = _args.symbol;
        s.isCoreTeam[_args.adminAddress] = true;
        s.isCoreTeam[_args.oracleAddress] = true;
        s.treasuryAddress = _args.treasuryAddress;
        s.oracleAddress = _args.oracleAddress;
        s.domainSeparator = LibMeta.domainSeparator("ProofOfLessDiamond", "V1");
        // s.totalQuestCounter == 0;

        // // Init Twitter Quest
        // s.questsData[0].questName = "Twitter Quest";
        // s.questsData[0].questId = 0;
        // s.questsData[0].author = address(this);
        // s.questsData[0].questEntryToken = 0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174;
        // s.questsData[0].questEntryCost = 0;
        // s.questsData[0].lessReward = 0;
        // s.questsData[0].fees = 0;
        // s.questsData[0].startPeriod = block.timestamp;
        // s.questsData[0].endPeriod = block.timestamp + 30 days;
        // s.questsData[0].delayPeriod = 30 days;
        // s.questsData[0].isActive = true;

        // adding ERC165 data
        LibDiamond.DiamondStorage storage ds = LibDiamond.diamondStorage();
        ds.supportedInterfaces[type(IERC165).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondCut).interfaceId] = true;
        ds.supportedInterfaces[type(IDiamondLoupe).interfaceId] = true;
        ds.supportedInterfaces[type(IERC173).interfaceId] = true;
        




        // s.questEntryToken = _args.usdcPolygonAddress;
        // s.lessReward = 10;
        // s.delayPeriod = 30 days;
        // s.activeQuests.push(s.totalQuestCounter);
        // s.questsData[s.totalQuestCounter] = _args.twitterQuestData;
        // s.totalQuestCounter++;
        // remain to set twitter quest author address

    }
}
