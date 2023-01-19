# Horizontal Scaling

Load balancers can also help with horizontal scaling, improving performance and availability. Scaling out using commodity machines is more cost efficient and results in higher availability than scaling up a single server on more expensive hardware, called Vertical Scaling. It is also easier to hire for talent working on commodity hardware than it is for specialized enterprise systems.

## Disadvantages of horizontal scaling
- Scaling horizontally introduces complexity and involves cloning servers
- Servers should be stateless: they should not contain any user-related data like sessions or profile pictures
- Sessions can be stored in a centralized data store such as a database (SQL, NoSQL) or a persistent cache (Redis, Memcached)
- Downstream servers such as caches and databases need to handle more simultaneous connections as upstream servers scale out.

To learn more, visit the following links:

- [Introduction to Horizontal Scaling](https://github.com/donnemartin/system-design-primer#horizontal-scaling)
- [System Design – Horizontal and Vertical Scaling](https://www.geeksforgeeks.org/system-design-horizontal-and-vertical-scaling/)
- [Getting started with Horizontal and Vertical Scaling](https://www.codingninjas.com/blog/2021/08/25/system-design-horizontal-and-vertical-scaling/)