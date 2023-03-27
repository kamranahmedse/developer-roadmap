# Basics of Subnetting

Subnetting is the process of dividing an IP network into smaller sub-networks called subnets. It allows better allocation of IP addresses and provides better organization, control, and security for the network. Here we go through some of the basic concepts of subnetting and why it's crucial for cybersecurity.

## IP Addresses and Subnet Masks

An IP address is a unique identifier for devices on a network. It consists of two parts: the network address and the host address. The network address indicates the network to which a device belongs, while the host address identifies the specific device within that network.

Subnet masks are used to define which portion of an IP address is the network address and which is the host address. For example, in the IP address `192.168.1.5`, and subnet mask `255.255.255.0`, the network address is `192.168.1.0`, and the host address is `5`.

## Why Subnetting?

Subnetting has several advantages, including:

- **Improved Network Performance**: Breaking a large network into smaller subnets helps reduce congestion and improve overall performance.
- **Enhanced Security**: By isolating different parts of a network, you can control access and limit the spread of potential threats.
- **Easier Administration**: Smaller networks are easier to manage and maintain, as it's simpler to track issues and allocate resources.

## Subnetting Process

The process of subnetting involves the following steps:

- **Choose the Appropriate Subnet Mask**: Determine the right subnet mask for your network based on the number of required subnets and hosts. The more subnets you need, the more bits you will "borrow" from the host portion of the IP address.

- **Divide the Network into Subnets**: Calculate the subnet addresses by incrementing the network portion of the IP address by the value of the borrowed bits.

- **Determine Host Ranges**: Calculate the valid host addresses within each subnet by identifying the first and last usable IP addresses. Remember that the first address in a subnet is the network address, and the last address is used for broadcasting.

- **Assign IP Addresses**: Allocate IP addresses to devices within their respective subnets, and configure devices with the correct subnet mask.

## Example

Let's suppose we have the network `192.168.1.0` with a subnet mask of `255.255.255.0`. We want to create four smaller subnets. Here's how we can do it:

- `255.255.255.0` in binary is `11111111.11111111.11111111.00000000`. We can borrow 2 bits from the host portion to create four subnets: `11111111.11111111.11111111.11000000`, which is `255.255.255.192` in decimal format.

- Our subnets will have the following network addresses:

   - `192.168.1.0`
   - `192.168.1.64`
   - `192.168.1.128`
   - `192.168.1.192`

- The valid host ranges within each subnet are:

   - `192.168.1.1 - 192.168.1.62`
   - `192.168.1.65 - 192.168.1.126`
   - `192.168.1.129 - 192.168.1.190`
   - `192.168.1.193 - 192.168.1.254`

- Allocate IP addresses from these host ranges to devices within their respective subnets, and configure devices with the correct subnet mask (`255.255.255.192`).

Understanding the basics of subnetting is essential to properly configuring and securing your network. By efficiently dividing your network into smaller subnets, you can optimize performance, organization, and security.