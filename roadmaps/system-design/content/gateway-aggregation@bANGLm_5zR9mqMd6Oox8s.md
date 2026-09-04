# Gateway Aggregation
 
Gateway aggregation combines multiple backend requests into a single request from the client's perspective, with the gateway making the individual calls to different services and merging the results. This reduces the number of round trips a client needs to make, which is especially useful for clients on slower networks, like mobile devices. It does add some coordination overhead at the gateway itself.

Visit the following resources to learn more:

- [@article@Gateway Aggregation pattern](https://learn.microsoft.com/en-us/azure/architecture/patterns/gateway-aggregation)