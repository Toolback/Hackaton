// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;

import {LibAppStorage, AppStorage, Modifiers} from "../libraries/LibAppStorage.sol";
import {LibERC20} from "../../shared/libraries/LibERC20.sol";
import {IERC20} from "../../shared/interfaces/IERC20.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";

contract VaultFacet is Modifiers {
    // AppStorage internal s;

    ///@notice Deposit tokens to the protocol
    ///@dev token must be listed by admins before transfer 
    ///@param _token token to supply
    ///@param _amount amount to supply
    ///@return bal_ actual user bal
    function supplyFunds(address _token, uint256 _amount) external returns (uint256 bal_) {
        address sender = LibMeta.msgSender();
        require(s.listedToken[_token] = true, "Vault : Token Not Listed Yet");
        LibERC20.transferFrom(_token, sender, address(this), _amount);
        s.vaultFunds[_token] += _amount;
        bal_ = s.userFunds[sender][_token] += _amount;
    }

    ///@notice Withdraw tokens from the protocol
    ///@dev can be withdrawed only funds available (not locked by a quest) 
    ///@param _token token to withdraw
    ///@param _amount amount to withdraw
    ///@return bal_ actual user bal
    function withdrawFunds(address _token, uint256 _amount) external returns (uint256 bal_) {
        address sender = LibMeta.msgSender();
        require(s.userFunds[sender][_token] >= _amount, "Vault : Not Enought Funds in Balance");
        require(s.vaultFunds[_token] >= _amount, "Vault : Not Enought Funds Available ");
        s.vaultFunds[_token] -= _amount;
        bal_ = s.userFunds[sender][_token] -= _amount;
        LibERC20.transfer(_token, sender, _amount);
    }

    ///@notice Retrieve user's available tokens
    ///@param _user user to retrieve tokens from
    ///@param _token token to retrieve bal
    ///@return bal_ actual user bal
    function getUserFunds(address _user, address _token) external view returns (uint256 bal_) {
        bal_ = s.userFunds[_user][_token];
    }

    ///@notice Retrieve user's tokens locked by quest
    ///@param _questId Id of quest locking funds
    ///@param _user user to retrieve tokens from
    ///@param _token token to retrieve bal
    ///@return bal_ actual user locked bal
    function getUserLockedFundsByQuest(uint256 _questId, address _user, address _token) external view returns(uint256 bal_) {
        bal_ = s.questsData[_questId].userLockedFunds[_user][_token];
    }

    ///@notice List new token to the protocol 
    ///@dev or list again a deleted one 
    ///@param _token new token address to list
    ///@return bool status
    function listNewToken(address _token) external returns (bool) {
        return s.listedToken[_token] = true;
    }

    ///@notice Delete listed token
    ///@param _token token address to delete
    ///@return bool status
    function deleteListedToken(address _token) external returns (bool) {
        return s.listedToken[_token] = false;
    }

    ///@notice Return true if token address is currently listed on protocol 
    ///@param _token new token address to list
    ///@return bool status
    function isTokenListed(address _token) external view returns (bool) {
        return s.listedToken[_token];
    }

    ///@notice Set new token used for protocol tx
    ///@param _token new token address to list
    ///@return address paying token address
    function setNewMainPayingToken(address _token) external returns (address) {
        require(s.listedToken[_token] == true, "Token not listed");
        return s.mainPayingToken = _token;
    }

    ///@notice Retrieve token used for protocol tx (minting donut)
    ///@return address paying token address
    function getMainPayingToken() external view returns (address) {
        return s.mainPayingToken;
    }
}
