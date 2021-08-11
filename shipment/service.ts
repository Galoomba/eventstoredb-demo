import {
    EventStoreDBClient,
    jsonEvent,
    END,
} from "@eventstore/db-client";

import { OrderShippedEvent } from "./Types/OrdershippmentEvent";

/**
 * connect to esdb.
 */
 const client = EventStoreDBClient.connectionString(`esdb://${process.env.eventStoreHost}:${process.env.eventStorePort}?tls=false`);
 
 /** 
  * order stream name
  */
 const streamName = "order-13Stream";

/**
 * ship order and append it to stream
 */
const ship = async (price: Number, quantity: Number) => {

    const event = jsonEvent<OrderShippedEvent>({
        type: "order-shipped",
        data: {
            state: 'shipped',
            price: price,
            quantity: quantity,
        },
    });

    await client.appendToStream(streamName, event);
    console.log('order shipped');
}

/** 
 * sub on each event happening in event pipeline.
 */
export default async () => {
    client
        .subscribeToStream(streamName, { fromRevision: END })
        .on("data", function (resolvedEvent) {
            const data: any = resolvedEvent?.event?.data;

            console.log(resolvedEvent);
            console.log("pushed to queue");
            console.log(data);

            switch (resolvedEvent?.event?.type) {
                case "order-settled": {
                    ship(data.price, data.quantity);
                    break;
                }
                default: {
                    break;
                }
            }
        });
}
