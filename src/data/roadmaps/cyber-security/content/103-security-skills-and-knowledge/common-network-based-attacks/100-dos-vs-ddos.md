# DoS vs DDoS

In this section, we will discuss the differences between DoS (Denial of Service) and DDoS (Distributed Denial of Service) attacks, two common network-based attacks that can severely impact the availability and performance of targeted systems.

## DoS (Denial of Service) Attack

A DoS attack is a type of cyber attack where an attacker aims to make a computer or network resource unavailable to its intended users by overwhelming the target system with requests, it essentially becomes inaccessible due to server overloading.

Some common methods employed in DoS attacks include:

- **Flooding** - The attacker sends a massive number of requests to the target system, overwhelming its capacity to respond and eventually crashing the system.
- **Ping of Death** - The attacker sends a large, malformed ICMP packet to the target system, which can cause the system to crash.

## DDoS (Distributed Denial of Service) Attack

A DDoS attack is similar to a DoS attack in its intent, but it utilizes multiple computers or devices (usually compromised by malware) to launch the attack. These devices, collectively called a "botnet", send an overwhelming amount of requests to the target system, making it even harder to mitigate the attack and protect the resources.

Some common methods employed in DDoS attacks include:

- **UDP Flood** - A DDoS attack that sends numerous User Datagram Protocol (UDP) packets to the target system, consuming its resources and eventually leading to a crash.
- **HTTP Flood** - A DDoS attack that generates a large number of HTTP requests to the target server, which exceeds its processing capacity and causes a slowdown or crash.

## Key Differences

- **Scale**: While DoS attacks are limited by the resources of a single attacker, DDoS attacks involve multiple attacking devices, making them more effective at overwhelming and disrupting the target system.
- **Mitigation**: DoS attacks can usually be mitigated with simpler countermeasures, but DDoS attacks often require more sophisticated defense strategies due to their distributed and coordinated nature.

In conclusion, both DoS and DDoS attacks aim to disrupt the availability of a target system by overwhelming its resources. However, their key differences lie in the scale and complexity of the attack, with DDoS attacks being more powerful and more challenging to defend against. It is crucial for organizations to implement robust security measures to detect and mitigate these attacks to maintain the availability and integrity of their systems.
