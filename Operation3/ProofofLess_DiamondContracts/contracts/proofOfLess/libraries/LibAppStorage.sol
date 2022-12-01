// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import {LibDiamond} from "../../shared/libraries/LibDiamond.sol";
import {LibMeta} from "../../shared/libraries/LibMeta.sol";

uint256 constant EQUIPPED_WEARABLE_SLOTS = 16;
uint256 constant NUMERIC_TRAITS_NUM = 6; // item bonus
uint256 constant TRAIT_BONUSES_NUM = 5; // set bonus




struct Cycle { 
    uint256 cycleMaxSupply;
    uint256 donutPrice;
    uint256 totalCount;
    uint256 startedAt;
    uint256 EndendAt;

}

struct DonutProfil {
    address userAddress;
    string userName;
    string userBio;
    uint32 tokenId;
    uint16 cycleId;

    // address[] friendsAddress;
    // uint256[] groupes;

    uint256 level;
    uint256 rank; // gain with $Less staking 
    uint256 experience; // gain with quest
    uint256 minimumStake; // increasing amount with higher rank
    uint256 stakedAmount;
    uint256 usedSkillPoints; //The number of skill points this donut has already used
    uint40 claimTime; // token minted at 

    uint256 questAccepted;
    uint256 questCompleted;
    uint256 daoProposalCreated;
    uint256 daoProposalCreatedAccepted;
    uint256 daoProposalVoted;
    uint256 challengeReceived;
    uint256 friendChallenged;

    uint16[EQUIPPED_WEARABLE_SLOTS] equippedWearables; //The currently equipped wearables of the Donut
    int16[NUMERIC_TRAITS_NUM] numericTraits; // Sixteen 16 bit ints.  [Eye Color, Eye Shape, Brain Size, Spookiness, Aggressiveness, Energy]
    int8[NUMERIC_TRAITS_NUM] temporaryTraitBoosts; // Bonus Gain With Specials Items
    //
    uint256 interactionCount; //How many times the owner of this donut has interacted with the protocol.
    uint40 lastTemporaryBoost;
    uint40 lastInteracted; // Last member action
    bool isActive;
}

struct ItemType {
    string name; //The name of the item
    string description;
    string author;
    // treated as int8s array
    // [Experience, Rarity Score, Kinship, Eye Color, Eye Shape, Brain Size, Spookiness, Aggressiveness, Energy]
    int8[NUMERIC_TRAITS_NUM] traitModifiers; //[WEARABLE ONLY] How much the wearable modifies each trait. Should not be more than +-5 total
    //[WEARABLE ONLY] The slots that this wearable can be added to.
    bool[EQUIPPED_WEARABLE_SLOTS] slotPositions;

    uint256 lessPrice; //How much this item costs
    uint256 stablePrice; //How much this item costs
    uint256 maxQuantity; //Total number that can be minted of this item.
    uint256 totalQuantity; //The total quantity of this item minted so far
    
    bool canPurchaseWithLess;
    bool canPurchaseWithCoins;

    uint16 minLevel; //The minimum donut level required to use this item. Default is 1.
    bool canBeTransferred;
    uint8 category; // 0 is wearable, 1 is badge, 2 is consumable, 10 less token
    // int16 kinshipBonus; //[CONSUMABLE ONLY] How much this consumable boosts (or reduces) kinship score
    uint32 experienceBonus; //[CONSUMABLE ONLY]
}

struct WearableSet {
    string name;
    uint16[] wearableIds; // The tokenIdS of each piece of the set
    int8[TRAIT_BONUSES_NUM] traitsBonuses;
}

struct UserData {
    string userName; // ex : twitter handle
    uint256 tokenId;
    mapping(address => uint256) totalFunding;
    mapping(address => uint256) totalGain;
    uint256 goal; // old weeklygoalaverage
    bool hasWinThisCycle;
}

struct QuestData{
    string questName;
    string questSubtitle;
    string questDetails;
    string questRules;
    string questType;
    uint256 startPeriod;
    uint256 endPeriod;
    uint256 questId;
    address author;
    address questEntryToken;
    uint256 questEntryCost;
    uint256 lessReward;
    uint256 fees;
    uint256 delayPeriod;

    //user address => token address => locked amount
    mapping(address => mapping(address => uint256)) userLockedFunds;
    // EntryCoinAddress => bal
    mapping(address => uint256) questBalance;


    mapping(address => UserData) userQuestData;
    // Actual Queued Players
    address[] waitingListAddress;
    address[] newlySubscribedPlayer;
    address[] participants;
    address[] winners;
    uint256 winnersFunding;

    bool isActive;
}

struct Whitelist {
    address owner;
    string name;
    address[] addresses;
}

struct MemberList {
    address owner;
    string name;
    address[] waitingList;
    address[] participantList;
    address[] winners;
    address tokenUsed;
    uint256 tokenPrize;
    uint256 lessPrize;
}


struct AppStorage {
    address treasuryAddress;
    address oracleAddress;
    string name;
    string symbol;
    bytes32 domainSeparator;

    /// -- TOKENS -- ///

    // tokenId => member profil
    mapping(uint256 => DonutProfil) members;
    mapping(address => uint256) memberDonutId;
    mapping(address => bool) isActiveMember;
    // Donut 
    uint32 donutMintWhitelistId;
    mapping(uint256 => Cycle) cycles;
    uint16 currentCycleId;
    uint32 donutIdCounter;
    mapping(string => bool) donutsNamesUsed;

