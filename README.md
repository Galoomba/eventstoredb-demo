
## EventStoreDB 

# 
## Getting Started
```
docker-compose up --build 
```
## Order service 
 - to create a create order stream 
  ``` curl localhost:3011/create ```
 - to create a settle order stream
  ``` curl localhost:3011/settle ```
 - to show all event log   
  ``` curl localhost:3011/showlog ```

## Shipment service 
 is subscripting to each event emitted in  ` order-13Stream `
 if it received a settle order event it will automatic emit a shipping order event and append it to the stream.