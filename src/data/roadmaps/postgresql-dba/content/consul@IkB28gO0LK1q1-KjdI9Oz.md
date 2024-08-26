# Consul - an introduction in the context of load balancing

Consul is a distributed, highly-available, and multi-datacenter aware service discovery and configuration tool developed by HashiCorp. It can be used to implement load balancing in a PostgreSQL cluster to distribute client connections and queries evenly across multiple backend nodes.

Consul uses a consensus protocol for leader election and ensures that only one server acts as a leader at any given time. This leader automatically takes over upon leader failure or shutdown, making the system resilient to outages. It provides a range of services like service discovery, health checking, key-value storage, and DNS services.

Learn more from the following resources:

- [@official@Consul by Hashicorp](https://www.consul.io/)
- [@opensource@hashicorp/consul](https://github.com/hashicorp/consul)
- [@article@What is Consul?](https://developer.hashicorp.com/consul/docs/intro)