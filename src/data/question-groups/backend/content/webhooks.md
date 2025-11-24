Webhooks are user-defined HTTP callbacks, they are triggered by a specific event inside a system. They’re mainly used to notify about results of multi-step, asynchronous tasks to avoid keeping an open HTTP connection.

As for the implementation of a webhook, consider the following:

- **Event definition.** Make sure to define exactly what events will trigger the message to the webhook and the type of payload associated with those events.
- **Endpoint creation.** Based on the previous step, define an HTTP endpoint that can deal with the expected request (especially with the payload part). In other words, if you’re receiving data in the webhook request, make sure to create the endpoint as a POST endpoint, otherwise you can use a GET one.
- **Security.** Remember to implement some form of security measures around your webhook endpoint so it can’t be exploited.