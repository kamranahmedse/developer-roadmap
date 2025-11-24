During a high-load scenario, there are several things a developer can do to improve the performance of the database connection:

- Using connection pools to reuse connections reduces the time required to establish a new one.
- Load balancing the database traffic (the queries) between a group of databases would help distribute the load.
- Even optimizing your queries can reduce the time you’re using each connection, helping you optimize the use of resources and minimizing the time you’re spending with each active connection.