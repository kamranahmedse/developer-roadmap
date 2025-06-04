# Routing Policies

AWS Route 53 provides different routing policies to fit various needs:

1. **Simple Routing Policy**: Used for a single resource that performs a specific function.

2. **Weighted Routing Policy**: Useful if you have multiple resources and you want to direct a certain percentage of traffic to each.

3. **Latency Routing Policy**: Allows to route traffic based on the lowest network latency for your user (i.e., which region will give them the fastest response time).

4. **Failover Routing Policy**: Used when you want to create an active/passive setup. For instance, you might want your primary resource to serve all your traffic, but if it fails, you can reroute traffic to a backup resource.

5. **Geo location Routing Policy**: Routes traffic based on the geographic location of your users.

6. **Geo Proximity Routing Policy (Traffic Flow Only)**: Route traffic based on the geographic location of your resources and, optionally, shift traffic from resources in one location to resources in another.

7. **Multi Value Answer Routing Policy**: Used when you want Route 53 to respond to DNS queries with up to eight healthy records selected at random.

Visit the following resources to learn more:

- [@official@Routing Policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html)
