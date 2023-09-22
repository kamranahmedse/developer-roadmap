# Patroni

[Patroni](https://github.com/zalando/patroni) is a popular and widely used solution for managing PostgreSQL high availability (HA) clusters. Patroni was developed by Zalando and has gained significant adoption in the PostgreSQL community due to its robustness, flexibility, and ease of use. In this section, we will briefly introduce the main features of Patroni and describe how it can help you manage your PostgreSQL HA cluster.

## Overview

Patroni was designed to address the challenges of managing PostgreSQL replication and failover in large-scale, mission-critical environments. It is a complete, automated solution for managing PostgreSQL clusters with one or more replicas. Patroni has built-in support for leader election, automatic failover, and seamless integration with various cloud platforms and popular infrastructure components, such as Etcd, Consul, Zookeeper, and Kubernetes.

## Key Features

Here are the main features provided by Patroni:

- **Automated Failover**: In case the primary node becomes unavailable or fails, Patroni provides automated failover to a secondary replica that is promoted to primary. This ensures the availability and resilience of your PostgreSQL database.

- **Built-in Leader Election**: Patroni uses a distributed consensus algorithm to elect a new primary node when the current primary fails. The election process is highly configurable and support different distributed consensus store like Etcd, Consul, and Zookeeper.

- **Synchronous Replication**: Patroni supports synchronous replication, which ensures that transactions are consistently replicated to at least one replica before being acknowledged by the primary. This guarantees that your data remains consistent in case of primary failure.

- **Connection Pooling**: Patroni integrates with popular PostgreSQL connection poolers like PgBouncer and Pgpool-II, allowing your applications to efficiently manage and share database connections.

- **Dynamic Configuration**: Patroni allows you to manage PostgreSQL configuration settings dynamically, without requiring a restart or manual intervention. This minimizes downtime and streamlines cluster management.

- **Monitoring and Health Checks**: Patroni provides monitoring and health check features that enable you to easily monitor the health of your PostgreSQL cluster and detect potential issues before they become critical.

## Getting Started with Patroni

To get started with Patroni, you can follow the [official documentation](https://patroni.readthedocs.io/en/latest/), which provides detailed installation and configuration instructions, as well as best practices for setting up and managing PostgreSQL clusters with Patroni.

By using Patroni for managing your PostgreSQL HA cluster, you can ensure that your database remains highly available and resilient to failures, while simplifying cluster management and reducing operational costs.