# VLAN Hopping

VLAN hopping is a common network-based attack that exploits the vulnerabilities of the VLAN trunking protocols in a local area network (LAN). The objective of this attack is to gain unauthorized access to other VLANs or to bypass the network's security protocols by hopping between VLANs.

## How VLAN Hopping Works

There are two primary methods of VLAN hopping: 

- **Switch Spoofing:** In this approach, an attacker configures their device to act as a switch and establish a trunk link with the actual network switch. Since trunk links are designed to carry traffic from multiple VLANs, the attacker can then access traffic from all the VLANs that are allowed on the trunk.

- **Double Tagging:** This method involves sending frames with multiple 802.1Q VLAN tags. By adding an extra tag, an attacker can confuse the switch and cause it to forward the frame to another VLAN, providing unauthorized access to that VLAN's traffic.

## Preventing VLAN Hopping

To secure your network from VLAN hopping attacks, consider implementing the following best practices:

- **Disable Unused Ports:** Shut down any unused ports on your switches and configure them as access ports instead of trunk ports. This will limit the opportunity for an attacker to establish a trunk link.

- **Configure Allowed VLANs on Trunk Links:** Restrict the VLANs that can be carried on trunk links by explicitly specifying the allowed VLANs. This will prevent an attacker from accessing unauthorized VLANs through a trunk link.

- **Implement VLAN Access Control Lists (VACLs):** VACLs can be used to filter traffic at the VLAN level, preventing unauthorized traffic from entering or leaving a VLAN.

- **Enable 802.1Q Native VLAN Tagging:** By enabling native VLAN tagging and assigning a unique, unused VLAN ID as the native VLAN, you can prevent double tagging attacks.

Remember that implementing these security practices is crucial in protecting your network from VLAN hopping and other types of network-based attacks. Always stay vigilant and keep your network's security protocols up-to-date to minimize the chances of a successful cyber attack.