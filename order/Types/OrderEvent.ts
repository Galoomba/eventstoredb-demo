import { OrderCreationEvent } from "./OrderCreationEvent";
import { OrderSettleEvent } from "./OrderSettleEvent";


export type OrderEvent = OrderCreationEvent | OrderSettleEvent;