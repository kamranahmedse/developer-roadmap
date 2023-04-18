# Processes and memory architecture

## Process Memory Architecture

In this section, we'll dive into the low-level internals of PostgreSQL, specifically focusing on process memory architecture. We'll explore the concepts of shared memory and local memory within a PostgreSQL instance, as well as how buffer cache, allocating memory, and managing memory are managed.

### Shared Memory vs. Local Memory

PostgreSQL uses two types of memory regions for storing data and processes: shared memory and local memory.

- **Shared Memory**: This memory region is available to all the PostgreSQL processes and is used for storing shared data, such as data buffer cache, lock table, and shared configuration parameters. Shared memory enables efficient inter-process communication, as well as reduces redundancy and the overall memory footprint.

- **Local Memory**: This memory region is exclusive to a specific PostgreSQL process and is used for storing process-specific data, such as query execution plans, temporary tables, and connections information.

### Buffer Cache

One of the key components in the shared memory region is the buffer cache. It stores the most recently accessed data pages in memory, allowing faster access to that data in future queries. PostgreSQL uses a variant of the LRU-K cache replacement algorithm called Clock Sweep for managing buffer cache.

### Allocating Memory

When a PostgreSQL process needs to allocate memory, it can do so using one of two memory contexts:

- **TopMemoryContext**: This context is used for allocating memory that needs to persist for the entire lifetime of a backend process. Examples of such memory allocations include system caches, prepared statements, and several configuration parameters.

- **FunctionCallContext**: This context is used for allocating memory that is only required during the execution of a single function call, such as temporary working data or intermediate results. The memory allocated in this context is automatically released when the function call finishes.

### Managing Memory

PostgreSQL uses a custom memory management system to allocate, manage, and deallocate memory within each process. This system is more efficient than using the standard memory management functions provided by the C library because it can optimize memory usage according to the specific requirements of the PostgreSQL processes. Some key components of PostgreSQL's memory management system include:

- **MemoryAllocators**: PostgreSQL comes with several memory allocators that can be chosen at compile time. The default allocator is responsible for allocating and freeing memory in the TopMemoryContext and FunctionCallContext.

- **MemoryContexts**: Memory contexts are hierarchical structures that allow PostgreSQL processes to organize their memory usage. Each MemoryContext represents a family of memory allocations that are tied together and can be freed all at once.

- **palloc & pfree**: PostgreSQL uses custom memory allocation functions, `palloc` and `pfree`, to allocate and deallocate memory within MemoryContexts. These functions are designed to work efficiently with PostgreSQL's memory management system and help reduce memory fragmentation.

By understanding the process memory architecture, we can better comprehend the inner workings of PostgreSQL and optimize our DBA practices. In the subsequent sections, we will continue to delve further into the low-level internals of PostgreSQL, such as query processing, concurrency control, and WAL management.