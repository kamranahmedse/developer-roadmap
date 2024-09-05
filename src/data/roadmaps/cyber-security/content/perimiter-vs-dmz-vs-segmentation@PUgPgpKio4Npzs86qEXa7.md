# Perimiter vs DMZ vs Segmentation

Perimeter and DMZ (Demilitarized Zone) segmentation is a crucial aspect of network security that helps protect internal networks by isolating them from external threats. In this section, we will discuss the concepts of perimeter and DMZ segmentation, and how they can be used to enhance the security of your organization.

## Perimeter Segmentation

Perimeter segmentation is a network security technique that involves isolating an organization's internal networks from the external, untrusted network (typically the internet). The goal is to create a protective barrier to limit the access of external attackers to the internal network, and minimize the risk of data breaches and other security threats.

To achieve this, perimeter segmentation typically involves the use of network security appliances such as firewalls, intrusion detection systems (IDS), and intrusion prevention systems (IPS). These devices act as gatekeepers, enforcing security policies and filtering network traffic to protect the internal network from malicious activity.

## DMZ Segmentation

The DMZ is a specially isolated part of the network situated between the internal network and the untrusted external network. DMZ segmentation involves creating a separate, secure area for hosting public-facing services (such as web servers, mail servers, and application servers) that need to be accessible to external users.

The primary purpose of the DMZ is to provide an additional layer of protection for internal networks. By keeping public-facing services in the DMZ and isolated from the internal network, you can prevent external threats from directly targeting your organization's most sensitive assets.

To implement a DMZ in your network, you can use devices such as firewalls, routers, or dedicated network security appliances. Properly configured security policies and access controls help ensure that only authorized traffic flows between the DMZ and the internal network, while still allowing necessary external access to the DMZ services.

## Key Takeaways

- Perimeter and DMZ segmentation are crucial security techniques that help protect internal networks from external threats.
- Perimeter segmentation involves isolating an organization's internal networks from the untrusted external network, typically using security appliances such as firewalls, IDS, and IPS.
- DMZ segmentation involves creating a separate, secure area within the network for hosting public-facing services that need to be accessible to external users while maintaining additional security for internal assets.
- Implementing proper network segmentation and security policies can significantly reduce the risk of data breaches and other security threats.

## Segmentation cheat sheets
- [Best-practice-for-network-segmentation](https://github.com/sergiomarotco/Network-segmentation-cheat-sheet) by [Sergiomarotco](https://github.com/sergiomarotco) defines 4 levels of segmentation from basic to advanced.
- [OWASP Network segmentation Cheat Sheet](https://github.com/OWASP/CheatSheetSeries/blob/master/cheatsheets/Network_Segmentation_Cheat_Sheet.md#network-segmentation-cheat-sheet) by [Sergiomarotco](https://github.com/sergiomarotco) defines the basics of web service segmentation.