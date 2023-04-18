# Patroni

## Patroni

[Patroni](https://github.com/zalando/patroni) is a modern, open-source, and highly-available PostgreSQL database cluster management tool. It ensures that the master automatically fails over to a standby in case of any issues, and plays a vital role in keeping the PostgreSQL database highly available.

### Overview

When running a PostgreSQL database cluster, it is essential to provide automated failover and recovery mechanisms to prevent downtimes and data loss. Patroni acts as an effective solution by enabling automated failover, which promotes a healthy replica to become the new master in case the current master node fails.

### Key Features of Patroni

* **High Availability:** Patroni uses consensus-based algorithms like [Raft](https://raft.github.io/) or [ZooKeeper](https://zookeeper.apache.org/) to maintain a distributed and highly-available PostgreSQL cluster.
* **Automatic Failover:** Patroni handles master failure scenarios by monitoring and switching to the most appropriate replica.
* **Switchover and Planned Maintenance:** It provides functionality to perform controlled switchover to a replica node for maintenance or other reasons.
* **Configuration Management:** Patroni takes care of configuration files (e.g., `postgresql.conf`) and automatically synchronizes them across the cluster.
* **Replica management:** It supports various replication methods, including streaming replication, logical replication, and synchronous replication.
* **Monitoring and Health Checks:** Patroni provides REST APIs for monitoring the PostgreSQL cluster health and various performance metrics.
* **Integration:** It can be easily integrated with various configuration stores (e.g., ZooKeeper, etcd, Consul) and load balancers like HAProxy.

### Setting up Patroni

Before setting up Patroni, you need to have at least two PostgreSQL servers and a configuration store (ZooKeeper, etcd, or Consul). Follow these steps to set up a highly-available PostgreSQL cluster using Patroni:

1. **Install Patroni:** Patroni can be installed using pip:

   ```
   pip install patroni
   ```
   
2. **Configure Patroni:** Create a `patroni.yml` configuration file in the PostgreSQL server. This file contains settings like PostgreSQL connections, configuration store location, and replication settings.

3. **Start Patroni:** Run the following command on each of your PostgreSQL servers:

   ```
   patroni /path/to/patroni.yml
   ```
   
4. **Verify Cluster State:** Use Patroni's REST API or CLI tool to verify the cluster state and health.

With Patroni up and running, you can perform various cluster management tasks like failover, switchover, and monitoring.

### Conclusion

Patroni is a highly-effective PostgreSQL DBA tool to manage and maintain highly-available database clusters. By incorporating automated failovers, effective replica management, and easy configuration, you can ensure your PostgreSQL database remains reliable and available at all times.