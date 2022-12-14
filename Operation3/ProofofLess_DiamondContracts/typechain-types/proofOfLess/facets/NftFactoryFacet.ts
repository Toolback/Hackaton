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
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export type ItemTypeStruct = {
  name: PromiseOrValue<string>;
  description: PromiseOrValue<string>;
  author: PromiseOrValue<string>;
  traitModifiers: PromiseOrValue<BigNumberish>[];
  slotPositions: PromiseOrValue<boolean>[];
  lessPrice: PromiseOrValue<BigNumberish>;
  stablePrice: PromiseOrValue<BigNumberish>;
  maxQuantity: PromiseOrValue<BigNumberish>;
  totalQuantity: PromiseOrValue<BigNumberish>;
  canPurchaseWithLess: PromiseOrValue<boolean>;
  canPurchaseWithCoins: PromiseOrValue<boolean>;
  minLevel: PromiseOrValue<BigNumberish>;
  canBeTransferred: PromiseOrValue<boolean>;
  category: PromiseOrValue<BigNumberish>;
  experienceBonus: PromiseOrValue<BigNumberish>;
};

export type ItemTypeStructOutput = [
  string,
  string,
  string,
  number[],
  boolean[],
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  boolean,
  boolean,
  number,
  boolean,
  number,
  number
] & {
  name: string;
  description: string;
  author: string;
  traitModifiers: number[];
  slotPositions: boolean[];
  lessPrice: BigNumber;
  stablePrice: BigNumber;
  maxQuantity: BigNumber;
  totalQuantity: BigNumber;
  canPurchaseWithLess: boolean;
  canPurchaseWithCoins: boolean;
  minLevel: number;
  canBeTransferred: boolean;
  category: number;
  experienceBonus: number;
};

export type WearableSetStruct = {
  name: PromiseOrValue<string>;
  wearableIds: PromiseOrValue<BigNumberish>[];
  traitsBonuses: [
    PromiseOrValue<BigNumberish>,
    PromiseOrValue<BigNumberish>,
    PromiseOrValue<BigNumberish>,
    PromiseOrValue<BigNumberish>,
    PromiseOrValue<BigNumberish>
  ];
};

export type WearableSetStructOutput = [
  string,
  number[],
  [number, number, number, number, number]
] & {
  name: string;
  wearableIds: number[];
  traitsBonuses: [number, number, number, number, number];
};

export type CycleStruct = {
  cycleMaxSupply: PromiseOrValue<BigNumberish>;
  donutPrice: PromiseOrValue<BigNumberish>;
  totalCount: PromiseOrValue<BigNumberish>;
  startedAt: PromiseOrValue<BigNumberish>;
  EndendAt: PromiseOrValue<BigNumberish>;
};

export type CycleStructOutput = [
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber,
  BigNumber
] & {
  cycleMaxSupply: BigNumber;
  donutPrice: BigNumber;
  totalCount: BigNumber;
  startedAt: BigNumber;
  EndendAt: BigNumber;
};

export interface NftFactoryFacetInterface extends utils.Interface {
  functions: {
    "addItemTypes((string,string,string,int8[6],bool[16],uint256,uint256,uint256,uint256,bool,bool,uint16,bool,uint8,uint32)[])": FunctionFragment;
    "addWearableSets((string,uint16[],int8[5])[])": FunctionFragment;
    "batchUpdateItemsPrice(uint256[],uint256[])": FunctionFragment;
    "createCycle(uint24,uint96)": FunctionFragment;
    "getDonutCycle(uint32)": FunctionFragment;
    "mintDonut(address,uint256)": FunctionFragment;
    "mintItems(address,uint256[],uint256[])": FunctionFragment;
    "setItemTraitModifiersAndRarityModifier(uint256,int8[6])": FunctionFragment;
    "setWearableSlotPositions(uint256,bool[16])": FunctionFragment;
    "updateItemTypeMaxQuantity(uint256[],uint256[])": FunctionFragment;
    "updateWearableSets(uint256[],(string,uint16[],int8[5])[])": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addItemTypes"
      | "addWearableSets"
      | "batchUpdateItemsPrice"
      | "createCycle"
      | "getDonutCycle"
      | "mintDonut"
      | "mintItems"
      | "setItemTraitModifiersAndRarityModifier"
      | "setWearableSlotPositions"
      | "updateItemTypeMaxQuantity"
      | "updateWearableSets"
  ): FunctionFragment;

