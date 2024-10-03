# Netfilter

Netfilter is a powerful framework integrated into the Linux kernel, providing a versatile interface for manipulating and transforming network packets. It serves as a crucial tool for developing robust firewall systems and managing network address translations (NATs).

Netfilter's modular design allows for the insertion of custom functions, known as hooks, into the kernel's networking stack. These hooks enable you to inspect and modify packets at various stages of the network processing pipeline, including pre-routing, local input, forwarding, local output, and post-routing.

One of the most common tools used in conjunction with Netfilter is `iptables`, which offers a mechanism to configure the tables and chains within the Netfilter framework. Let's explore an example of using `iptables` with the Netfilter module to create a simple firewall rule on an Ubuntu Linux system:

```bash
sudo iptables -A INPUT -i eth0 -s 192.168.0.0/24 -m netfilter --netfilter-name roadmap_example --jump DROP
```

In this command:

- `-A INPUT` adds a new rule to the `INPUT` chain.
- `-i eth0` specifies the network interface to apply the rule.
- `-s 192.168.0.0/24` designates the IP address range for the rule.
- `-m netfilter` calls the Netfilter module.
- `--netfilter-name roadmap_example` names the rule.
- `--jump DROP` specifies the action to take on matching packets (in this case, dropping them).
