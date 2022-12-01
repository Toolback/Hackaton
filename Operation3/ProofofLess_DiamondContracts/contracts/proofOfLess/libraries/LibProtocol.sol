// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {LibAppStorage, AppStorage, QuestData, UserData} from "./LibAppStorage.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";
import {LibDonuts} from "./LibDonuts.sol";

library LibProtocol {
    function _isCoreTeam(address _user) internal view returns(bool) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        return s.isCoreTeam[_user];
    }

    function _isAdmin(address _user) internal view returns(bool) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        return s.isAdmin[_user];
    }

    function _isTeamListed(address _user) internal view returns(bool) {
        AppStorage storage s = LibAppStorage.diamondStorage();
        return s.isTeamListed[_user];
    }
}