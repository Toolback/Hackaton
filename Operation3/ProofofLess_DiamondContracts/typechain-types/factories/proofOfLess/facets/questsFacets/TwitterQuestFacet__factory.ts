/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../../common";
import type {
  TwitterQuestFacet,
  TwitterQuestFacetInterface,
} from "../../../../proofOfLess/facets/questsFacets/TwitterQuestFacet";

const _abi = [
  {
    inputs: [],
    name: "newCycle",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "registerWaitingListToQuest",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "subscribeToWaitingList",
    outputs: [
      {
        internalType: "bool",
        name: "",
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
        name: "_memberToUnsubscribe",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_userWaitingListIndex",
        type: "uint256",
      },
    ],
    name: "unsubscribeFromWaitingList",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_user",
        type: "address[]",
      },
      {
        internalType: "bool[]",
        name: "_hasWin",
        type: "bool[]",
      },
    ],
    name: "updateUserQuestStatus",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address[]",
        name: "_user",
        type: "address[]",
      },
      {
        internalType: "uint256[]",
        name: "_amount",
        type: "uint256[]",
      },
    ],
    name: "updateUsersGoals",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b50611839806100206000396000f3fe608060405234801561001057600080fd5b50600436106100625760003560e01c80631196004f146100675780634f5b0d5a146100715780638daed32a14610084578063aefdb30f14610097578063e27f2500146100b3578063fb941ea3146100c6575b600080fd5b61006f6100ce565b005b61006f61007f366004611511565b61014d565b61006f6100923660046115db565b6101c7565b61009f61023d565b604051901515815260200160405180910390f35b61009f6100c1366004611687565b61024e565b61006f610263565b6001546001600160a01b03166100e26102d7565b6001600160a01b0316148061011c5750602860006100fe6102d7565b6001600160a01b0316815260208101919091526040016000205460ff165b6101415760405162461bcd60e51b8152600401610138906116b1565b60405180910390fd5b61014b6001610334565b565b6001546001600160a01b03166101616102d7565b6001600160a01b0316148061019b57506028600061017d6102d7565b6001600160a01b0316815260208101919091526040016000205460ff165b6101b75760405162461bcd60e51b8152600401610138906116b1565b6101c3600183836109b8565b5050565b6001546001600160a01b03166101db6102d7565b6001600160a01b031614806102155750602860006101f76102d7565b6001600160a01b0316815260208101919091526040016000205460ff165b6102315760405162461bcd60e51b8152600401610138906116b1565b6101c360018383610b04565b60006102496001610c44565b905090565b600061025c60018484610e54565b9392505050565b6001546001600160a01b03166102776102d7565b6001600160a01b031614806102b15750602860006102936102d7565b6001600160a01b0316815260208101919091526040016000205460ff165b6102cd5760405162461bcd60e51b8152600401610138906116b1565b61014b6001610ff6565b60003330141561032e57600080368080601f0160208091040260200160405190810160405280939291908181526020018383808284376000920191909152505050503601516001600160a01b031691506103319050565b50335b90565b6000818152602160209081526040808320600681015460038201546001600160a01b03168552600b909101909252822054829161037091611730565b60008481526021840160205260408120600301549192506001600160a01b03909116905b60008581526021850160205260409020600f01548110156105d45760008581526021850160205260408120600f81018054600c90920191839190859081106103de576103de611747565b60009182526020808320909101546001600160a01b03168352828101939093526040918201812089825260218901909352908120600f81018054939450600c909101928590811061043157610431611747565b60009182526020808320909101546001600160a01b0316835282019290925260400190206005015460ff16156104cd5760008681526021860160205260409020600f810180546010909201918490811061048d5761048d611747565b60009182526020808320909101548354600181018555938352912090910180546001600160a01b0319166001600160a01b0390921691909117905561054b565b6000868152602186016020526040812060048101546010820180549193600a90930192918690811061050157610501611747565b60009182526020808320909101546001600160a01b039081168452838201949094526040928301822093881682529290925281208054909190610545908490611730565b90915550505b60008681526021860160205260408120600f81018054600c90920192918590811061057857610578611747565b60009182526020808320909101546001600160a01b031683528201929092526040018120906105a782826113a8565b506000600182018190556004820155600501805460ff1916905550806105cc8161175d565b915050610394565b50600084815260218401602052604081206105f491600f909101906113e5565b60008481526021840160205260409020601001541561097757600084815260218401602052604081206010015461062b9084611778565b905060005b6000868152602186016020526040902060100154811015610955576000868152602186016020526040812060048101546010820180549193600a90930192918590811061067f5761067f611747565b60009182526020808320909101546001600160a01b0390811684528382019490945260409283018220938816825292909252812080549091906106c3908490611730565b9091555050600086815260218601602090815260408083206001600160a01b0387168452600b01909152812080548492906106ff908490611730565b90915550506000868152602186016020526040812060100180548492601b89019290918590811061073257610732611747565b60009182526020808320909101546001600160a01b03908116845283820194909452604092830182208b835260218b018252838320600301549094168252929092528120805490919061078690849061179a565b9091555050600086815260218601602052604081206010810180548593600c909301929190859081106107bb576107bb611747565b60009182526020808320909101546001600160a01b0390811684528382019490945260409283018220938816825260039093019092528120805490919061080390849061179a565b92505081905550600a8560050160008760060160008960210160008c8152602001908152602001600020601001868154811061084157610841611747565b9060005260206000200160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b0316815260200190815260200160002054815260200190815260200160002060050160008282546108a0919061179a565b9250508190555060018560050160008760060160008960210160008c815260200190815260200160002060100186815481106108de576108de611747565b9060005260206000200160009054906101000a90046001600160a01b03166001600160a01b03166001600160a01b03168152602001908152602001600020548152602001908152602001600020600b01600082825461093d919061179a565b9091555081905061094d8161175d565b915050610630565b5060008581526021850160205260408120610975916010909101906113e5565b505b60008481526021840160205260409020426007820181905560099091015461099e9161179a565b600094855260219093016020525050604090912060080155565b60008151835114610a0b5760405162461bcd60e51b815260206004820152601a60248201527f4c69625175657374203a204c656e677468204d69736d617463680000000000006044820152606401610138565b60005b8351811015610afd576000826021016000878152602001908152602001600020600c016000868481518110610a4557610a45611747565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000209050838281518110610a8157610a81611747565b6020026020010151836021016000888152602001908152602001600020600c016000878581518110610ab557610ab5611747565b6020908102919091018101516001600160a01b03168252810191909152604001600020600501805460ff19169115159190911790555080610af58161175d565b915050610a0e565b5050505050565b60008151835114610b575760405162461bcd60e51b815260206004820152601a60248201527f4c69625175657374203a204c656e677468204d69736d617463680000000000006044820152606401610138565b60005b8351811015610afd576000826021016000878152602001908152602001600020600c016000868481518110610b9157610b91611747565b60200260200101516001600160a01b03166001600160a01b031681526020019081526020016000209050838281518110610bcd57610bcd611747565b6020026020010151836021016000888152602001908152602001600020600c016000878581518110610c0157610c01611747565b60200260200101516001600160a01b03166001600160a01b0316815260200190815260200160002060040181905550508080610c3c9061175d565b915050610b5a565b6000806000610c516102d7565b9050610c5c81611373565b610cb45760405162461bcd60e51b815260206004820152602360248201527f4c69625175657374203a20204d656d626572537461747573204e6f742041637460448201526269766560e81b6064820152608401610138565b600084815260218301602052604090206012015460ff161515600114610d1c5760405162461bcd60e51b815260206004820152601b60248201527f4c69625175657374203a205175657374204e6f742041637469766500000000006044820152606401610138565b6000848152602183016020908152604080832060038101546004909101546001600160a01b038681168652601b8801855283862092168086529190935292205481811015610dea5760405162461bcd60e51b815260206004820152604f60248201527f204c69625175657374203a204e6f7420456e6f7567687420436f6e746573742060448201527f436f696e7320496e205661756c742042616c616e636520546f204a6f696e205460648201526e1a194815d85a5d1a5b99c8131a5cdd608a1b608482015260a401610138565b50505060008481526021830160209081526040808320600d018054600181810183559185528385200180546001600160a01b039096166001600160a01b03199096168617905593835260239094018152838220958252949094529220805460ff1916831790555090565b6000806000610e616102d7565b6001600160a01b038616600090815260238401602090815260408083208a845290915290205490915060ff16610ec357506001600160a01b038416600090815260239091016020908152604080832087845290915290205460ff16905061025c565b60008681526021830160205260409020600d01548414610f7b5760008681526021830160205260409020600d018054610efe90600190611730565b81548110610f0e57610f0e611747565b6000918252602080832090910154888352602185019091526040909120600d0180546001600160a01b039092169186908110610f4c57610f4c611747565b9060005260206000200160006101000a8154816001600160a01b0302191690836001600160a01b031602179055505b60008681526021830160205260409020600d01805480610f9d57610f9d6117b2565b60008281526020808220830160001990810180546001600160a01b03191690559092019092556001600160a01b0387168252602390930183526040808220888352909352918220805460ff191690555090509392505050565b60008181526021602052604081206012015460ff16151560011461105c5760405162461bcd60e51b815260206004820152601b60248201527f4c69625175657374203a205175657374204e6f742041637469766500000000006044820152606401610138565b60005b60008381526021830160205260409020600d015481101561136e576000838152602183016020526040812060038101546004820154600d90920180546001600160a01b039092169391859081106110b8576110b8611747565b60009182526020808320909101546001600160a01b03908116808452601b890183526040808520928816855291909252822054909250906110f883611373565b6000898152602189016020526040902060040154909150821080159061111b5750805b1561134957600088815260218801602090815260408083206001600160a01b0387168452600c01909152902060048101546001111561119157600089815260218901602090815260408220600e01805460018101825590835291200180546001600160a01b0319166001600160a01b0386161790555b6001600160a01b038085166000908152601b8a0160209081526040808320938a16835292905290812080548792906111ca908490611730565b90915550506001600160a01b0386166000908152600282016020526040812080548792906111f990849061179a565b9091555050600089815260218901602090815260408083206001600160a01b038089168552600a9091018352818420908a1684529091528120805487929061124290849061179a565b9091555050600089815260218901602090815260408083206001600160a01b038a168452600b019091528120805487929061127e90849061179a565b90915550506001600160a01b0386166000908152601a89016020526040812080548792906112ad90849061179a565b909155505060008981526021890160209081526040808320600f018054600180820183559185528385200180546001600160a01b0319166001600160a01b038a1690811790915580855260228d0184528285208e86528452828520805460ff191683179055845260068c01835281842054845260058c019092528220600a0180549192909161133d90849061179a565b90915550611356915050565b611354888488610e54565b505b505050505080806113669061175d565b91505061105f565b505050565b6001600160a01b031660009081526006602090815260408083205483526005909152902060150154600160501b900460ff1690565b5080546113b4906117c8565b6000825580601f106113c4575050565b601f0160209004906000526020600020908101906113e291906113ff565b50565b50805460008255906000526020600020908101906113e291905b5b808211156114145760008155600101611400565b5090565b634e487b7160e01b600052604160045260246000fd5b604051601f8201601f1916810167ffffffffffffffff8111828210171561145757611457611418565b604052919050565b600067ffffffffffffffff82111561147957611479611418565b5060051b60200190565b80356001600160a01b038116811461149a57600080fd5b919050565b600082601f8301126114b057600080fd5b813560206114c56114c08361145f565b61142e565b82815260059290921b840181019181810190868411156114e457600080fd5b8286015b84811015611506576114f981611483565b83529183019183016114e8565b509695505050505050565b6000806040838503121561152457600080fd5b823567ffffffffffffffff8082111561153c57600080fd5b6115488683870161149f565b935060209150818501358181111561155f57600080fd5b85019050601f8101861361157257600080fd5b80356115806114c08261145f565b81815260059190911b8201830190838101908883111561159f57600080fd5b928401925b828410156115cc57833580151581146115bd5760008081fd5b825292840192908401906115a4565b80955050505050509250929050565b600080604083850312156115ee57600080fd5b823567ffffffffffffffff8082111561160657600080fd5b6116128683870161149f565b935060209150818501358181111561162957600080fd5b85019050601f8101861361163c57600080fd5b803561164a6114c08261145f565b81815260059190911b8201830190838101908883111561166957600080fd5b928401925b828410156115cc5783358252928401929084019061166e565b6000806040838503121561169a57600080fd5b6116a383611483565b946020939093013593505050565b60208082526043908201527f4c696241707053746f72616765203a204f6e6c79204f7261636c652063616e2060408201527f63616c6c20746869732066756e6374696f6e20286175746f6d617465642063616060820152626c6c2960e81b608082015260a00190565b634e487b7160e01b600052601160045260246000fd5b6000828210156117425761174261171a565b500390565b634e487b7160e01b600052603260045260246000fd5b60006000198214156117715761177161171a565b5060010190565b60008261179557634e487b7160e01b600052601260045260246000fd5b500490565b600082198211156117ad576117ad61171a565b500190565b634e487b7160e01b600052603160045260246000fd5b600181811c908216806117dc57607f821691505b602082108114156117fd57634e487b7160e01b600052602260045260246000fd5b5091905056fea2646970667358221220831606dd046aa0fb932163da198f839952485271a56ef487609c31690a5f143264736f6c634300080b0033";

type TwitterQuestFacetConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: TwitterQuestFacetConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class TwitterQuestFacet__factory extends ContractFactory {
  constructor(...args: TwitterQuestFacetConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<TwitterQuestFacet> {
    return super.deploy(overrides || {}) as Promise<TwitterQuestFacet>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): TwitterQuestFacet {
    return super.attach(address) as TwitterQuestFacet;
  }
  override connect(signer: Signer): TwitterQuestFacet__factory {
    return super.connect(signer) as TwitterQuestFacet__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): TwitterQuestFacetInterface {
    return new utils.Interface(_abi) as TwitterQuestFacetInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): TwitterQuestFacet {
    return new Contract(address, _abi, signerOrProvider) as TwitterQuestFacet;
  }
}