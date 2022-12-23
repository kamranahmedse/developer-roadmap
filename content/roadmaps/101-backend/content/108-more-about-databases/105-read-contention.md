# Read Contention

Database contention is a situation that occurs when multiple users or processes are trying to access the same resource in a database concurrently, and there are limited resources available to handle these requests. This can cause delays or conflicts as the database tries to manage the competing demands for resources.

Contention can occur at various levels in a database, such as at the table level, the page level, or the row level. For example, if two users are trying to update the same row in a table at the same time, the database may have to resolve the conflict by choosing which update to apply.

Contention can have a negative impact on the performance of a database, as it can lead to delays in processing requests and reduced efficiency. To address contention, database administrators may need to optimize the design of the database, implement locking mechanisms, or increase the availability of resources.
