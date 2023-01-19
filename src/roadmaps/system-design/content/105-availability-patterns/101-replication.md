# Replication

Replication is futher derived in two components:

 - Master-Slave Replication
 - Master-Master Replication

## Master-Slave Replication

The master serves reads and writes, replicating writes to one or more slaves, which serve only reads. Slaves can also replicate to additional slaves in a tree-like fashion. If the master goes offline, the system can continue to operate in read-only mode until a slave is promoted to a master or a new master is provisioned.

## Disadvantages Master-Slave replication

Following are the disadvantages:
 - Additional logic is needed to promote a slave to a master.

## Master-Master Replication

Both masters serve reads and writes and coordinate with each other on writes. If either master goes down, the system can continue to operate with both reads and writes.

## Disadvantages of Master-Master replication

Following are the disadvantages of master-master replication:

 - A load balancer or you'll need to make changes to your application logic to determine where to write.
 - Most master-master systems are either loosely consistent (violating ACID) or have increased write latency due to synchronization.
 - Conflict resolution comes more into play as more write nodes are added and as latency increases.
 - See Disadvantage(s): replication for points related to both master-slave and master-master.


Visi the following links for more resources:

- [Replication - Master-Slave](https://github.com/donnemartin/system-design-primer#master-slave-replication)
- [Master- Master Replication](https://github.com/donnemartin/system-design-primer#master-master-replication)