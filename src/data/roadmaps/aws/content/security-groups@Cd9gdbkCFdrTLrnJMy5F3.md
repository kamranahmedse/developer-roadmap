# Security Groups

Security Groups in AWS act as a virtual firewall for your instance to control inbound and outbound traffic. When you launch an instance in a VPC, you can assign up to five security groups to the instance. Security Groups are stateful — if you send a request from your instance, the response traffic for that request is allowed to flow in regardless of inbound security group rules. You can specify allow rules, but not deny rules. You can specify separate rules for inbound and outbound traffic. Therefore, if you need to allow specific communication between your instances, you'll need to configure both outbound rules for the sender security group and inbound rules for the receiver security group.

Visit the following resources to learn more:

- [@official@Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-security-groups.html)
