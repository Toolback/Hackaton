/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type {
  ProtocolFacet,
  ProtocolFacetInterface,
} from "../../../proofOfLess/facets/ProtocolFacet";

const _abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_xpValues",
        type: "uint256[]",
      },
    ],
    name: "GrantExperience",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
      {
        indexed: false,
        internalType: "uint256[]",
        name: "_xpValues",
        type: "uint256[]",
      },
    ],
    name: "RemoveExperience",
    type: "event",
  },
  {
    inputs: [],
    name: "getLessItemId",
    outputs: [
      {
        internalType: "uint256",
        name: "lessItemId_",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getOracleAddress",
    outputs: [
      {
        internalType: "address",
        name: "oracle_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "getTreasuryAddress",
    outputs: [
      {
        internalType: "address",
        name: "treasury_",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_xpValues",
        type: "uint256[]",
      },
    ],
    name: "grantExperience",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "isAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "status_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "isCoreTeam",
    outputs: [
      {
        internalType: "bool",
        name: "status_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "isMember",
    outputs: [
      {
        internalType: "bool",
        name: "status_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
    ],
    name: "isTeamListed",
    outputs: [
      {
        internalType: "bool",
        name: "status_",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256[]",
        name: "_tokenIds",
        type: "uint256[]",
      },
      {
        internalType: "uint256[]",
        name: "_xpValues",
        type: "uint256[]",
      },
    ],
    name: "removeExperience",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "setAdmin",
    outputs: [
      {
        internalType: "bool",
        name: "status_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "setCoreTeam",
    outputs: [
      {
        internalType: "bool",
        name: "status_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_lessItemId",
        type: "uint256",
      },
    ],
    name: "setLessItemId",
    outputs: [
      {
        internalType: "uint256",
        name: "lessItemId_",
        type: "uint256",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "setMemberStatus",
    outputs: [
      {
        internalType: "bool",
        name: "status_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newAddress",
        type: "address",
      },
    ],
    name: "setOracleAddress",
    outputs: [
      {
        internalType: "address",
        name: "oracle_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_user",
        type: "address",
      },
      {
        internalType: "bool",
        name: "_status",
        type: "bool",
      },
    ],
    name: "setTeamListed",
    outputs: [
      {
        internalType: "bool",
        name: "status_",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_newAddress",
        type: "address",
      },
    ],
    name: "setTreasuryAddress",
    outputs: [
      {
        internalType: "address",
        name: "treasury_",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50610c93806100206000396000f3fe608060405234801561001057600080fd5b50600436106101005760003560e01c80636605bfda11610097578063b18b78dd11610066578063b18b78dd14610234578063cec2858014610245578063e002460414610258578063f2413ef41461026957600080fd5b80636605bfda146101cc578063721ae881146101df578063a230c52414610200578063ac2436ff1461022c57600080fd5b80634c69c00f116100d35780634c69c00f14610166578063508335a51461019157806352017c56146101a6578063608d3d3d146101b957600080fd5b8063160e176714610105578063182cb2171461012d57806324d7806c146101405780634b0bddd214610153575b600080fd5b6101186101133660046109fb565b61027c565b60405190151581526020015b60405180910390f35b61011861013b366004610a1d565b61029f565b61011861014e3660046109fb565b610318565b610118610161366004610a1d565b610339565b6101796101743660046109fb565b6103a9565b6040516001600160a01b039091168152602001610124565b6101a461019f366004610aa5565b61040e565b005b6101186101b4366004610a1d565b6105f8565b6101186101c73660046109fb565b610668565b6101796101da3660046109fb565b610689565b6101f26101ed366004610b11565b6106ee565b604051908152602001610124565b61011861020e3660046109fb565b6001600160a01b031660009081526007602052604090205460ff1690565b602d546101f2565b6001546001600160a01b0316610179565b610118610253366004610a1d565b61073d565b6000546001600160a01b0316610179565b6101a4610277366004610aa5565b6107ad565b6001600160a01b03811660009081526029602052604081205460ff165b92915050565b6000602b816102ac610982565b6001600160a01b0316815260208101919091526040016000205460ff166102ee5760405162461bcd60e51b81526004016102e590610b2a565b60405180910390fd5b506001600160a01b03919091166000908152602b60205260409020805460ff191682151517905590565b6001600160a01b0381166000908152602a602052604081205460ff16610299565b6000602b81610346610982565b6001600160a01b0316815260208101919091526040016000205460ff1661037f5760405162461bcd60e51b81526004016102e590610b2a565b506001600160a01b03919091166000908152602a60205260409020805460ff191682151517905590565b6000602b816103b6610982565b6001600160a01b0316815260208101919091526040016000205460ff166103ef5760405162461bcd60e51b81526004016102e590610b2a565b50600180546001600160a01b0319166001600160a01b03831617905590565b602b600061041a610982565b6001600160a01b0316815260208101919091526040016000205460ff166104535760405162461bcd60e51b81526004016102e590610b2a565b8281146104b85760405162461bcd60e51b815260206004820152602d60248201527f50726f746f636f6c46616365743a20494473206d757374206d6174636820585060448201526c040c2e4e4c2f240d8cadccee8d609b1b60648201526084016102e5565b60005b838110156105b45760008585838181106104d7576104d7610b7f565b90506020020135905060008484848181106104f4576104f4610b7f565b90506020020135905080600060050160008481526020019081526020016000206006015410156105775760405162461bcd60e51b815260206004820152602860248201527f50726f746f636f6c46616365743a2052656d6f766520585020776f756c6420756044820152676e646572666c6f7760c01b60648201526084016102e5565b60008281526005602052604081206006018054839290610598908490610bab565b92505081905550505080806105ac90610bc2565b9150506104bb565b507fe5cb108ea929708ba20952182cd7dfa1bbadf852ba26e32433624399a372e6ef848484846040516105ea9493929190610c13565b60405180910390a150505050565b6000602b81610605610982565b6001600160a01b0316815260208101919091526040016000205460ff1661063e5760405162461bcd60e51b81526004016102e590610b2a565b506001600160a01b03919091166000908152600760205260409020805460ff191682151517905590565b6001600160a01b0381166000908152602b602052604081205460ff16610299565b6000602b81610696610982565b6001600160a01b0316815260208101919091526040016000205460ff166106cf5760405162461bcd60e51b81526004016102e590610b2a565b50600080546001600160a01b0319166001600160a01b03831617905590565b6000602b816106fb610982565b6001600160a01b0316815260208101919091526040016000205460ff166107345760405162461bcd60e51b81526004016102e590610b2a565b50602d81905590565b6000602b8161074a610982565b6001600160a01b0316815260208101919091526040016000205460ff166107835760405162461bcd60e51b81526004016102e590610b2a565b506001600160a01b03919091166000908152602960205260409020805460ff191682151517905590565b602b60006107b9610982565b6001600160a01b0316815260208101919091526040016000205460ff166107f25760405162461bcd60e51b81526004016102e590610b2a565b8281146108525760405162461bcd60e51b815260206004820152602860248201527f44414f46616365743a20494473206d757374206d6174636820585020617272616044820152670f240d8cadccee8d60c31b60648201526084016102e5565b60005b8381101561094c57600085858381811061087157610871610b7f565b905060200201359050600084848481811061088e5761088e610b7f565b9050602002013590506103e881111561090f5760405162461bcd60e51b815260206004820152603760248201527f50726f746f636f6c46616365743a2043616e6e6f74206772616e74206d6f726560448201527f207468616e203130303020585020617420612074696d6500000000000000000060648201526084016102e5565b60008281526005602052604081206006018054839290610930908490610c45565b925050819055505050808061094490610bc2565b915050610855565b507f9373fada80bb4fe253d2f3b66e1294c4027086455c7ebf80c458eb45d47bcb60848484846040516105ea9493929190610c13565b6000333014156109d957600080368080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050503601516001600160a01b031691506109dc9050565b50335b90565b80356001600160a01b03811681146109f657600080fd5b919050565b600060208284031215610a0d57600080fd5b610a16826109df565b9392505050565b60008060408385031215610a3057600080fd5b610a39836109df565b915060208301358015158114610a4e57600080fd5b809150509250929050565b60008083601f840112610a6b57600080fd5b50813567ffffffffffffffff811115610a8357600080fd5b6020830191508360208260051b8501011115610a9e57600080fd5b9250929050565b60008060008060408587031215610abb57600080fd5b843567ffffffffffffffff80821115610ad357600080fd5b610adf88838901610a59565b90965094506020870135915080821115610af857600080fd5b50610b0587828801610a59565b95989497509550505050565b600060208284031215610b2357600080fd5b5035919050565b60208082526035908201527f4c696241707053746f72616765203a204f6e6c7920436f7265205465616d206360408201527430b71031b0b636103a3434b990333ab731ba34b7b760591b606082015260800190565b634e487b7160e01b600052603260045260246000fd5b634e487b7160e01b600052601160045260246000fd5b600082821015610bbd57610bbd610b95565b500390565b6000600019821415610bd657610bd6610b95565b5060010190565b81835260006001600160fb1b03831115610bf657600080fd5b8260051b8083602087013760009401602001938452509192915050565b604081526000610c27604083018688610bdd565b8281036020840152610c3a818587610bdd565b979650505050505050565b60008219821115610c5857610c58610b95565b50019056fea2646970667358221220ffa8f81e2f319c86a823b3e20449b986c38f0fd5fd130fc7f565865d909f85d664736f6c634300080b0033";

type ProtocolFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: ProtocolFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class ProtocolFacet__factory extends ContractFactory {
  constructor(...args: ProtocolFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ProtocolFacet> {
    return super.deploy(overrides || {}) as Promise<ProtocolFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): ProtocolFacet {
    return super.attach(address) as ProtocolFacet;
  }
  override connect(signer: Signer): ProtocolFacet__factory {
    return super.connect(signer) as ProtocolFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): ProtocolFacetInterface {
    return new utils.Interface(_abi) as ProtocolFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): ProtocolFacet {
    return new Contract(address, _abi, signerOrProvider) as ProtocolFacet;
  }
}
