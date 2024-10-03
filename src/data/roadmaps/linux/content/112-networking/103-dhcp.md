# DHCP

The Dynamic Host Configuration Protocol (DHCP) is a crucial component of any network. In Linux networking, it is used for dynamically allocating IP addresses within a network.

The DHCP server manages the IP addresses and related information, ensuring that each client machine receives a unique IP address and all the necessary network information.

In Linux, DHCP can be configured and managed using terminal commands. This involves installing the DHCP server software, editing the configuration files, and managing the server's services.

A traditional DHCP server should have a static IP address to effectively manage the IP distribution. The DHCP in Linux also handles DNS and other related data required by your network.

Here's an example of how to install a DHCP server on Ubuntu Linux:

```bash
sudo apt-get update
sudo apt-get install isc-dhcp-server
```

After the installation process, all DHCP server configurations are done in the configuration file located at `/etc/dhcp/dhcpd.conf`, which can be edited using a text editor.

Here's an example configuration file:

```
# Define the subnet and range of IP addresses to be assigned
subnet 192.168.1.0 netmask 255.255.255.0 {
  range 192.168.1.100 192.168.1.200;
  option routers 192.168.1.1;
  option domain-name-servers 8.8.8.8, 8.8.4.4;
}

# Define the DHCP server options
option domain-name "roadmap.sh";
option domain-name-servers ns1.roadmap.sh, ns2.roadmap.sh;
default-lease-time 600;
max-lease-time 7200;
```

This configuration file sets up a DHCP server on the 192.168.1.0/24 network, with IP addresses ranging from 192.168.1.100 to 192.168.1.200. It also specifies the default gateway and DNS servers to be used by the clients.

After modifying the configuration file, you need to restart the DHCP server service:

```bash
sudo systemctl restart isc-dhcp-server
```

By following these steps, you can set up and configure a DHCP server on your Ubuntu Linux system to manage IP address allocation and network information for your clients.
