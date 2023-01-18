# Load Balancers

Load balancers distribute incoming client requests to computing resources such as application servers and databases. In each case, the load balancer returns the response from the computing resource to the appropriate client. Load balancers are effective at:

 - Preventing requests from going to unhealthy servers
 - Preventing overloading resources
 - Helping to eliminate a single point of failure

Load balancers can be implemented with hardware (expensive) or with software such as HAProxy. Additional benefits include:

 - **SSL termination** - Decrypt incoming requests and encrypt server responses so backend servers do not have to perform these potentially expensive operations
 - Removes the need to install X.509 certificates on each server
 - **Session persistence** - Issue cookies and route a specific client's requests to same instance if the web apps do not keep track of sessions

To protect against failures, it's common to set up multiple load balancers, either in active-passive or active-active mode. Load balancers can route traffic based on various metrics, including:

## Layer 4 load balancing
Layer 4 load balancers look at info at the transport layer to decide how to distribute requests. Generally, this involves the source, destination IP addresses, and ports in the header, but not the contents of the packet. Layer 4 load balancers forward network packets to and from the upstream server, performing Network Address Translation (NAT).

## Layer 7 load balancing
Layer 7 load balancers look at the application layer to decide how to distribute requests. This can involve contents of the header, message, and cookies. Layer 7 load balancers terminate network traffic, reads the message, makes a load-balancing decision, then opens a connection to the selected server. For example, a layer 7 load balancer can direct video traffic to servers that host videos while directing more sensitive user billing traffic to security-hardened servers.

## Disadvantages of load balancer
The load balancer can become a performance bottleneck if it does not have enough resources or if it is not configured properly.
Introducing a load balancer to help eliminate a single point of failure results in increased complexity.
A single load balancer is a single point of failure, configuring multiple load balancers further increases complexity.

To learn more, visit the following links:

- [What is Load balancing (computing)?](https://en.wikipedia.org/wiki/Load_balancing_(computing))
- [Introduction to Load Balancing](https://github.com/donnemartin/system-design-primer#layer-7-load-balancing)