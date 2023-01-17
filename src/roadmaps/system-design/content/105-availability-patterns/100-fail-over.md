# Fail-Over

## Active-passive

With active-passive fail-over, heartbeats are sent between the active and the passive server on standby. If the heartbeat is interrupted, the passive server takes over the active's IP address and resumes service.
The length of downtime is determined by whether the passive server is already running in 'hot' standby or whether it needs to start up from 'cold' standby. Only the active server handles traffic. Active-passive failover can also be referred to as master-slave failover.

## Active-active
In active-active, both servers are managing traffic, spreading the load between them. If the servers are public-facing, the DNS would need to know about the public IPs of both servers. If the servers are internal-facing, application logic would need to know about both servers. Active-active failover can also be referred to as master-master failover.

## Disadvantages of Failover

 - Fail-over adds more hardware and additional complexity.
 - There is a potential for loss of data if the active system fails before any newly written data can be replicated to the passive.

 To learn more visit the following links:

 - [Getting started with Fail-Over in System Design](https://github.com/donnemartin/system-design-primer)
 - [System Design — Availabiliy Patterns](https://medium.com/must-know-computer-science/system-design-redundancy-and-replication-e9946aa335ba)