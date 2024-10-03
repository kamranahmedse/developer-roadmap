# IP Routing in Linux

IP Routing in Linux refers to the process of configuring network routes and managing the routing table within the Linux operating system. The Linux kernel is responsible for handling this task, which involves selecting the appropriate pathways for sending network packets to their intended destinations across a network.

This task is accomplished using various command-line tools and networking configuration files. The primary command-line tool for network configuration in Linux is the `ip` command, which has largely replaced the older `ifconfig` command.

For example, to view the current routing table in a Ubuntu Linux system, you can use the following command:

```bash
ip route show
```

This command will display a list of all routes known to the kernel, including the destination network, the gateway, the interface, and other relevant information.

To add a new route to the routing table, you can use the following command:

```bash
sudo ip route add 192.168.1.0/24 via 10.0.0.1 dev eth0
```

This command adds a route to the 192.168.1.0/24 network, with the next-hop gateway at 10.0.0.1 and the outgoing interface as `eth0`.

Similarly, to remove a route from the routing table, you can use the following command:

```bash
sudo ip route del 192.168.1.0/24
```

This command removes the route to the 192.168.1.0/24 network from the routing table.
