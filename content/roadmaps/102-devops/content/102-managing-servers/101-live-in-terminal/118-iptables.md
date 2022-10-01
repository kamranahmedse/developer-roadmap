# Iptables

`iptables` is a built-in Linux firewall that includes some conditions, known as <b>Rules</b>, according to which the traffic is allowed on a machine. The incoming and outgoing traffic and filter a specified rule is handled by Iptables. Iptables contain multiple <b>Chains</b>. A <b>Chain</b> is a set of rules in the table.

We transfer data in the form of packets. We need IPtables in Linux which is a Command-line <b>(CLI)</b> tool for managing the firewall rules on a Linux machine. IPtables contain different tables to filter the packets.

It has the following syntax: `$ iptables --table TABLE -A/-C/-D... CHAIN rule --jump Target`

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://linuxhint.com/iptables_for_beginners/'>Iptables for beginners</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.geeksforgeeks.org/iptables-command-in-linux-with-examples/'>Iptables command in Linux with examples</BadgeLink>
