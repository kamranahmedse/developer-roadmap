# Subscriptions

In GraphQL, subscriptions are a way to push real-time updates to the client. They allow a client to subscribe to specific events or data changes on the server, and receive updates in real-time as soon as the event occurs or the data changes. Subscriptions are defined on the server and are structured similarly to queries and mutations.

A subscription includes a "subscription" field at the top level, followed by the fields that define the event or data change to be subscribed to. The client can initiate the subscription by sending the subscription query to the server, and the server will keep the connection open, listening for new events or data changes. Once the event occurs, or the data changes, the server will send the updated data to the client through the open connection.

Learn more from following links:

- [@article@Subscriptions and Live Queries - Real Time with GraphQL](https://the-guild.dev/blog/subscriptions-and-live-queries-real-time-with-graphql)