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
} from "../../../common";

export interface TwitterQuestFacetInterface extends utils.Interface {
  functions: {
    "newCycle()": FunctionFragment;
    "registerWaitingListToQuest()": FunctionFragment;
    "subscribeToWaitingList()": FunctionFragment;
    "unsubscribeFromWaitingList(address,uint256)": FunctionFragment;
    "updateUserQuestStatus(address[],bool[])": FunctionFragment;
    "updateUsersGoals(address[],uint256[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "newCycle"
      | "registerWaitingListToQuest"
      | "subscribeToWaitingList"
      | "unsubscribeFromWaitingList"
      | "updateUserQuestStatus"
      | "updateUsersGoals"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "newCycle", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "registerWaitingListToQuest",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "subscribeToWaitingList",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "unsubscribeFromWaitingList",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "updateUserQuestStatus",
    values: [PromiseOrValue<string>[], PromiseOrValue<boolean>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "updateUsersGoals",
    values: [PromiseOrValue<string>[], PromiseOrValue<BigNumberish>[]]
  ): string;

  decodeFunctionResult(functionFragment: "newCycle", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "registerWaitingListToQuest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "subscribeToWaitingList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "unsubscribeFromWaitingList",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateUserQuestStatus",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateUsersGoals",
    data: BytesLike
  ): Result;

  events: {};
}

export interface TwitterQuestFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: TwitterQuestFacetInterface;

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
    newCycle(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    registerWaitingListToQuest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    subscribeToWaitingList(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    unsubscribeFromWaitingList(
      _memberToUnsubscribe: PromiseOrValue<string>,
      _userWaitingListIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateUserQuestStatus(
      _user: PromiseOrValue<string>[],
      _hasWin: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateUsersGoals(
      _user: PromiseOrValue<string>[],
      _amount: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  newCycle(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  registerWaitingListToQuest(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  subscribeToWaitingList(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  unsubscribeFromWaitingList(
    _memberToUnsubscribe: PromiseOrValue<string>,
    _userWaitingListIndex: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateUserQuestStatus(
    _user: PromiseOrValue<string>[],
    _hasWin: PromiseOrValue<boolean>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateUsersGoals(
    _user: PromiseOrValue<string>[],
    _amount: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    newCycle(overrides?: CallOverrides): Promise<void>;

    registerWaitingListToQuest(overrides?: CallOverrides): Promise<void>;

    subscribeToWaitingList(overrides?: CallOverrides): Promise<boolean>;

    unsubscribeFromWaitingList(
      _memberToUnsubscribe: PromiseOrValue<string>,
      _userWaitingListIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<boolean>;

    updateUserQuestStatus(
      _user: PromiseOrValue<string>[],
      _hasWin: PromiseOrValue<boolean>[],
      overrides?: CallOverrides
    ): Promise<void>;

    updateUsersGoals(
      _user: PromiseOrValue<string>[],
      _amount: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {};

  estimateGas: {
    newCycle(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    registerWaitingListToQuest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    subscribeToWaitingList(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    unsubscribeFromWaitingList(
      _memberToUnsubscribe: PromiseOrValue<string>,
      _userWaitingListIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateUserQuestStatus(
      _user: PromiseOrValue<string>[],
      _hasWin: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateUsersGoals(
      _user: PromiseOrValue<string>[],
      _amount: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    newCycle(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    registerWaitingListToQuest(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    subscribeToWaitingList(
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    unsubscribeFromWaitingList(
      _memberToUnsubscribe: PromiseOrValue<string>,
      _userWaitingListIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateUserQuestStatus(
      _user: PromiseOrValue<string>[],
      _hasWin: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateUsersGoals(
      _user: PromiseOrValue<string>[],
      _amount: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
