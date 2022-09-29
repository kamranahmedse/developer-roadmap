# ACID & CAP Theorem

ACID (Atomicity, Consistency, Isolation, Durability) and CAP (Consistency, Availability, Partition Tolerance) are two important concepts in distributed systems. They are often used to explain the trade-offs between consistency and availability.

CAP is an acronym that stands for Consistency, Availability and Partition Tolerance. According to CAP theorem, any distributed system can only guarantee two of the three properties at any point of time. You can't guarantee all three properties at once.

* Consistency: All nodes see the same data at the same time.
* Availability: Every request receives a response, without the guarantee that it contains the most recent write.
* Partition Tolerance: The system continues to operate despite an arbitrary number of messages being dropped (or delayed) by the network between nodes.

ACID is an acronym that stands for Atomicity, Consistency, Isolation, Durability. ACID is a set of properties of database transactions intended to guarantee validity even in the event of errors, power failures, etc.

* Atomicity: Each transaction is "all or nothing": if one part of the transaction fails, the entire transaction fails, and the database state is left unchanged. An atomic system must guarantee atomicity in each and every situation, including power failures, errors and crashes.
* Consistency: A transaction can bring the database from one valid state to another. Any data written to the database must be valid according to all defined rules, including constraints, cascades, triggers, and any combination thereof.
* Isolation: The concurrent execution of transactions results in a system state that would be obtained if transactions were executed serially, i.e., one after the other.
* Durability: Once a transaction has been committed, it will remain so, even in the case of power loss, crashes, or errors.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.bmc.com/blogs/cap-theorem/'>What is CAP Theorem?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://en.wikipedia.org/wiki/CAP_theorem'>CAP Theorem - Wikipedia</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://mwhittaker.github.io/blog/an_illustrated_proof_of_the_cap_theorem/'>An Illustrated Proof of the CAP Theorem</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.ibm.com/uk-en/cloud/learn/cap-theorem'>CAP Theorem and it's applications in NoSQL Databases</BadgeLink>
<BadgeLink colorScheme='purple' badgeText='Watch' href='https://www.youtube.com/watch?v=_RbsFXWRZ10'>What is CAP Theorem?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://en.wikipedia.org/wiki/ACID'>ACID - Wikipedia</BadgeLink>