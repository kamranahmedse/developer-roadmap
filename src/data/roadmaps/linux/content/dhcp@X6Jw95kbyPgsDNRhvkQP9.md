# DHCP

DHCP (Dynamic Host Configuration Protocol) automatically allocates IP addresses and network configuration to clients, ensuring unique addresses for each machine. In Linux, install with `sudo apt-get install isc-dhcp-server` and configure via `/etc/dhcp/dhcpd.conf`. DHCP servers require static IPs for effective management and can handle DNS and network data. The DHCP server effectively manages the IP addresses and information related to them, making sure that each client machine gets a unique IP and all the correct network information.

Visit the following sources to learn more:

- [@article@Dynamic Host Configuration Protocol - Wikipedia](https://en.wikipedia.org/wiki/Dynamic_Host_Configuration_Protocol)
- [@article@DHCP Protocol: How Dynamic Host Configuration Protocol Works](https://network-guides.com/dhcp-protocol/)
