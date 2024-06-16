In a load-balanced application scenario, the main issue with session state is that if the backend system is handling session data in memory, then subsequent requests from the same client need to land on the same server, otherwise session data is fragmented and useless.

There are two main ways to solve this problem:

- Sticky sessions: This allows you to configure the load balancer to redirect requests from the same client into the same server every time. The downside with this one, is that the traffic is not always equally distributed among all copies of your backend services.
- Centralized session store: This solution involves taking the session data outside of your backend services into a centralized data store that all copies of your service can access. This makes it easier on the load balancer, but requires extra logic and more “moving parts”.

It’s up to you and your specific technical requirements to determine which strategy works best for you.