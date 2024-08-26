# Etcd

Etcd is a distributed key-value store that provides an efficient and reliable means for storing crucial data across clustered environments. It has become popular as a fundamental component for storing configuration data and service discovery in distributed systems.

Etcd can be utilized in conjunction with _connection poolers_ such as PgBouncer or HAProxy to improve PostgreSQL load balancing. By maintaining a list of active PostgreSQL servers' IP addresses and ports as keys in the store, connection poolers can fetch this information periodically to route client connections to the right servers. Additionally, transactional operations on the store can simplify the process of adding or removing nodes from the load balancer configuration while maintaining consistency.

Learn more from the following resources:

- [@video@PostgreSQL High Availability](https://www.youtube.com/watch?v=J0ErkLo2b1E)
- [@articles@etcd vs PostgreSQL](https://api7.ai/blog/etcd-vs-postgresql)