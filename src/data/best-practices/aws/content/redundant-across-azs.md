# Redundant Across AZs

> Always be redundant across availability zones (AZs).

AZs can have outages, it's happened in the past that certain things in an AZ have gone down. Spreading your application into multiple AZs is as simple as adding a new AZ to your load balancer and starting an instance in that AZ. You should spread your load over two AZs at the very least! If you can afford it, being redundant across regions can also be well worth it, but this generally has a more complex set up cost and isn't always necessary. You can now copy AMIs between regions, and you can set up your Route53 records to balance traffic between regions, but you can't use a single ELB across regions.
