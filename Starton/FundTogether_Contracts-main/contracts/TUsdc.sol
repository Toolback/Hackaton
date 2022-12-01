// SPDX-License-Identifier: MIT

// #############################################
//              for testing purpose only
// #############################################

pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TUsdc is ERC20, Ownable {
    constructor() ERC20("Test Token Fund Together", "TUsdc") {}

    function mint(address to, uint256 amount) public {
        _mint(to, amount);
    }
}