Database replication implies the replication of data across multiple instances of the same database. In this scenario, there is usually one database that’s acting as a master to all clients that are connecting it, and the rest act as “slaves” where they simply receive updates on the data being changed/added.

The two main implications of this in fault tolerance are:

- A database cluster can withstand problems on the master server by promoting one of the slaves without losing any data in the process.
- Slaves can be used as read-only servers, increasing the amount of read requests that can be performed on the data without affecting the performance of the database.