    // tokenContractAddress => parentTokenId => childTokenId => qty 
    mapping(address => mapping(uint256 => mapping(uint256 => uint256))) nftItemBalances;
    // tokenContract => parentTokenId => [] child tokens ids
    mapping(address => mapping(uint256 => uint256[])) nftItems;
    // indexes are stored 1 higher so that 0 means no items in items array
    mapping(address => mapping(uint256 => mapping(uint256 => uint256))) nftItemIndexes;

    ItemType[] itemTypes;
    WearableSet[] wearableSets;
    // erc1155Token => (erc1155TypeId => category)
    mapping(address => mapping(uint256 => uint256)) erc1155Categories; // 0 is wearable, 1 is badge, 2 is consumable
    // userAddress => itemId => qty
    mapping(address => mapping(uint256 => uint256)) ownerItemBalances;
    mapping(address => uint256[]) ownerItems;
    // indexes are stored 1 higher so that 0 means no items in items array
    mapping(address => mapping(uint256 => uint256)) ownerItemIndexes;

    uint32[] tokenIds;
    mapping(uint256 => uint256) tokenIdIndexes;


    mapping(address => mapping(address => bool)) operators;
    mapping(uint256 => address) approved;

    /// -- VAULT -- ///

    // tokenAddress => qty deposited 
    mapping(address => uint256) vaultFunds; // all funds deposited
    // token address => qty locked
    mapping(address => uint256) vaultLockedFunds; // All quests locked funds
    // user address => token address => qty deposited
    mapping(address => mapping(address => uint256)) userFunds; // user's available Funds
    // token address => listed or not 
    mapping(address => bool) listedToken;
    address usdcPolygonAddress;
    address mainPayingToken;

    /// -- QUEST REGISTRY -- ///

    uint256 totalQuestCounter;
    uint256[] activeQuests;
    // questIndex => questData
    mapping(uint256 => QuestData) questsData;
    
    /// -- QUEST -- ///

    //userAddress => questId => status
    mapping(address => mapping(uint256 => bool)) isUserInQuest;
    mapping(address => mapping(uint256 => bool)) isUserInWaitingList;

    /// -- WHITELIST -- ///

    Whitelist[] whitelists;
    // If zero, then the user is not whitelisted for the given whitelist ID. Otherwise, this represents the position of the user in the whitelist + 1
    mapping(uint32 => mapping(address => uint256)) isWhitelisted; // whitelistId => whitelistAddress => isWhitelisted
    

    // -- QUEST LIB V2 -- //
    MemberList[] memberLists;
    // If zero, then the user is not in queue for the given memberList ID. Otherwise, this represents the position of the user in the waitingList + 1
    mapping(uint32 => mapping(address => uint256)) isInWaitingListByML; // memberList ID => userAddress => isWhitelisted
        // If zero, then the user is not in queue for the given memberList ID. Otherwise, this represents the position of the user in the Participant List + 1
    mapping(uint32 => mapping(address => uint256)) isInParticipantListByML; // memberList ID => userAddress => isWhitelisted
    // -- -- //
    mapping(address => bool) isTeamListed;
    mapping(address => bool) isAdmin;
    mapping(address => bool) isCoreTeam;

    string itemsBaseUri;
    uint256 lessItemId;
}

library LibAppStorage {
    function diamondStorage() internal pure returns (AppStorage storage ds) {
        assembly {
            ds.slot := 0
        }
    }

    function abs(int256 x) internal pure returns (uint256) {
        return uint256(x >= 0 ? x : -x);
    }
}
contract Modifiers {
    AppStorage internal s;
    modifier onlyDonutOwner(uint256 _tokenId) {
        require(LibMeta.msgSender() == s.members[_tokenId].userAddress, "LibAppStorage : Only Donut Owner can call this function");
        _;
    }

    modifier onlyDonutOwnerOrApproved(uint256 _tokenId) {
        require(LibMeta.msgSender() == s.members[_tokenId].userAddress || LibMeta.msgSender() == s.approved[_tokenId], "LibAppStorage : Only Donut Owner or Approved Address can call this function");
        _;
    }

    modifier onlyMember() {
        require(s.isActiveMember[LibMeta.msgSender()] || s.isAdmin[LibMeta.msgSender()] || s.isCoreTeam[LibMeta.msgSender()], "LibAppStorage : Only Members can call this function");
        _;
    }

    modifier onlyTeamListed() {
        require(s.isTeamListed[LibMeta.msgSender()] || s.isCoreTeam[LibMeta.msgSender()], "LibAppStorage : Only Team Listed can call this function");
        _;
    }

    modifier onlyAdmin() {
        require(s.isAdmin[LibMeta.msgSender()] || s.isCoreTeam[LibMeta.msgSender()], "LibAppStorage : Only Admins can call this function");
        _;
    }

    modifier onlyCoreTeam() {
        require(s.isCoreTeam[LibMeta.msgSender()], "LibAppStorage : Only Core Team can call this function");
        _;
    }

    modifier onlyOracle() {
        require(LibMeta.msgSender() == s.oracleAddress || s.isCoreTeam[LibMeta.msgSender()], "LibAppStorage : Only Oracle can call this function (automated call)");
        _;
    }

    modifier onlyOwner() {
        LibDiamond.enforceIsContractOwner();
        _;
    }

    modifier onlyQuestAdmin(uint256 _questId) {
        require(LibMeta.msgSender() == s.questsData[_questId].author || s.isCoreTeam[LibMeta.msgSender()], "LibAppStorage : Sender is not Quest Author");
        _;
    }

    modifier onlyWhiteListed(uint32 _whitelistId) {
        require(s.isWhitelisted[_whitelistId][LibMeta.msgSender()] != 0 || s.isCoreTeam[LibMeta.msgSender()], "LibAppStorage : User Not WhiteListed");
        _;
    }

}