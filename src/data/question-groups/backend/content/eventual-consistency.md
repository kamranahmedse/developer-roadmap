![Eventual Consistency](https://assets.roadmap.sh/guest/eventual-consistency-zoh2b.png)

Eventual consistency is a consistency model used in distributed computing. This model guarantees that any piece of information written into a distributed system will become consistent (meaning that all servers will have the same version of this data) eventually as opposed to others where immediate consistency is assured.

For backend systems this implies that there is a need for data synchronization between all parts of the distributed system and on top of that, a potential need to resolve data conflicts, if different parts of your system are dealing with different versions of the same data record.