# Iptables

<b>Iptables</b> is a built-in Linux firewall that includes some conditions, known as <b>Rules</b>, according to which the traffic is allowed on a machine. The incoming and outgoing traffic and filter a specified rule is handled by Iptables. Iptables contain multiple <b>Chains</b>. A <b>Chain</b> is a set of rules in the table.

We transfer data in the form of packets. We need IPtables in Linux which is a Command-line <b>(CLI)</b> tool for managing the firewall rules on a Linux machine. IPtables contain different tables to filter the packets.

### Types Of Tables in IPtables in Linux

- <b>Filter Table</b> – Filter table is the known as default and main table. Default table of Iptables is Filter Table.<br>
- <b>NAT Table</b> – NAT (Network Address Translation) is used to provide address translation rule.<br>
- <b>Mangle Table</b> – Mangle table is used to Modify the IP Header.<br>
- <b>Raw Tables</b> – Raw table is used for connection tracking. It provides a mechnism for making packets to view packets as part of an on goingconnection or session.<br>
- <b>Security Table</b> – Security table is used Used for Mandatory Access Control(MAC).<br>
