# IP Routing

IP routing in Linux involves configuring routing tables and network routes for packet forwarding across networks. The kernel handles route selection to send packets to their destinations. Use the `ip` command (replacing deprecated `ifconfig`) for network configuration. Example: `ip route show` displays all kernel-known routes for network troubleshooting and management.

This task is carried out using various command-line tools and the networking configuration files. The principle command-line tool for network configuration in Linux used to be `ifconfig`, but it has now been mostly replaced by the `ip` command.

For example, to view the routing table in Linux, the following command is used:

```bash
$ ip route show
```

This command returns a list of all routes that are known to the kernel.