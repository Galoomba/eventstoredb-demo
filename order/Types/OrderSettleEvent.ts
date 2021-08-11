import {
    JSONEventType,
  } from "@eventstore/db-client";
  

export type OrderSettleEvent = JSONEventType<
"order-settled",
{
  state: string;
}
>;