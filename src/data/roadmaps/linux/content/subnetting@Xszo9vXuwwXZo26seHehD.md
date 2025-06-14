# Subnetting

Subnetting divides networks into smaller subnets to improve performance and security in Linux networking. It organizes IP addresses within IP addressing schemes, preventing conflicts and efficiently utilizing address ranges. Use `route -n` to view routing tables and `route add -net xxx.xxx.xxx.x/xx gw yyy.yyy.yyy.y` to add subnets. Essential for complex networking environments.

Generally, the following commands are used in Linux for subnetting:

```shell
# Display current routing table
$ route -n 

# Add a new subnet
$ route add -net xxx.xxx.xxx.x/xx gw yyy.yyy.yyy.y
```

Please replace the `xxx.xxx.xxx.x/xx` with your desired subnet address and network mask and replace `yyy.yyy.yyy.y` with the intended default gateway for the subnet.