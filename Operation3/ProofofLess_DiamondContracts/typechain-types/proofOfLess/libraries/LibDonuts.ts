/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  Signer,
  utils,
} from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../../common";

export interface LibDonutsInterface extends utils.Interface {
  functions: {};

  events: {
    "DonutInteract(uint256)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "DonutInteract"): EventFragment;
}

export interface DonutInteractEventObject {
  _tokenId: BigNumber;
}
export type DonutInteractEvent = TypedEvent<
  [BigNumber],
  DonutInteractEventObject
>;

export type DonutInteractEventFilter = TypedEventFilter<DonutInteractEvent>;

export interface LibDonuts extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: LibDonutsInterface;

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

  functions: {};

  callStatic: {};

  filters: {
    "DonutInteract(uint256)"(
      _tokenId?: PromiseOrValue<BigNumberish> | null
    ): DonutInteractEventFilter;
    DonutInteract(
      _tokenId?: PromiseOrValue<BigNumberish> | null
    ): DonutInteractEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}
