# NAT Gateway

AWS NAT Gateway is a managed service that provides source Network Address Translation (NAT) for instances in a private subnet so they can access the internet securely. It's designed to operate automatically, handling bandwidth scaling, failover, and managing carrier IP addresses. With NAT Gateway, instances within a VPC can access the internet for software updates, patches, etc, but inbound traffic from the internet is prevented, helping maintain the security and privacy of the private subnet. NAT Gateway is redundant within the Availability Zone, providing high availability. It supports TCP, UDP, and ICMP protocols, as well as Port Address Translation (PAT).

Visit the following resources to learn more:

- [@official@NAT Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)
