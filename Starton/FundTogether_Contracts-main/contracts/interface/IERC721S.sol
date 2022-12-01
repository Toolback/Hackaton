pragma solidity ^0.8.11;

interface IERC721S{
function safeMint(address to, string memory metadataURI) external;
function balanceOf(address user) external returns(uint256);
}

