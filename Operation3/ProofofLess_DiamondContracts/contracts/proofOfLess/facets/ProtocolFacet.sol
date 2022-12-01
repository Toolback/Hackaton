// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {LibAppStorage, AppStorage, Modifiers} from "../libraries/LibAppStorage.sol";
import {LibProtocol} from "../libraries/LibProtocol.sol";
import {LibDonuts} from "../libraries/LibDonuts.sol";
// import {LibERC20} from "../../shared/libraries/LibERC20.sol";
// import {IERC20} from "../../shared/interfaces/IERC20.sol";
// import {LibMeta} from "../../shared/libraries/LibMeta.sol";

contract ProtocolFacet is Modifiers {
    // AppStorage internal s;
    event GrantExperience(uint256[] _tokenIds, uint256[] _xpValues);
    event RemoveExperience(uint256[] _tokenIds, uint256[] _xpValues);

    function isCoreTeam(address _user) external view returns(bool status_) {
        status_ = LibProtocol._isCoreTeam(_user);
    }

    function isAdmin(address _user) external view returns(bool status_) {
        status_ = LibProtocol._isAdmin(_user);
    }

    function isTeamListed(address _user) external view returns(bool status_) {
        status_ = LibProtocol._isTeamListed(_user);
    }

    function isMember(address _user) external view returns(bool status_) {
        status_ = s.isActiveMember[_user];
    }

    function getTreasuryAddress() external view returns(address treasury_) {
        treasury_ = s.treasuryAddress;
    }

    function getOracleAddress() external view returns(address oracle_) {
        oracle_ = s.oracleAddress;
    }

    function getLessItemId() external view returns(uint256 lessItemId_) {
        lessItemId_ = s.lessItemId;
    }

    function setLessItemId(uint256 _lessItemId) external onlyCoreTeam returns(uint256 lessItemId_) {
        lessItemId_ = s.lessItemId = _lessItemId;
    }

    function setCoreTeam(address _user, bool _status) external onlyCoreTeam returns(bool status_) {
        status_ = s.isCoreTeam[_user] = _status;
    }

    function setAdmin(address _user, bool _status) external onlyCoreTeam returns(bool status_) {
        status_ = s.isAdmin[_user] = _status;
    }

    function setTeamListed(address _user, bool _status) external onlyCoreTeam returns(bool status_) {
        status_ = s.isTeamListed[_user] = _status;
    }

    function setMemberStatus(address _user, bool _status) external onlyCoreTeam returns(bool status_) {
        status_ = s.isActiveMember[_user] = _status;
    }

    function setTreasuryAddress(address _newAddress) external onlyCoreTeam returns(address treasury_) {
        treasury_ =  s.treasuryAddress = _newAddress;
    }

    function setOracleAddress(address _newAddress) external onlyCoreTeam returns(address oracle_) {
        oracle_ =  s.oracleAddress = _newAddress;
    }

    ///@notice Allow Core Team to grant XP to multiple donuts
    ///@param _tokenIds The identifiers of the donuts to grant XP to
    ///@param _xpValues The amount XP to grant each donut
    function grantExperience(uint256[] calldata _tokenIds, uint256[] calldata _xpValues) external onlyCoreTeam {
        require(_tokenIds.length == _xpValues.length, "DAOFacet: IDs must match XP array length");


        for (uint256 i; i < _tokenIds.length; i++) {
            uint256 tokenId = _tokenIds[i];
            uint256 xp = _xpValues[i];
            require(xp <= 1000, "ProtocolFacet: Cannot grant more than 1000 XP at a time");

            s.members[tokenId].experience += xp;
        }
        emit GrantExperience(_tokenIds, _xpValues);
    }

    ///@notice Allow core team to remove XP from multiple donuts
    ///@param _tokenIds The identifiers of the donuts to grant XP to
    ///@param _xpValues The amount XP to grant each donut
    function removeExperience(uint256[] calldata _tokenIds, uint256[] calldata _xpValues) external onlyCoreTeam {
        require(_tokenIds.length == _xpValues.length, "ProtocolFacet: IDs must match XP array length");

        for (uint256 i; i < _tokenIds.length; i++) {
            uint256 tokenId = _tokenIds[i];
            uint256 removeXp = _xpValues[i];

            require(s.members[tokenId].experience >= removeXp, "ProtocolFacet: Remove XP would underflow");

            s.members[tokenId].experience -= removeXp;
        }
        emit RemoveExperience(_tokenIds, _xpValues);
    }



}