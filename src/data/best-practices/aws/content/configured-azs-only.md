# Configured AZs

> Only use the availability zones (AZs) your ELB is configured for.

If you add your scaling group to multiple AZs, make sure your ELB is configured to use all of those AZs, otherwise your capacity will scale up, and the load balancer won't be able to see them.