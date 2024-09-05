# Networking Tools

Networking tools are used to troubleshoot network issues. They are also used to monitor network traffic and to test network connectivity. Some of the most common networking tools are:

- `traceroute` - Traces the route taken by packets over an IP network.
- `ping` - sends echo request packets to a host to test the Internet connection.
- `mtr` - Combines the functionality of `traceroute` and `ping` into a single diagnostic tool.
- `nmap` - Scans hosts for open ports.
- `netstat` - Displays network connections, routing tables, interface statistics, masquerade connections, and multicast memberships.
- `ufw` and `firewalld` - Firewall management tools.
- `iptables` and `nftables` - Firewall management tools.
- `tcpdump` - Dumps traffic on a network.
- `dig` - DNS lookup utility.
- `scp` - Secure copy.

`traceroute` command is a command in Linux that prints the route a network packet takes from its source (e.g. your computer) to the destination host (e.g., roadmap.sh). It is quite valuable in investigating slow network connections as it can help us spot the slow leg of the network packet journey through the internet.

- [How to Run Traceroute in Linux](https://linuxhint.com/run_traceroute_linux/)

`ping` (**P**acket **In**ternet **G**roper) command is used to check the network connectivity between host and server/host. This command takes as input the IP address or the URL and sends a data packet to the specified address with the message “PING” and get a response from the server/host this time is recorded which is called latency.

- [What is ping command?](https://linuxize.com/post/linux-ping-command/)

`mtr` combines the functionality of the traceroute and ping programs in a single network diagnostic tool.

- [Javatpoint: Linux mtr Command](https://www.javatpoint.com/linux-mtr)
- [mtr Linux command](https://www.tutorialspoint.com/unix_commands/mtr.htm)
- [How to traceroute use mtr command in Linux](https://www.devopsroles.com/how-to-traceroute-use-mtr-command-in-linux/)

NMAP stands for Network Mapper and is an open-source tool used to explore and audit the network's security, such as checking firewalls and scanning ports.

- [NMAP Official Manual Book](https://nmap.org/book/man.html)

Netstat is a command line utility to display all the network connections on a system. It displays all the tcp, udp and unix socket connections. Apart from connected sockets it also displays listening sockets that are waiting for incoming connections.

- [netstat command in Linux with Examples](https://www.tutorialspoint.com/unix_commands/netstat.htm)
- [Netstat Tutorial](http://www.c-jump.com/CIS24/Slides/Networking/html_utils/netstat.html)
- [Netstat Commands - Network Administration Tutorial](https://www.youtube.com/watch?v=bxFwpm4IobU)
- [Linux Command Line Tutorial For Beginners - netstat command](https://www.youtube.com/watch?v=zGNcvBaN5wE)

UFW, or _uncomplicated firewall_, is command-line based utility for managing firewall rules in Arch Linux, Debian and Ubuntu. It's aim is to make firewall configuration as simple as possible. It is a frontend for the `iptables` firewalling tool.

- [ufw Documentation](https://manpages.ubuntu.com/manpages/trusty/man8/ufw.8.html)
- [Basic Introduction to UFW](https://www.linux.com/training-tutorials/introduction-uncomplicated-firewall-ufw/)
- [UFW Essentials](https://www.digitalocean.com/community/tutorials/ufw-essentials-common-firewall-rules-and-commands)

IPtables is a command-line firewall utility that uses policy chains to allow or block traffic that will be enforced by the linux kernel’s netfilter framework. Iptables packet filtering mechanism is organized into three different kinds of structures: tables, chains and targets.

- [Iptables tutorial](https://www.hostinger.in/tutorials/iptables-tutorial)
- [Beginners to Advanced Guide Iptables](https://erravindrapawadia.medium.com/iptables-tutorial-beginners-to-advanced-guide-to-linux-firewall-839e10501759)

`tcpdump` is a command line tool used for analysing network traffic passing through your system. It can be used to capture and filter packets and display them in a human-readable format. The captured information can be analysed at a later date as well.

- [tcpdump Documentation](https://www.tcpdump.org/manpages/tcpdump.1.html)
- [Basic Introduction to Tcpdump](https://opensource.com/article/18/10/introduction-tcpdump)
- [50 ways to isolate traffic with Tcpdump](https://danielmiessler.com/study/tcpdump/)
- [Interpreting Tcpdump output and data](https://www.youtube.com/watch?v=7bsQP9sKHrs)

`dig` command stands for **D**omain **I**nformation **G**roper. It is used for retrieving information about DNS name servers. It is mostly used by network administrators for verifying and troubleshooting DNS problems and to perform DNS lookups. It replaces older tools such as `nslookup` and the `host`.

- [More on dig](https://linuxize.com/post/how-to-use-dig-command-to-query-dns-in-linux/)
- [What is DNS?](https://www.cloudflare.com/en-gb/learning/dns/what-is-dns/)

`SCP` is an acronym for Secure Copy Protocol.It is a command line utility that allows the user to securely copy files and directories between two locations usually between unix or linux systems.The protocol ensures the transmission of files is encrypted to prevent anyone with suspicious intentions from getting sensitive information.`SCP` uses encryption over an `SSH` (Secure Shell) connection, this ensures that the data being transferred is protected from suspicious attacks.

Learn more from the following resources:

- [10 SCP command examples](https://www.tecmint.com/scp-commands-examples/)
- [SCP command explained](https://phoenixnap.com/kb/linux-scp-command)
