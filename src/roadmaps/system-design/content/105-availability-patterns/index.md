# Availability Patterns

There are three Availability Patterns which are:

- Fail-Over
- Replication
- Availability in Numbers

## Fail-Over

### Active-passive
With active-passive fail-over, heartbeats are sent between the active and the passive server on standby. If the heartbeat is interrupted, the passive server takes over the active's IP address and resumes service.

## Active-active
In active-active, both servers are managing traffic, spreading the load between them. If the servers are public-facing, the DNS would need to know about the public IPs of both servers. If the servers are internal-facing, application logic would need to know about both servers. 

## Replication

Replication is futher derived in two components:

 - Master-Slave Replication - The master serves reads and writes, replicating writes to one or more slaves, which serve only reads.
 - Master-Master Replication - Both masters serve reads and writes and coordinate with each other on writes. If either master goes down, the system can continue to operate with both reads and writes.

 ## Availability In Numbers

Availability is often quantified by uptime (or downtime) as a percentage of time the service is available. Availability is generally measured in number of 9s--a service with 99.99% availability is described as having four 9s.

To learn more, visit the following links:

 - [Getting started with Availability Patterns](https://github.com/donnemartin/system-design-primer)
 - [Availability in System Design](https://www.enjoyalgorithms.com/blog/availability-system-design-concept)
 - [System Design: Availability](https://dev.to/karanpratapsingh/system-design-availability-38bd)