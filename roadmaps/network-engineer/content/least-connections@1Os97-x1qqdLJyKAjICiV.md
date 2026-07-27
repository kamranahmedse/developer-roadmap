# Least Connections

The Least Connections algorithm is a load-balancing method that routes each new request to the server with the fewest active connections at that moment. This approach is more adaptive than Round Robin because it accounts for varying request durations and server load. It is particularly useful when requests have significantly different processing times, ensuring that no single server gets backed up while others are idle.

Visit the following resources to learn more:

- [@article@Types of load balancing algorithms](https://www.cloudflare.com/en-gb/learning/performance/types-of-load-balancing-algorithms/)
- [@video@LTM Load Balancing Algorithms: Least Connections Types](https://www.youtube.com/watch?v=tAAmZ3bz8AA)