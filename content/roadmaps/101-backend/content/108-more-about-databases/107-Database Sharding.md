# Database Sharding 

Sharding is a database architecture pattern related to horizontal partitioning — the practice of separating one table’s rows into multiple different tables, known as partitions. Each partition has the same schema and columns, but also entirely different rows. Likewise, the data held in each is unique and independent of the data held in other partitions.

It can be helpful to think of horizontal partitioning in terms of how it relates to vertical partitioning. In a vertically-partitioned table, entire columns are separated out and put into new, distinct tables. The data held within one vertical partition is independent from the data in all the others, and each holds both distinct rows and columns.

BENEFITS :

The main appeal of sharding a database is that it can help to facilitate horizontal scaling, also known as scaling out. Horizontal scaling is the practice of adding more machines to an existing stack in order to spread out the load and allow for more traffic and faster processing. This is often contrasted with vertical scaling, otherwise known as scaling up, which involves upgrading the hardware of an existing server, usually by adding more RAM or CPU.


<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink badgeText='Read' colorScheme='yellow' href='https://www.digitalocean.com/community/tutorials/understanding-database-sharding'>What is Database Sharding?</BadgeLink>
<BadgeLink badgeText='Watch' href='https://www.youtube.com/watch?v=5faMjKuB9bc'>Database Sharding- Gaurav sen (Youtube)</BadgeLink>

