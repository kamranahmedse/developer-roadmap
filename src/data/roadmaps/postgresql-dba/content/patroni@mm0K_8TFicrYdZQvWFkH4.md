# Patroni

Patroni is an open-source tool that automates the setup, management, and failover of PostgreSQL clusters, ensuring high availability. It leverages distributed configuration stores like Etcd, Consul, or ZooKeeper to maintain cluster state and manage leader election. Patroni continuously monitors the health of PostgreSQL instances, automatically promoting a replica to primary if the primary fails, minimizing downtime. It simplifies the complexity of managing PostgreSQL high availability by providing built-in mechanisms for replication, failover, and recovery, making it a robust solution for maintaining PostgreSQL clusters in production environments.

Learn more from the following resources:

- [@opensource@zalando/patroni](https://github.com/zalando/patroni)