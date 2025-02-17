# NTP

**Network Time Protocol (NTP)** is a networking protocol used to synchronize the clocks of computers over a network with high accuracy. It operates in a hierarchical structure known as the stratum model, where Stratum 0 consists of highly precise time sources like atomic clocks or GPS clocks, while Stratum 1 servers receive time directly from these sources and distribute it to lower-stratum devices. NTP ensures fault tolerance by using multiple time servers and sophisticated algorithms to compensate for network latency and jitter. It can achieve millisecond accuracy in local networks and tens of milliseconds over the internet, making it essential for distributed systems, financial transactions, security protocols, and network infrastructure. By continuously adjusting the system clock, NTP helps maintain accurate time across devices, preventing discrepancies that could lead to data inconsistencies, security vulnerabilities, or operational failures.
Learn more from the following resources:

- [@video@Network Time Protocol (NTP)](https://www.youtube.com/watch?v=BAo5C2qbLq8)
- [@article@What is NTP?](https://www.pubnub.com/learn/glossary/ntp-protocol/)

