// SPDX-License-Identifier: MIT

/* ##############################################
    simple implementation of an 
        interest bearing token 
    while waiting for IbTokenV2 
   ############################################## */

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/access/AccessControl.sol";

contract IbToken is ERC20, ERC20Burnable, AccessControl {
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    constructor() ERC20("Interest Bearing Token Fund Together", "IbFT") {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        // _grantRole(MINTER_ROLE, msg.sender);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }
}