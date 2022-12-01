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

export interface QuestFactoryFacetInterface extends utils.Interface {
  functions: {
    "createNewQuestData(string,address,address,uint256,uint256,uint256,uint256,uint256,string,string,string,string)": FunctionFragment;
    "disableActiveQuest(uint256,uint256)": FunctionFragment;
    "getAllActiveQuests()": FunctionFragment;
    "getTotalListedQuestCount()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "createNewQuestData"
      | "disableActiveQuest"
      | "getAllActiveQuests"
      | "getTotalListedQuestCount"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "createNewQuestData",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<BigNumberish>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>,
      PromiseOrValue<string>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "disableActiveQuest",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getAllActiveQuests",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalListedQuestCount",
    values?: undefined
  ): string;

  decodeFunctionResult(
    functionFragment: "createNewQuestData",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "disableActiveQuest",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getAllActiveQuests",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalListedQuestCount",
    data: BytesLike
  ): Result;

  events: {};
}

export interface QuestFactoryFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: QuestFactoryFacetInterface;

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
    createNewQuestData(
      _questName: PromiseOrValue<string>,
      _author: PromiseOrValue<string>,
      _questEntryToken: PromiseOrValue<string>,
      _questEntryCost: PromiseOrValue<BigNumberish>,
      _lessReward: PromiseOrValue<BigNumberish>,
      _fees: PromiseOrValue<BigNumberish>,
      _startPeriod: PromiseOrValue<BigNumberish>,
      _endPeriod: PromiseOrValue<BigNumberish>,
      _questSubtitle: PromiseOrValue<string>,
      _questDetails: PromiseOrValue<string>,
      _questRules: PromiseOrValue<string>,
      _questType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    disableActiveQuest(
      _questId: PromiseOrValue<BigNumberish>,
      _activeQuestIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getAllActiveQuests(
      overrides?: CallOverrides
    ): Promise<[BigNumber[]] & { activeQuests_: BigNumber[] }>;

    getTotalListedQuestCount(
      overrides?: CallOverrides
    ): Promise<[BigNumber] & { totalQuestCounter_: BigNumber }>;
  };

  createNewQuestData(
    _questName: PromiseOrValue<string>,
    _author: PromiseOrValue<string>,
    _questEntryToken: PromiseOrValue<string>,
    _questEntryCost: PromiseOrValue<BigNumberish>,
    _lessReward: PromiseOrValue<BigNumberish>,
    _fees: PromiseOrValue<BigNumberish>,
    _startPeriod: PromiseOrValue<BigNumberish>,
    _endPeriod: PromiseOrValue<BigNumberish>,
    _questSubtitle: PromiseOrValue<string>,
    _questDetails: PromiseOrValue<string>,
    _questRules: PromiseOrValue<string>,
    _questType: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  disableActiveQuest(
    _questId: PromiseOrValue<BigNumberish>,
    _activeQuestIndex: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getAllActiveQuests(overrides?: CallOverrides): Promise<BigNumber[]>;

  getTotalListedQuestCount(overrides?: CallOverrides): Promise<BigNumber>;

  callStatic: {
    createNewQuestData(
      _questName: PromiseOrValue<string>,
      _author: PromiseOrValue<string>,
      _questEntryToken: PromiseOrValue<string>,
      _questEntryCost: PromiseOrValue<BigNumberish>,
      _lessReward: PromiseOrValue<BigNumberish>,
      _fees: PromiseOrValue<BigNumberish>,
      _startPeriod: PromiseOrValue<BigNumberish>,
      _endPeriod: PromiseOrValue<BigNumberish>,
      _questSubtitle: PromiseOrValue<string>,
      _questDetails: PromiseOrValue<string>,
      _questRules: PromiseOrValue<string>,
      _questType: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    disableActiveQuest(
      _questId: PromiseOrValue<BigNumberish>,
      _activeQuestIndex: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    getAllActiveQuests(overrides?: CallOverrides): Promise<BigNumber[]>;

    getTotalListedQuestCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  filters: {};

  estimateGas: {
    createNewQuestData(
      _questName: PromiseOrValue<string>,
      _author: PromiseOrValue<string>,
      _questEntryToken: PromiseOrValue<string>,
      _questEntryCost: PromiseOrValue<BigNumberish>,
      _lessReward: PromiseOrValue<BigNumberish>,
      _fees: PromiseOrValue<BigNumberish>,
      _startPeriod: PromiseOrValue<BigNumberish>,
      _endPeriod: PromiseOrValue<BigNumberish>,
      _questSubtitle: PromiseOrValue<string>,
      _questDetails: PromiseOrValue<string>,
      _questRules: PromiseOrValue<string>,
      _questType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    disableActiveQuest(
      _questId: PromiseOrValue<BigNumberish>,
      _activeQuestIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getAllActiveQuests(overrides?: CallOverrides): Promise<BigNumber>;

    getTotalListedQuestCount(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    createNewQuestData(
      _questName: PromiseOrValue<string>,
      _author: PromiseOrValue<string>,
      _questEntryToken: PromiseOrValue<string>,
      _questEntryCost: PromiseOrValue<BigNumberish>,
      _lessReward: PromiseOrValue<BigNumberish>,
      _fees: PromiseOrValue<BigNumberish>,
      _startPeriod: PromiseOrValue<BigNumberish>,
      _endPeriod: PromiseOrValue<BigNumberish>,
      _questSubtitle: PromiseOrValue<string>,
      _questDetails: PromiseOrValue<string>,
      _questRules: PromiseOrValue<string>,
      _questType: PromiseOrValue<string>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    disableActiveQuest(
      _questId: PromiseOrValue<BigNumberish>,
      _activeQuestIndex: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getAllActiveQuests(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalListedQuestCount(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;
  };
}