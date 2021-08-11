import {
    JSONEventType,
  } from "@eventstore/db-client";
  

export  type OrderShippedEvent = JSONEventType<
"order-shipped",
{
  state: string;
  price: Number;
  quantity: Number;
}
>;