# Pre-Warm ELB

> Pre-warm your ELBs if you're expecting heavy traffic.


It takes time for your ELB to scale up capacity. If you know you're going to have a large traffic spike (selling tickets, big event, etc), you need to "warm up" your ELB in advance. You can inject a load of traffic, and it will cause ELB to scale up and not choke when you actually get the traffic, however AWS suggest you contact them instead to prewarm your load balancer. (Source: [Best Practices in Evaluating Elastic Load Balancing](https://aws.amazon.com/articles/best-practices-in-evaluating-elastic-load-balancing/#pre-warming)). Alternatively you can install your own load balancer software on an EC2 instance and use that instead (HAProxy, etc).
