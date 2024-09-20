![Long-running processes](https://assets.roadmap.sh/guest/long-running-sn5fc.png)

For web requests that trigger long-running processes, the best option is to implement a reactive architecture. This means that when a service receives a request, it will transform it into a message inside a message queue, and the long-running process will pick it up whenever it’s ready to do so.

In the meantime, the client sending this request receives an immediate response acknowledging that the request is being processed. The client itself can also be connected to the message queue (or through a proxy) and waiting for a “ready” event with its payload inside.