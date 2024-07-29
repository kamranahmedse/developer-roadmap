# Process Memory Architecture in PostgreSQL

PostgreSQL’s process memory architecture is designed to efficiently manage resources and ensure performance. It consists of several key components:

- Shared Memory: This is used for data that needs to be accessed by all server processes, such as the shared buffer pool (shared_buffers), which caches frequently accessed data pages, and the Write-Ahead Log (WAL) buffers (wal_buffers), which store transaction log data before it is written to disk.
- Local Memory: Each PostgreSQL backend process (one per connection) has its own local memory for handling query execution. Key components include the work memory (work_mem) for sorting operations and hash tables, and the maintenance work memory (maintenance_work_mem) for maintenance tasks like vacuuming and index creation.
- Process-specific Memory: Each process allocates memory dynamically as needed for tasks like query parsing, planning, and execution. Memory contexts within each process ensure efficient memory usage and cleanup.
- Temporary Files: For operations that exceed available memory, such as large sorts or hash joins, PostgreSQL spills data to temporary files on disk.

Learn more from the following resources:

- [@article@Understanding PostgreSQL Shared Memory](https://stackoverflow.com/questions/32930787/understanding-postgresql-shared-memory)
- [@article@Understanding The Process and Memory Architecture of PostgreSQL](https://dev.to/titoausten/understanding-the-process-and-memory-architecture-of-postgresql-5hhp)