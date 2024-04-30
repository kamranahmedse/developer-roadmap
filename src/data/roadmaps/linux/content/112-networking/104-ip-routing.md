# IP Routing 

IP Routing in Linux refers to the process of setting up routing tables and configuring network routes for networking interfaces within the Linux operating system. It is the kernel’s responsibility to handle this task which involves the selection of pathways for sending network packets across to their intended destinations on a network.

This task is carried out using various command-line tools and the networking configuration files. The principle command-line tool for network configuration in Linux used to be `ifconfig`, but it has now been mostly replaced by the `ip` command.

For example, to view the routing table in Linux, the following command is used:

```bash
$ ip route show
```

This command returns a list of all routes that are known to the kernel.