# Load Balancer vs Reverse Proxy

- Deploying a load balancer is useful when you have multiple servers. Often, load balancers route traffic to a set of servers serving the same function.
- Reverse proxies can be useful even with just one web server or application server, opening up the benefits described in the previous section.
- Solutions such as NGINX and HAProxy can support both layer 7 reverse proxying and load balancing.

## Disadvantages of reverse proxy:

- Introducing a reverse proxy results in increased complexity.
- A single reverse proxy is a single point of failure, configuring multiple reverse proxies (ie a failover) further increases complexity

To learn more visit the following links:

- [What is a Reverse Proxy vs. Load Balancer?](https://www.nginx.com/resources/glossary/reverse-proxy-vs-load-balancer/)