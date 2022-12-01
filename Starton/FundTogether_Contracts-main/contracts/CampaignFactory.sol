// SPDX-License-Identifier: MIT
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "./interface/IERC721S.sol";
import "./IbToken.sol";

pragma solidity ^0.8.9;

contract CampaignFactory {
    uint256 public campaignPrice;
    address public accessCardContract;
    address public payingToken;
    address public campaignAdmin;
    address[] public deployedCampaigns;
    mapping(address => bool) public admins;
    mapping(address => uint256) public bal;

    modifier restricted() {
        require(admins[msg.sender] == true);
        _;
    }

    constructor (address _accessCardContract, address _payingToken, uint256 _campaignPrice, address _campaignAdmin) {
        accessCardContract = _accessCardContract;
        payingToken = _payingToken;
        campaignPrice = _campaignPrice;
        admins[msg.sender] = true;
        campaignAdmin = _campaignAdmin;
    }

    function createCampaign(uint _minimum, address _supportedToken) public returns (address deployedCampaign_){
        require((IERC721S(accessCardContract).balanceOf(msg.sender) >= 1), "required access card");
        // ERC20(payingToken).transferFrom(msg.sender, address(this), campaignPrice);
        // bal[payingToken] += campaignPrice;
        address newIbToken = address(new IbToken());
        deployedCampaign_ = address(new Campaign(msg.sender, campaignAdmin, _minimum, _supportedToken, newIbToken));
        IbToken(newIbToken).grantRole(IbToken(newIbToken).MINTER_ROLE(), deployedCampaign_);
        deployedCampaigns.push(deployedCampaign_);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }

    function deleteCampaign(uint256 _campaignId) public restricted {
        delete deployedCampaigns[_campaignId];
    }

    function addAdmin(address _newAdmin) public restricted {
        admins[_newAdmin] = true;
    }

    function deleteAdmin(address _oldAdmin) public restricted {
        admins[_oldAdmin] = false;
    }

    function setCampaignPrice(uint256 _amount) public restricted {
        campaignPrice = _amount;
    }

    function setPayingToken(address _newPayingToken) public restricted {
        payingToken = _newPayingToken;
    }

    function withdraw(address _tokenAddr, uint256 _amount) public restricted {
        ERC20(_tokenAddr).transfer(msg.sender, _amount);
    }
}

contract Campaign {
    // struct Request {
    //     string description;
    //     uint value;
    //     address recipient;
    //     bool complete;
    //     uint approvalCount;
    //     mapping(address => bool) approvals;
    // }

    // Request[] public requests;
    address public manager;
    address public admin;
    uint public minimumContribution;
    uint public interestRate; // %  // WIP IbV2
    uint public approversCount;
    address public actualToken;
    address[] public supportedTokens;
    address public ibTokenAddress;
    mapping(address => bool) public approvers;
    mapping(address => uint256) public userBalance;
    mapping(address => uint256) public campaignBalance;

    modifier onlyManager() {
        require(msg.sender == manager);
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == manager);
        _;
    }

    constructor (address _creator, address _admin, uint _minimum, address _actualToken, address _ibTokenAddress) {
        manager = _creator;
        admin = _admin;
        minimumContribution = _minimum;
        actualToken = _actualToken;
        supportedTokens.push(_actualToken);
        ibTokenAddress = _ibTokenAddress;
        interestRate = 5;
    }

    function contribute(uint _amount) public payable {
        require(_amount > minimumContribution);
        IERC20(actualToken).transferFrom(msg.sender, address(this), _amount);
        IbToken(ibTokenAddress).mint(msg.sender, _amount);
        if (approvers[msg.sender] == false)
        {
            approvers[msg.sender] = true;
            approversCount++;
        }
        userBalance[msg.sender] += _amount;
        campaignBalance[actualToken] += _amount;
    }

    function claim(uint _amount) public payable {
        require(_amount <= userBalance[msg.sender] 
                    && _amount <= campaignBalance[actualToken], "Not Enough Funds");
        IbToken(ibTokenAddress).burnFrom(msg.sender, _amount);
        userBalance[msg.sender] -= _amount;
        campaignBalance[actualToken] -= _amount;
        ERC20(actualToken).transfer(msg.sender, _amount); 
        if (userBalance[msg.sender] == 0)
        {
            approvers[msg.sender] = false;
            approversCount--;
        }
    }

    function getUserBalance(address _user) public view returns (uint256 userBal_){
        userBal_ = userBalance[_user];
        // replace by IBToken
    }

    // WIP
    function adminClaim(uint _amount) public onlyAdmin payable {
        ERC20(actualToken).transfer(msg.sender, _amount);
        campaignBalance[actualToken] -= _amount;
    }

    function setMinimumContribution(uint _amount) public onlyManager returns (uint amount_) {
        amount_ = minimumContribution = _amount;
    }

    function setActualToken(address _actualToken) public onlyAdmin returns (address actualToken_) {
        actualToken_ = actualToken = _actualToken;
        supportedTokens.push(_actualToken);
    }

    function setInterestRate(uint256 _interestRate) public onlyAdmin {
        interestRate = _interestRate;
    }


    function setAdmin(address _newAdmin) public onlyAdmin {
        admin = _newAdmin;
    }

    function setManager(address _newManager) public onlyAdmin {
        manager = _newManager;
    }
    
    function getSummary() public view returns (
      uint minimumContribution_, uint interestRate_, uint totalBalance_, uint approversCount_, address manager_, address actualToken_, address ibTokenAddress_, address[] memory supportedTokens_
      ) {
          minimumContribution_ = minimumContribution;
          interestRate_ = interestRate;
          totalBalance_ = campaignBalance[actualToken];
        //   requests.length,
          approversCount_ = approversCount;
          manager_ = manager;
          actualToken_ = actualToken;
          ibTokenAddress_ = ibTokenAddress;
          supportedTokens_ = supportedTokens;
    }
    // function createRequest(string memory description, uint value, address recipient) public onlyManager {
    //     Request storage newRequest = requests.push(); 
    //     newRequest.description = description;
    //     newRequest.value= value;
    //     newRequest.recipient= recipient;
    //     newRequest.complete= false;
    //     newRequest.approvalCount= 0;
    // }

    // function approveRequest(uint index) public {
    //     Request storage request = requests[index];

    //     require(approvers[msg.sender]);
    //     require(!request.approvals[msg.sender]);

    //     request.approvals[msg.sender] = true;
    //     request.approvalCount++;
    // }

    // function finalizeRequest(uint index) public onlyManager {
    //     Request storage request = requests[index];

    //     require(request.approvalCount > (approversCount / 2));
    //     require(!request.complete);

    //     payable(request.recipient).transfer(request.value);
    //     request.complete = true;
    // }

    // function getRequestsCount() public view returns (uint) {
    //     return requests.length;
    // }
}