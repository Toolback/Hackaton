/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface VaultFacetInterface extends utils.Interface {
  functions: {
    "deleteListedToken(address)": FunctionFragment;
    "getMainPayingToken()": FunctionFragment;
    "getUserFunds(address,address)": FunctionFragment;
    "getUserLockedFundsByQuest(uint256,address,address)": FunctionFragment;
    "isTokenListed(address)": FunctionFragment;
    "listNewToken(address)": FunctionFragment;
    "setNewMainPayingToken(address)": FunctionFragment;
    "supplyFunds(address,uint256)": FunctionFragment;
    "withdrawFunds(address,uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "deleteListedToken"
      | "getMainPayingToken"
      | "getUserFunds"
      | "getUserLockedFundsByQuest"
      | "isTokenListed"
      | "listNewToken"
      | "setNewMainPayingToken"
      | "supplyFunds"
      | "withdrawFunds"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "deleteListedToken",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getMainPayingToken",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getUserFunds",
    values: [PromiseOrValue<string>, PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "getUserLockedFundsByQuest",
    values: [
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "isTokenListed",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "listNewToken",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "setNewMainPayingToken",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "supplyFunds",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdrawFunds",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(
    functionFragment: "deleteListedToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getMainPayingToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getUserLockedFundsByQuest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "isTokenListed",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "listNewToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setNewMainPayingToken",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "supplyFunds",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "withdrawFunds",
    data: BytesLike
  ): Result;

  events: {};
}

export interface VaultFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: VaultFacetInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    deleteListedToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getMainPayingToken(overrides?: CallOverrides): Promise<[string]>;

    getUserFunds(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { bal_: BigNumber }>;

    getUserLockedFundsByQuest(
      _questId: PromiseOrValue<BigNumberish>,
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { bal_: BigNumber }>;

    isTokenListed(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[boolean]>;

    listNewToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setNewMainPayingToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    supplyFunds(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdrawFunds(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  deleteListedToken(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getMainPayingToken(overrides?: CallOverrides): Promise<string>;

  getUserFunds(
    _user: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getUserLockedFundsByQuest(
    _questId: PromiseOrValue<BigNumberish>,
    _user: PromiseOrValue<string>,
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  isTokenListed(
    _token: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<boolean>;

  listNewToken(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setNewMainPayingToken(
    _token: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  supplyFunds(
    _token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdrawFunds(
    _token: PromiseOrValue<string>,
    _amount: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    deleteListedToken(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    getMainPayingToken(overrides?: CallOverrides): Promise<string>;

    getUserFunds(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserLockedFundsByQuest(
      _questId: PromiseOrValue<BigNumberish>,
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isTokenListed(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    listNewToken(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    setNewMainPayingToken(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<string>;

    supplyFunds(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    withdrawFunds(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    deleteListedToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getMainPayingToken(overrides?: CallOverrides): Promise<BigNumber>;

    getUserFunds(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getUserLockedFundsByQuest(
      _questId: PromiseOrValue<BigNumberish>,
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    isTokenListed(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    listNewToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setNewMainPayingToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    supplyFunds(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdrawFunds(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    deleteListedToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getMainPayingToken(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserFunds(
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getUserLockedFundsByQuest(
      _questId: PromiseOrValue<BigNumberish>,
      _user: PromiseOrValue<string>,
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    isTokenListed(
      _token: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    listNewToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setNewMainPayingToken(
      _token: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    supplyFunds(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdrawFunds(
      _token: PromiseOrValue<string>,
      _amount: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}