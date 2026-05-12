# GLBP
 
GLBP, or Gateway Load Balancing Protocol, is a Cisco proprietary protocol that goes beyond simple redundancy by also distributing traffic across multiple routers simultaneously. Unlike HSRP and VRRP, where only one router actively handles traffic at a time, GLBP allows all routers in the group to forward traffic, improving both availability and bandwidth utilization. Each router in the group shares the same virtual IP address but is assigned a different virtual MAC address, allowing traffic to be load-balanced across all active gateways.

Visit the following resources to learn more:

- [@article@GLBP - Gateway Load Balancing Protocol](https://www.cisco.com/en/US/docs/ios/12_2t/12_2t15/feature/guide/ft_glbp.html)
- [@article@Gateway Load Balancing Protocol (GLBP)](https://www.networkacademy.io/ccna/network-services/gateway-load-balancing-protocol-glbp)
- [@video@GLBP Operation (Cisco SWITCH (300-115) Complete Video Course)](https://www.youtube.com/watch?v=ujApoqozzsE)