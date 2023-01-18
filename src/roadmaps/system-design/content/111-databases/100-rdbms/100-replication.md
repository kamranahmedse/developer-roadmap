# Replication

## Master-slave replication:
The master serves reads and writes, replicating writes to one or more slaves, which serve only reads. Slaves can also replicate to additional slaves in a tree-like fashion. If the master goes offline, the system can continue to operate in read-only mode until a slave is promoted to a master or a new master is provisioned.

## Master-master replication:
Both masters serve reads and writes and coordinate with each other on writes. If either master goes down, the system can continue to operate with both reads and writes.

To learn more, visit the following links:

- [Getting started with Replication](https://github.com/donnemartin/system-design-primer#replication)