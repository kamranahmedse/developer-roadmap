# Service Mesh

A service mesh is a network of microservices that are connected using a mesh of interconnected, intelligent proxies. It is used to manage and secure communication between microservices, and it provides features such as load balancing, service discovery, and observability.

In a service mesh, each microservice is typically represented by an instance of a lightweight, transparent proxy called an "envoy." The envoys handle the communication between microservices and provide features such as load balancing, routing, and security.

Service meshes are typically implemented using a sidecar pattern, in which the envoys are deployed alongside the microservices they are responsible for. This allows the service mesh to be decoupled from the microservices and makes it easier to manage and update.

Service meshes are commonly used in cloud-native architectures and are often managed using a control plane, which is responsible for configuring and managing the envoys. Some popular service mesh implementations include Istio and Linkerd.

<ResourceGroupTitle>Free Content</ResourceGroupTitle>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.nginx.com/blog/what-is-a-service-mesh/'>What is a Service Mesh?</BadgeLink>
<BadgeLink colorScheme='yellow' badgeText='Read' href='https://www.cncf.io/blog/2018/05/02/service-mesh-explained/'>Service Mesh Explained - Cloud Native Computing Foundation (CNCF)</BadgeLink>
