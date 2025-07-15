# Public Subnet

In AWS, a subnet that's designated as `public` is one that has direct access to the Internet. Each subnet that you create runs on its own portion of the AWS network, and you can consider them as logically isolated sections. When a subnet is designated as public, it means an Internet Gateway is attached to it and thus instances within this subnet can easily communicate with the outside net. Each instance that you launch into a public subnet is automatically assigned a private IPv4 address and a public IPv4 address. These addresses don't change and remain with the instance, until it's stopped, terminated or replaced with a different address. This setup allows instances in the public subnet to communicate directly with the internet and other AWS services.

Visit the following resources to learn more:

- [@official@Subnets](https://docs.aws.amazon.com/vpc/latest/userguide/configure-subnets.html)
