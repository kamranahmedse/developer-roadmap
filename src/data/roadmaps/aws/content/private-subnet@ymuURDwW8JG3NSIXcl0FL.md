# Private Subnet

Private subnets in AWS are isolated network segments within your VPC that do not have direct access to the internet. You can use private subnets to run services and applications that should not be directly accessible from the outside world, but still need to communicate with other resources within your VPC. Any instances launched in a private subnet cannot directly send traffic to the internet without routing through a NAT device.

Visit the following resources to learn more:

- [@official@Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html)
