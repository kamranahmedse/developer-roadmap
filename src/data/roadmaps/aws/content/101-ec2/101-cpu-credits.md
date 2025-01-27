# CPU Credits

AWS EC2 instances earn CPU Credits when they are idle and consume CPU credits when they are active. A CPU credit provides the performance of a full CPU core for one minute. T2 and T3 instances accrue CPU Credits and use them to burst beyond their baseline performance. For example, a t2.micro instance receives credits continuously at a rate of 6 CPU Credits per hour. The credit balance of an instance can be saved for up to 7 days. When the instance does not have any CPU credits, it performs at the baseline. It's important to note that CPU credit pricing is different and additional to the instance pricing. AWS also offers Unlimited mode for instances that need to burst beyond the baseline performance for extended periods.

Visit the following resources to learn more:

- [@official@Burstable Performance Instances and CPU Credits](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/burstable-credits-baseline-concepts.html)
- [@feed@Explore top posts about Computing](https://app.daily.dev/tags/computing?ref=roadmapsh)
