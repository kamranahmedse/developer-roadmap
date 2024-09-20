# Perimiter vs DMZ vs Segmentation

In network security, **perimeter**, **DMZ (Demilitarized Zone)**, and **segmentation** are strategies for organizing and protecting systems:

1. **Perimeter** security refers to the outer boundary of a network, typically protected by firewalls, intrusion detection systems (IDS), and other security measures. It acts as the first line of defense against external threats, controlling incoming and outgoing traffic to prevent unauthorized access.

2. **DMZ** is a subnet that sits between an internal network and the external internet, hosting public-facing services like web servers and mail servers. The DMZ isolates these services to minimize the risk of attackers gaining access to the internal network by compromising a public-facing server.

3. **Segmentation** divides a network into smaller, isolated sections or zones, each with its own security controls. This limits the spread of attacks, enhances internal security, and enforces access control between different parts of the network, reducing the potential impact of a breach.

Together, these strategies create a layered defense, protecting sensitive resources by managing traffic flow and access points across the network.

Learn more from the following resources:

- [@opensource@Best practice for network segmentation](https://github.com/sergiomarotco/Network-segmentation-cheat-sheet)
- [@opensource@OWASP Network segmentation Cheat Sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Network_Segmentation_Cheat_Sheet.md#network-segmentation-cheat-sheet)