  encodeFunctionData(
    functionFragment: "addItemTypes",
    values: [ItemTypeStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "addWearableSets",
    values: [WearableSetStruct[]]
  ): string;
  encodeFunctionData(
    functionFragment: "batchUpdateItemsPrice",
    values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "createCycle",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getDonutCycle",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "mintDonut",
    values: [PromiseOrValue<string>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "mintItems",
    values: [
      PromiseOrValue<string>,
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>[]
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "setItemTraitModifiersAndRarityModifier",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "setWearableSlotPositions",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<boolean>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "updateItemTypeMaxQuantity",
    values: [PromiseOrValue<BigNumberish>[], PromiseOrValue<BigNumberish>[]]
  ): string;
  encodeFunctionData(
    functionFragment: "updateWearableSets",
    values: [PromiseOrValue<BigNumberish>[], WearableSetStruct[]]
  ): string;

  decodeFunctionResult(
    functionFragment: "addItemTypes",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "addWearableSets",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "batchUpdateItemsPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "createCycle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getDonutCycle",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "mintDonut", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "mintItems", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "setItemTraitModifiersAndRarityModifier",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "setWearableSlotPositions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateItemTypeMaxQuantity",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "updateWearableSets",
    data: BytesLike
  ): Result;

  events: {
    "AddItemType(tuple)": EventFragment;
    "AddNewWearableSet(tuple)": EventFragment;
    "CreateNewCycle(uint256,uint256,uint256)": EventFragment;
    "ItemTypeMaxQuantity(uint256[],uint256[])": EventFragment;
    "MintDonutNFT(address,address,uint256,uint256)": EventFragment;
    "NewItemModifiersSet(uint256,int8[6])": EventFragment;
    "NewItemPriceUpdate(uint256,uint256)": EventFragment;
    "NewUpdateWearableSet(uint256,tuple)": EventFragment;
    "NewWearableSlotPositionsSet(uint256,bool[16])": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "AddItemType"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "AddNewWearableSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "CreateNewCycle"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ItemTypeMaxQuantity"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "MintDonutNFT"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewItemModifiersSet"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewItemPriceUpdate"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewUpdateWearableSet"): EventFragment;
  getEvent(
    nameOrSignatureOrTopic: "NewWearableSlotPositionsSet"
  ): EventFragment;
}

export interface AddItemTypeEventObject {
  _itemType: ItemTypeStructOutput;
}
export type AddItemTypeEvent = TypedEvent<
  [ItemTypeStructOutput],
  AddItemTypeEventObject
>;

export type AddItemTypeEventFilter = TypedEventFilter<AddItemTypeEvent>;

export interface AddNewWearableSetEventObject {
  _wearableSet: WearableSetStructOutput;
}
export type AddNewWearableSetEvent = TypedEvent<
  [WearableSetStructOutput],
  AddNewWearableSetEventObject
>;

export type AddNewWearableSetEventFilter =
  TypedEventFilter<AddNewWearableSetEvent>;

export interface CreateNewCycleEventObject {
  _cycleId: BigNumber;
  _cycleMaxSize: BigNumber;
  _donutPrice: BigNumber;
}
export type CreateNewCycleEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber],
  CreateNewCycleEventObject
>;

export type CreateNewCycleEventFilter = TypedEventFilter<CreateNewCycleEvent>;

export interface ItemTypeMaxQuantityEventObject {
  _itemIds: BigNumber[];
  _maxQuanities: BigNumber[];
}
export type ItemTypeMaxQuantityEvent = TypedEvent<
  [BigNumber[], BigNumber[]],
  ItemTypeMaxQuantityEventObject
>;

export type ItemTypeMaxQuantityEventFilter =
  TypedEventFilter<ItemTypeMaxQuantityEvent>;

export interface MintDonutNFTEventObject {
  _from: string;
  _to: string;
  _tokenId: BigNumber;
  _cycleId: BigNumber;
}
export type MintDonutNFTEvent = TypedEvent<
  [string, string, BigNumber, BigNumber],
  MintDonutNFTEventObject
>;

export type MintDonutNFTEventFilter = TypedEventFilter<MintDonutNFTEvent>;

export interface NewItemModifiersSetEventObject {
  _wearableId: BigNumber;
  _traitModifiers: number[];
}
export type NewItemModifiersSetEvent = TypedEvent<
  [BigNumber, number[]],
  NewItemModifiersSetEventObject
>;

export type NewItemModifiersSetEventFilter =
  TypedEventFilter<NewItemModifiersSetEvent>;

export interface NewItemPriceUpdateEventObject {
  _itemId: BigNumber;
  _priceInWei: BigNumber;
}
export type NewItemPriceUpdateEvent = TypedEvent<
  [BigNumber, BigNumber],
  NewItemPriceUpdateEventObject
>;

export type NewItemPriceUpdateEventFilter =
  TypedEventFilter<NewItemPriceUpdateEvent>;

export interface NewUpdateWearableSetEventObject {
  _setId: BigNumber;
  _wearableSet: WearableSetStructOutput;
}
export type NewUpdateWearableSetEvent = TypedEvent<
  [BigNumber, WearableSetStructOutput],
  NewUpdateWearableSetEventObject
>;

export type NewUpdateWearableSetEventFilter =
  TypedEventFilter<NewUpdateWearableSetEvent>;

export interface NewWearableSlotPositionsSetEventObject {
  _wearableId: BigNumber;
  _slotPositions: boolean[];
}
export type NewWearableSlotPositionsSetEvent = TypedEvent<
  [BigNumber, boolean[]],
  NewWearableSlotPositionsSetEventObject
>;

export type NewWearableSlotPositionsSetEventFilter =
  TypedEventFilter<NewWearableSlotPositionsSetEvent>;

export interface NftFactoryFacet extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: NftFactoryFacetInterface;

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
    addItemTypes(
      _itemTypes: ItemTypeStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    addWearableSets(
      _wearableSets: WearableSetStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    batchUpdateItemsPrice(
      _itemIds: PromiseOrValue<BigNumberish>[],
      _newPrices: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    createCycle(
      _cycleMaxSupply: PromiseOrValue<BigNumberish>,
      _donutPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    getDonutCycle(
      _cycleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, CycleStructOutput] & {
        lastCycleId_: number;
        cycle_: CycleStructOutput;
      }
    >;

    mintDonut(
      _to: PromiseOrValue<string>,
      _cycleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    mintItems(
      _to: PromiseOrValue<string>,
      _itemIds: PromiseOrValue<BigNumberish>[],
      _quantities: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setItemTraitModifiersAndRarityModifier(
      _wearableId: PromiseOrValue<BigNumberish>,
      _traitModifiers: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    setWearableSlotPositions(
      _wearableId: PromiseOrValue<BigNumberish>,
      _slotPositions: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateItemTypeMaxQuantity(
      _itemIds: PromiseOrValue<BigNumberish>[],
      _maxQuantities: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    updateWearableSets(
      _setIds: PromiseOrValue<BigNumberish>[],
      _wearableSets: WearableSetStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addItemTypes(
    _itemTypes: ItemTypeStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  addWearableSets(
    _wearableSets: WearableSetStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  batchUpdateItemsPrice(
    _itemIds: PromiseOrValue<BigNumberish>[],
    _newPrices: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  createCycle(
    _cycleMaxSupply: PromiseOrValue<BigNumberish>,
    _donutPrice: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  getDonutCycle(
    _cycleId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<
    [number, CycleStructOutput] & {
      lastCycleId_: number;
      cycle_: CycleStructOutput;
    }
  >;

  mintDonut(
    _to: PromiseOrValue<string>,
    _cycleId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  mintItems(
    _to: PromiseOrValue<string>,
    _itemIds: PromiseOrValue<BigNumberish>[],
    _quantities: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setItemTraitModifiersAndRarityModifier(
    _wearableId: PromiseOrValue<BigNumberish>,
    _traitModifiers: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  setWearableSlotPositions(
    _wearableId: PromiseOrValue<BigNumberish>,
    _slotPositions: PromiseOrValue<boolean>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateItemTypeMaxQuantity(
    _itemIds: PromiseOrValue<BigNumberish>[],
    _maxQuantities: PromiseOrValue<BigNumberish>[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  updateWearableSets(
    _setIds: PromiseOrValue<BigNumberish>[],
    _wearableSets: WearableSetStruct[],
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addItemTypes(
      _itemTypes: ItemTypeStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    addWearableSets(
      _wearableSets: WearableSetStruct[],
      overrides?: CallOverrides
    ): Promise<void>;

    batchUpdateItemsPrice(
      _itemIds: PromiseOrValue<BigNumberish>[],
      _newPrices: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    createCycle(
      _cycleMaxSupply: PromiseOrValue<BigNumberish>,
      _donutPrice: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<number>;

    getDonutCycle(
      _cycleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<
      [number, CycleStructOutput] & {
        lastCycleId_: number;
        cycle_: CycleStructOutput;
      }
    >;

    mintDonut(
      _to: PromiseOrValue<string>,
      _cycleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    mintItems(
      _to: PromiseOrValue<string>,
      _itemIds: PromiseOrValue<BigNumberish>[],
      _quantities: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setItemTraitModifiersAndRarityModifier(
      _wearableId: PromiseOrValue<BigNumberish>,
      _traitModifiers: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    setWearableSlotPositions(
      _wearableId: PromiseOrValue<BigNumberish>,
      _slotPositions: PromiseOrValue<boolean>[],
      overrides?: CallOverrides
    ): Promise<void>;

    updateItemTypeMaxQuantity(
      _itemIds: PromiseOrValue<BigNumberish>[],
      _maxQuantities: PromiseOrValue<BigNumberish>[],
      overrides?: CallOverrides
    ): Promise<void>;

    updateWearableSets(
      _setIds: PromiseOrValue<BigNumberish>[],
      _wearableSets: WearableSetStruct[],
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "AddItemType(tuple)"(_itemType?: null): AddItemTypeEventFilter;
    AddItemType(_itemType?: null): AddItemTypeEventFilter;

    "AddNewWearableSet(tuple)"(
      _wearableSet?: null
    ): AddNewWearableSetEventFilter;
    AddNewWearableSet(_wearableSet?: null): AddNewWearableSetEventFilter;

    "CreateNewCycle(uint256,uint256,uint256)"(
      _cycleId?: PromiseOrValue<BigNumberish> | null,
      _cycleMaxSize?: null,
      _donutPrice?: null
    ): CreateNewCycleEventFilter;
    CreateNewCycle(
      _cycleId?: PromiseOrValue<BigNumberish> | null,
      _cycleMaxSize?: null,
      _donutPrice?: null
    ): CreateNewCycleEventFilter;

    "ItemTypeMaxQuantity(uint256[],uint256[])"(
      _itemIds?: null,
      _maxQuanities?: null
    ): ItemTypeMaxQuantityEventFilter;
    ItemTypeMaxQuantity(
      _itemIds?: null,
      _maxQuanities?: null
    ): ItemTypeMaxQuantityEventFilter;

    "MintDonutNFT(address,address,uint256,uint256)"(
      _from?: PromiseOrValue<string> | null,
      _to?: PromiseOrValue<string> | null,
      _tokenId?: null,
      _cycleId?: null
    ): MintDonutNFTEventFilter;
    MintDonutNFT(
      _from?: PromiseOrValue<string> | null,
      _to?: PromiseOrValue<string> | null,
      _tokenId?: null,
      _cycleId?: null
    ): MintDonutNFTEventFilter;

    "NewItemModifiersSet(uint256,int8[6])"(
      _wearableId?: null,
      _traitModifiers?: null
    ): NewItemModifiersSetEventFilter;
    NewItemModifiersSet(
      _wearableId?: null,
      _traitModifiers?: null
    ): NewItemModifiersSetEventFilter;

    "NewItemPriceUpdate(uint256,uint256)"(
      _itemId?: null,
      _priceInWei?: null
    ): NewItemPriceUpdateEventFilter;
    NewItemPriceUpdate(
      _itemId?: null,
      _priceInWei?: null
    ): NewItemPriceUpdateEventFilter;

    "NewUpdateWearableSet(uint256,tuple)"(
      _setId?: null,
      _wearableSet?: null
    ): NewUpdateWearableSetEventFilter;
    NewUpdateWearableSet(
      _setId?: null,
      _wearableSet?: null
    ): NewUpdateWearableSetEventFilter;

    "NewWearableSlotPositionsSet(uint256,bool[16])"(
      _wearableId?: null,
      _slotPositions?: null
    ): NewWearableSlotPositionsSetEventFilter;
    NewWearableSlotPositionsSet(
      _wearableId?: null,
      _slotPositions?: null
    ): NewWearableSlotPositionsSetEventFilter;
  };

  estimateGas: {
    addItemTypes(
      _itemTypes: ItemTypeStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    addWearableSets(
      _wearableSets: WearableSetStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    batchUpdateItemsPrice(
      _itemIds: PromiseOrValue<BigNumberish>[],
      _newPrices: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    createCycle(
      _cycleMaxSupply: PromiseOrValue<BigNumberish>,
      _donutPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    getDonutCycle(
      _cycleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    mintDonut(
      _to: PromiseOrValue<string>,
      _cycleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    mintItems(
      _to: PromiseOrValue<string>,
      _itemIds: PromiseOrValue<BigNumberish>[],
      _quantities: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setItemTraitModifiersAndRarityModifier(
      _wearableId: PromiseOrValue<BigNumberish>,
      _traitModifiers: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    setWearableSlotPositions(
      _wearableId: PromiseOrValue<BigNumberish>,
      _slotPositions: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateItemTypeMaxQuantity(
      _itemIds: PromiseOrValue<BigNumberish>[],
      _maxQuantities: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    updateWearableSets(
      _setIds: PromiseOrValue<BigNumberish>[],
      _wearableSets: WearableSetStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addItemTypes(
      _itemTypes: ItemTypeStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    addWearableSets(
      _wearableSets: WearableSetStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    batchUpdateItemsPrice(
      _itemIds: PromiseOrValue<BigNumberish>[],
      _newPrices: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    createCycle(
      _cycleMaxSupply: PromiseOrValue<BigNumberish>,
      _donutPrice: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    getDonutCycle(
      _cycleId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    mintDonut(
      _to: PromiseOrValue<string>,
      _cycleId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    mintItems(
      _to: PromiseOrValue<string>,
      _itemIds: PromiseOrValue<BigNumberish>[],
      _quantities: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setItemTraitModifiersAndRarityModifier(
      _wearableId: PromiseOrValue<BigNumberish>,
      _traitModifiers: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    setWearableSlotPositions(
      _wearableId: PromiseOrValue<BigNumberish>,
      _slotPositions: PromiseOrValue<boolean>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateItemTypeMaxQuantity(
      _itemIds: PromiseOrValue<BigNumberish>[],
      _maxQuantities: PromiseOrValue<BigNumberish>[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    updateWearableSets(
      _setIds: PromiseOrValue<BigNumberish>[],
      _wearableSets: WearableSetStruct[],
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}
