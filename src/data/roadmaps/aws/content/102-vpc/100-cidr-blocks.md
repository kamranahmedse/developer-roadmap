# CIDR Blocks

"CIDR" stands for Classless Inter-Domain Routing. In AWS VPC, a CIDR block is the IP address block from which private IPv4 addresses and public IPv4 addresses are allocated when you create a VPC. The CIDR block can range from /28 (16 IP addresses) to /16 (65,536 IP addresses). It represents a network segment and is associated with a network boundary. Upon creation, you cannot change the CIDR block of your VPC, but you can add additional CIDR blocks to it if needed. A VPC's CIDR block should not overlap with any of the existing network's CIDR blocks.

Visit the following resources to learn more:

- [@official@cidr.xyz: Interactive CIDR range visualizer](https://cidr.xyz/)
- [@official@VPC - CIRD Blocks](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-cidr-blocks.html)
