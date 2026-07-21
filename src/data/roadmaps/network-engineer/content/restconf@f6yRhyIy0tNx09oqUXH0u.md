# RESTCONF
 
RESTCONF is a network management protocol that exposes the same YANG-modeled data as NETCONF but through a RESTful HTTP/HTTPS interface, making it more accessible to developers and tools already familiar with web APIs. Instead of XML over SSH, RESTCONF uses HTTP methods like GET, POST, PUT, PATCH, and DELETE, and supports both JSON and XML as data formats. It is easier to use and integrate than NETCONF for many automation use cases, though it lacks some of NETCONF's more advanced transactional features, making the two protocols complementary rather than direct replacements for each other.

Visit the following resources to learn more:

- [@official@RESTCONF Protocol](https://datatracker.ietf.org/doc/html/rfc8040)
- [@article@What is RESTCONF?](https://ipcisco.com/lesson/restconf/)
- [@video@RESTCONF API Tutorial](https://www.youtube.com/watch?v=eFY317eJzEI&list=PLOocymQm7YWZ1uCrl7YoL_uwysOqp-qp5)