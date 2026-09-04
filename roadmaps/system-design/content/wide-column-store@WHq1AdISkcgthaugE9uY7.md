# Wide Column Store
 
A wide column store organizes data into rows and columns, but unlike a relational table, different rows can have different columns, and columns can be grouped for efficient reads and writes. This structure works well for large-scale write-heavy workloads that need fast access to specific columns across huge amounts of data. Cassandra and HBase are common examples.

Visit the following resources to learn more:

- [@article@Bigtable architecture](https://www.read.seas.harvard.edu/~kohler/class/cs239-w08/chang06bigtable.pdf)