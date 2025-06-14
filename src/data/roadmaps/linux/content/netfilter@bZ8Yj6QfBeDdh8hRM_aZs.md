# Netfilter

Netfilter is a Linux kernel framework for manipulating and filtering network packets. It provides hooks at various stages (prerouting, input, forward, output, postrouting) for custom functions. Primary applications include firewalls and NAT management. Works with iptables for configuration. Essential for traffic control, packet modification, logging, and intrusion detection in Linux systems.

The structure of netfilter allows for custom functions, often referred to as hooks, to be inserted into the kernel's networking stack. These hooks can manipulate or inspect packets at various stages like prerouting, local in, forward, local out, and postrouting.

A common tool used in conjunction with netfilter is iptables, which provides a mechanism to configure the tables in the kernel provided by the Netfilter Framework.

Here is an example of using iptables with netfilter module to create a simple firewall rule:
```bash
iptables -A INPUT -i eth0 -s 192.168.0.0/24 -m netfilter --netfilter-name example --action drop 
```
In this command, '-A INPUT' is adding a new rule to the 'INPUT' chain. '-i eth0' is specifying the network interface, and '-s 192.168.0.0/24' is designating the IP address range for the rule. '-m netfilter' is calling the netfilter module, '--netfilter-name example' is naming the rule, and '--action drop' is specifying how to handle the matching packets (In this case, dropping them).