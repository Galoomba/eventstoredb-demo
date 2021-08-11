import {
    JSONEventType,
  } from "@eventstore/db-client";
  

export  type OrderCreationEvent = JSONEventType<
"order-created",
{
  orderId: Number;
  state: string;
  price: Number;
  quantity: Number;
}
>;