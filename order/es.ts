
import {
  EventStoreDBClient,
  jsonEvent,
  FORWARDS,
  START,
} from "@eventstore/db-client";
import { OrderEvent } from "./Types/OrderEvent";


/**
 * connect to esdb.
 */
const client = EventStoreDBClient.connectionString(`esdb://${process.env.eventStoreHost}:${process.env.eventStorePort}?tls=false`);

/**
 * stream name for an order.
 */
const streamName = "order-13Stream";

/**
 * generate a random number.
 */
const getRand = () =>  Math.floor(Math.random() * 15);

/**
 * create order and append order created event to the stream.
 */
export async function create(): Promise<void> {

  const event = jsonEvent<OrderEvent>({
    type: "order-created",
    data: {
      state: 'pending',
      price: getRand(),
      quantity: getRand(),
    },
  });

  const state = await client.appendToStream(streamName, event);
  console.log(`order created and appended to queue `);
  console.log(state);

}

/**
 *   settle an order.
 *   append event settled event to the stream.
 */
export async function settle(): Promise<void> {

  const event = jsonEvent<OrderEvent>({
    type: "order-settled",
    data: {
      state: 'settled',
      price: getRand(),
      quantity: getRand(),
    },
  });

  const state = await client.appendToStream(streamName, event);
  console.log(`order settled and appended to queue ` );
  console.log(state);

}

/**
 * Read all log history form eventstore 
 */
export async function showLog(): Promise<void> {

  const events = client.readStream<OrderEvent>(streamName, {
    fromRevision: START,
    direction: FORWARDS,
  });
  console.log(`----------------------------------log---------------------------------------`);

  for await (const { event } of events) {
    console.log(event);
  }
}
