# Service Discovery

Systems such as [Consul](https://www.consul.io/docs/index.html), [Etcd](https://coreos.com/etcd/docs/latest), and [Zookeeper](http://www.slideshare.net/sauravhaloi/introduction-to-apache-zookeeper) can help services find each other by keeping track of registered names, addresses, and ports. [Health checks](https://www.consul.io/intro/getting-started/checks.html) help verify service integrity and are often done using an HTTP endpoint. Both Consul and Etcd have a built in key-value store that can be useful for storing config values and other shared data.

Visit the following links to learn more:

- [@article@What is Service-oriented architecture?](https://en.wikipedia.org/wiki/Service-oriented_architecture)
- [@opensource@Intro to Service Discovery](https://github.com/donnemartin/system-design-primer#Service-Discovery)
- [@feed@Explore top posts about Architecture](https://app.daily.dev/tags/architecture?ref=roadmapsh)
