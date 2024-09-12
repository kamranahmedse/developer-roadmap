# Long Polling

Long polling is a technique where the client polls the server for new data. However, if the server does not have any data available for the client, instead of sending an empty response, the server holds the request and waits for some specified period of time for new data to be available. If new data becomes available during that time, the server immediately sends a response to the client, completing the open request. If no new data becomes available and the timeout period specified by the client expires, the server sends a response indicating that fact. The client will then immediately re-request data from the server, creating a new request-response cycle.

Learn more from the following resources:

- [@article@Long Polling](https://javascript.info/long-polling)
- [@video@What is Long Polling?](https://www.youtube.com/watch?v=LD0_-uIsnOE)
