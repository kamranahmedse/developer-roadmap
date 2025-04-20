# ARP

ARP is a protocol used by the Internet Protocol (IP) to map an IP address to a physical address, also known as a Media Access Control (MAC) address. ARP is essential for routing data between devices in a Local Area Network (LAN) as it allows for the translation of IP addresses to specific hardware on the network. When a device wants to communicate with another device on the same LAN, it needs to determine the corresponding MAC address for the target IP address. ARP helps in this process by broadcasting an ARP request containing the target IP address. All devices within the broadcast domain receive this ARP request and compare the target IP address with their own IP address. If a match is found, the device with the matching IP address sends an ARP reply which contains its MAC address. The device that initiated the ARP request can now update its ARP cache (a table that stores IP-to-MAC mappings) with the new information, and then proceed to send data to the target's MAC address.

Learn more from the following resources:

- [@article@ARP - Wikipedia](https://en.wikipedia.org/wiki/Address_Resolution_Protocol)
- [@video@ARP Explained](https://www.youtube.com/watch?v=cn8Zxh9bPio)
- [@article@What is Address Resolution Protocol?](https://www.fortinet.com/resources/cyberglossary/what-is-arp)